import React from "react";
import HeroSection from "@/src/components/mainLayout/home/HeroSection";
import Course from "@/src/components/LandingPageLayout/Course/Course";
import Academic from "@/src/components/LandingPageLayout/Academic/Academic";
import AmaderTeacher from "@/src/components/LandingPageLayout/AmaderTeacher/AmaderTeacher";
import AboutHome from "@/src/components/mainLayout/home/AboutHome";
import WhyChoose from "@/src/components/mainLayout/home/WhyChoose";
import StudentSlider from "@/src/components/LandingPageLayout/BestStudents/BestStudents";
import DonationSection from "@/src/components/LandingPageLayout/DonationSection/DonationSection";
import ContactSection from "@/src/components/LandingPageLayout/ContactSection/ContactSection";
import AdmissionInfo from "@/src/components/LandingPageLayout/AddmissionDoc/AddmissionInfo";
import NoticeBoard from "@/src/components/LandingPageLayout/Notice/Notice";
import GallerySection from "@/src/components/LandingPageLayout/GallerySection/GallerySection";
import Testimonials from "@/src/components/mainLayout/home/Testimonials";

/* ── MAIN PAGE ── */
export default function Home() {
  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      {/* Hero Section with Slides */}
      <HeroSection />

      {/* ── ABOUT SECTION ── */}
      <AboutHome />

      {/* ── COURSES ── */}
      <Course />

      {/* ── ACADEMIC DEPARTMENTS ── */}

      <Academic />

      {/* ── TEACHERS ── */}
      <AmaderTeacher />

      {/* ── STUDENTS ── */}
      <StudentSlider />

      {/* ── 1. ADMISSION INFO ── */}
      <AdmissionInfo />
      {/* ── 2. NOTICE BOARD ── */}
      <NoticeBoard />

      {/* ── 3. GALLERY ── */}
      <GallerySection />

      {/* ── 4. WHY CHOOSE US ── */}
      <WhyChoose />

      {/* ── 5. TESTIMONIALS ── */}
      <Testimonials />
      {/* Donation section */}
      <DonationSection />

      {/* Contact and Map section */}
      <ContactSection />
    </main>
  );
}
