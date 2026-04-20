import DonationBanner from "@/src/components/DonationBanner";
import ActivitiesSection from "@/src/components/mainLayout/home/ActivitiesSection";
import CategoryGrid from "@/src/components/mainLayout/home/CategoryGrid";
import HeroSection from "@/src/components/mainLayout/home/HeroSection";
import NoticeTicker from "@/src/components/mainLayout/home/NoticeTicker";
import ReviewSection from "@/src/components/mainLayout/home/ReviewSection";
import StatusCounter from "@/src/components/mainLayout/home/StatusCounter";
import HomeGallery from "@/src/components/mainLayout/home/HomeGallery";
import TeacherGrid from "@/src/components/mainLayout/home/TeacherGrid";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Slides */}
      <HeroSection />

      {/* Dynamic Progress/Notice Bar */}
      <NoticeTicker />

      {/* Main Activities & Quick Access */}
      <ActivitiesSection />

      {/* Dynamic Progress/Notice Bar */}
      <StatusCounter />
      {/* Gallery Section */}

      <HomeGallery />
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
