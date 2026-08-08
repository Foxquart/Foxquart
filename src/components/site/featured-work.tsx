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
  /** Static preview. For projects with a live link this is only the poster shown while the embed loads. */
  image: string;
  liveLink: string;
  /** Name shown in the browser mockup's address bar. Falls back to `category`. */
  demoLabel?: string;
  /** Client review. Omitted for our own template demos, which show their feature set instead. */
  testimonial?: {
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

// Live demos first, concepts after.
const projects: ProjectCard[] = [
  {
    id: "tattoo-shop",
    category: "Tattoo Studio",
    businessName: "Good Luck Tattoo Studio",
    problem:
      "Relied on Instagram DMs for bookings. No-shows were common, and scheduling was chaotic.",
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
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "whatsapp",
      date: "Active client",
    },
  },
  {
    id: "doctor-clinic",
    category: "Doctor Clinic",
    businessName: "AuraCare Specialist Clinic",
    problem:
      "Patients couldn't book appointments online. The receptionist spent all day on phone calls.",
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
      avatar:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "email",
      date: "1 month ago",
    },
  },
  {
    id: "interior-design",
    category: "Interior Design Studio",
    businessName: "Halda Interior Architecture",
    problem:
      "Studios lose enquiries when the work sits in a PDF. This demo puts the portfolio, process and enquiry flow on one scroll.",
    impactHighlight: "Scroll-driven project walkthrough with a built-in enquiry flow.",
    features: ["Project Walkthrough", "Case Study Pages", "Studio Story", "Enquiry Form"],
    timeline: "3 weeks",
    image: "/images/interior_studio.png",
    liveLink: "https://interior-design-demo-three.vercel.app/",
    demoLabel: "Interior Studio",
  },
  {
    id: "banquet-hall",
    category: "Banquet Hall",
    businessName: "Aura Grand Palace",
    problem:
      "Managing dates and packages took hours of manual phone calls. No online venue availability.",
    impactHighlight: "Direct venue inquiries grew 4.5x with instant package quote calculators.",
    features: ["Interactive Calendar", "Quote Calculator", "Virtual Venue Tour", "Booking Form"],
    timeline: "5 weeks",
    image: "/images/banquet_hall.png",
    liveLink: "#",
    testimonial: {
      text: "We get direct inquiries and package bookings straight from the site now. Saved us so many phone calls and emails.",
      author: "Elena Rostova",
      role: "Operations Manager",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "google",
      date: "2 weeks ago",
    },
  },
  {
    id: "coffee-shop",
    category: "Premium Coffee Shop",
    businessName: "Krafted Bean Roasters",
    problem:
      "Long morning queues, no mobile pre-ordering, and no loyalty program to retain customers.",
    impactHighlight: "Order-ahead volume grew 240% and coffee subscriptions hit 1,200+.",
    features: ["Order Ahead", "Digital Menu", "Coffee Subscriptions", "Loyalty Rewards"],
    timeline: "3 weeks",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    liveLink: "#",
    testimonial: {
      text: "Morning lines are gone because everyone orders ahead on the web app. Subscription model has brought steady monthly revenue.",
      author: "Julian Vance",
      role: "Co-Founder",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      platform: "google",
      date: "3 days ago",
    },
  },
];

/** Address-bar label: the demo's product name, not its URL. */
function displayLabel(project: ProjectCard) {
  return project.demoLabel ?? project.category;
}

