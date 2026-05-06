import { 
  HandHeart,  
  Droplets, 
  Building, 
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const causes = [
  {
    title: "মসজিদ নির্মাণ",
    slug:"mosjid-nirman",
    desc: "আমাদের নতুন মসজিদ নির্মাণে আপনার সাহায্য প্রয়োজন। প্রতিটি টাকা সদাকাহ জারিয়াহ।",
 count: "৮৪ জন",
    goal: "২৫,০০,০০০৳",
    image: "https://images.unsplash.com/photo-1596720426673-e47744396391?q=80&w=1972&auto=format&fit=crop",
    icon: Building
  },
  {
    title: "এতিম স্পনসর",
    slug:"etim-sponsor",
    desc: "মাসিক ১,২০০ টাকায় একটি এতিম শিশুর শিক্ষা, খাদ্য ও বাসস্থানের ব্যবস্থা করুন।",
    count: "৮৪ জন",
    goal: "মাসিক ১,২০০৳",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    icon: Users
  },
  {
    title: "কূপ খনন",
    slug:"kup-khonon",
    desc: "সুদূর পল্লীতে বিশুদ্ধ পানির ব্যবস্থা করুন। একটি কূপ চিরকালীন সদাকাহ।",
  count: "৮৪ জন",
    goal: "৮০,০০০৳",
    image: "https://images.unsplash.com/photo-1582213713303-9257ac978839?q=80&w=2070&auto=format&fit=crop",
    icon: Droplets
  },
]

export default function DonationPage() {

  return (
    <div className="flex flex-col min-h-screen mt-16 lg:mt-18">
      {/* Hero Section */}
      <div className="relative h-48 lg:h-64 bg-gradient-to-br from-[#14281D] to-[#30360E] flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
              <HandHeart size={40} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-4xl font-black">আল্লাহর পথে দান করুন</h1>
              <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">সদাকাহ • যাকাত • লিল্লাহ</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/5 max-w-md">
            <p className="text-xs lg:text-sm font-medium leading-relaxed italic opacity-90">
              “যারা আল্লাহর পথে ধনসম্পদ ব্যয় করে, তাদের উদাহরণ একটি শস্যদানা, যা সাতটি শীষ জন্মায়।” (সূরা বাকারা ২:২৬১)
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto w-full px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form & Info */}
        <div className="lg:col-span-12 space-y-12">
          {/* Causes Grid */}
          <div className="space-y-8 pt-12">
            <h2 className="text-3xl font-black text-[#14281D] flex items-center gap-3">
              <HandHeart /> আপনার দান যেখানে যাবে
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {causes.map((cause, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-[#14281D]/5 group">
                  <div className="relative h-64">
                    <Image 
                      src={cause.image} 
                      alt={cause.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div className="bg-[#87F56] text-[#14281D] p-3 rounded-2xl shadow-lg">
                        <cause.icon size={24} />
                      </div>
                      <div className="text-white text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#87F56]">প্রয়োজন</p>
                        <p className="text-xl font-black">{cause.goal}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="text-2xl font-black text-[#14281D]">{cause.title}</h4>
                      <p className="text-sm font-medium text-[#14281D]/60 mt-2 leading-relaxed">
                        {cause.desc}
                      </p>
                    </div>
                  
                      <div className="bg-[#14281D]/5 p-4 rounded-2xl flex items-center justify-between">
                        <span className="text-xs font-black text-[#14281D]/40 uppercase tracking-widest">বর্তমানে সহায়তাপ্রাপ্ত</span>
                        <span className="font-black text-[#14281D]">{cause.count}</span>
                      </div>

                    <Link href={`/donation/${cause.slug}`} className="w-full flex items-center justify-center  py-4 rounded-2xl font-black bg-[#14281D] text-[#E2D4B9] transition-all duration-300">
                      অনুদান প্রদান করুন
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
