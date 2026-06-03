import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import AboutIntro from "@/components/pages/about/AboutIntro";
import ImpactStats from "@/components/pages/about/ImpactStats";
import CompanyStory from "@/components/pages/about/CompanyStory";
import MissionVision from "@/components/pages/about/MissionVision";
import ManufacturingStrength from "@/components/pages/about/ManufacturingStrength";
import QualityProcess from "@/components/pages/about/QualityProcess";
import Infrastructure from "@/components/pages/about/Infrastructure";
import FactoryImages from "@/components/pages/about/FactoryImages";
import LeadershipTeam from "@/components/pages/about/LeadershipTeam";
import CustomerJourney from "@/components/pages/about/CustomerJourney";
import AboutCTA from "@/components/pages/about/AboutCTA";

function About() {
  return (
    <>
      <PageSEO page="about" />
      <Breadcrumb
        title="About Us"
        trail={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <AboutIntro />
      {/* <CompanyStory /> */}
      <MissionVision />
      <ImpactStats />
      <CustomerJourney />
      {/* <ManufacturingStrength /> */}
      <QualityProcess />
      {/* <Infrastructure /> */}
      {/* <FactoryImages /> */}
      {/* <LeadershipTeam /> */}
      <AboutCTA />
    </>
  );
}

export default About;
