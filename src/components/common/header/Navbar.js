import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  List,
  X,
  ArrowUpRight,
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";
import BrandLogo from "./BrandLogo";
import ThemeToggle from "@/components/common/theme/ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: Routes.home.urlPath },
  { label: "About", href: Routes.about.urlPath },
  { label: "Products", href: Routes.products.urlPath },
  { label: "Solutions", href: Routes.solutions.urlPath },
  { label: "Contact", href: Routes.contact.urlPath },
];

const SOCIALS = [
  { icon: FacebookLogo, href: "#", label: "Facebook" },
  { icon: InstagramLogo, href: "#", label: "Instagram" },
  { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
];

const Navbar = () => {
  const router = useRouter();

  // Active state is resolved only after mount so the server-rendered HTML
  // (where router.asPath differs due to rewrites) matches the first client
  // render — avoids a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Mobile menu open state — close it whenever the route changes.
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [router.asPath]);

  // Lock background scroll while the full-height drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // The bar is a glass capsule that floats from the top at ALL times. Once you
  // leave the very top, `scrolled` frosts the glass a touch more for legibility.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* spacer reserves the fixed bar's height so content never hides under it */}
      <div aria-hidden className="h-16" />

      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out">
        {/* full-width glass bar — its edges run to the viewport, while the
            content below is constrained to the section `.container`. */}
        <nav
          className={`border-b transition-all duration-300 ${scrolled
            ? "border-border bg-card/90 backdrop-blur-xl py-[8px]"
            : "border-border/60 bg-card/45 backdrop-blur-md py-[10px]"
            }`}
        >
          <div className="container ">
            <div className="nav-inner relative flex items-center justify-between gap-3">
              <BrandLogo />

              {/* Desktop links */}
              <ul className="hidden items-center gap-6 lg:ml-auto lg:mr-4 lg:flex xl:gap-7">
                {NAV_LINKS.map((link) => {
                  const isActive = mounted && router.asPath === link.href;
                  return (
                    <li key={link.href} className="relative">
                      <Link
                        href={link.href}
                        className={`relative block font-heading text-[15px]! font-semibold uppercase tracking-wide transition-colors ${isActive ? "text-accent" : "text-text-primary hover:text-accent"
                          }`}
                      >
                        {/* tap squash on click */}
                        <motion.span
                          whileTap={{ scale: 0.88 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className="inline-block font-heading"
                        >
                          {link.label}
                        </motion.span>

                        {/* active underline — draws in from left to right */}
                        {isActive && (
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            style={{ originX: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-accent"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div whileTap={{ scale: 0.95 }} className="hidden sm:inline-flex">
                  <Link href={Routes.contact.urlPath} className="btn-orange btn">
                    Get Quote
                    <ArrowUpRight size={16} weight="bold" />
                  </Link>
                </motion.div>

                <ThemeToggle />

                {/* Hamburger — mobile/tablet only */}
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  className="grid h-10 w-10 cursor-pointer place-items-center overflow-hidden rounded-full border border-border bg-soft text-text-primary transition-all hover:border-accent hover:text-accent active:scale-95 lg:hidden"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.span
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <X size={22} weight="bold" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="open"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <List size={22} weight="bold" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu — full-screen editorial takeover with its own logo */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex h-[100dvh] w-full flex-col overflow-hidden bg-card lg:hidden"
          >
            {/* accent glow flourish */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 blur-3xl"
            />

            {/* top — its own logo + close */}
            <div className="container relative flex items-center justify-between py-4">
              <BrandLogo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-soft text-text-primary transition-all hover:border-accent hover:text-accent active:scale-95"
              >
                <X size={24} weight="bold" />
              </button>
            </div>

            {/* big links — vertically centred, oversized */}
            <nav className="container relative flex flex-1 flex-col justify-center gap-3">
              {NAV_LINKS.map((link, i) => {
                const isActive = mounted && router.asPath === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.07, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-4 py-2"
                    >
                      <span className="stats-font text-[13px] font-semibold text-accent">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-heading text-[24px] font-bold uppercase leading-none tracking-tight transition-colors duration-200 sm:text-[28px] ${isActive ? "text-accent" : "text-text-primary group-hover:text-accent"
                          }`}
                      >
                        {link.label}
                      </span>
                      <ArrowUpRight
                        size={26}
                        weight="bold"
                        className="ml-auto -translate-x-2 text-accent opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* footer — socials + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + NAV_LINKS.length * 0.07, duration: 0.4 }}
              className="container relative flex items-center justify-between gap-4 border-t border-border py-5"
            >
              <div className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-text-secondary transition-all hover:border-accent hover:text-accent"
                  >
                    <s.icon size={18} weight="fill" />
                  </a>
                ))}
              </div>
              <Link
                href={Routes.contact.urlPath}
                onClick={() => setMenuOpen(false)}
                className="btn-orange btn"
              >
                Get Quote
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
