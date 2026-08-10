import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HoverPreviewGroup, HoverPreviewLink } from "@/components/ui/hover-preview";
import { Rise } from "./motion";

/*
 * Editorial teaser for the live demos: a short passage in large type where the
 * demo names are hover-preview links (desktop) / plain links to the live sites
 * (touch). A few builds only — the full gallery lives in the work section this
 * anchors to. Every named business below is one of our own reference builds.
 */

const previews = {
  spares: {
    title: "Spares Control Center",
    subtitle: "Live inventory system at inventory.foxquart.com",
    image: "/images/spares_control-640.webp",
    imageWidth: 640,
    imageHeight: 298,
  },
  school: {
    title: "Vidya Bharati SMS",
    subtitle: "Admissions, fees, attendance and parent portal",
    image: "/images/school_management-640.webp",
    imageWidth: 640,
    imageHeight: 400,
  },
  clinic: {
    title: "Clinic Portfolio",
    subtitle: "Doctor rosters and patient self-booking",
    image: "/images/clinic_portfolio-640.webp",
    imageWidth: 640,
    imageHeight: 298,
  },
  dining: {
    title: "Ember & Oak",
    subtitle: "Reservations and tasting menu for fine dining",
    image: "/images/ember_oak-640.webp",
    imageWidth: 640,
    imageHeight: 400,
  },
};

export function DemoTeaser() {
  return (
    <section id="live-previews" className="relative px-4 py-32 sm:px-5 md:px-8 md:py-48">
      <HoverPreviewGroup items={previews} className="mx-auto w-full max-w-5xl">
        <Rise>
          <p className="eyebrow-type text-primary">Hover a name — it is the real system</p>
        </Rise>

        <Rise delay={0.08} className="mt-8 space-y-8">
          <p className="text-2xl leading-[1.55] font-normal tracking-tight text-muted-foreground sm:text-3xl md:text-4xl md:leading-[1.5]">
            A motor works runs its spares counter on{" "}
            <HoverPreviewLink k="spares" href="https://inventory.foxquart.com/">
              Spares Control Center
            </HoverPreviewLink>
            . A school runs admissions, fees and four portals on{" "}
            <HoverPreviewLink k="school" href="https://gilded-nougat-63e5af.netlify.app/">
              Vidya Bharati
            </HoverPreviewLink>
            .
          </p>
          <p className="text-2xl leading-[1.55] font-normal tracking-tight text-muted-foreground sm:text-3xl md:text-4xl md:leading-[1.5]">
            A clinic fills its rosters through{" "}
            <HoverPreviewLink k="clinic" href="https://clinic-portfolio-template.vercel.app/">
              patient self-booking
            </HoverPreviewLink>
            , and a dining room seats itself through{" "}
            <HoverPreviewLink k="dining" href="https://emberanoak.netlify.app/">
              Ember &amp; Oak
            </HoverPreviewLink>
            . Every one is live — open it, click around, break nothing.
          </p>
        </Rise>

        <Rise delay={0.16} className="mt-12">
          <Link
            to="/work"
            className="group press inline-flex min-h-12 items-center gap-2 font-display text-lg font-semibold text-primary transition-colors duration-[var(--dur-micro)] hover:text-foreground"
          >
            See every build, running live
            <ArrowRight className="icon-nudge size-4" aria-hidden="true" />
          </Link>
        </Rise>
      </HoverPreviewGroup>
    </section>
  );
}
