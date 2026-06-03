import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const Left = () => {
  return (
    <div className="flex flex-col gap-5 lg:col-span-5 xl:col-span-6">
      {/* Eyebrow */}
      <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-xs">
        <span className="inline-block h-px w-8 bg-accent" />
        Manufacturer &amp; Exporter of Industrial Machinery
      </span>

      {/* Headline — restrained, balanced scale */}
      <h1 className="max-w-[560px] text-[24px]! font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[28px]! lg:text-[26px]! xl:text-[32px]!">
        <span className="block">Precision Machines For</span>
        <span className="block text-accent">Paper, Packaging &amp;</span>
        <span className="block">Printing Industries</span>
      </h1>

      {/* Description */}
      <p className="max-w-[480px] text-[15px] leading-[1.7] text-secondary sm:text-base lg:text-[17px]">
        Sagar Industries manufactures Paper Roll To Sheet Cutting Machines and
        Flexo Printing Machines — engineered for accuracy, efficiency and
        industrial-grade performance.
      </p>

      {/* CTAs */}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <Link href={Routes.products.urlPath} className="btn-orange btn-lg">
          Explore Machines
          <ArrowRight size={16} weight="bold" />
        </Link>
        <Link href={Routes.contact.urlPath} className="btn-outline btn-lg">
          Request Quotation
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
};

export default Left;
