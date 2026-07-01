import React from "react";
import AboutSection from "../../../components/mainLayout/about/About";
import SuccessStats from "../../../components/mainLayout/about/SuccessStats";
import DeeniShikhkhaSection from "../../../components/mainLayout/about/DeeniShikhkhaSection";
import TeamGallery from "../../../components/mainLayout/about/TeamGallery";
import CommitteeSection from "../../../components/mainLayout/about/CommitteeSection";
import BookPromotionBanner from "../../../components/mainLayout/about/BookPromotionBanner";

const page = () => {
  return (
    <>
      <section>
        <AboutSection />
      </section>
      <section>
        <SuccessStats />
      </section>
      <section>
        <DeeniShikhkhaSection />
      </section>
      <section>
        <TeamGallery />
      </section>
      <section>
        <CommitteeSection />
      </section>
      <section>
        <BookPromotionBanner />
      </section>
    </>
  );
};

export default page;
