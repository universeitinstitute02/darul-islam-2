import Image from "next/image";
import React from "react";

const AboutHome = () => {
  return (
    <section className="relative overflow-hidden bg-[#f0f7f0] px-5 py-6 md:py-16">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-green-700/5" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-green-700/5" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
        {/* Text Content */}
        <div className="flex-1">
          {/* Label */}
          <div className="mb-2 flex items-center gap-2.5">
            <div className="h-7 w-0.5 rounded-full bg-green-700" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-green-700">
              আমাদের পরিচয়
            </span>
          </div>

          <h2 className="mb-2 font-serif text-3xl font-bold leading-snug text-green-950 md:text-4xl">
            আমাদের সম্পর্কে
          </h2>

          <p className="mb-5 max-w-lg text-sm leading-relaxed text-gray-600 md:text-base md:leading-[1.85]">
            দারুল ইসলাম ইনস্টিটিউট ইসলামী শিক্ষা ও আধুনিক শিক্ষার সমন্বয় ঘটিয়ে
            নৈতিক, একাডেমিক ও মানবিক গুণাবলি বিকাশে প্রতিজ্ঞাবদ্ধ।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-green-700 px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800">
              আরো পড়ুন
            </button>

            <a
              href="#"
              className="flex items-center gap-1.5 text-sm font-medium text-green-700 transition-colors hover:text-green-900"
            >
              যোগাযোগ করুন
              <span className="text-base">→</span>
            </a>
          </div>

          {/* Stats Row */}
          <div className="mt-4 flex items-center gap-6 border-t border-green-700/10 pt-6 md:gap-8">
            {[
              { value: "১৫+", label: "বছরের অভিজ্ঞতা" },
              { value: "৫০০+", label: "শিক্ষার্থী" },
              { value: "৩০+", label: "শিক্ষক" },
            ].map((stat, i, arr) => (
              <React.Fragment key={stat.label}>
                <div>
                  <div className="text-xl font-bold text-green-950 md:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-500">
                    {stat.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-8 w-px bg-green-700/15" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Image — hidden on mobile, shown on md+ */}
        <div className="relative hidden md:flex md:flex-shrink-0 md:justify-end">
          <div className="relative">
            <div className="overflow-hidden rounded-tl-xl rounded-tr-xl rounded-br-[4rem] rounded-bl-xl border border-green-200 shadow-sm">
              <Image
                width={300}
                height={340}
                src="/about-image.webp"
                alt="দারুল ইসলাম ইনস্টিটিউট"
                className="object-cover"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-4 -right-4 flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-[#f0f7f0] bg-white shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 text-lg">
                ✦
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
