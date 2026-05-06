import { Geist, Geist_Mono, Hind_Siliguri, Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import QueryProvider from "./providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "দারুল ইসলাম ইনস্টিটিউট | Darul Islam Institute",
  description:
    "একটি আধুনিক ইসলামি শিক্ষাপ্রতিষ্ঠান। শিক্ষা, ইসলামি লাইব্রেরি, দাওয়াহ ও দান কার্যক্রম পরিচালনা করে।",
  keywords: [
    "islamic institute",
    "darul islam",
    "শিক্ষা",
    "লাইব্রেরি",
    "দাওয়াহ",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
