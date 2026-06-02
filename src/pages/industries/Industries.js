import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import IndustriesIntro from "@/components/pages/industries/IndustriesIntro";
import IndustriesServed from "@/components/pages/industries/IndustriesServed";
import IndustryApplications from "@/components/pages/industries/IndustryApplications";
import IndustryCaseStudies from "@/components/pages/industries/IndustryCaseStudies";
import IndustriesCTA from "@/components/pages/industries/IndustriesCTA";

function Industries() {
  return (
    <>
      <PageSEO page="industries" />
      <Breadcrumb
        title="Industries"
        trail={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <IndustriesIntro />
      <IndustriesServed />
      <IndustryApplications />
      <IndustryCaseStudies />
      <IndustriesCTA />
    </>
  );
}

export default Industries;
