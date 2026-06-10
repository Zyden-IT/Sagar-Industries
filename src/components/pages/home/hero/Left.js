import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const Left = () => {
  return (
    <div className="flex shrink-0 flex-col gap-1 sm:gap-5 lg:col-span-5 xl:col-span-6">
      {/* Eyebrow */}
      <span className="eyebrow tracking-[1.4px]! md:whitespace-nowrap !leading-[1.5]">Manufacturer &amp; Exporter of Paper Reel To Sheet Cutting Machine</span>

      {/* Headline — keyword-led, restrained scale */}
      <h1 className="max-w-[600px] my-2.5">
        Where Precision Meets <span className="text-accent">Production</span>
      </h1>

      {/* Description */}
      <p className="max-w-[640px] text-[15px] leading-[1.7] text-text-secondary sm:text-base lg:text-[17px]">
        Paper reel to sheet cutting machine Flexo printing machine - built for accuracy, speed and consistent output.
      </p>

      {/* CTAs */}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <Link href={Routes.products.urlPath} className="btn-orange btn mt-2.5">
          Explore Machines
          <ArrowRightIcon size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
};

export default Left;
