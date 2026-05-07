"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

// Swiper styles (যদি আপনার আলাদা ফাইলে ইমপোর্ট করা না থাকে)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ShopHeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "ইসলামিক শপ",
      subtitle: "বিশ্বস্ত পণ্য, ইসলামের জন্য",
      cta: "শপে যান",
      image:
        "https://i.ibb.co.com/nMFsh8Kv/Gemini-Generated-Image-ndo8vxndo8vxndo8.png",
    },
    {
      id: 2,
      title: "প্রিমিয়াম জায়নামাজ",
      subtitle: "ইবাদতে প্রশান্তি নিশ্চিত করুন",
      cta: "এখনই দেখুন",
      image:
        "https://i.ibb.co.com/1GP1rZWn/Gemini-Generated-Image-b2onlgb2onlgb2on.png",
    },
  ];

  // স্ক্রল লজিক
  const scrollToProducts = () => {
    const element = document.getElementById("all-products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: ".shop-pagination",
        }}
        loop={true}
        className="h-[500px] md:h-[600px] w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* ব্যাকগ্রাউন্ড ইমেজ */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="transition-transform duration-[5000ms] scale-110"
                />
                <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
              </div>

              {/* টেক্সট কন্টেন্ট */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center md:text-left">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-2xl text-gray-100 mb-8 md:mb-10 font-medium drop-shadow-md">
                    {slide.subtitle}
                  </p>

                  {/* CTA বাটন - এখানে স্ক্রল লজিক অ্যাড করা হয়েছে */}
                  <button
                    onClick={scrollToProducts}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#105D38] text-white font-bold rounded-2xl hover:bg-[#0d4d2e] transition-all shadow-2xl active:scale-95 group"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* কাস্টম প্যাজিনেশন */}
      <div className="shop-pagination absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2"></div>

      <style jsx global>{`
        .shop-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .shop-pagination .swiper-pagination-bullet-active {
          width: 30px;
          opacity: 1;
          background: #105d38 !important;
          border-radius: 20px;
        }
        .swiper-slide {
          pointer-events: none;
        }
        .swiper-slide-active {
          pointer-events: auto;
        }
      `}</style>
    </section>
  );
};

export default ShopHeroSlider;
