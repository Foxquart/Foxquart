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
  /** Name shown in the browser mockup's address bar. Falls back to `category`. */
  demoLabel?: string;
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
    id: "ember-oak",
    category: "Fine Dining Restaurant",
    businessName: "Ember & Oak",
    problem: "Needed a high-end digital presence and automated reservation experience for 3-Michelin-starred dining.",
    impactHighlight: "Fully booked 3 months in advance with seamless online reservations.",
    features: ["Tasting Menu", "Online Reservations", "Sommelier Pairings", "Sanctuary Experience"],
    timeline: "4 weeks",
    image: "/images/ember_oak.png",
    liveLink: "https://emberanoak.netlify.app/",
    demoLabel: "Ember & Oak",
    isDarkTheme: true,
    testimonial: {
      text: "Foxquart captured the essence of our culinary sanctuary. The digital reservation portal handles high-demand table bookings flawlessly.",
      author: "Chef Henrik Lindqvist",
      role: "Executive Chef & Founder",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "google",
      date: "1 week ago",
    },
  },
  {
    id: "tattoo-shop",
    category: "Tattoo Studio",
    businessName: "Good Luck Tattoo Studio",
    problem: "Relied on Instagram DMs for bookings. No-shows were common, and scheduling was chaotic.",
    impactHighlight: "Online bookings increased by 310% with deposit-secured scheduling.",
    features: ["Artist Calendars", "Online Booking", "Deposit Payments", "Aftercare Guides"],
    timeline: "3 weeks",
    image: "/images/tattoo_studio.png",
    liveLink: "https://goodlucktattooshop.netlify.app/",
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
    id: "school-management",
    category: "School Management System",
    businessName: "Vidya Bharati International School",
    problem: "Managing student records, attendance, and parent communication via paper registers was error-prone and chaotic.",
    impactHighlight: "Eliminated paper registers & reduced admin workload by 75% across 4 dedicated portals.",
    features: ["Parent & Teacher Portals", "Attendance Tracking", "Fee Receipt Engine", "Student Analytics"],
    timeline: "4 weeks",
    image: "/images/school_management.png",
    liveLink: "https://gilded-nougat-63e5af.netlify.app/",
    demoLabel: "Vidya Bharati SMS",
    testimonial: {
      text: "Replacing paper registers and scattered WhatsApp groups with VBIS transformed our entire school administration. Parents, teachers, and staff love the portals.",
      author: "Rajesh Sharma",
      role: "Principal & Administrator",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "google",
      date: "Recent deployment",
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
    image: "/images/clinic_portfolio.png",
    liveLink: "https://clinic-portfolio-template.vercel.app/",
    demoLabel: "Clinic Portfolio",
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
];

/** Address-bar label: the demo's product name, not its URL. */
function displayLabel(project: ProjectCard) {
  return project.demoLabel ?? project.category;
}

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
          {projects.map((project, i) => {
            const rotationClass = i % 2 === 0 ? "rotate-1" : "-rotate-1";
            
            return (
              <Reveal key={project.id} delay={i * 0.1}>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1.5"
                >
                  
                  {/* 1. Browser Mockup (Proof of Work) */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.12)]">
                    {/* Browser top bar */}
                    <div className="flex items-center justify-between border-b border-gray-100 bg-[#F4F4F5] px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="size-2.5 rounded-full bg-[#EF4444]/80" />
                        <div className="size-2.5 rounded-full bg-[#F59E0B]/80" />
                        <div className="size-2.5 rounded-full bg-[#10B981]/80" />
                      </div>
                      <div className="flex h-5 w-48 items-center justify-center rounded-md bg-white px-2 text-[10px] font-medium text-gray-400 select-none border border-gray-100 transition-colors group-hover:text-primary group-hover:border-primary/20">
                        <Globe className="mr-1 size-2.5 shrink-0 transition-colors group-hover:text-primary" />
                        <span className="truncate">{displayLabel(project)}</span>
                      </div>
                      <div className="size-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowUpRight className="size-3.5 text-primary" />
                      </div>
                    </div>

                    {/* Browser page content */}
                    <div className="relative h-64 w-full overflow-hidden bg-gray-50 md:h-72">
                      {project.liveLink !== "#" ? (
                        <>
                          {/* Live preview: the real site, rendered at 2x the card width and
                              scaled down, so it never goes stale as the demo changes. */}
                          <img
                            src={project.image}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 h-full w-full object-cover object-top"
                          />
                          <iframe
                            src={project.liveLink}
                            title={`${project.businessName} live site preview`}
                            loading="lazy"
                            tabIndex={-1}
                            scrolling="no"
                            sandbox="allow-scripts allow-same-origin"
                            className="pointer-events-none absolute top-0 left-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 transition-transform duration-700 group-hover:scale-[0.51]"
                          />
                        </>
                      ) : (
                        <img
                          src={project.image}
                          alt={`${project.businessName} website preview`}
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                        />
                      )}

                      {/* Dark gradient overlay for Unsplash photo fallbacks to look more like web designs */}
                      {project.liveLink === "#" && !project.isDarkTheme && project.image.startsWith("http") && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
                          <div className="rounded-lg bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold text-gray-800 shadow-sm">
                            Client Website Concept
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Pasted-Style Testimonial Card */}
                  <div className={`relative z-10 -mt-20 ml-6 mr-6 ${rotationClass} transform rounded-xl border border-gray-100 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.06),0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:rotate-0 group-hover:scale-[1.03] group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.06)] md:ml-12 md:mr-4`}>
                    {/* Subtle tape effect at the top */}
                    <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-[#FFFDE7]/85 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-yellow-100/50 backdrop-blur-[0.5px] transition-transform group-hover:-translate-y-0.5 group-hover:rotate-1" />
                    
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
                      
                      <div className="flex items-center gap-2 text-[9px] font-semibold text-gray-400">
                        <span>Project: {project.timeline}</span>
                        {project.liveLink !== "#" && (
                          <span className="text-primary font-bold group-hover:underline flex items-center gap-0.5">
                            Visit Live <ArrowUpRight className="size-2.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


