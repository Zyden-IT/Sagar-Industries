import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import TechnologyShowcase from "@/components/pages/smartTools/TechnologyShowcase";
import HowItWorks from "@/components/pages/smartTools/HowItWorks";
import MachineRecommender from "@/components/pages/smartTools/MachineRecommender";
import CalculatorHub from "@/components/pages/smartTools/CalculatorHub";
import RoiCost from "@/components/pages/smartTools/RoiCost";
import UnitConverter from "@/components/pages/smartTools/UnitConverter";
import SpecBuilder from "@/components/pages/smartTools/SpecBuilder";
import SmartToolsFaq from "@/components/pages/smartTools/SmartToolsFaq";
import ToolsCTA from "@/components/pages/smartTools/ToolsCTA";

function SmartTools() {
  return (
    <>
      <PageSEO page="smartTools" />
      <Breadcrumb
        title="Smart Tools"
        trail={[{ label: "Home", href: "/" }, { label: "Smart Tools" }]}
      />
      <TechnologyShowcase />
      <HowItWorks />
      {/* <MachineRecommender /> */}
      <CalculatorHub />
      <RoiCost />
      <UnitConverter />
      {/* <SpecBuilder /> */}
      <SmartToolsFaq />
      <ToolsCTA />
    </>
  );
}

export default SmartTools;
