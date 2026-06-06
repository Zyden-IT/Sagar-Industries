// ─────────────────────────────────────────────────────────────────────
// Footer — dark (near-black) 5-column footer with logo, link columns and
// a bottom bar. Theme orange accents. Text uses divs/spans + hover!
// so colours win over the unlayered global element styles.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, EnvelopeSimple, Clock } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: Routes.home.urlPath },
      { label: "About", href: Routes.about.urlPath },
      { label: "Products", href: Routes.products.urlPath },
      { label: "Solutions", href: Routes.solutions.urlPath },
      { label: "Contact", href: Routes.contact.urlPath },
    ],
  },
];

const CONTACTS = [
  {
    icon: Phone,
    label: "+91 99783 11122",
    href: "tel:+919978311122",
  },
  {
    icon: EnvelopeSimple,
    label: "sagarindustries310@gmail.com",
    href: "mailto:sagarindustries310@gmail.com",
  },
  {
    icon: MapPin,
    label:
      "301/2, V.K. Estate, Nr. Brahmani Foundry, Gota, Ahmedabad - 382481, Gujarat, India",
    href: "https://maps.app.goo.gl/WgjEM2jFssRzuDwY8",
    external: true,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-white/70">
      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-8">
          {/* Brand */}
          <div className="">
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
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="">
              <div className="text-base font-bold text-white">{col.title}</div>
              <span className="mt-2 block h-[3px] w-8 rounded-full bg-gradient-to-br from-primary to-secondary" />

              <ul className="mt-5 flex flex-col gap-3 text-white/55">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="!text-[16px] transition-colors hover:text-accent!"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact details */}
          <div className="">
            <div className="text-base font-bold text-white">Contact</div>
            <span className="mt-2 block h-[3px] w-8 rounded-full bg-gradient-to-br from-primary to-secondary" />

            <ul className="mt-5 flex flex-col gap-3 text-white/55">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-start gap-2.5 !text-[16px] transition-colors hover:text-accent!"
                    >
                      <c.icon
                        size={18}
                        weight="fill"
                        className="shrink-0 text-accent"
                      />
                      {c.label}
                    </a>
                  ) : (
                    <span className="inline-flex items-start gap-2.5 !text-[16px]">
                      <c.icon
                        size={18}
                        weight="fill"
                        className="shrink-0 text-accent"
                      />
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
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
