// ─────────────────────────────────────────────────────────────────────
// Footer — dark (near-black) 5-column footer with logo, link columns and
// a bottom bar. Theme orange accents. Text uses divs/spans + hover!
// so colours win over the unlayered global element styles.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Sagar Industries", href: Routes.about.urlPath },
      { label: "Manufacturer & Exporter", href: Routes.about.urlPath },
      { label: "Quality Machines", href: Routes.products.urlPath },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Paper Roll To Sheet Cutting Machine", href: Routes.products.urlPath },
      { label: "Manual Machine", href: Routes.products.urlPath },
      { label: "Automatic Machine", href: Routes.products.urlPath },
      { label: "Flexo Printing Machine", href: Routes.products.urlPath },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: Routes.home.urlPath },
      { label: "About", href: Routes.about.urlPath },
      { label: "Solutions", href: Routes.solutions.urlPath },
      { label: "Contact", href: Routes.contact.urlPath },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Paper", href: Routes.solutions.urlPath },
      { label: "Packaging", href: Routes.solutions.urlPath },
      { label: "Printing", href: Routes.solutions.urlPath },
      { label: "Corrugated Board", href: Routes.solutions.urlPath },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-white/70">
      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href={Routes.home.urlPath} className="inline-block">
              <Image
                src="/SagarIndustries-logo.png"
                alt="Sagar Industries"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>

            <div className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Manufacturer &amp; Exporter of Paper Roll To Sheet Cutting Machines
              and Flexo Printing Machines.
            </div>

            <div className="mt-4 inline-flex items-center gap-2 font-semibold text-accent">
              <MapPin size={18} weight="fill" />
              Gota, Ahmedabad, Gujarat
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <div className="text-base font-bold text-white">{col.title}</div>
              <span className="mt-2 block h-[3px] w-8 rounded-full bg-orange-gradient" />

              <ul className="mt-5 flex flex-col gap-3 text-white/55">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors hover:text-accent!"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 text-center text-sm text-white/45">
          © {year}&nbsp;Sagar Industries. All rights reserved. · Manufacturer &amp;
          Exporter of Industrial Machines.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
