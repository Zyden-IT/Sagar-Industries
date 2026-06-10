import Image from "next/image";
import SpecCard from "./SpecCard";
import {
  Ruler,
  Lightning,
  Palette,
  Gear,
  SealCheck,
} from "@phosphor-icons/react";

const SPECS = [
  {
    icon: Ruler,
    label: "Cutting Length",
    value: "Up to 9300 mm",
    pos: "top-6 left-0 xl:left-2",
  },
  {
    icon: Lightning,
    label: "Power Range",
    value: "3 HP – 5 HP",
    pos: "top-6 right-0 xl:right-2",
  },
  {
    icon: Palette,
    label: "Flexo Printing",
    value: "Up to 4 Colours",
    pos: "bottom-8 left-0 xl:left-2",
  },
  {
    icon: Gear,
    label: "Custom Sizes",
    value: "Built to spec",
    pos: "bottom-3 right-0 xl:right-2",
  },
];

const Right = () => {
  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col lg:col-span-7 lg:block lg:flex-none xl:col-span-6">
      {/* glow + concentric ring backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(245,132,42,0.20),transparent_68%)] blur-2xl" />
        <div className="absolute inset-0 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-accent/25" />
        <div className="absolute inset-[12%] rounded-full border border-accent/10" />
      </div>

      <div className="relative mx-auto min-h-[200px] w-full max-w-[1300px] flex-1 origin-center scale-100 lg:aspect-[5/4] lg:min-h-0 lg:flex-none lg:scale-105 xl:scale-130">
        <Image
          src="/hero10.png"
          alt="Paper roll to sheet cutting and flexo printing machine"
          fill
          priority
          className="object-contain drop-shadow-2xl"
        />
      </div>

      {/* {SPECS.map((s) => (
        <SpecCard key={s.label} {...s} />
      ))} */}
    </div>
  );
};

export default Right;
