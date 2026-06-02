// Industries › CTA — Home-style band, sector copy.
import CtaBand from "@/components/common/sections/CtaBand";
import { Routes } from "@/navigation/NavigationLib";

const IndustriesCTA = () => (
  <CtaBand
    heading="Don't See Your Industry?"
    subtitle="Tell us your material, roll width and daily output — we'll tailor the right machine to your line."
    primary={{ label: "Discuss Your Application", href: Routes.contact.urlPath }}
    secondary={{ label: "Explore Products", href: Routes.products.urlPath }}
    trust={["Application Engineering", "Custom Configurations", "Pan-India Service"]}
  />
);

export default IndustriesCTA;
