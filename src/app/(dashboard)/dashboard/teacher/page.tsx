import React from "react";
import TeacherOverview from "@/src/components/teacher/TeacherOverview"; // পাথ ঠিক করে নিন
import CourseManagement from "@/src/components/teacher/CourseManagement";

export default function TeacherDashboardPage() {
  return (
    <div className="">
      {/* ১. টিচার্স ওভারভিউ সেকশন */}
      <TeacherOverview />

      {/* ২. কোর্স ও রিসোর্স ম্যানেজমেন্ট সেকশন */}
      <CourseManagement />

      {/* এখানে ৩ নম্বর সেকশন (Student Tracker) আসবে সামনে */}
    </div>
  );
}
