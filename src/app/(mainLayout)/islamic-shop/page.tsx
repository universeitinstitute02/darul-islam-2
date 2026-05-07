import BestSellingProducts from "@/src/components/Islamic-shop/BestSellingProducts";
import CategorySection from "@/src/components/Islamic-shop/CategorySection";
import ShopHeroSlider from "@/src/components/Islamic-shop/Slider";
import TrustBadges from "@/src/components/Islamic-shop/TrustBadges";
import React from "react";

const page = () => {
  return (
    <div className="bg-white">
      <ShopHeroSlider />
      <TrustBadges />
      <section id="all-products">
        <CategorySection />
      </section>
      <BestSellingProducts />
    </div>
  );
};

export default page;
