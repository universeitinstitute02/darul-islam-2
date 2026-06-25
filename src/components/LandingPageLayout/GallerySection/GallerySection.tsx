"use client";
import React, { useEffect, useState } from "react";
import {
  ImageIcon,
  Expand,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface GalleryAlbum {
  _id: string;
  title: string;
  event: string;
  image: string[];
  createdAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const LIMIT = 5;

// গ্রিডের সাইজ নির্ধারণের কমন ফাংশন
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

// ইমেজের URL ঠিক করার কমন ফাংশন
const getImageUrl = (imgUrl: string) => {
  if (!imgUrl) return "/placeholder.jpg";
  if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
    return imgUrl;
  }
  // 🔹 সিনিয়র ডিফেন্সিভ ফিক্স: BASE_URL এর সম্ভাব্য undefined ভ্যালু এবং এরর হ্যান্ডেল করা হয়েছে
  const cleanBaseUrl = BASE_URL
    ? BASE_URL.replace("/api", "")
    : "https://darulislam-server-v2.vercel.app";
  return `${cleanBaseUrl}/${imgUrl}`;
};

// 💀 কঙ্কাল (Skeleton) লোডার কম্পোনেন্ট ফিক্সড
const GallerySkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[250px] md:auto-rows-[300px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gray-200 ${getGridSize(i)}`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-2">
            <div className="h-3 w-16 bg-neutral-300 rounded" />
            <div className="h-5 w-3/4 bg-neutral-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

const GallerySection: React.FC = () => {
  // 🔹 সব প্রয়োজনীয় স্টেট এখানে ডিফাইন করা হয়েছে
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // লাইটবক্স/মডাল স্টেট
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🔹 API থেকে ডাটা ফেচ করার জন্য useEffect আলাদা করা হয়েছে
  useEffect(() => {
    if (!BASE_URL) return;
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

  // গ্যালারি লাইটবক্স ওপেন/ক্লোজ হ্যান্ডলার
  const openGallery = (album: GalleryAlbum, imageIndex = 0) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(imageIndex);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setIsOpen(false);
    setSelectedAlbum(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (!selectedAlbum) return;
    setCurrentImageIndex((prev) =>
      prev === selectedAlbum.image.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!selectedAlbum) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedAlbum.image.length - 1 : prev - 1,
    );
  };

  return (
    <div className="px-4 my-8">
      <div className="bg-gray-300 max-w-7xl mx-auto px-5 py-6 rounded-2xl">
        {/* 📜 হেডার অংশ */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-[#0B5D3B] rounded-full text-xs font-bold mb-4">
            <ImageIcon className="w-4 h-4" />
            <span>আমাদের ক্যাম্পাস লাইফ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            ফটো গ্যালারি
          </h2>
          <div className="w-20 h-1.5 bg-[#0B5D3B] rounded-full"></div>
        </div>

        {/* 🔄 কন্ডিশনাল রেন্ডারিং */}
        {page === 1 && loading ? (
          <GallerySkeleton />
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
                    onClick={() => openGallery(album, 0)}
                    className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gray-100 transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-900/20 cursor-pointer ${getGridSize(i)}`}
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
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-[#0B5D3B] scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 flex-shrink-0">
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

            {/* বাটন */}
            <div className="mt-14 mb-6 text-center">
              <Link
                href="/gallery"
                className="inline-block px-12 py-5 bg-[#0B5D3B] text-white font-black rounded-full"
              >
                সম্পূর্ণ গ্যালারি দেখুন
              </Link>
            </div>
          </>
        )}

        {/* 🗺️ লাইটবক্স / মোডাল ভিউ */}
        {isOpen && selectedAlbum && (
          <div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={closeGallery}
          >
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute cursor-pointer top-6 right-6 text-white hover:text-red-400 transition"
            >
              <X size={36} />
            </button>

            {/* Previous Button */}
            {selectedAlbum.image.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 md:left-8 text-white bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Image Container */}
            <div
              className="max-w-7xl max-h-[90vh] px-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(selectedAlbum.image[currentImageIndex])}
                alt={selectedAlbum.title}
                className="max-h-[80vh] w-auto mx-auto object-contain rounded-2xl shadow-2xl"
              />

              <div className="mt-6">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {selectedAlbum.title}
                </h3>
                <p className="text-gray-300 mt-2">
                  ছবি {currentImageIndex + 1} / {selectedAlbum.image.length}
                </p>
              </div>
            </div>

            {/* Next Button */}
            {selectedAlbum.image.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 md:right-8 text-white bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GallerySection;