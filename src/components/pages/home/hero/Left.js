import Link from "next/link";
import { ArrowRight, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const Left = () => {
  return (
    <div className="flex flex-col gap-5 lg:col-span-5 xl:col-span-6">
      {/* Eyebrow */}
      <span className="eyebrow">Manufacturer &amp; Exporter of Industrial Machinery</span>

      {/* Headline — keyword-led, restrained scale */}
      <h1 className="max-w-[560px]">
        <span className="block">Paper Cutting &amp;</span>
        <span className="block text-accent">Flexo Printing Machines</span>
      </h1>

      {/* Description */}
      <p className="max-w-[480px] text-[15px] leading-[1.7] text-text-secondary sm:text-base lg:text-[17px]">
        Sagar Industries manufactures and exports precision paper cutting and
        flexo printing machines built for accuracy and durability.
      </p>

      {/* CTAs */}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <Link href={Routes.products.urlPath} className="btn-orange btn">
          Explore Machines
          <ArrowRightIcon size={16} weight="bold" />
        </Link>
        <Link href={Routes.contact.urlPath} className="btn-outline btn">
          Request Quotation
          <ArrowUpRightIcon size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
};

export default Left;
