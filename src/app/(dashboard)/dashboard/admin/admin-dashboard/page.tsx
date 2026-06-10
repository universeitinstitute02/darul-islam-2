import CourseManagement from "@/src/components/teacher/CourseManagement";
import TeacherOverview from "@/src/components/teacher/TeacherOverview";
import React from "react";

export default function TeacherDashboardPage() {
  return (
    <div className="">
      {/* ১. টিচার্স ওভারভিউ সেকশন */}
      <TeacherOverview />

      {/* ২. কোর্স ও রিসোর্স ম্যানেজমেন্ট সেকশন */}
      <CourseManagement />
    </div>
  );
}
