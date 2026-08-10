# Contact form backend

The contact form on `/contact` POSTs JSON to `POST /api/contact`
([src/routes/api.contact.ts](../src/routes/api.contact.ts)). The handler:

1. Rejects cross-site browser requests (403).
2. Validates the body against the shared zod schema
   ([src/lib/contact-schema.ts](../src/lib/contact-schema.ts)) — 400 with `fieldErrors`.
3. Silently drops honeypot submissions (bots see a fake success).
4. Rate-limits to 5 submissions per hashed IP per 10 minutes (429).
5. Inserts the enquiry into the `contact_submissions` table in Neon Postgres.
6. Emails a notification via Resend to `CONTACT_TO_EMAIL` (business@foxquart.com),
   with `Reply-To` set to the visitor — reply from the inbox and it reaches them.
   If the email fails the row is kept and marked `status = 'email_failed'`.

Server-only code lives in [src/server/](../src/server/) — the build fails if any
client code imports it, so secrets cannot leak into the bundle. Never prefix a
secret with `VITE_`.

## One-time setup

1. **Neon**: create a project at console.neon.tech → copy the **pooled**
   connection string → put it in `.env` as `DATABASE_URL` (see `.env.example`)
   → run `bun run db:migrate`.
2. **Resend**: create an account → **verify the foxquart.com domain** (add the
   SPF/DKIM DNS records Resend shows; until verified, Resend only delivers to
   the account owner's own address) → create an API key → `RESEND_API_KEY`.
3. **Vercel**: add `DATABASE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   `CONTACT_FROM_EMAIL` under Settings → Environment Variables for Production
   and Preview, then redeploy.

## Operations

- New enquiries: notification email, or `SELECT * FROM contact_submissions ORDER BY created_at DESC` in the Neon console.
- Rows with `status = 'email_failed'` were stored but their notification bounced — check `RESEND_API_KEY`/domain verification.
- Migrations are idempotent SQL files in [scripts/db/](../scripts/db/), applied in filename order by `bun run db:migrate`.
