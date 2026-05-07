import ContentSections from "@/src/components/library/ContentSections";
// import ForbiddenPrayerTimes from "@/src/components/library/ForbiddenPrayerTimes";
import PrayerTimesResponsive from "@/src/components/library/Library";
// import NaflAndIftarTimes from "@/src/components/library/NaflAndIftarTimes";
const page = () => {
  return (
    <div>
      <PrayerTimesResponsive />
      {/* <ForbiddenPrayerTimes /> */}
      {/* <NaflAndIftarTimes /> */}
      <ContentSections />
    </div>
  );
};

export default page;
