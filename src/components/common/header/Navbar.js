import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";
import BrandLogo from "./BrandLogo";
// import ThemeToggle from "@/components/common/theme/ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: Routes.home.urlPath },
  { label: "About", href: Routes.about.urlPath },
  { label: "Products", href: Routes.products.urlPath },
  { label: "Industries", href: Routes.industries.urlPath },
  { label: "Smart Tools", href: Routes.smartTools.urlPath },
  { label: "Knowledge", href: Routes.knowledge.urlPath },
  { label: "Contact", href: Routes.contact.urlPath },
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

  // Keep the navbar permanently visible at the top while scrolling either way.
  // `position: sticky` is unreliable here because `body { overflow-x: hidden }`
  // (global.css) breaks it — so we pin the bar with `fixed` once a sentinel
  // placed at its natural position scrolls out of view, and reserve its height
  // with a spacer so the page content never jumps.
  const sentinelRef = useRef(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* sentinel sits where the navbar naturally starts (below the TopBar) */}
      <div ref={sentinelRef} aria-hidden className="h-0" />
      {/* spacer fills the navbar's slot once it becomes fixed */}
      {pinned && <div aria-hidden className="h-16" />}

      <header
        className={`z-50 transition-all duration-300 ease-out ${pinned
            ? "fixed left-1/2 top-3 h-14 w-[min(95%,80rem)] -translate-x-1/2 rounded-xl border border-theme bg-card/90 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-md"
            : "relative h-16 w-full translate-x-0 rounded-none border-b border-theme bg-card shadow-none"
          }`}
      >
        <nav className="container flex h-full items-center justify-between">
          <BrandLogo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = mounted && router.asPath === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`relative block font-heading text-[13px]! font-semibold uppercase tracking-wide transition-colors ${isActive ? "text-accent" : "text-primary hover:text-accent"
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

          <div className="flex items-center gap-2 sm:gap-4">
            <motion.div whileTap={{ scale: 0.95 }} className="hidden sm:inline-flex">
              <Link href={Routes.contact.urlPath} className="btn-primary btn-sm">
                Get Quote
              </Link>
            </motion.div>
            {/* <ThemeToggle /> */}

            {/* Hamburger — mobile/tablet only */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg text-primary transition-colors hover:text-accent lg:hidden"
            >
              {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/30 lg:hidden"
              />
              {/* panel */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-x-0 top-full z-50 border-b border-theme bg-card shadow-card lg:hidden"
              >
                <ul className="container flex flex-col py-3">
                  {NAV_LINKS.map((link) => {
                    const isActive = mounted && router.asPath === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block border-b border-theme/60 py-3 font-heading text-sm font-semibold uppercase tracking-wide transition-colors last:border-0 ${isActive ? "text-accent" : "text-primary hover:text-accent"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="pt-3">
                    <Link
                      href={Routes.contact.urlPath}
                      onClick={() => setMenuOpen(false)}
                      className="btn-primary btn-block"
                    >
                      Get Quote
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
