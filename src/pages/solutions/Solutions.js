import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

// ── Industries ────────────────────────────────────────────────────────
import IndustriesServed from "@/components/pages/industries/IndustriesServed";
import IndustryApplications from "@/components/pages/industries/IndustryApplications";

// ── Smart Tools ───────────────────────────────────────────────────────
import HowItWorks from "@/components/pages/smartTools/HowItWorks";
import CalculatorHub from "@/components/pages/smartTools/CalculatorHub";
import RoiCost from "@/components/pages/smartTools/RoiCost";

// ── Knowledge ─────────────────────────────────────────────────────────
import KnowledgeFaq from "@/components/pages/knowledge/KnowledgeFaq";

// Single closing CTA for the whole page (the per-block CTAs from the old
// Industries / Smart Tools / Knowledge pages are intentionally consolidated).
import ContactCTA from "@/components/pages/home/ContactCTA";

function Solutions() {
  return (
    <>
      <PageSEO page="solutions" />
      <Breadcrumb
        title="Solutions"
        description="Discover the industries we serve, plan your investment with our smart tools, and explore buying guides, FAQs, and resources — all in one place."
        trail={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />

      {/* ── Industries ─────────────────────────────────────────────── */}
      <IndustriesServed />
      <IndustryApplications />

      {/* ── Smart Tools ────────────────────────────────────────────── */}
      <HowItWorks />
      {/* <MachineRecommender /> */}
      <CalculatorHub />
      <RoiCost />

      {/* ── Knowledge ──────────────────────────────────────────────── */}
      <KnowledgeFaq />

      {/* ── Closing CTA ────────────────────────────────────────────── */}
      <ContactCTA />
    </>
  );
}

export default Solutions;
