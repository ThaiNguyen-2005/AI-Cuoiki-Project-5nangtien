import React from "react";
import TeacherNavbar from "../components/TeacherNavbar";

export default function TeacherAnalytics() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-28">
      <header className="p-6 border-b border-white/5 sticky top-0 bg-[#0b1326]/80 backdrop-blur-md">
        <h1 className="text-xl font-black font-['Space_Grotesk'] text-white">Báo cáo chuyên sâu</h1>
      </header>

      <main className="p-6 space-y-6 max-w-5xl mx-auto">
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-white/5">
          <h3 className="font-bold text-white mb-4">Học sinh cần lưu ý</h3>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl">
            <span className="text-sm">Nguyễn Văn A</span>
            <span className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 rounded-lg font-bold">
              Điểm thấp ( {'<'} 5.0 )
            </span>
          </div>
        </div>
      </main>

      <TeacherNavbar />
    </div>
  );
}