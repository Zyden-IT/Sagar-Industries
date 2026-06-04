// ─────────────────────────────────────────────────────────────────────
// Home › Testimonials — client quotes in a responsive carousel.
// Shows 3 cards on lg / 2 on sm / 1 on mobile, with prev-next arrows and
// dots. Each card: quote mark, text, 5 stars, author + company. A stats bar
// (Happy Clients / Retention / Machines / Support) sits below.
// Avatars are initials (no client photos) — swap for real images if desired.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Quotes,
  Star,
  CaretLeft,
  CaretRight,
  UsersThree,
  ShieldCheck,
  SealCheck,
  Headset,
} from "@phosphor-icons/react";

const REVIEWS = [
  {
    quote:
      "Sagar Industries provided us with a machine that not only meets our production needs but also exceeds our expectations in terms of performance and build quality.",
    name: "Vikram Patel",
    role: "Production Head",
    company: "Shreeji Packaging",
  },
  {
    quote:
      "The team's commitment to quality and after-sales support is exceptional. We've seen significant improvement in our efficiency since installing their machines.",
    name: "Rahul Mehta",
    role: "Managing Director",
    company: "Mehta Extrusions",
  },
  {
    quote:
      "Reliable machines, timely delivery and excellent service – that's what makes Sagar Industries our preferred partner for over 5 years now.",
    name: "Jignesh Shah",
    role: "Plant Manager",
    company: "Polymax Industries",
  },
  {
    quote:
      "From enquiry to installation the entire process was smooth and professional. The machine has been running flawlessly for over two years.",
    name: "Anita Desai",
    role: "Operations Head",
    company: "Galaxy Print Pack",
  },
  {
    quote:
      "Excellent build quality and a support team that is always a call away. Highly recommended for anyone in the paper and packaging industry.",
    name: "Sandeep Verma",
    role: "Owner",
    company: "Verma Paper Products",
  },
  {
    quote:
      "Their machines boosted our output significantly. Great value for money and dependable day-in, day-out performance.",
    name: "Kiran Joshi",
    role: "Director",
    company: "Anand Packaging",
  },
];

const STATS = [
  { icon: UsersThree, value: "250+", title: "Happy Clients", sub: "Across India & Abroad" },
  { icon: ShieldCheck, value: "98%", title: "Client Retention", sub: "Through Trust & Support" },
  { icon: SealCheck, value: "500+", title: "Machines Delivered", sub: "With Proven Performance" },
  { icon: Headset, value: "24/7", title: "After-Sales Support", sub: "Always Here to Help" },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

const Card = ({ review }) => (
  <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-card p-7 shadow-card">
    <Quotes size={36} weight="fill" className="text-accent" />
    <p className="mt-4 flex-1 text-[15px]! leading-relaxed text-text-secondary">
      {review.quote}
    </p>
    <div className="mt-4 flex gap-1 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} weight="fill" />
      ))}
    </div>
    <div className="mt-5 flex items-center gap-4 border-t border-border pt-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
        {initials(review.name)}
      </span>
      <div>
        <h3 className="text-[14px]! font-bold! leading-tight">{review.name}</h3>
        <p className="text-[12px]! text-text-secondary">{review.role}</p>
        <p className="mt-0.5 text-[12px]! font-semibold text-accent">{review.company}</p>
      </div>
    </div>
  </article>
);

const Testimonials = () => {
  const total = REVIEWS.length;
  const [perView, setPerView] = useState(3);
  // Start in the MIDDLE of three copies so there's always a full set of cards
  // on either side — fast clicks / autoplay can never run into blank track.
  const [index, setIndex] = useState(total);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  // Three copies of the list: [ …copy A… | …copy B (active)… | …copy C… ].
  const slides = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  // Responsive cards-per-view.
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
      setAnimate(false);
      setIndex(total); // recentre when the layout changes
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [total]);

  const next = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };

  const prev = () => {
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  // After a slide settles, if we've drifted into the outer copies, snap back
  // by one list-length (no transition) so we stay centred — invisible to the eye.
  const handleTransitionEnd = (e) => {
    if (e.propertyName !== "transform") return;
    if (index >= 2 * total) {
      setAnimate(false);
      setIndex((i) => i - total);
    } else if (index < total) {
      setAnimate(false);
      setIndex((i) => i + total);
    }
  };

  // Autoplay — keeps the carousel moving continuously; pauses on hover.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [paused, perView]);

  const activeDot = (((index - total) % total) + total) % total;

  return (
    <section className="section-py bg-bg">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">
            Testimonials
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            What Our Clients Say
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Trusted by leading businesses across industries for quality machines
            and exceptional support.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative mt-12 px-2 sm:px-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-orange transition hover:scale-110 sm:h-11 sm:w-11"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-orange transition hover:scale-110 sm:h-11 sm:w-11"
          >
            <CaretRight size={20} weight="bold" />
          </button>

          {/* track */}
          <div className="overflow-hidden">
            <div
              className="flex"
              onTransitionEnd={handleTransitionEnd}
              style={{
                width: `${(slides.length / perView) * 100}%`,
                transform: `translateX(-${index * (100 / slides.length)}%)`,
                transition: animate ? "transform 0.6s ease" : "none",
              }}
            >
              {slides.map((r, i) => (
                <div
                  key={`${r.name}-${i}`}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / slides.length}%` }}
                >
                  <Card review={r} />
                </div>
              ))}
            </div>
          </div>

          {/* dots */}
          <div className="mt-7 flex justify-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setAnimate(true);
                  setIndex(total + i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${i === activeDot ? "w-6 bg-accent" : "w-2.5 bg-border hover:bg-accent"
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
