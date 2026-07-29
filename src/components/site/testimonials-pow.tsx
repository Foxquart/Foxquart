import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Star,
  Quote,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading } from "./ui";

export type TestimonialItem = {
  id: string;
  category: "Tattoo Shop" | "Banquet Hall" | "Doctor Clinic" | "Premium Coffee Shop";
  businessName: string;
  tagline: string;
  clientName: string;
  clientRole: string;
  avatar: string;
  rating: number;
  testimonial: string;
  impactMetrics: { label: string; value: string }[];
  featuresDelivered: string[];
  liveLink?: string; // User will provide actual links
  image: string;
  accentColor: string;
};

export const testimonialData: TestimonialItem[] = [
  {
    id: "tattoo-shop",
    category: "Tattoo Shop",
    businessName: "Obsidian Ink Studio",
    tagline: "Custom Artist Scheduling & Deposit Booking Engine",
    clientName: "Marcus Vance",
    clientRole: "Founder & Lead Artist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    testimonial:
      "Foxquart built our online booking engine from scratch. Clients can pick artists, select flash art, book consultations, and pay deposits seamlessly. No more double bookings or Instagram DM chaos!",
    impactMetrics: [
      { label: "Deposit Conversions", value: "+310%" },
      { label: "Admin Hours Saved", value: "25 hrs/wk" },
      { label: "No-Show Reduction", value: "92%" },
    ],
    featuresDelivered: [
      "Custom Artist Portfolio & Flash Art Gallery",
      "Automated Booking Deposit Payment Gateway",
      "Instant SMS & Email Consultation Reminders",
      "Digital Consent Form & Aftercare Guide",
    ],
    liveLink: "#", // Placeholder for user's link
    image: "/images/tattoo_studio_preview.png",
    accentColor: "from-amber-500/20 to-orange-600/10 border-amber-500/40 text-amber-400",
  },
  {
    id: "banquet-hall",
    category: "Banquet Hall",
    businessName: "Grand Vista Palace & Conventions",
    tagline: "Venue Booking Calendar & Event Estimator Platform",
    clientName: "Elena Rostova",
    clientRole: "Operations Director",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    testimonial:
      "Managing multi-hall wedding dates and catering packages used to take hours of manual phone calls. The website Foxquart delivered lets clients view live availability, calculate instant quotes, and schedule venue tours in seconds.",
    impactMetrics: [
      { label: "Direct Inquiries", value: "4.5x" },
      { label: "Quote Generation", value: "Instant" },
      { label: "Hall Occupancy", value: "94%" },
    ],
    featuresDelivered: [
      "Live Multi-Hall Availability Calendar",
      "Interactive Event Package & Catering Calculator",
      "Virtual 360 Venue Tour Scheduler",
      "Client Contract & Initial Token Payment Portal",
    ],
    liveLink: "#", // Placeholder for user's link
    image: "/images/banquet_hall_preview.png",
    accentColor: "from-emerald-500/20 to-teal-600/10 border-emerald-500/40 text-emerald-400",
  },
  {
    id: "doctor-clinic",
    category: "Doctor Clinic",
    businessName: "AuraCare Specialist Clinic",
    tagline: "Patient Portal & Automated Appointment System",
    clientName: "Dr. Aris Thorne",
    clientRole: "Chief Medical Officer",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    testimonial:
      "Patients now book slots without calling reception, view digital prescriptions, and receive WhatsApp automated visit reminders. It has completely transformed our clinic's patient experience.",
    impactMetrics: [
      { label: "Online Appointments", value: "85%" },
      { label: "Wait Time Cut", value: "-65%" },
      { label: "Patient Satisfaction", value: "4.9 / 5" },
    ],
    featuresDelivered: [
      "Real-time Doctor Slot Booking Engine",
      "WhatsApp & SMS Automated Appointment Reminders",
      "Secure Digital Prescription & Test Record Access",
      "Tele-consultation Video Link Integration",
    ],
    liveLink: "#", // Placeholder for user's link
    image: "/images/doctor_clinic_preview.png",
    accentColor: "from-cyan-500/20 to-blue-600/10 border-cyan-500/40 text-cyan-400",
  },
  {
    id: "coffee-shop",
    category: "Premium Coffee Shop",
    businessName: "Krafted Bean Artisanal Roasters",
    tagline: "Mobile Order Ahead & Coffee Subscription App",
    clientName: "Julian Vance",
    clientRole: "Co-Founder & Head Roaster",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    testimonial:
      "Foxquart built a sleek mobile web ordering platform with a recurring monthly coffee subscription pass. Our morning queue moves 3x faster, and repeat customer retention is at an all-time high!",
    impactMetrics: [
      { label: "Order Ahead Volume", value: "+240%" },
      { label: "Monthly Subscribers", value: "1,200+" },
      { label: "Average Basket Size", value: "+38%" },
    ],
    featuresDelivered: [
      "Mobile Skip-the-Line Order Ahead Portal",
      "Table QR Code Ordering & Digital Menu",
      "Monthly Coffee Bean Subscription Engine",
      "Integrated Customer Loyalty Rewards Club",
    ],
    liveLink: "#", // Placeholder for user's link
    image: "/images/coffee_shop_preview.png",
    accentColor: "from-yellow-500/20 to-amber-600/10 border-yellow-500/40 text-yellow-400",
  },
];

