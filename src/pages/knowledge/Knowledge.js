import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import KnowledgeHub from "@/components/pages/knowledge/KnowledgeHub";
import FeaturedGuides from "@/components/pages/knowledge/FeaturedGuides";
import MaintenanceTips from "@/components/pages/knowledge/MaintenanceTips";
import IndustryGlossary from "@/components/pages/knowledge/IndustryGlossary";
import Downloads from "@/components/pages/knowledge/Downloads";
import KnowledgeFaq from "@/components/pages/knowledge/KnowledgeFaq";
import KnowledgeCTA from "@/components/pages/knowledge/KnowledgeCTA";

function Knowledge() {
  return (
    <>
      <PageSEO page="knowledge" />
      <Breadcrumb
        title="Knowledge"
        trail={[{ label: "Home", href: "/" }, { label: "Knowledge" }]}
      />
      <KnowledgeHub />
      <FeaturedGuides />
      <MaintenanceTips />
      <IndustryGlossary />
      <Downloads />
      <KnowledgeFaq />
      <KnowledgeCTA />
    </>
  );
}

export default Knowledge;
