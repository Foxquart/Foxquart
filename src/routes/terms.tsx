import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { EMAIL_ADDRESS, PHONE_NUMBERS } from "@/lib/site-data";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbNode,
  canonicalLink,
  jsonLdScript,
  pageMeta,
} from "@/lib/seo";

/*
 * DRAFT — NOT YET REVIEWED BY A LAWYER.
 *
 * These terms govern use of the marketing website only: no accounts, no payments and
 * no user-generated content are involved, and project work is explicitly pushed to a
 * separate signed agreement. Before launch a qualified Indian lawyer must review
 * this, and these open items must be resolved:
 *
 *   1. Registered legal entity name and address (the page says "Foxquart" throughout
 *      and offers the postal address on request).
 *   2. Section 13 names the courts of India generally. The exclusive seat — city and
 *      state — must be inserted once the registered office is confirmed, or the
 *      jurisdiction clause is weak.
 *   3. Section 10's liability cap is drafted for a site that sells nothing. Confirm the
 *      figure, and confirm the carve-outs match what Indian law will not let us exclude.
 *   4. Acceptance is browsewrap ("by using this site"). That is normal for a brochure
 *      site but is weakly enforceable; if anything transactional is ever added here it
 *      must become clickwrap.
 *   5. Section 4 restricts scraping and automated collection. Confirm this is consistent
 *      with how the studio itself describes its own data-extraction services.
 *   6. Confirm the demo/case-study disclaimer in section 3 covers every metric currently
 *      published on the site.
 */

const LAST_UPDATED_ISO = "2026-08-10";
const LAST_UPDATED_LABEL = "10 August 2026";

const path = "/terms";
const title = "Terms of Service | Foxquart";
const description =
  "The terms that apply when you use the Foxquart website: what the content is and is not, acceptable use, embedded demos, liability, and governing law in India.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: [canonicalLink(path)],
    scripts: [
      // dateModified is load-bearing on a legal page: it is the machine-readable
      // counterpart of the "last updated" line, and it must not drift from it.
      jsonLdScript([
        {
          "@type": "WebPage",
          "@id": absoluteUrl(path),
          name: title,
          description,
          url: absoluteUrl(path),
          dateModified: LAST_UPDATED_ISO,
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": ORGANIZATION_ID },
          publisher: { "@id": ORGANIZATION_ID },
        },
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Terms of service", path },
        ]),
      ]),
    ],
  }),
  component: TermsPage,
});

type LegalSection = { id: string; title: string; body: ReactNode };

