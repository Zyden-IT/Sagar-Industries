// Contact › CTA — Home-style band, direct-channel copy (call / WhatsApp).
import { Phone, WhatsappLogo } from "@phosphor-icons/react";
import CtaBand from "@/components/common/sections/CtaBand";

const WA =
  "https://wa.me/919978311122?text=" +
  encodeURIComponent("Hi Sagar Industries, I'd like to talk about a machine.");

const ContactPageCTA = () => (
  <CtaBand
    heading="We're a Call or Message Away"
    subtitle="Talk to our team for quick answers on machines, pricing and availability."
    primary={{ label: "Call +91 99783 11122", href: "tel:+919978311122", external: true, icon: Phone }}
    secondary={{ label: "WhatsApp Us", href: WA, external: true, icon: WhatsappLogo }}
    trust={["Replies Within 24 Hrs", "No-Obligation Quotes", "Expert Support"]}
  />
);

export default ContactPageCTA;
