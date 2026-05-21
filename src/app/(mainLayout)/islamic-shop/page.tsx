import BestSellingProducts from "@/src/components/Islamic-shop/BestSellingProducts";
import CategorySection from "@/src/components/Islamic-shop/CategorySection";
import ShopPromoGrid from "@/src/components/Islamic-shop/ShopPromoGrid";
import ShopHeroSlider from "@/src/components/Islamic-shop/Slider";
import TrustBadges from "@/src/components/Islamic-shop/TrustBadges";
import React from "react";

const page = () => {
  return (
    <div className="bg-white">
      <ShopHeroSlider />
      <section id="all-products">
        <CategorySection />
      </section>
      <BestSellingProducts />
      <TrustBadges />
    </div>
  );
};

export default page;
