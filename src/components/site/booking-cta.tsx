import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone, Mail } from "lucide-react";
import { Reveal, Section, Eyebrow } from "./ui";
import { GMAIL_COMPOSE_URL, PHONE_NUMBERS } from "@/lib/site-data";

export function BookingCta() {
  return (
    <Section id="contact" className="pb-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-surface-2/60 px-7 py-14 text-center md:px-16">
          {/* Decorative blur spots */}
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-chart-4/8 blur-[100px]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-balance md:text-4xl">
              Ready to take your business online?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Tell us about your business. We'll show you exactly how a custom
              website, app, or automation can help you get more customers and
              save time.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircle className="size-4" />
                Book a free consultation
              </Link>
              <a
                href={PHONE_NUMBERS[0].tel}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-surface"
              >
                <Phone className="size-4 text-primary" />
                Call us now
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-signal" />
                Free 30-min consultation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-signal" />
                No commitment required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-signal" />
                Response within 24 hours
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
