import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

// ── Industries ────────────────────────────────────────────────────────
import IndustriesIntro from "@/components/pages/industries/IndustriesIntro";
import IndustriesServed from "@/components/pages/industries/IndustriesServed";
import IndustryApplications from "@/components/pages/industries/IndustryApplications";
import IndustryCaseStudies from "@/components/pages/industries/IndustryCaseStudies";

// ── Smart Tools ───────────────────────────────────────────────────────
import TechnologyShowcase from "@/components/pages/smartTools/TechnologyShowcase";
import HowItWorks from "@/components/pages/smartTools/HowItWorks";
import CalculatorHub from "@/components/pages/smartTools/CalculatorHub";
import RoiCost from "@/components/pages/smartTools/RoiCost";
import UnitConverter from "@/components/pages/smartTools/UnitConverter";
import SmartToolsFaq from "@/components/pages/smartTools/SmartToolsFaq";

// ── Knowledge ─────────────────────────────────────────────────────────
import KnowledgeHub from "@/components/pages/knowledge/KnowledgeHub";
import FeaturedGuides from "@/components/pages/knowledge/FeaturedGuides";
import MaintenanceTips from "@/components/pages/knowledge/MaintenanceTips";
import IndustryGlossary from "@/components/pages/knowledge/IndustryGlossary";
import Downloads from "@/components/pages/knowledge/Downloads";
import KnowledgeFaq from "@/components/pages/knowledge/KnowledgeFaq";

// Single closing CTA for the whole page (the per-block CTAs from the old
// Industries / Smart Tools / Knowledge pages are intentionally consolidated).
import KnowledgeCTA from "@/components/pages/knowledge/KnowledgeCTA";

function Solutions() {
  return (
    <>
      <PageSEO page="solutions" />
      <Breadcrumb
        title="Solutions"
        trail={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />

      {/* ── Industries ─────────────────────────────────────────────── */}
      <IndustriesIntro />
      <IndustriesServed />
      <IndustryApplications />
      <IndustryCaseStudies />

      {/* ── Smart Tools ────────────────────────────────────────────── */}
      <TechnologyShowcase />
      <HowItWorks />
      {/* <MachineRecommender /> */}
      <CalculatorHub />
      <RoiCost />
      <UnitConverter />
      {/* <SpecBuilder /> */}
      <SmartToolsFaq />

      {/* ── Knowledge ──────────────────────────────────────────────── */}
      <KnowledgeHub />
      <FeaturedGuides />
      <MaintenanceTips />
      <IndustryGlossary />
      <Downloads />
      <KnowledgeFaq />

      {/* ── Closing CTA ────────────────────────────────────────────── */}
      <KnowledgeCTA />
    </>
  );
}

export default Solutions;
