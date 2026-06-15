"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Plus, Upload, ImageIcon, RefreshCw } from "lucide-react";
import Swal from "sweetalert2"; // 👈 SweetAlert2 ইমপোর্ট করা হয়েছে
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

interface GalleryAlbum {
  _id: string;
  title: string;
  event: string;
  image: string[];
  createdAt: string;
}

const GalleryAdmin: React.FC = () => {
  const axiosSecure = useAxiosSecure();

  // ডাটা লিস্ট ও পেজিনেশন স্টেট
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // ফর্ম ইনপুট স্টেট
  const [title, setTitle] = useState<string>("");
  const [event, setEvent] = useState<string>("campus");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const BASE_URL = "https://darulislam-server-v2.vercel.app/api";

  // 🔄 গ্যালারির ডাটা ফেচ করার ফাংশন
  const fetchGallery = async (targetPage: number) => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/gallery?page=${targetPage}&limit=10`);
      if (res.data && res.data.data) {
        setAlbums(res.data.data);
        setTotalPages(res.data.totalPages || 1);
        setPage(res.data.currentPage || 1);
      }
    } catch (err) {
      console.error("Error fetching admin gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(1);
  }, [axiosSecure]);

  // ➕ নতুন অ্যালবাম তৈরি (POST)
  const handleAddAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedFiles || selectedFiles.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "অনুরোধ বুকড!",
        text: "অনুগ্রহ করে টাইটেল এবং কমপক্ষে একটি ছবি সিলেক্ট করুন।",
        confirmButtonColor: "#0B5D3B",
      });
      return;
    }

    setActionLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("event", event);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("image", selectedFiles[i]);
    }

    try {
      const res = await axiosSecure.post("/gallery/admin/add-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 || res.status === 201) {
        // 🎉 সফল আপলোডের SweetAlert
        Swal.fire({
          icon: "success",
          title: "সফল হয়েছে!",
          text: "নতুন অ্যালবাম সফলভাবে গ্যালারিতে যোগ হয়েছে।",
          confirmButtonColor: "#0B5D3B",
          timer: 2500,
        });

        setTitle("");
        setSelectedFiles(null);

        const fileInput = document.getElementById(
          "file-upload",
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        fetchGallery(1);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      const errMsg =
        err.response?.data?.message ||
        "অ্যালবাম যোগ করতে সমস্যা হয়েছে বা আপনি অনুমোদিত নন।";

      Swal.fire({
        icon: "error",
        title: "আপলোড ব্যর্থ!",
        text: errMsg,
        confirmButtonColor: "#d33",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // 🗑️ অ্যালবাম ডিলিট করার ফাংশন
  const handleDeleteAlbum = async (id: string) => {
    // ⚠️ ডিলিট করার আগের কাস্টম কনফার্মেশন SweetAlert
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই পুরো অ্যালবামটি কিন্তু স্থায়ীভাবে ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
      cancelButtonText: "বাতিল",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setActionLoading(true);
        try {
          const res = await axiosSecure.delete(`/gallery/admin/${id}`);

          if (res.status === 200) {
            // 🎉 সফল ডিলিটের SweetAlert
            Swal.fire({
              icon: "success",
              title: "রিমুভড!",
              text: "অ্যালবামটি সফলভাবে মুছে ফেলা হয়েছে।",
              confirmButtonColor: "#0B5D3B",
              timer: 2000,
            });

            const updatedAlbums = albums.filter((album) => album._id !== id);
            if (updatedAlbums.length === 0 && page > 1) {
              fetchGallery(page - 1);
            } else {
              fetchGallery(page);
            }
          }
        } catch (err: any) {
          console.error("Delete error:", err);
          const errMsg =
            err.response?.data?.message ||
            "ডিলিট করার অনুমতি নেই বা কোনো সমস্যা হয়েছে।";

          Swal.fire({
            icon: "error",
            title: "মুছে ফেলা যায়নি!",
            text: errMsg,
            confirmButtonColor: "#d33",
          });
        } finally {
          setActionLoading(false);
        }
      }
    });
  };

  const getImageUrl = (imgUrl: string) => {
    if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://"))
      return imgUrl;
    return `${BASE_URL.replace("/api", "")}/${imgUrl}`;
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen text-gray-800">
      {/* 👑 পেজ হেডার */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0B5D3B] flex items-center gap-2">
            <ImageIcon className="w-7 h-7" /> গ্যালারি ম্যানেজমেন্ট প্যানেল
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            ল্যান্ডিং পেজের বেন্টো গ্রিড ফটো অ্যালবামের ডাটা কন্ট্রোল করুন
            এখানে।
          </p>
        </div>
        <button
          onClick={() => fetchGallery(page)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-xs"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />{" "}
          রিফ্রেশ ডাটা
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📥 ফরম লেয়ার */}
        <div className="bg-white p-5 md:p-6 rounded-[2rem] border border-gray-100 shadow-xs h-fit">
          <h2 className="text-base font-black text-gray-800 mb-5 flex items-center gap-2 border-b border-gray-50 pb-3">
            <Plus className="w-5 h-5 text-[#0B5D3B]" /> নতুন অ্যালবাম তৈরি করুন
          </h2>

          <form onSubmit={handleAddAlbum} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gray-600 mb-2 uppercase tracking-wide">
                অ্যালবাম টাইটেল
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: সাংস্কৃতিক অনুষ্ঠান ২০২৬"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-[#0B5D3B] focus:bg-white font-medium transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-600 mb-2 uppercase tracking-wide">
                ইভেন্ট ক্যাটাগরি (ট্যাগ)
              </label>
              <select
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-[#0B5D3B] focus:bg-white font-bold transition-all text-gray-700"
              >
                <option value="campus">ক্যাম্পাস (campus)</option>
                <option value="cultural">সাংস্কৃতিক (cultural)</option>
                <option value="academic">একাডেমিক (academic)</option>
                <option value="prayer">ইবাদত/অন্যান্য (prayer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-600 mb-2 uppercase tracking-wide">
                ছবি নির্বাচন করুন (একাধিক সম্ভব)
              </label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 text-center hover:bg-gray-100/50 transition-colors cursor-pointer group">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 mx-auto text-gray-400 group-hover:text-[#0B5D3B] mb-2 transition-colors" />
                <span className="text-xs font-bold text-gray-500 block">
                  {selectedFiles && selectedFiles.length > 0
                    ? `Selected: ${selectedFiles.length} টি ছবি`
                    : "ক্লিক করে এক বা একাধিক ছবি সিলেক্ট করুন"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={actionLoading || loading}
              className="w-full py-3.5 cursor-pointer bg-[#0B5D3B] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-900/10 hover:bg-[#0c462a] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {actionLoading ? "আপলোড হচ্ছে..." : "গ্যালারিতে পোস্ট করুন"}
            </button>
          </form>
        </div>

        {/* 📊 ডাটা লিস্ট লেয়ার */}
        <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-[2rem] border border-gray-100 shadow-xs">
          <h2 className="text-base font-black text-gray-800 mb-5 border-b border-gray-50 pb-3">
            বর্তমান অ্যালবাম লিস্ট ({albums.length})
          </h2>

          {loading && page === 1 ? (
            <LoadingSpinner />
          ) : albums.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-xs font-bold">
              গ্যালারিতে বর্তমানে কোনো ডাটা পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-3">
              {albums.map((album) => (
                <div
                  key={album._id}
                  className="flex items-center justify-between p-3 border border-gray-100 bg-gray-50/50 hover:bg-gray-50 rounded-2xl transition-colors gap-4"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative w-12 h-12 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={
                          album.image && album.image.length > 0
                            ? getImageUrl(album.image[0])
                            : "/placeholder.jpg"
                        }
                        alt="thumb"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-black text-gray-800 line-clamp-1">
                        {album.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[9px] font-black uppercase">
                          {album.event}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {album.image ? album.image.length : 0}টি ছবি
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteAlbum(album._id)}
                    disabled={actionLoading}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50 flex-shrink-0"
                    title="পুরো অ্যালবামটি ডিলিট করুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* 🔢 পেজিনেশন কন্ট্রোল */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => fetchGallery(page - 1)}
                    disabled={page === 1 || loading}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold disabled:opacity-50 transition-colors"
                  >
                    আগেরটি
                  </button>
                  <span className="text-xs font-bold text-gray-500 px-2">
                    পেজ {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => fetchGallery(page + 1)}
                    disabled={page === totalPages || loading}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold disabled:opacity-50 transition-colors"
                  >
                    পরেরটি
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryAdmin;
