import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { contactSubmissionSchema } from "@/lib/contact-schema";
import {
  hashIp,
  insertSubmission,
  isRateLimited,
  markEmailFailed,
  sendNotification,
} from "@/server/contact";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

/**
 * The CSRF middleware in start.ts only covers server functions, not route
 * handlers, so cross-site browser POSTs are rejected here. Requests without
 * either header (curl, server-to-server) pass: CSRF is a browser problem.
 */
function isCrossSite(request: Request): boolean {
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "none") return true;

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host !== new URL(request.url).host;
    } catch {
      return true;
    }
  }
  return false;
}

const methodNotAllowed = () =>
  new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), {
    status: 405,
    headers: { "Content-Type": "application/json; charset=utf-8", Allow: "POST" },
  });

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      // Submissions are write-only: there is deliberately no handler that reads
      // rows back out, so nothing stored can be fetched through this endpoint.
      GET: methodNotAllowed,
      HEAD: methodNotAllowed,
      PUT: methodNotAllowed,
      PATCH: methodNotAllowed,
      DELETE: methodNotAllowed,
      // Errors are handled here and returned as JSON: the global error
      // middleware renders an HTML 500 page, which the form client can't parse.
      POST: async ({ request }) => {
        try {
          if (isCrossSite(request)) {
            return json({ ok: false, error: "Cross-site requests are not allowed." }, 403);
          }

          let payload: unknown;
          try {
            payload = await request.json();
          } catch {
            return json({ ok: false, error: "The request body must be JSON." }, 400);
          }

          const parsed = contactSubmissionSchema.safeParse(payload);
          if (!parsed.success) {
            const fieldErrors: Record<string, string> = {};
            for (const issue of parsed.error.issues) {
              const field = String(issue.path[0] ?? "form");
              if (!fieldErrors[field]) fieldErrors[field] = issue.message;
            }
            return json({ ok: false, error: "Check the highlighted fields.", fieldErrors }, 400);
          }

          // A filled honeypot gets a fake success so bots learn nothing.
          if (parsed.data.website) return json({ ok: true });

          const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
          const ipHash = ip ? await hashIp(ip) : null;

          if (ipHash && (await isRateLimited(ipHash))) {
            return json(
              { ok: false, error: "Too many messages in a short time. Please try again later." },
              429,
            );
          }

          const id = await insertSubmission(parsed.data, {
            ipHash,
            userAgent: request.headers.get("user-agent"),
          });

          // The submission is already stored, so a notification failure is ours
          // to chase; the visitor still gets a success.
          try {
            await sendNotification(parsed.data);
          } catch (err) {
            console.error("contact: notification email failed", err);
            await markEmailFailed(id).catch((e) =>
              console.error("contact: failed to mark email_failed", e),
            );
          }

          return json({ ok: true });
        } catch (err) {
          console.error("contact: submission failed", err);
          return json(
            { ok: false, error: "Something went wrong on our side. Please try again." },
            500,
          );
        }
      },
    },
  },
});
