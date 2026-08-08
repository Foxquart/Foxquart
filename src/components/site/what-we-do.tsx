import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Globe,
  Bot,
  BarChart3,
  Smartphone,
  Server,
  Palette,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./ui";

const whatWeDo = [
  {
    icon: Globe,
    title: "Websites & Web Apps",
    description:
      "Beautiful, fast websites and web applications that help your business get found online and convert visitors into customers.",
    examples: ["Business Websites", "Online Booking", "E-commerce Stores", "Landing Pages"],
  },
  {
    icon: Bot,
    title: "Automation & AI",
    description:
      "Save hours every week. We automate repetitive tasks like lead follow-ups, appointment reminders, invoicing, and customer support.",
    examples: ["WhatsApp Bots", "Email Automation", "Smart Reminders", "AI Assistants"],
  },
  {
    icon: Palette,
    title: "Branding & Design",
    description:
      "A professional, cohesive brand identity — from logos and color palettes to full UI/UX design — that makes your business stand out.",
    examples: ["Logo Design", "Brand Guidelines", "UI/UX Design", "Social Media Kits"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Custom mobile apps for your customers and field teams. Order ahead, book appointments, track deliveries — all from their phones.",
    examples: ["iOS & Android Apps", "Order Ahead", "Customer Loyalty", "Field Service"],
  },
  {
    icon: BarChart3,
    title: "Dashboards & Analytics",
    description:
      "See how your business is performing at a glance. We build clear dashboards that track sales, bookings, inventory, and more.",
    examples: ["Sales Tracking", "Inventory Reports", "Booking Analytics", "Revenue Dashboards"],
  },
  {
    icon: Server,
    title: "Hosting & Support",
    description:
      "We don't just build and disappear. Your site stays fast, secure, and running 24/7 with ongoing support and maintenance.",
    examples: ["Cloud Hosting", "SSL & Security", "Updates & Fixes", "Performance Tuning"],
  },
];

export function WhatWeDo() {
  return (
    <Section id="services">
      <SectionHeading
        title="Everything your business needs to grow online."
        intro="From a stunning website to smart automation — we handle the tech so you can focus on what you do best."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whatWeDo.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <div className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-white/70 p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
              {/* Icon */}
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <item.icon className="size-5" />
              </div>

              {/* Title & Description */}
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {/* Example Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
