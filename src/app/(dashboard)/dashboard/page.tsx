import React from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div>
       <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">আসসালামু আলাইকুম, আব্দুল্লাহ!</h1>
            <p className="text-neutral-500">আপনার আজকের ক্লাসের আপডেট নিচে দেওয়া হলো।</p>
          </div>
          <div className="w-12 h-12 bg-islamic-green text-white rounded-full flex items-center justify-center font-bold text-xl">
             আ
          </div>
       </div>

       {/* Progress Stats */}
       <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
             <div className="bg-blue-100 text-blue-600 p-4 rounded-lg"><BookOpen size={28} /></div>
             <div>
                <h3 className="text-3xl font-bold">৩</h3>
                <p className="text-neutral-500 font-medium">চলমান কোর্স</p>
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
             <div className="bg-green-100 text-green-600 p-4 rounded-lg"><CheckCircle size={28} /></div>
             <div>
                <h3 className="text-3xl font-bold">১২</h3>
                <p className="text-neutral-500 font-medium">সম্পন্ন ক্লাস</p>
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
             <div className="bg-orange-100 text-orange-600 p-4 rounded-lg"><Clock size={28} /></div>
             <div>
                <h3 className="text-3xl font-bold">৮৫%</h3>
                <p className="text-neutral-500 font-medium">উপস্থিতি হার</p>
             </div>
          </div>
       </div>

       {/* Enrolled Courses */}
       <h2 className="text-xl font-bold text-neutral-800 mb-4">আপনার এনরোলকৃত কোর্স</h2>
       <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-neutral-100 border-b border-neutral-200">
                <tr>
                   <th className="p-4 text-neutral-600">কোর্সের নাম</th>
                   <th className="p-4 text-neutral-600">অগ্রগতি</th>
                   <th className="p-4 text-neutral-600">পরবর্তী ক্লাস</th>
                   <th className="p-4 text-neutral-600">স্ট্যাটাস</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-neutral-100">
                <tr>
                   <td className="p-4 font-semibold text-neutral-800">সহীহ তিলাওয়াত ও তাজবিদ</td>
                   <td className="p-4">
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                         <div className="bg-islamic-green h-2 rounded-full w-[60%]"></div>
                      </div>
                      <span className="text-xs text-neutral-500 mt-1 block">৬০% সম্পন্ন</span>
                   </td>
                   <td className="p-4 text-neutral-600">আজ সংধ্যা ৭:০০</td>
                   <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">চলমান</span></td>
                </tr>
                <tr>
                   <td className="p-4 font-semibold text-neutral-800">হাদিস পরিচিতি</td>
                   <td className="p-4">
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                         <div className="bg-islamic-green h-2 rounded-full w-[20%]"></div>
                      </div>
                      <span className="text-xs text-neutral-500 mt-1 block">২০% সম্পন্ন</span>
                   </td>
                   <td className="p-4 text-neutral-600">আগামীকাল বিকাল ৪:০০</td>
                   <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">চলমান</span></td>
                </tr>
             </tbody>
          </table>
       </div>
    </div>
  );
}
