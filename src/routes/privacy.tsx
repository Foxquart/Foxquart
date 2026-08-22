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
 * DRAFT: NOT YET REVIEWED BY A LAWYER.
 *
 * Written to match what this site actually does (contact form stored in a Neon
 * Postgres database + notification email via Resend, no accounts, Vercel Analytics
 * + Speed Insights, iframe demo embeds). Before launch a qualified Indian
 * data-protection lawyer must review it, and these open items must be resolved:
 *
 *   1. Registered legal entity name and address. The page currently says the postal
 *      address is available on request; DPDP / GDPR contact-detail expectations may
 *      require it to be printed.
 *   2. Grievance Officer name and contact, required under the IT Rules and expected
 *      under the DPDP Act, 2023. Section 15 has a placeholder route (the shared inbox).
 *   3. Retention periods in section 08 (24 months for enquiries, 8 financial years for
 *      books of account) are drafted from Indian tax/company-law norms. Confirm.
 *   4. Vercel Analytics retention window depends on the plan; the wording is
 *      deliberately non-numeric. Confirm the plan and consider naming the number.
 *   5. Confirm whether a DPA is in place with Vercel, Google, Neon and Resend, and
 *      whether the SCC reliance described in section 09 is accurate for EEA/UK visitors.
 *   6. Decide whether embedded third-party demo frames require a consent banner for
 *      EEA/UK visitors (they can set their own storage before any consent is given).
 */

const LAST_UPDATED_ISO = "2026-08-11";
const LAST_UPDATED_LABEL = "11 August 2026";

const path = "/privacy";
const title = "Privacy Policy | Foxquart";
const description =
  "How Foxquart collects, stores and protects the details you send through this website, plus your rights over that data and who processes it. Written plainly.";

export const Route = createFileRoute("/privacy")({
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
          { name: "Privacy policy", path },
        ]),
      ]),
    ],
  }),
  component: PrivacyPage,
});

type LegalSection = { id: string; title: string; body: ReactNode };

