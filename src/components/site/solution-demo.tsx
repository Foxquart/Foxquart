import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/ui/picture";
import { Rise } from "./motion";

/*
 * A live reference build embedded on the solution page it belongs to. Slugs map
 * to demos only where the demo genuinely demonstrates that solution; every other
 * page gets a slim band linking to the full gallery instead of a stretched match.
 */

type Demo = {
  name: string;
  business: string;
  url: string;
  image: string;
  blurb: string;
};

const DEMOS = {
  spares: {
    name: "Spares Control Center",
    business: "Six Mile Motor Works",
    url: "https://inventory.foxquart.com/",
    image: "/images/spares_control.png",
    blurb:
      "A motor-works spares counter running its parts catalogue, stock levels and movements live on our own domain.",
  },
  school: {
    name: "Vidya Bharati SMS",
    business: "Vidya Bharati International School",
    url: "https://gilded-nougat-63e5af.netlify.app/",
    image: "/images/school_management.png",
    blurb: "Admissions, fees, attendance and four role-based portals over one student record.",
  },
  clinic: {
    name: "Clinic Portfolio",
    business: "AuraCare Specialist Clinic",
    url: "https://clinic-portfolio-template.vercel.app/",
    image: "/images/clinic_portfolio.png",
    blurb: "Doctor rosters and patient self-booking, so the front desk stops being the queue.",
  },
  dining: {
    name: "Ember & Oak",
    business: "Ember & Oak Fine Dining",
    url: "https://emberanoak.netlify.app/",
    image: "/images/ember_oak.png",
    blurb: "Reservations, tasting menu and table management for a fine-dining room.",
  },
} satisfies Record<string, Demo>;

/** Which live build demonstrates which solution page. Unmapped slugs get the gallery band. */
const SLUG_TO_DEMO: Record<string, keyof typeof DEMOS> = {
  "inventory-management-software": "spares",
  "warehouse-software": "spares",
  "manufacturing-erp": "spares",
  "erp-development": "school",
  "school-erp": "school",
  "healthcare-software": "clinic",
  "restaurant-software": "dining",
  "custom-software-development-services": "school",
};

export function SolutionDemo({ slug }: { slug: string }) {
  const demo = SLUG_TO_DEMO[slug] ? DEMOS[SLUG_TO_DEMO[slug]] : null;

  if (!demo) {
    return (
      <Rise className="mt-16">
        <Link
          to="/work"
          className="group press flex min-h-14 items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition-colors duration-[var(--dur-base)] hover:bg-surface-2"
        >
          <span className="text-sm text-muted-foreground">
            Want proof before a call?{" "}
            <span className="font-medium text-foreground">Every reference build runs live.</span>
          </span>
          <ArrowRight className="icon-nudge size-4 shrink-0 text-primary" aria-hidden="true" />
        </Link>
      </Rise>
    );
  }

  return (
    <Rise className="mt-16">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="grid lg:grid-cols-[1.3fr_1fr]">
          {/* Browser-framed poster; the whole block opens the live system. */}
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block border-b border-border lg:border-r lg:border-b-0"
            aria-label={`Open the ${demo.name} live demo`}
          >
            <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2.5">
              <span className="size-2 rounded-full bg-muted-foreground/40" aria-hidden="true" />
              <span className="size-2 rounded-full bg-muted-foreground/40" aria-hidden="true" />
              <span className="eyebrow-type ml-2 truncate text-muted-foreground">{demo.name}</span>
              <ArrowUpRight
                className="ml-auto size-4 text-primary opacity-0 transition-opacity duration-[var(--dur-micro)] group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>
            <Picture
              src={demo.image}
              alt={`${demo.name} — live demo preview`}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[2/1] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </a>

          <div className="flex flex-col justify-center gap-4 p-6 lg:p-8">
            <p className="eyebrow-type text-primary">Live demo — this exact solution</p>
            <h3 className="font-display text-2xl text-foreground md:text-3xl">{demo.business}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{demo.blurb}</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <a
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group press inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-[var(--dur-micro)] hover:bg-[var(--primary-hover)]"
              >
                Open it live <ArrowUpRight className="icon-nudge-up size-4" aria-hidden="true" />
              </a>
              <Link
                to="/work"
                className="press inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-surface-2 px-5 text-sm font-medium text-foreground transition-colors duration-[var(--dur-micro)] hover:border-[var(--border-strong)]"
              >
                All builds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Rise>
  );
}
