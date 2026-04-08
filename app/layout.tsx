import type { Metadata } from "next";
import { Noto_Serif_Bengali, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "দারুল ইসলাম ইনস্টিটিউট | Darul Islam Institute",
  description: "একটি আধুনিক ইসলামি শিক্ষাপ্রতিষ্ঠান। শিক্ষা, ইসলামি লাইব্রেরি, দাওয়াহ ও দান কার্যক্রম পরিচালনা করে।",
  keywords: ["islamic institute", "darul islam", "শিক্ষা", "লাইব্রেরি", "দাওয়াহ"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.variable} ${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-noto-bengali bg-[#FFFCDC] text-[#14281D]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
