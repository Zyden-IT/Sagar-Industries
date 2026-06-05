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
import ContactCTA from "@/components/pages/home/ContactCTA";

function About() {
  return (
    <>
      <PageSEO page="about" />
      <Breadcrumb
        title="About Us"
        description="Sagar Industries manufactures and exports precision paper roll-to-sheet cutting machines and flexo printing machines, engineered for the packaging, corrugated, and commercial printing industries."
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
      <ContactCTA />
    </>
  );
}

export default About;
