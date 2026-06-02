import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Hero from "@/components/pages/home/Hero";
import CompanyIntro from "@/components/pages/home/CompanyIntro";
import ProductCategories from "@/components/pages/home/ProductCategories";
import WhyChooseUs from "@/components/pages/home/WhyChooseUs";
import IndustriesServed from "@/components/pages/home/IndustriesServed";
import FacilityPreview from "@/components/pages/home/FacilityPreview";
import ContactCTA from "@/components/pages/home/ContactCTA";

function Home() {
  return (
    <>
      <PageSEO page="home" />
      <Hero />
      <CompanyIntro />
      <ProductCategories />
      <WhyChooseUs />
      <IndustriesServed />
      <FacilityPreview />
      <ContactCTA />
    </>
  );
}

export default Home;
