import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import MachineCatalog from "@/components/pages/products/MachineCatalog";
import MachineComparison from "@/components/pages/products/MachineComparison";
import SelectionGuide from "@/components/pages/products/SelectionGuide";
import WhyChooseMachines from "@/components/pages/products/WhyChooseMachines";
import MachineRecommender from "@/components/pages/smartTools/MachineRecommender";
import SpecBuilder from "@/components/pages/smartTools/SpecBuilder";
import QuotationCTA from "@/components/pages/products/QuotationCTA";

function Products() {
  return (
    <>
      <PageSEO page="products" />
        <Breadcrumb
        title="Products"
        trail={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <MachineCatalog />
      <MachineRecommender />
      <MachineComparison />
      <SelectionGuide />
      <WhyChooseMachines />
      <SpecBuilder />
      <QuotationCTA />
    </>
  );
}

export default Products;