// Declared before `sections` — the JSX below is evaluated at module load, so a const
// defined further down would be in its temporal dead zone.
const linkCls =
  "text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    body: (
      <>
        <p>
          &ldquo;We&rdquo;, &ldquo;us&rdquo; and &ldquo;Foxquart&rdquo; mean the software
          engineering studio operating this website from India. &ldquo;You&rdquo; means anyone using
          it.
        </p>
        <p>
          By browsing this site or sending us an enquiry through it, you accept these terms. If you
          do not accept them, please do not use the site. If you are using it on behalf of an
          organisation, you confirm you are allowed to accept these terms for that organisation.
        </p>
        <p>
          There is no account to create here and nothing to buy. These terms cover the website. Paid
          work is covered by section 5.
        </p>
      </>
    ),
  },
  {
    id: "what-this-site-is",
    title: "What this site is",
    body: (
      <>
        <p>
          This site describes what Foxquart builds — operational software, automation, cloud
          infrastructure — and gives you a way to start a conversation about it. That is all it
          does. There is no login, no dashboard, no payment and no place to upload files.
        </p>
        <p>
          We try to keep the site accurate and current, but it is marketing material. It is not
          engineering, legal, financial or compliance advice, and you should not make a decision
          that matters to your business on the strength of a page here alone. Ask us.
        </p>
      </>
    ),
  },
  {
    id: "claims-and-work",
    title: "Case studies, figures and demonstrations",
    body: (
      <>
        <Bullets
          items={[
            "Outcome figures on this site describe results from specific past projects with their own scope, data and constraints. They are evidence of what we have done, not a forecast of what you will get. Your result depends on your process, your data and your team.",
            "Timelines, budget ranges and delivery estimates shown here are indicative. A commitment on scope, price or date exists only in a signed agreement.",
            "Demonstration sites shown in the work section are exactly that — demonstrations. Some are live client sites and some are our own reference builds. Availability is not guaranteed and they can change or be taken down without notice.",
            "Client and business names and logos shown on this site belong to their owners and appear to identify work we did. They do not imply that those owners endorse anything else on this site.",
          ]}
        />
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <Bullets
          items={[
            "Probe, scan or test the security of this site or the systems behind it, or try to get access to anything not intentionally published.",
            "Run automated collection against this site at a volume that degrades it for others, or ignore the directives in our robots file.",
            "Use our contact channels — the form, the mailbox or the phone numbers — for bulk marketing, recruitment spam or automated outreach.",
            "Copy the site's text, layout, code or imagery to present as your own, or resell any part of it.",
            "Frame or mirror the site in a way that misrepresents who published it, or remove attribution and notices.",
            "Impersonate Foxquart or a Foxquart employee, or use our name or mark in a way that suggests a relationship that does not exist.",
            "Use the site for anything unlawful, or to send us content you have no right to send.",
          ]}
        />
        <p>
          We may block access if any of this happens. If you have found a security problem with this
          site, we would rather hear about it than not — write to{" "}
          <a className={linkCls} href={`mailto:${EMAIL_ADDRESS}`}>
            {EMAIL_ADDRESS}
          </a>{" "}
          and give us a reasonable opportunity to fix it before publishing.
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    title: "Enquiries are not a contract",
    body: (
      <>
        <p>
          Sending an enquiry starts a conversation. It does not book a slot, reserve capacity or
          create an engagement, and nothing on this site is an offer capable of acceptance. Any
          times you tell us you prefer are a preference; nothing is confirmed until we confirm it in
          writing.
        </p>
        <p>
          Work begins only under a separate written agreement covering scope, price, timeline,
          confidentiality, intellectual property and support. Where that agreement conflicts with
          these terms, that agreement wins for everything to do with the work.
        </p>
        <p>
          Please do not send confidential information in a first enquiry. Until an NDA is signed, we
          cannot treat what you send as confidential, though we will not publish it or pass it on.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The design, text, code, imagery and marks on this site belong to Foxquart or to the
          parties who licensed them to us. You get a limited, revocable, non-exclusive right to view
          the site and to share links to it. Nothing else is granted.
        </p>
        <p>
          You may quote a short extract with attribution and a link. Reproducing whole pages,
          reusing the site&rsquo;s code, or training a commercial model on this site&rsquo;s content
          requires our written permission.
        </p>
        <p>
          Intellectual property in work we build for a client is dealt with in that client&rsquo;s
          agreement — typically full transfer on final payment — and not by this page.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party sites and embedded content",
    body: (
      <>
        <p>
          This site links to and embeds content hosted elsewhere: live demo sites shown in frames,
          fonts, and images. Those load directly in your browser from their own hosts and are
          covered by their own terms and privacy practices.
        </p>
        <p>
          We do not control them, we do not warrant them, and we are not responsible for what they
          do. Our{" "}
          <Link className={linkCls} to="/privacy">
            privacy policy
          </Link>{" "}
          explains what this means for storage set in your browser.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "Availability",
    body: (
      <p>
        This is a marketing site and carries no uptime commitment. We may change, suspend or
        withdraw any part of it, at any time, without notice. Uptime and response commitments apply
        to systems we build and operate for clients, and live in those clients&rsquo; agreements —
        never here.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimers",
    body: (
      <p>
        To the extent the law allows, the site and its content are provided as they are, without
        warranties of any kind, express or implied, including any implied warranty of
        merchantability, fitness for a particular purpose or non-infringement. We do not warrant
        that the site will be uninterrupted, error-free, free of harmful components, or that any
        figure or description on it is complete or current.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the extent the law allows, Foxquart is not liable for any indirect, incidental, special
          or consequential loss, or for lost profits, lost revenue, lost data, lost business or lost
          goodwill, arising out of your use of this site — even if we were told such loss was
          possible.
        </p>
        <p>
          Our total liability arising out of or relating to this website, taken together for all
          claims, is limited to five thousand Indian rupees (INR 5,000). This site sells nothing and
          collects no money, so no larger sum is at stake here. Liability arising out of paid work
          is governed by the agreement for that work.
        </p>
        <p>
          Nothing in these terms limits liability that cannot lawfully be limited, including
          liability for death or personal injury caused by negligence, or for fraud or fraudulent
          misrepresentation.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to cover Foxquart against claims, losses and reasonable costs that arise from your
        misuse of this site, from your breach of these terms, or from content you send us that you
        had no right to send.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Our{" "}
        <Link className={linkCls} to="/privacy">
          privacy policy
        </Link>{" "}
        explains what we do with information from this site — including the fact that the contact
        form has no server behind it and sends nothing until you press send in your own mail app. It
        forms part of these terms.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms. The date at the top of this page is the date of the current
        version, and a change takes effect when it is posted here. If a change is material we will
        say so on this page. Continuing to use the site after that means you accept the updated
        terms.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law and jurisdiction",
    body: (
      <p>
        These terms and any dispute arising out of them or out of your use of this site are governed
        by the laws of India, without regard to conflict-of-laws rules. The courts of India have
        exclusive jurisdiction. If you use the site from somewhere else, you do so on your own
        initiative and are responsible for complying with your local law.
      </p>
    ),
  },
  {
    id: "misc",
    title: "General",
    body: (
      <>
        <Bullets
          items={[
            "If any part of these terms is found unenforceable, the rest continues to apply.",
            "Not enforcing a term on one occasion does not waive it.",
            "You may not transfer your rights under these terms. We may transfer ours as part of a reorganisation or sale of the business.",
            "These terms, together with the privacy policy, are the whole agreement between us about the use of this website.",
          ]}
        />
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>
          Questions about these terms go to{" "}
          <a className={linkCls} href={`mailto:${EMAIL_ADDRESS}`}>
            {EMAIL_ADDRESS}
          </a>
          . Our postal address is available on request. You can also call:
        </p>
        <ul className="flex flex-wrap gap-2">
          {PHONE_NUMBERS.map((p) => (
            <li key={p.raw}>
              <a
                href={p.tel}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 font-mono text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {p.formatted}
              </a>
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

function TermsPage() {
  return (
    <main className="pt-24">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 sm:py-20 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">Legal</p>
        <h1 className="mt-3 text-3xl leading-[1.1] font-semibold text-balance text-foreground sm:text-4xl">
          Terms of service
        </h1>
        <p className="mt-3 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
          Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time>
        </p>
        <p className="mt-6 text-base text-muted-foreground">
          These terms apply when you use this website. They are short because the site is simple:
          nothing is sold here and there is nothing to sign up for.
        </p>

        <section
          aria-labelledby="short-version"
          className="mt-8 rounded-xl border border-border bg-surface p-5 sm:p-6"
        >
          <h2
            id="short-version"
            className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase"
          >
            The short version
          </h2>
          <div className="mt-4 text-sm text-muted-foreground sm:text-base">
            <Bullets
              items={[
                "The content here is marketing material, not advice and not an offer.",
                "Figures from past projects are evidence of what we have done, not a promise of your result.",
                "Sending an enquiry does not book anything. Work starts only under a signed agreement.",
                "Do not scrape, probe or spam the site. Otherwise, read and link freely.",
                "Indian law governs, and the courts of India decide any dispute.",
              ]}
            />
          </div>
        </section>

        <nav
          aria-label="On this page"
          className="mt-8 rounded-xl border border-border bg-surface p-5"
        >
          <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Contents
          </h2>
          <ol className="mt-2 grid gap-x-6 sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex min-h-11 items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="font-mono text-[11px] text-primary">{sectionIndex(i)}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="flex items-baseline gap-3 text-xl font-semibold text-balance text-foreground sm:text-2xl">
                <span className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                  {sectionIndex(i)}
                </span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-sm">
          <Link
            to="/privacy"
            className="inline-flex min-h-11 items-center text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Privacy policy
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}

function sectionIndex(i: number) {
  return String(i + 1).padStart(2, "0");
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
