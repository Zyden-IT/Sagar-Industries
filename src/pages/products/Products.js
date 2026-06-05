import React from "react";
import PageSEO from "@/components/common/metaData/PageSEO";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import ProductCategories from "@/components/pages/products/ProductCategories";
import MachineComparison from "@/components/pages/products/MachineComparison";
import SelectionGuide from "@/components/pages/products/SelectionGuide";
import SpecBuilder from "@/components/pages/smartTools/SpecBuilder";
import ContactCTA from "@/components/pages/home/ContactCTA";

function Products() {
  return (
    <>
      <PageSEO page="products" />
      <Breadcrumb
        title="Products"
        description="Explore our complete range of paper cutting and flexo printing machines — engineered for durability, precision, and consistent high-volume production."
        trail={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <ProductCategories />
      {/* <MachineCatalog /> */}
      {/* <MachineRecommender /> */}
      <MachineComparison />
      <SelectionGuide />
      {/* <WhyChooseMachines /> */}
      <SpecBuilder />
      <ContactCTA />
    </>
  );
}

export default Products;
