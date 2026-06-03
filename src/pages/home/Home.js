import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Hero from "@/components/pages/home/Hero";
import CompanyIntro from "@/components/pages/home/CompanyIntro";
import ProductShowcase from "@/components/pages/home/ProductShowcase";
import WhyChooseUs from "@/components/pages/home/WhyChooseUs";
import IndustriesServed from "@/components/pages/home/IndustriesServed";
import SmartToolsCalculator from "@/components/pages/home/SmartToolsCalculator";
import ManufacturingProcess from "@/components/pages/home/ManufacturingProcess";
import FacilityPreview from "@/components/pages/home/FacilityPreview";
import FaqPreview from "@/components/pages/home/FaqPreview";
import FactoryVisitCTA from "@/components/pages/home/FactoryVisitCTA";
import Testimonials from "@/components/pages/home/Testimonials";
import ContactCTA from "@/components/pages/home/ContactCTA";

function Home() {
  return (
    <>
      <PageSEO page="home" />
      <Hero />
      <CompanyIntro />
      <ProductShowcase />
      <WhyChooseUs />
      <IndustriesServed />
      {/* <SmartToolsCalculator /> */}
      <ManufacturingProcess />
      {/* <FacilityPreview /> */}
      {/* <FaqPreview /> */}
      <FactoryVisitCTA />
      <Testimonials />
      <ContactCTA />
    </>
  );
}

export default Home;
