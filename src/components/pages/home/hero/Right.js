import Image from "next/image";
import SpecCard from "./SpecCard";
import {
  Ruler,
  Lightning,
  Palette,
  Gear,
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
    <div className="relative lg:col-span-7 xl:col-span-6">
      <div className="relative mx-auto aspect-[5/4] w-full max-w-[1000px]">
        <Image
          src="/hero.png"
          alt="Machine"
          fill
          priority
          className="object-contain"
        />
      </div>

      {SPECS.map((s) => (
        <SpecCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default Right;