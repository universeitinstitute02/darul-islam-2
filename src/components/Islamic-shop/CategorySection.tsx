"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Loader2, ArrowUpRight, BookOpen, Sparkles, Heart } from "lucide-react";
import ProductCard from "./ProductCard";

const ShopPromoGrid = ({
  onSelectCategory,
}: {
  onSelectCategory: (slug: string) => void;
}) => {
  const promos = [
    {
      id: 1,
      tag: "নতুন কালেকশন",
      title: "প্রিমিয়াম জায়নামাজ ও আতর",
      desc: "ইবাদতে প্রশান্তি নিশ্চিত করতে আমাদের বাছাইকৃত সেরা কালেকশন",
      icon: <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />,
      bgGradient: "from-emerald-50/80 via-white to-emerald-50/30",
      borderColor: "border-emerald-100/70",
      tagBg: "bg-emerald-100 text-emerald-800",
      targetSlug: "Prayer Mat", // জায়নামাজ ক্যাটাগরির স্লাগ
    },
    {
      id: 2,
      tag: "বিশেষ উপহার",
      title: "ইসলামিক বই ও কিতাব কম্বো",
      desc: "প্রিয়জনকে দ্বীনি জ্ঞান উপহার দিতে আমাদের বিশেষ প্যাকেজসমূহ",
      icon: <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />,
      bgGradient: "from-amber-50/60 via-white to-amber-50/20",
      borderColor: "border-amber-100/70",
      tagBg: "bg-amber-100 text-amber-800",
      targetSlug: "Islamic Books", // ইসলামিক বই ক্যাটাগরির স্লাগ
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 mb-8">
      <div className="relative bg-gradient-to-r from-[#105D38] to-[#0c462a] text-white p-4 md:p-6 rounded-[1.8rem] md:rounded-[2rem] shadow-sm overflow-hidden flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-5 pointer-events-none">
          <Heart className="w-48 h-48 md:w-64 md:h-64" />
        </div>

        <div className="space-y-0.5">
          <p className="text-[9px] md:text-[11px] font-black text-emerald-300 uppercase tracking-widest">
            আল-হাদিস / বাণী
          </p>
          <h3 className="text-xs md:text-base font-bold text-neutral-100 leading-relaxed max-w-3xl">
            "সত ও আমানতদার ব্যবসায়ী কিয়ামতের দিন নবী সিদ্দিক ও শহীদগণের সাথে
            থাকবেন।"
            <span className="text-[10px] md:text-xs text-emerald-200/80 font-medium block md:inline md:ml-2">
              — (তিরমিযী: ১২০৯)
            </span>
          </h3>
        </div>

        <div className="flex-shrink-0 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg md:rounded-xl border border-white/10 text-[10px] md:text-xs font-black tracking-wider text-emerald-100">
          ১০০% হালাল ও বিশ্বস্ত
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {promos.map((promo) => (
          <div
            key={promo.id}
            onClick={() => onSelectCategory(promo.targetSlug)}
            className={`relative bg-gradient-to-br ${promo.bgGradient} border ${promo.borderColor} p-4 md:p-8 rounded-[1.8rem] md:rounded-[2.2rem] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer`}
          >
            <div className="absolute -right-6 -top-6 w-16 h-16 md:w-24 md:h-24 bg-white/60 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>

            <div>
              <div className="flex items-center justify-between mb-3 md:mb-5">
                <span
                  className={`text-[8px] md:text-[10px] font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-wider ${promo.tagBg}`}
                >
                  {promo.tag}
                </span>
                <div className="w-7 h-7 md:w-9 md:h-9 bg-white border border-neutral-100 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm">
                  {promo.icon}
                </div>
              </div>

              <h2 className="text-xs md:text-xl font-black text-neutral-800 leading-tight md:leading-snug line-clamp-2 md:line-clamp-none">
                {promo.title}
              </h2>
              <p className="hidden md:block text-xs font-medium text-neutral-500 mt-2 leading-relaxed max-w-sm">
                {promo.desc}
              </p>
            </div>

            <div className="mt-4 md:mt-6 pt-2 md:pt-4 border-t border-neutral-100/50 flex items-center justify-between text-[10px] md:text-xs font-black text-neutral-700 group-hover:text-[#105D38] transition-colors">
              <span>কালেকশন</span>
              <div className="w-5 h-5 md:w-7 md:h-7 bg-white group-hover:bg-[#105D38] border border-neutral-100 group-hover:border-[#105D38] text-neutral-400 group-hover:text-white rounded-md md:rounded-lg flex items-center justify-center transition-all group-hover:rotate-45">
                <ArrowUpRight className="w-3 md:w-4 h-3 md:h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategorySection = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(false);

  const productsSectionRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 1,
      name: "কুরআন শরীফ",
      slug: "Religious Book",
      image:
        "https://i.ibb.co.com/1f4vFQh9/360-F-263148731-URq-K7-TVJz0a1ja-V3-Iu-Ad-TBu-Xmoi4lc-A6.jpg",
    },
    {
      id: 2,
      name: "তাসবিহ",
      slug: "Accessories",
      image:
        "https://i.ibb.co.com/0jJJ8yMh/463087068-500611622945397-6536297165675071357-n-420x420.jpg",
    },
    {
      id: 3,
      name: "ইসলামিক বই",
      slug: "Islamic Books",
      image:
        "https://i.ibb.co.com/KzXKdMKt/png-row-islamic-books-transparent-background-378502811.webp",
    },
    {
      id: 4,
      name: "আতর",
      slug: "Fragrance",
      image: "https://i.ibb.co.com/rRR1Bstz/ramy-vicky-ator-3-ml-2.png",
    },
    {
      id: 5,
      name: "পোশাক",
      slug: "Clothing",
      image:
        "https://i.ibb.co.com/8g0CcrK3/pngtree-women-muslim-with-black-dress-png-image-5294699.png",
    },
    {
      id: 6,
      name: "জায়নামাজ",
      slug: "Prayer Mat",
      image:
        "https://i.ibb.co.com/0jJJ8yMh/463087068-500611622945397-6536297165675071357-n-420x420.jpg",
    },
    {
      id: 7,
      name: "উপহার সামগ্রী",
      slug: "Combo",
      image:
        "https://i.ibb.co.com/1f4vFQh9/360-F-263148731-URq-K7-TVJz0a1ja-V3-Iu-Ad-TBu-Xmoi4lc-A6.jpg",
    },
    {
      id: 8,
      name: "হোম ডেকোর",
      slug: "Home Decor",
      image:
        "https://i.ibb.co.com/1f4vFQh9/360-F-263148731-URq-K7-TVJz0a1ja-V3-Iu-Ad-TBu-Xmoi4lc-A6.jpg",
    },
  ];

  useEffect(() => {
    fetch("https://darulislam-server-v2.vercel.app/api/products/shop")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products || []))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (slug: string) => {
    if (activeCategory === slug) return;

    setLoading(true);
    setActiveCategory(slug);

    setTimeout(() => {
      const filtered = allProducts.filter((p) => p.category === slug);
      setFilteredProducts(filtered);
      setLoading(false);

      if (productsSectionRef.current) {
        window.scrollTo({
          top: productsSectionRef.current.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto bg-white">
      <ShopPromoGrid onSelectCategory={handleCategoryClick} />

      <div className="mb-6 mt-10">
        <h2 className="text-lg md:text-xl font-black text-[#105D38]">
          ক্যাটেগরি সমূহ
        </h2>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-6 mb-12">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className="group cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className={`relative w-full aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden border transition-all ${activeCategory === cat.slug ? "border-[#105D38] bg-green-50" : "border-gray-100 bg-[#F3F4F6]"}`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover p-2 md:p-4 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <span
                className={`text-[10px] md:text-xs font-bold text-center line-clamp-1 ${activeCategory === cat.slug ? "text-[#105D38]" : "text-gray-600"}`}
              >
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div ref={productsSectionRef} className="scroll-mt-20">
        {activeCategory !== "All" && (
          <div className="bg-gray-50 rounded-[2rem] p-4 md:p-8 mb-16 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800 text-sm md:text-base">
                {categories.find((c) => c.slug === activeCategory)?.name}{" "}
                কালেকশন
              </h3>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setFilteredProducts([]);
                }}
                className="text-[10px] font-bold text-red-500 bg-white px-4 py-1.5 rounded-full border border-red-50 shadow-sm hover:bg-red-50 transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-[#105D38]" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ৩. New Arrival */}
      <div className="mb-16">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-6">
          নতুন আসা পণ্যসমূহ
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {allProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ৪. Just For You */}
      <div className="bg-gray-50 rounded-[2.5rem] p-6 md:p-10 border border-gray-100 mb-10 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-1">
          আপনার জন্য বিশেষ কিছু
        </h2>
        <p className="text-xs text-gray-400 font-medium mb-8">
          Your personalized recommendations
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {allProducts
            .slice()
            .reverse()
            .slice(0, 6)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