export function PremiumTestimonialsPOW() {
  const [activeId, setActiveId] = useState<string>(testimonialData[0].id);
  const activeItem = testimonialData.find((t) => t.id === activeId) || testimonialData[0];

  return (
    <Section id="testimonials-pow" className="py-24">
      <SectionHeading
        eyebrow="Proof of Work & Client Reviews"
        title="Designed for modern businesses. Proven in production."
        intro="Explore live platforms and custom websites engineered for local leaders, high-growth venues, clinics, and hospitality brands."
      />

      {/* Business Category Selector Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {testimonialData.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`group flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-mono font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg glow-ring scale-105"
                  : "glass text-foreground/80 hover:text-foreground hover:border-primary/50"
              }`}
            >
              <Sparkles className={`size-3.5 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
              <span>{item.category}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Premium Testimonial & Work Showcase Card */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <GlassPanel className="glass-strong overflow-hidden border-primary/40 p-6 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                {/* Left Side: Testimonial & Client Story */}
                <div className="flex flex-col justify-between space-y-6">
                  {/* Category & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/15 border border-primary/30 px-3.5 py-1 font-mono text-xs font-bold text-primary">
                      {activeItem.category} Case &amp; Review
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-signal">
                      <ShieldCheck className="size-4" /> Verified Client
                    </span>
                  </div>

                  {/* Business Name & Tagline */}
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      {activeItem.businessName}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-primary">{activeItem.tagline}</p>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative rounded-2xl border border-border bg-surface/60 p-5 md:p-6">
                    <Quote className="absolute right-4 top-4 size-8 text-primary/20" />
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: activeItem.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm md:text-base text-foreground/90 font-medium italic leading-relaxed">
                      "{activeItem.testimonial}"
                    </p>
                  </div>

                  {/* Client Avatar & Details */}
                  <div className="flex items-center justify-between border-t border-border/80 pt-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeItem.avatar}
                        alt={activeItem.clientName}
                        className="size-11 rounded-full object-cover border-2 border-primary/50"
                      />
                      <div>
                        <p className="font-display text-sm font-bold text-foreground">{activeItem.clientName}</p>
                        <p className="text-xs text-muted-foreground">{activeItem.clientRole} · {activeItem.businessName}</p>
                      </div>
                    </div>

                    {/* Live Link Button */}
                    <a
                      href={activeItem.liveLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      Visit Live Site <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Side: Impact Metrics & Features Delivered */}
                <div className="space-y-6 rounded-2xl border border-border/80 bg-surface/50 p-6 md:p-8">
                  <p className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
                    Measured Business Impact
                  </p>
                  
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {activeItem.impactMetrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-primary/30 bg-surface-2 p-3">
                        <p className="font-display text-2xl font-bold text-primary md:text-3xl">{metric.value}</p>
                        <p className="mt-1 text-[10px] font-semibold text-foreground/80">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Delivered Capabilities List */}
                  <div className="space-y-3 pt-2">
                    <p className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                      Engineered Features &amp; Integrations
                    </p>
                    <ul className="space-y-2.5">
                      {activeItem.featuresDelivered.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs md:text-sm text-foreground/90 font-medium">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-signal" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid Overview of All 4 Testimonials / POW Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonialData.map((item) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`text-left transition-all ${
                isSelected ? "scale-[1.02]" : "hover:scale-[1.01]"
              }`}
            >
              <GlassPanel
                className={`h-full p-5 flex flex-col justify-between border ${
                  isSelected ? "border-primary/80 glow-ring bg-surface-2/90" : "border-border/60 hover:border-primary/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-bold text-primary uppercase">
                      {item.category}
                    </span>
                    <div className="flex items-center text-amber-400">
                      <Star className="size-3 fill-amber-400" />
                      <span className="ml-1 font-mono text-[10px] font-bold text-foreground">5.0</span>
                    </div>
                  </div>
                  <h4 className="mt-3 font-display text-base font-bold text-foreground">{item.businessName}</h4>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground italic">"{item.testimonial}"</p>
                </div>

                <div className="mt-4 border-t border-border/60 pt-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-primary font-bold">View Case Details</span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </div>
              </GlassPanel>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
