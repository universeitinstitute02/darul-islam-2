"use client";
import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import axios from "axios";

interface TestimonialData {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  text: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
}

const StarIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-3.5 h-3.5 ${active ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialSkeletonCard = () => (
  <div className="w-[85vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] shrink-0 bg-white rounded-3xl p-6 md:p-7 flex flex-col gap-5 border border-gray-100 animate-pulse">
    <div className="h-5 w-20 bg-neutral-200 rounded-full" />
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-3.5 h-3.5 bg-neutral-200 rounded-full" />
      ))}
    </div>
    <div className="space-y-2 flex-1">
      <div className="h-3 w-full bg-neutral-200 rounded" />
      <div className="h-3 w-5/6 bg-neutral-200 rounded" />
      <div className="h-3 w-2/3 bg-neutral-200 rounded" />
    </div>
    <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
      <div className="w-11 h-11 rounded-full bg-neutral-200 shrink-0" />
      <div className="space-y-1.5 flex-1">
        <div className="h-3 w-24 bg-neutral-200 rounded" />
        <div className="h-2.5 w-16 bg-neutral-200 rounded" />
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getApprovedFeedback = async () => {
      try {
        const res = await axios.get(
          "https://darulislam-server-v2.vercel.app/api/testimonials",
        );
        if (res.data) {
          setTestimonials(res.data);
        }
      } catch (err) {
        console.error("Error loading approved landing testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    getApprovedFeedback();
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;

      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="px-4 py-20 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-green-50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-[11px] font-black text-green-800 mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-[#0B5D3B]" />{" "}
              Testimonials Feedback
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              অভিভাবক ও শিক্ষার্থীদের{" "}
              <span className="text-[#0B5D3B]">মতামত</span>
            </h2>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={() => scrollSlider("left")}
              className="w-11 h-11 bg-white cursor-pointer border border-gray-200 text-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider("right")}
              className="w-11 h-11 cursor-pointer bg-white border border-gray-200 text-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-2 scroll-smooth"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {loading ? (
            <>
              <TestimonialSkeletonCard />
              <TestimonialSkeletonCard />
              <TestimonialSkeletonCard />
              <TestimonialSkeletonCard />
            </>
          ) : (
            testimonials.map((t) => {
              const initialLetter = t.user?.name ? t.user.name.charAt(0) : "শ";

              return (
                <div
                  key={t._id}
                  className="w-[85vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] shrink-0 snap-start snap-always
                             group relative bg-white rounded-3xl p-6 md:p-7 flex flex-col gap-5 overflow-hidden
                             shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-green-400 to-emerald-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="absolute -top-2 right-4 text-[7rem] font-serif leading-none text-green-50/70 select-none pointer-events-none">
                    "
                  </span>

                  <span className="inline-flex items-center gap-1.5 self-start bg-green-50 border border-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    শিক্ষার্থী
                  </span>

                  <div className="flex gap-0.5 relative z-10">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} active={i < t.rating} />
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed text-xs md:text-[13px] flex-1 font-medium italic">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3 border-t border-gray-50 pt-4 mt-auto">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center text-white font-black text-sm ring-4 ring-emerald-50 shrink-0">
                      {initialLetter}
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-black text-gray-900">
                        {t.user?.name || "অজানা শিক্ষার্থী"}
                      </p>
                      <p className="text-[10px] text-emerald-700 font-bold tracking-wider mt-0.5 uppercase">
                        Verified Reviewer
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;