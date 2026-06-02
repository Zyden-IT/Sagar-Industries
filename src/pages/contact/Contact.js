import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import ContactInformation from "@/components/pages/contact/ContactInformation";
import InquiryForm from "@/components/pages/contact/InquiryForm";
import InteractiveMap from "@/components/pages/contact/InteractiveMap";
import FactoryVisitBooking from "@/components/pages/contact/FactoryVisitBooking";
import ContactPageCTA from "@/components/pages/contact/ContactPageCTA";

function Contact() {
  return (
    <>
      <PageSEO page="contact" />
      <Breadcrumb
        title="Contact Us"
        trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <ContactInformation />
      <InquiryForm />
      <InteractiveMap />
      <FactoryVisitBooking />
      <ContactPageCTA />
    </>
  );
}

export default Contact;