// Declared before `sections`: the JSX below is evaluated at module load, so a const
// defined further down would be in its temporal dead zone.
const linkCls =
  "text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Who this policy covers",
    body: (
      <>
        <p>
          Foxquart is a product engineering studio based in India. We build operational software
          (clinic systems, school and warehouse platforms, automation) and this website is where we
          describe that work and take enquiries.
        </p>
        <p>
          This policy covers this website and the enquiries that reach us through it. It does not
          cover data we handle inside a client project; that is governed by the agreement signed for
          that project, and is described in section 13.
        </p>
      </>
    ),
  },
  {
    id: "contact-form",
    title: "What the contact form actually does",
    body: (
      <>
        <p>
          Nothing you type is transmitted while you type it. When you press send, the form submits
          what you entered to our own server, which does two things: it stores the enquiry in our
          database (hosted by Neon) so it cannot be lost, and it emails a copy to our enquiry
          mailbox (delivered by Resend) so we see it quickly. Both copies contain only what you put
          in the form.
        </p>
        <p>
          Alongside the fields you fill in, the server records the time of the submission, your
          browser&rsquo;s user-agent string, and a one-way hash of your IP address. The hash is used
          only to slow down abuse of the form (rate limiting); the IP address itself is not stored.
        </p>
      </>
    ),
  },
  {
    id: "you-give-us",
    title: "Information you give us",
    body: (
      <>
        <p>The enquiry we receive is built from the fields you fill in:</p>
        <Bullets
          items={[
            "Your name, and the email address you want a reply at.",
            "Optionally your company name and a phone number.",
            "The kind of work you are asking about, a timeline, and your preferred time of day for a call, together with the timezone your browser reports.",
            "Whatever you write in the message field, usually a description of the process or system you want fixed.",
          ]}
        />
        <p>
          You can also reach us without the form. If you email{" "}
          <a className={linkCls} href={`mailto:${EMAIL_ADDRESS}`}>
            {EMAIL_ADDRESS}
          </a>{" "}
          or call one of the numbers on the site, we hold that correspondence and any notes we make
          about the conversation.
        </p>
        <p>
          Please do not send us confidential material, patient data, credentials or production
          exports in a first enquiry. If a project needs that, we will put an NDA and a secure
          transfer route in place first.
        </p>
      </>
    ),
  },
  {
    id: "collected-automatically",
    title: "Information collected automatically",
    body: (
      <>
        <p>
          Three things measure or log traffic on this site. None of them shows us who you are, and
          none of them is an advertising tool.
        </p>
        <div className="grid gap-3">
          <DefRow term="Vercel Web Analytics">
            Records a page view when you open a page: the path, the referring site or search engine,
            coarse device information (browser, operating system, device type) and the country the
            request came from. Per Vercel&rsquo;s documentation it sets no cookies. Repeat visits
            within a day are counted using a hash derived from the incoming request and a salt that
            rotates every 24 hours, so the same person cannot be recognised from one day to the
            next.
          </DefRow>
          <DefRow term="Vercel Speed Insights">
            Measures how fast pages actually load on real devices: Core Web Vitals such as LCP, CLS,
            INP, FCP and TTFB, alongside the route, device type and connection quality. It sets no
            cookies and captures no page content or form input.
          </DefRow>
          <DefRow term="Hosting logs">
            Our host receives the information any web server receives in order to answer a request:
            IP address, user agent, the URL requested and a timestamp. These are used to deliver the
            site, to investigate errors and to deal with abuse. They are short-lived and we do not
            mine them.
          </DefRow>
        </div>
        <p>
          There is no login, no session recording, no heatmap tool, no advertising pixel and no
          cross-site tracking on this site.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: (
      <>
        <p>
          <strong className="font-medium text-foreground">
            This site sets no cookies of its own.
          </strong>{" "}
          There is no account, no cart and no preference to remember, and both analytics tools above
          are cookieless. Storage can still be created in your browser by content we load from other
          domains:
        </p>
        <Bullets
          items={[
            "Embedded demo sites. Our work section shows live demo websites inside frames so the preview never goes stale. Those sites run in your browser under their own domains and can set their own cookies or local storage, which we cannot see or control.",
            "Web fonts and imagery. Typefaces are loaded from Google Fonts and some photographs from Unsplash. Requesting a file from another domain sends that provider your IP address and browser details as part of the request.",
          ]}
        />
        <p>
          You can block or clear this storage in your browser settings, or block third-party frames
          entirely. Doing so may leave the demo previews blank but the rest of the site will work.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Who else is involved",
    body: (
      <>
        <p>We keep the list short on purpose. These are all of them:</p>
        <div className="grid gap-3">
          <DefRow term="Vercel">
            Hosts the site and provides Web Analytics and Speed Insights. It processes traffic data
            on our instructions.
          </DefRow>
          <DefRow term="Neon">
            Hosts the database where contact-form enquiries are stored, on our instructions.
          </DefRow>
          <DefRow term="Resend">
            Delivers the notification email that carries your enquiry from our server to our
            mailbox. It processes the message in order to deliver it.
          </DefRow>
          <DefRow term="Google">
            Our enquiry mailbox is a Google account, so emails that reach us are stored in
            Google&rsquo;s systems. Google also serves the web fonts this site uses.
          </DefRow>
          <DefRow term="Unsplash">Serves some of the photography used in the work section.</DefRow>
          <DefRow term="Demo hosts">
            The live demo sites embedded in the work section are hosted on Netlify and Vercel and
            are loaded directly by your browser.
          </DefRow>
        </div>
        <p>
          We do not sell personal data, we do not share it with advertising networks or data
          brokers, and we run no retargeting. We disclose information to authorities only where the
          law requires it.
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we use this information",
    body: (
      <>
        <Bullets
          items={[
            "To answer your enquiry and prepare a scope or proposal. For visitors in the EEA or UK, the basis is steps taken at your request before entering a contract; under India's Digital Personal Data Protection Act, 2023, it is the purpose for which you voluntarily provided the information.",
            "To understand which pages are useful and how quickly the site loads. The basis is our legitimate interest in running and improving our own website. The measurement is aggregate and does not identify you.",
            "To keep the site available and deal with abuse. The basis is our legitimate interest in the security of our systems.",
            "To keep records of engagements we take on. The basis is legal obligation under tax and company law, and our legitimate interest in being able to answer a dispute.",
          ]}
        />
        <p>
          We do not use enquiry details to build a marketing list. If you write to us once and we do
          not work together, we do not add you to a newsletter.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <>
        <Bullets
          items={[
            "Enquiries (the database record, the email copy and call notes): kept while the conversation is live and for 24 months after the last message, then deleted from both the database and the mailbox.",
            "If an engagement starts: correspondence and project records are kept for the life of the engagement, then for the period Indian tax and company law require of business records, currently eight financial years for books of account.",
            "Analytics: aggregate, non-identifying counts held by Vercel for the retention window of our plan. No profile of you is built or stored, and nothing there can be traced back to a person.",
            "Hosting logs: short-lived, kept by our host for its standard operational window.",
          ]}
        />
        <p>You can ask us to delete your enquiry earlier than any of this. See section 10.</p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "Where your information is processed",
    body: (
      <>
        <p>
          Foxquart operates from India. The site is served from Vercel&rsquo;s global edge network,
          so your request is usually handled by whichever server is closest to you, which may be
          outside India. Enquiries are stored with Neon and delivered by Resend, whose
          infrastructure may also be outside India. Our mailbox is hosted by Google.
        </p>
        <p>
          Where information about visitors in the EEA or the UK is processed outside those regions,
          we rely on the standard contractual clauses and transfer terms our providers publish for
          their services.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your rights, and how to use them",
    body: (
      <>
        <p>Whoever and wherever you are, you can ask us to:</p>
        <Bullets
          items={[
            "Tell you what we hold about you and why.",
            "Correct anything that is wrong.",
            "Delete it, including deleting an enquiry thread from our mailbox.",
            "Stop using it for a particular purpose.",
            "Send you a copy in a portable format.",
          ]}
        />
        <p>
          Write to{" "}
          <a className={linkCls} href={`mailto:${EMAIL_ADDRESS}`}>
            {EMAIL_ADDRESS}
          </a>{" "}
          from, or quoting, the email address you contacted us with, so we can be reasonably sure
          the request is yours. We respond within 30 days. There is no charge and we will not treat
          you differently for asking.
        </p>
        <p>
          If you are in India, the Digital Personal Data Protection Act, 2023 gives you rights of
          access, correction, erasure, grievance redressal and nomination, and the right to escalate
          to the Data Protection Board of India. If you are in the EEA or the UK, the GDPR and UK
          GDPR give you access, rectification, erasure, restriction, portability, the right to
          object to processing based on legitimate interests, and the right to complain to your data
          protection authority.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <>
        <p>
          Traffic to this site is encrypted in transit over HTTPS, and so is the connection between
          our server and the enquiry database. There are no visitor accounts; the only personal data
          the site stores is what you send through the contact form, and that database is not
          readable from the website itself; it is reachable only with credentials held by the people
          who answer enquiries. The mailbox that receives enquiries is protected with two-factor
          authentication.
        </p>
        <p>
          No system is completely secure. If a breach affects your information we will tell you and
          the relevant authority within the timeframes the law sets.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        This site is aimed at businesses and the people who run them. It is not directed at children
        and we do not knowingly collect information from them. If you believe a child has sent us
        personal information, write to us and we will delete it.
      </p>
    ),
  },
  {
    id: "client-data",
    title: "Data inside a client project",
    body: (
      <>
        <p>
          During an engagement we often process data belonging to a client&rsquo;s business: patient
          records, staff rosters, stock movements, customer lists. In that relationship the client
          decides what is collected and why; we act on their instructions under the agreement signed
          for that project, with access limited to the engineers working on it.
        </p>
        <p>
          If you are a customer, patient or employee of one of our clients, your rights sit with
          that organisation, not with us. Write to them, and they can instruct us.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        The date at the top of this page is the date of the current version. If a change materially
        affects how we handle enquiry data we will say so on this page, and tell active clients by
        email.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact and grievances",
    body: (
      <>
        <p>
          For any privacy question or request, or to raise a grievance about how we have handled
          your information, write to{" "}
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
        <p>
          If you are not satisfied with our answer, you may escalate to the Data Protection Board of
          India, or (if you are in the EEA or the UK) to your local supervisory authority.
        </p>
      </>
    ),
  },
];

function PrivacyPage() {
  return (
    <main className="pt-24">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 sm:py-20 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">Legal</p>
        <h1 className="mt-3 text-3xl leading-[1.1] font-semibold text-balance text-foreground sm:text-4xl">
          Privacy policy
        </h1>
        <p className="mt-3 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
          Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time>
        </p>
        <p className="mt-6 text-base text-muted-foreground">
          This explains what happens to information when you visit this site or send us an enquiry.
          It is written to match what the site actually does, not what a template says it might do.
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
                "There are no visitor accounts. The only thing the site stores about you is an enquiry you choose to send.",
                "The contact form sends your enquiry to us: it is saved in our database and emailed to our inbox, and we reply to the address you give.",
                "Two cookieless tools from Vercel measure page views and load speed. Neither builds a profile of you.",
                "The work section embeds live demo sites. Those run in your browser and can set their own storage.",
                "We do not sell personal data and there is no advertising network here.",
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
            to="/terms"
            className="inline-flex min-h-11 items-center text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Terms of service
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

function DefRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="font-mono text-[11px] tracking-[0.16em] text-foreground uppercase">{term}</p>
      <p className="mt-2">{children}</p>
    </div>
  );
}
