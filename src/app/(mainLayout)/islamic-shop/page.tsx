import BestSellingProducts from "@/src/components/Islamic-shop/BestSellingProducts";
import CategorySection from "@/src/components/Islamic-shop/CategorySection";
import ShopHeroSlider from "@/src/components/Islamic-shop/Slider";
import React from "react";

const page = () => {
  return (
    <div className="bg-white">
      <ShopHeroSlider />
      <CategorySection />
      <BestSellingProducts />
    </div>
  );
};

export default page;
