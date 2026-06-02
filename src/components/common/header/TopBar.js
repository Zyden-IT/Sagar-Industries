// ─────────────────────────────────────────────────────────────────────
// Header › TopBar — slim utility bar above the navbar (desktop only).
// Left: phone + email (clickable). Right: working hours, an accent
// "Manufacturer & Exporter" tag, and social icons. Dark theme.
// ─────────────────────────────────────────────────────────────────────

import {
  Phone,
  EnvelopeSimple,
  Clock,
  SealCheck,
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

const SOCIALS = [
  { icon: FacebookLogo, href: "#", label: "Facebook" },
  { icon: InstagramLogo, href: "#", label: "Instagram" },
  { icon: YoutubeLogo, href: "#", label: "YouTube" },
  { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
];

const Divider = () => <span className="h-4 w-px bg-white/15" />;

const TopBar = () => {
  return (
    <div className="hidden bg-primary text-white md:block">
      <div className="container flex items-center justify-between py-2 text-[13px]">
        {/* Left — contact */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+919978311122"
            className="inline-flex items-center gap-2 text-[13px]! font-normal text-white/85! transition-colors hover:text-accent!"
          >
            <Phone className="h-4 w-4 shrink-0 text-accent" weight="fill" />
            +91 99783 11122
          </a>
          <Divider />
          <a
            href="mailto:sagarindustries310@gmail.com"
            className="inline-flex items-center gap-2 text-[13px]! font-normal text-white/85! transition-colors hover:text-accent!"
          >
            <EnvelopeSimple className="h-4 w-4 shrink-0 text-accent" weight="fill" />
            sagarindustries310@gmail.com
          </a>
        </div>

        {/* Right — hours, tag, socials */}
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-[13px] text-white/85 lg:inline-flex">
            <Clock className="h-4 w-4 shrink-0 text-accent" weight="fill" />
            Mon – Sat: 9:30 AM – 7:00 PM
          </span>
          <Divider />
          <span className="hidden items-center gap-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-accent xl:inline-flex">
            <SealCheck className="h-4 w-4 shrink-0" weight="fill" />
            Manufacturer &amp; Exporter
          </span>
          <Divider />
          <div className="flex items-center gap-1.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white! transition-colors duration-300 hover:bg-orange-gradient"
              >
                <s.icon className="h-[15px] w-[15px]" weight="fill" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
