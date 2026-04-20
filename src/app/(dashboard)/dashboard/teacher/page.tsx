import React from 'react';
import { Users, BookOpen, PlusCircle, MessageSquare } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div>
       <div className="flex justify-between items-center mb-8 border-b-2 border-islamic-gold pb-4">
          <div>
            <h1 className="text-3xl font-bold text-islamic-green">শিক্ষক প্যানেল</h1>
            <p className="text-neutral-500">স্বাগতম উস্তাদ! আপনার কোর্স ও শিক্ষার্থী পরিচালনা করুন।</p>
          </div>
          <button className="bg-islamic-gold text-islamic-green hover:bg-islamic-gold-light font-bold px-4 py-2 rounded flex items-center gap-2 shadow">
            <PlusCircle size={20} /> নতুন কোর্স যোগ করুন
          </button>
       </div>

       <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
             <BookOpen className="w-10 h-10 mx-auto text-islamic-green mb-2" />
             <h3 className="text-3xl font-bold block">২</h3>
             <span className="text-neutral-500 text-sm font-medium">আমার কোর্স</span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
             <Users className="w-10 h-10 mx-auto text-blue-500 mb-2" />
             <h3 className="text-3xl font-bold block">৮৪</h3>
             <span className="text-neutral-500 text-sm font-medium">মোট শিক্ষার্থী</span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
             <MessageSquare className="w-10 h-10 mx-auto text-orange-500 mb-2" />
             <h3 className="text-3xl font-bold block">১২</h3>
             <span className="text-neutral-500 text-sm font-medium">নতুন প্রশ্ন</span>
          </div>
       </div>

       <h2 className="text-xl font-bold text-neutral-800 mb-4">পরিচালিত কোর্সসমূহ</h2>
       <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
             <div className="flex justify-between items-start mb-4">
               <h3 className="font-bold text-lg text-neutral-800">সহীহ তিলাওয়াত ও তাজবিদ</h3>
               <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Online</span>
             </div>
             <p className="text-neutral-500 text-sm mb-4">মোট শিক্ষার্থী: ৪৫ জন</p>
             <div className="flex gap-2">
                <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded text-sm transition font-medium">নোট আপলোড</button>
                <button className="bg-islamic-green hover:bg-islamic-green-light text-white px-3 py-1 rounded text-sm transition font-medium">লাইভ ক্লাস শুরু</button>
             </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
             <div className="flex justify-between items-start mb-4">
               <h3 className="font-bold text-lg text-neutral-800">দৈনন্দিন ফিকহ</h3>
               <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">Offline</span>
             </div>
             <p className="text-neutral-500 text-sm mb-4">মোট শিক্ষার্থী: ৩৯ জন</p>
             <div className="flex gap-2">
                <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded text-sm transition font-medium">এটেন্ডেন্স নিন</button>
                <button className="bg-islamic-green hover:bg-islamic-green-light text-white px-3 py-1 rounded text-sm transition font-medium">নোটিশ বোর্ড</button>
             </div>
          </div>
       </div>
    </div>
  );
}
