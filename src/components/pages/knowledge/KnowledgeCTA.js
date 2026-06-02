// Knowledge › CTA — Home-style band, expert/resource copy.
import CtaBand from "@/components/common/sections/CtaBand";
import { Routes } from "@/navigation/NavigationLib";

const KnowledgeCTA = () => (
  <CtaBand
    heading="Didn't Find Your Answer?"
    subtitle="Our engineers can help with specs, materials, power and maintenance — just ask."
    primary={{ label: "Ask an Expert", href: Routes.contact.urlPath }}
    secondary={{ label: "Browse Machines", href: Routes.products.urlPath }}
    trust={["Free Expert Guidance", "Detailed Spec Sheets", "Fast Replies"]}
  />
);

export default KnowledgeCTA;
