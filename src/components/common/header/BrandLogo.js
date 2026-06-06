import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Logo swaps with the theme: the default orange/black mark on light
// backgrounds, and a light variant so the "INDUSTRIES" text stays legible
// on the dark navbar. Theme is read from the `dark` class on <html> (the
// same flag ThemeToggle sets) and kept in sync via a MutationObserver.
const LIGHT_THEME_LOGO = "/SagarIndustries-logo.webp";
const DARK_THEME_LOGO = "/SagarIndustries-dark.webp";

const BrandLogo = () => {
  // Resolve the theme only after mount to avoid a hydration mismatch
  // (the server can't read the <html> class).
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));

    sync();
    setMounted(true);

    // Keep the logo in sync when ThemeToggle flips the `dark` class.
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const src = mounted && isDark ? DARK_THEME_LOGO : LIGHT_THEME_LOGO;

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={src}
        alt="Sagar Industries"
        width={180}
        height={50}
        priority
        className="logo"
      />
    </Link>
  );
};

export default BrandLogo;
