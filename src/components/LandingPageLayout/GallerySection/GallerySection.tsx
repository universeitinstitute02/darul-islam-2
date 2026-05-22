"use client";
import React, { useEffect, useState } from "react";
import { ImageIcon, Expand, ArrowUpRight } from "lucide-react";

// 📌 API ইন্টারফেস ডিফাইন
interface GalleryAlbum {
  _id: string;
  title: string;
  event: string;
  image: string[];
  createdAt: string;
}

const GallerySection: React.FC = () => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const BASE_URL = "https://darulislam-server-v2.vercel.app/api";
  const LIMIT = 5;

  // 🔄 এপিআই থেকে ডাটা ফেচ করার ফাংশন
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/gallery?page=${page}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data) {
          setAlbums((prev) =>
            page === 1 ? resData.data : [...prev, ...resData.data],
          );

          if (resData.currentPage >= resData.totalPages) {
            setHasMore(false);
          }
        }
      })
      .catch((err) => console.error("Gallery fetching error:", err))
      .finally(() => setLoading(false));
  }, [page]);

  // 📐 বেন্টো গ্রিড সাইজ জেনারেটর
  const getGridSize = (index: number) => {
    const sizes = [
      "lg:col-span-2 lg:row-span-2 md:col-span-2",
      "lg:col-span-1 lg:row-span-1",
      "lg:col-span-1 lg:row-span-2 md:col-span-1",
      "lg:col-span-1 lg:row-span-1",
      "lg:col-span-2 lg:row-span-1 md:col-span-2",
    ];
    return sizes[index % sizes.length];
  };

  // 🔗 ইমেজ পাথ ম্যাপার
  const getImageUrl = (imgUrl: string) => {
    if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
      return imgUrl;
    }
    return `${BASE_URL.replace("/api", "")}/${imgUrl}`;
  };

  // ➕ "সম্পূর্ণ গ্যালারি দেখুন" বাটনের কাজ
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="px-4 my-8">
      <div className="bg-gray-300 max-w-7xl mx-auto px-5 py-6 rounded-2xl">
        {/* 📜 হেডার অংশ */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-[#105D38] rounded-full text-xs font-bold mb-4">
            <ImageIcon className="w-4 h-4" />
            <span>আমাদের ক্যাম্পাস লাইফ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            ফটো গ্যালারি
          </h2>
          <div className="w-20 h-1.5 bg-[#105D38] rounded-full"></div>
        </div>

        {/* 🔄 প্রথমবার পেজ লোড হওয়ার কন্ডিশন */}
        {page === 1 && loading ? (
          <div className="text-center py-20 text-neutral-600 font-bold text-sm tracking-wide animate-pulse">
            গ্যালারি লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-12 text-gray-600 font-bold">
            বর্তমানে কোনো ছবি আপলোড করা নেই।
          </div>
        ) : (
          <>
            {/* 🖼️ মেইন ডাইনামিক বেন্টো গ্রিড লেআউট */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[250px] md:auto-rows-[300px]">
              {albums.map((album, i) => {
                const displayImage =
                  album.image && album.image.length > 0
                    ? getImageUrl(album.image[0])
                    : "/placeholder.jpg";

                return (
                  <div
                    key={album._id}
                    className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gray-100 transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-900/20 ${getGridSize(i)}`}
                  >
                    {/* ছবি */}
                    <img
                      src={displayImage}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                      loading="lazy"
                    />

                    {/* প্রিমিয়াম ওভারলে */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div>
                          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">
                            {album.event || "স্মৃতি"}
                          </p>
                          <h3 className="text-white text-lg md:text-xl font-bold line-clamp-1">
                            {album.title}
                          </h3>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-[#105D38] scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 flex-shrink-0">
                          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                      </div>
                    </div>

                    {/* মোবাইল ইন্ডিকেটর আইকন */}
                    <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full md:hidden">
                      <Expand className="w-4 h-4 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 🔘 গ্লাস-মর্ফিজম বাটন (ডাটা লোড হওয়ার সময় টেক্সট চেঞ্জ হবে) */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="group relative flex items-center gap-3 px-12 py-5 bg-[#105D38] text-white font-black rounded-full overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-xl shadow-emerald-900/20 disabled:opacity-70 disabled:pointer-events-none"
                >
                  <span className="relative z-10">
                    {loading
                      ? "নতুন ছবি লোড হচ্ছে..."
                      : "সম্পূর্ণ গ্যালারি দেখুন"}
                  </span>
                  {!loading && (
                    <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  )}

                  {/* বাটন এনিমেশন লেয়ার */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GallerySection;
