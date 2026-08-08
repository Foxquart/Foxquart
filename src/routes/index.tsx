import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import { WhatWeDo } from "@/components/site/what-we-do";
import { FeaturedWork } from "@/components/site/featured-work";
import { BookingCta } from "@/components/site/booking-cta";

const title = "foxquart — Custom Websites, Apps & Automation For Your Business";
const description =
  "We build stunning websites, mobile apps, and smart automation that help businesses attract more customers and grow online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero */}
      <Hero />

      {/* 2. What We Do (Services — simplified) */}
      <WhatWeDo />

      {/* 3. Featured Work / Testimonials (Tattoo Shop, Banquet Hall, Doctor Clinic, Coffee Shop) */}
      <FeaturedWork />

      {/* 4. Book a Consultation / Enquire */}
      <BookingCta />
    </main>
  );
}
