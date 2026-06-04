// ─────────────────────────────────────────────────────────────────────
// Theme toggle — circular sun/moon button for the navbar.
// Toggles the `dark` class on <html> (global.css swaps every theme token),
// and remembers the choice in localStorage. The no-flash script in
// _document.js applies the saved theme before first paint.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";

const ThemeToggle = ({ className = "" }) => {
  // Resolve actual state only after mount to avoid a hydration mismatch
  // (the server has no access to localStorage / the <html> class).
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage blocked — toggle still works for this session */
    }
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`btn relative grid h-10 w-10 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full border border-theme bg-soft transition-all duration-300 hover:scale-105 hover:border-accent ${className}`}
    >
      {/* Render the icon only after mount so SSR and first client render match.
         The icon is absolutely centred and cross-fades in place, so it never
         slides outside the circle when the theme switches. */}
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-0 grid place-items-center text-accent"
          >
            {isDark ? <Moon size={18} weight="fill" /> : <Sun size={18} weight="fill" />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
};

export default ThemeToggle;
