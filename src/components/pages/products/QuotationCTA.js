// Products › CTA — Home-style band, quotation copy.
import { WhatsappLogo } from "@phosphor-icons/react";
import CtaBand from "@/components/common/sections/CtaBand";
import { Routes } from "@/navigation/NavigationLib";

const WA =
  "https://wa.me/919978311122?text=" +
  encodeURIComponent("Hi Sagar Industries, I'd like a quotation for a machine.");

const QuotationCTA = () => (
  <CtaBand
    heading="Request a Quotation"
    subtitle="Tell us your requirement and we'll recommend the right machine with detailed specifications and pricing."
    primary={{ label: "Get a Quote", href: Routes.contact.urlPath }}
    secondary={{ label: "WhatsApp Us", href: WA, external: true, icon: WhatsappLogo }}
    trust={["Custom Machine Solutions", "Fast Turnaround", "Best Price Guarantee"]}
  />
);

export default QuotationCTA;
