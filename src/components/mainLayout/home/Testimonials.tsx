import React from "react";
import SectionHeading from "@/src/components/shared/SectionHeading";

const StarIcon = () => (
  <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const testimonials = [
  {
    quote:
      "দারুল ইসলাম ইনস্টিটিউট আমার সন্তানের জন্য সেরা প্রতিষ্ঠান। এখানকার পরিবেশ ও শিক্ষার মান আমাকে সত্যিই মুগ্ধ করেছে।",
    name: "মোঃ রফিকুল ইসলাম",
    role: "অভিভাবক",
    initials: "র",
  },
  {
    quote:
      "এখানে পড়ে আমার দ্বীন ও সাধারণ জ্ঞান অনেক উন্নত হয়েছে। শিক্ষকদের আন্তরিক প্রচেষ্টা আমাকে প্রতিদিন অনুপ্রাণিত করে।",
    name: "আরিফ বিন সাদ",
    role: "শিক্ষার্থী",
    initials: "আ",
  },
  {
    quote:
      "শিক্ষকরা খুব যত্নশীল এবং সহযোগী। প্রতিটি শিক্ষার্থীর প্রতি তাদের মনোযোগ ও ভালোবাসা এই প্রতিষ্ঠানকে আলাদা করে তোলে।",
    name: "সাদিয়া আক্তার",
    role: "অভিভাবক",
    initials: "সা",
  },
];

const TestimonialCard = ({
  quote,
  name,
  role,
  initials,
  delay,
}: (typeof testimonials)[0] & { delay: string }) => (
  <div
    className="group relative bg-gray-200 rounded-2xl p-7 flex flex-col gap-4 overflow-hidden
                shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300
                border border-gray-100 hover:border-green-100"
    style={{ animationDelay: delay }}
  >
    {/* Top shimmer bar on hover */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-green-300 to-green-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Background watermark quote */}
    <span className="absolute -top-2 right-4 text-[7rem] font-serif leading-none text-green-100 group-hover:text-green-200 transition-colors duration-300 select-none pointer-events-none">
      "
    </span>

    {/* Role badge */}
    <span className="inline-flex items-center gap-1.5 self-start bg-green-50 border border-green-200 text-green-700 text-[0.7rem] font-semibold px-3 py-1 rounded-full uppercase tracking-wide relative z-10">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
      {role}
    </span>

    {/* Stars */}
    <div className="flex gap-0.5 relative z-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>

    {/* Quote text */}
    <p className="text-gray-600 leading-relaxed text-[0.95rem] flex-1 relative z-10 font-['Noto_Serif_Bengali',serif]">
      {quote}
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 border-t border-gray-100 pt-4 mt-auto relative z-10">
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white font-bold text-sm ring-2 ring-green-100 flex-shrink-0">
        {initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-[0.72rem] text-green-700 font-medium uppercase tracking-wider mt-0.5">
          {role}
        </p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="px-5 py-16 max-w-6xl mx-auto">
      {/* Heading with accent bar */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 inline-block relative">
          অভিভাবক ও শিক্ষার্থীদের মতামত
          <span className="block h-1 bg-green-600 mt-2 mx-auto w-1/2 rounded-full" />
        </h2>
      </div>

      {/* Grid: 1 col → 2 col (sm) → 3 col (md+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} delay={`${0.1 + i * 0.12}s`} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
