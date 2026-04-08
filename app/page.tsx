import HeroSection from "@/components/HeroSection";
import NoticeTicker from "@/components/NoticeTicker";
import CategoryGrid from "@/components/CategoryGrid";
import TeacherGrid from "@/components/TeacherGrid";
import DonationBanner from "@/components/DonationBanner";
import ReviewSection from "@/components/ReviewSection";
import ActivitiesSection from "@/components/ActivitiesSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Slides */}
      <HeroSection />

      {/* Dynamic Progress/Notice Bar */}
      <NoticeTicker />

      {/* Main Activities & Quick Access */}
      <ActivitiesSection />

      {/* Subject-wise Courses (Category Grid) */}
      <CategoryGrid />

      {/* Our Teachers (Ustadz) */}
      <TeacherGrid />

      {/* High Impact Donation Banner */}
      <DonationBanner />

      {/* Student/Guardian Reviews */}
      <ReviewSection />
    </div>
  );
}
