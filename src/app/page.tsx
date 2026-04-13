import ActivitiesSection from "../components/ActivitiesSection";
import CategoryGrid from "../components/CategoryGrid";
import DonationBanner from "../components/DonationBanner";
import HeroSection from "../components/HeroSection";
import NoticeTicker from "../components/NoticeTicker";
import ReviewSection from "../components/ReviewSection";
import StatusCounter from "../components/StatusCounter";
import TeacherGrid from "../components/TeacherGrid";

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