export function FeaturedWork() {
  const isOddCount = projects.length % 2 === 1;

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#FAFAFA] px-5 py-24 md:px-8 md:py-32"
    >
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Section Header - NO EYEBROW */}
        <Reveal className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl leading-[1.08] font-semibold text-[#1A1A1A] text-balance md:text-5xl tracking-tight">
            Projects that drive real results.
          </h2>
          <p className="max-w-xl text-base text-gray-500 md:text-lg">
            Every website is built with one goal — to help businesses attract more customers and
            save time.
          </p>
          <p className="text-xs font-medium text-gray-400">
            Cards marked <span className="text-emerald-600">Live demo</span> are the real site,
            running right here.
          </p>
        </Reveal>

        {/* Project Cards Grid */}
        <div className="mt-20 grid gap-x-10 gap-y-16 lg:grid-cols-2">
          {projects.map((project, i) => {
            const isLive = project.liveLink !== "#";
            const rotationClass = i % 2 === 0 ? "rotate-1" : "-rotate-1";
            // With an odd number of projects the last card would sit alone on the left;
            // centre it across both columns instead.
            const isLonelyLast = isOddCount && i === projects.length - 1;

            return (
              <Reveal
                key={project.id}
                delay={(i % 2) * 0.1}
                className={
                  isLonelyLast ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-1.25rem)]" : undefined
                }
              >
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Card label row */}
                  <div className="flex items-center justify-between gap-3 px-1">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-gray-400 uppercase">
                      {project.category}
                    </span>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Live demo
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-500">
                        Concept
                      </span>
                    )}
                  </div>

                  {/* 1. Browser Mockup (Proof of Work) */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.12)]">
                    {/* Browser top bar */}
                    <div className="flex items-center justify-between border-b border-gray-100 bg-[#F4F4F5] px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="size-2.5 rounded-full bg-[#EF4444]/80" />
                        <div className="size-2.5 rounded-full bg-[#F59E0B]/80" />
                        <div className="size-2.5 rounded-full bg-[#10B981]/80" />
                      </div>
                      <div className="flex h-5 w-48 items-center justify-center rounded-md border border-gray-100 bg-white px-2 text-[10px] font-medium text-gray-400 transition-colors select-none group-hover:border-primary/20 group-hover:text-primary">
                        <Globe className="mr-1 size-2.5 shrink-0 transition-colors group-hover:text-primary" />
                        <span className="truncate">{displayLabel(project)}</span>
                      </div>
                      <div className="size-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowUpRight className="size-3.5 text-primary" />
                      </div>
                    </div>

                    {/* Browser page content */}
                    <div className="relative h-72 w-full overflow-hidden bg-gray-50 md:h-80">
                      {isLive ? (
                        <>
                          {/* The real site, rendered at 2x the card width and scaled down, so the
                              preview never goes stale as the demo changes. Poster sits underneath
                              so the card paints instantly while the embed loads. */}
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
                    </div>
                  </div>

                  {/* 2. Pasted-Style Detail Card — a client review, or the feature set for our own demos */}
                  <div
                    className={`relative z-10 mx-4 -mt-14 ${rotationClass} transform rounded-xl border border-gray-100 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.06),0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:rotate-0 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.06)] md:mx-8`}
                  >
                    {/* Subtle tape effect at the top */}
                    <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 border border-yellow-100/50 bg-[#FFFDE7]/85 shadow-[0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-[0.5px] transition-transform group-hover:-translate-y-0.5 group-hover:rotate-1" />

                    {project.testimonial ? (
                      <>
                        {/* Testimonial Header depending on platform */}
                        <div className="mb-3.5 flex items-center justify-between border-b border-gray-50 pb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={project.testimonial.avatar}
                              alt={project.testimonial.author}
                              className="size-9 rounded-full border border-gray-100 object-cover"
                            />
                            <div>
                              <h4 className="text-xs leading-none font-bold text-gray-800">
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
                                {Array.from({ length: project.testimonial.rating }).map(
                                  (_, idx) => (
                                    <Star
                                      key={idx}
                                      className="size-2.5 fill-amber-400 text-amber-400"
                                    />
                                  ),
                                )}
                              </div>
                              <span className="font-mono text-[8px] font-bold text-gray-400">
                                5.0 on Google
                              </span>
                            </div>
                          )}
                          {project.testimonial.platform === "email" && (
                            <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-[9px] font-semibold text-blue-600">
                              Verified Email
                            </span>
                          )}
                        </div>

                        {/* Review Text */}
                        <p className="text-xs leading-relaxed font-medium text-gray-600 italic md:text-[13px]">
                          "{project.testimonial.text}"
                        </p>
                      </>
                    ) : (
                      <>
                        {/* Demo card: what the template actually ships with */}
                        <div className="mb-3.5 flex items-center justify-between border-b border-gray-50 pb-3">
                          <h4 className="text-xs font-bold text-gray-800">
                            {project.businessName}
                          </h4>
                          <span className="rounded bg-primary/5 px-2 py-0.5 font-mono text-[9px] font-semibold text-primary">
                            Foxquart Demo
                          </span>
                        </div>

                        <p className="text-xs leading-relaxed text-gray-600 md:text-[13px]">
                          {project.problem}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.features.map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

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
                        {isLive && (
                          <span className="flex items-center gap-0.5 font-bold text-primary group-hover:underline">
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
