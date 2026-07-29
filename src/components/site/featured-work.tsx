import { motion } from "motion/react";
import { ArrowUpRight, Check, Star, Globe } from "lucide-react";
import { Reveal } from "./ui";

type ProjectCard = {
  id: string;
  category: string;
  businessName: string;
  problem: string;
  impactHighlight: string;
  features: string[];
  timeline: string;
  image: string;
  liveLink: string;
  testimonial: {
    text: string;
    author: string;
    role: string;
    avatar: string;
    rating: number;
    platform: "google" | "whatsapp" | "email";
    date: string;
  };
  isDarkTheme?: boolean;
};

const projects: ProjectCard[] = [
  {
    id: "tattoo-shop",
    category: "Tattoo Studio",
    businessName: "The Obsidian Needle",
    problem: "Relied on Instagram DMs for bookings. No-shows were common, and scheduling was chaotic.",
    impactHighlight: "Online bookings increased by 310% with deposit-secured scheduling.",
    features: ["Artist Calendars", "Online Booking", "Deposit Payments", "Aftercare Guides"],
    timeline: "3 weeks",
    image: "/images/tattoo_studio.png",
    liveLink: "#",
    isDarkTheme: true,
    testimonial: {
      text: "DMs were a mess, now we just send clients to the link. Deposit system alone cut no-shows to zero. Best investment we made this year.",
      author: "Marcus Vance",
      role: "Lead Artist & Owner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "whatsapp",
      date: "Active client",
    },
  },
  {
    id: "banquet-hall",
    category: "Banquet Hall",
    businessName: "Aura Grand Palace",
    problem: "Managing dates and packages took hours of manual phone calls. No online venue availability.",
    impactHighlight: "Direct venue inquiries grew 4.5x with instant package quote calculators.",
    features: ["Interactive Calendar", "Quote Calculator", "Virtual Venue Tour", "Booking Form"],
    timeline: "5 weeks",
    image: "/images/banquet_hall.png",
    liveLink: "#",
    testimonial: {
      text: "We get direct inquiries and package bookings straight from the site now. Saved us so many phone calls and emails.",
      author: "Elena Rostova",
      role: "Operations Manager",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "google",
      date: "2 weeks ago",
    },
  },
  {
    id: "doctor-clinic",
    category: "Doctor Clinic",
    businessName: "AuraCare Specialist Clinic",
    problem: "Patients couldn't book appointments online. The receptionist spent all day on phone calls.",
    impactHighlight: "85% of bookings are now online. Reception call volume dropped by 60%.",
    features: ["Doctor Rosters", "Patient Booking", "WhatsApp Reminders", "Doctor Profiles"],
    timeline: "4 weeks",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80",
    liveLink: "#",
    testimonial: {
      text: "Patients love booking their own slots. WhatsApp reminders go out automatically. The staff's daily workload is cut in half.",
      author: "Dr. Aris Thorne",
      role: "Chief Medical Director",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "email",
      date: "1 month ago",
    },
  },
  {
    id: "coffee-shop",
    category: "Premium Coffee Shop",
    businessName: "Krafted Bean Roasters",
    problem: "Long morning queues, no mobile pre-ordering, and no loyalty program to retain customers.",
    impactHighlight: "Order-ahead volume grew 240% and coffee subscriptions hit 1,200+.",
    features: ["Order Ahead", "Digital Menu", "Coffee Subscriptions", "Loyalty Rewards"],
    timeline: "3 weeks",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    liveLink: "#",
    testimonial: {
      text: "Morning lines are gone because everyone orders ahead on the web app. Subscription model has brought steady monthly revenue.",
      author: "Julian Vance",
      role: "Co-Founder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "google",
      date: "3 days ago",
    },
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative overflow-hidden bg-[#FAFAFA] px-5 py-24 md:px-8 md:py-32">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="relative mx-auto w-full max-w-7xl">
        {/* Section Header - NO EYEBROW */}
        <Reveal className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl leading-[1.08] font-semibold text-[#1A1A1A] text-balance md:text-5xl tracking-tight">
            Projects that drive real results.
          </h2>
          <p className="max-w-xl text-base text-gray-500 md:text-lg">
            Every website is built with one goal — to help businesses attract
            more customers and save time.
          </p>
        </Reveal>

        {/* Project Cards Grid */}
        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <div className="flex flex-col gap-6">
                
                {/* 1. Browser Mockup (Proof of Work) */}
                <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)]">
                  {/* Browser top bar */}
                  <div className="flex items-center gap-1.5 border-b border-gray-100 bg-[#F4F4F5] px-4 py-3">
                    <div className="size-2.5 rounded-full bg-[#EF4444]/80" />
                    <div className="size-2.5 rounded-full bg-[#F59E0B]/80" />
                    <div className="size-2.5 rounded-full bg-[#10B981]/80" />
                    <div className="ml-4 flex h-5 w-44 items-center justify-center rounded-md bg-white px-2 font-mono text-[9px] text-gray-400 select-none">
                      <Globe className="mr-1 size-2.5" />
                      {project.id}.foxquart.com
                    </div>
                  </div>

                  {/* Browser page content */}
                  <div className="relative h-64 w-full overflow-hidden bg-gray-50 md:h-72">
                    <img
                      src={project.image}
                      alt={`${project.businessName} website preview`}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                    />
                    
                    {/* Dark gradient overlay for Unsplash photo fallbacks to look more like web designs */}
                    {!project.isDarkTheme && project.image.startsWith("http") && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
                        <div className="rounded-lg bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold text-gray-800 shadow-sm">
                          Client Website Concept
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Pasted-Style Testimonial Card */}
                <div className="relative z-10 -mt-20 ml-6 mr-6 rotate-1 transform rounded-xl border border-gray-100 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.06),0_5px_15px_rgba(0,0,0,0.04)] transition-transform hover:rotate-0 hover:scale-[1.01] duration-300 md:ml-12 md:mr-4">
                  {/* Subtle tape effect at the top */}
                  <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-[#FFFDE7]/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-yellow-100/50 backdrop-blur-[0.5px]" />
                  
                  {/* Testimonial Header depending on platform */}
                  <div className="mb-3.5 flex items-center justify-between border-b border-gray-50 pb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={project.testimonial.avatar}
                        alt={project.testimonial.author}
                        className="size-9 rounded-full object-cover border border-gray-100"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 leading-none">
                          {project.testimonial.author}
                        </h4>
                        <span className="text-[10px] text-gray-400">
                          {project.testimonial.role} · {project.businessName}
                        </span>
                      </div>
                    </div>

                    {/* Platform identifier */}
                    {project.testimonial.platform === "whatsapp" && (
                      <span className="rounded bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-600">
                        WhatsApp Message
                      </span>
                    )}
                    {project.testimonial.platform === "google" && (
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {Array.from({ length: project.testimonial.rating }).map((_, idx) => (
                            <Star key={idx} className="size-2.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="font-mono text-[8px] font-bold text-gray-400">5.0 on Google</span>
                      </div>
                    )}
                    {project.testimonial.platform === "email" && (
                      <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-[9px] font-semibold text-blue-600">
                        Verified Email
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs md:text-[13px] italic leading-relaxed text-gray-600 font-medium">
                    "{project.testimonial.text}"
                  </p>

                  {/* Impact & Details Footer */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="flex size-4.5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Check className="size-3" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">
                        {project.impactHighlight}
                      </span>
                    </div>
                    
                    <span className="text-[9px] font-semibold text-gray-400">
                      Project: {project.timeline}
                    </span>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
