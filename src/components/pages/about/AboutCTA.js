// About › CTA — Home-style band, trust / partner copy.
import CtaBand from "@/components/common/sections/CtaBand";
import { Routes } from "@/navigation/NavigationLib";

const AboutCTA = () => (
  <CtaBand
    heading="Partner with a Trusted Machine Manufacturer & Exporter"
    subtitle="From in-house design to on-time dispatch, let's build the right paper cutting or flexo printing machine for you."
    primary={{ label: "Request a Quote", href: Routes.contact.urlPath }}
    secondary={{ label: "Book Factory Visit", href: `${Routes.contact.urlPath}#inquiry` }}
    trust={["20+ Years Experience", "Custom Machine Solutions", "After-Sales Support"]}
  />
);

export default AboutCTA;
