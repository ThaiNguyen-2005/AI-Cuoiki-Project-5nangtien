import React from "react";
import StudentNavbar from "../components/StudentNavbar";

export default function StudentAnalytics() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-28">
      <header className="p-6 text-center">
        <h1 className="text-xl font-black font-['Space_Grotesk'] text-white">Năng lực cá nhân</h1>
      </header>

      <main className="px-6 space-y-8 max-w-lg mx-auto">
        <div className="bg-linear-to-r from-teal-500/20 to-indigo-500/20 p-8 rounded-[40px] border border-white/10 text-center relative overflow-hidden">
          <p className="text-xs font-bold text-teal-400 mb-2">DỰ ĐOÁN ĐIỂM THI THẬT</p>
          <h2 className="text-6xl font-black text-white font-['Space_Grotesk']">8.75</h2>
          <p className="text-[10px] text-slate-400 mt-4">Cố gắng thêm 20% phần Hữu cơ để đạt 9+</p>
        </div>
        
        <div className="glass-card p-6 rounded-3xl border border-white/5">
           <h3 className="font-bold text-white mb-4">Gợi ý từ AI</h3>
           <p className="text-sm text-slate-400">Bạn đang làm rất tốt phần Vô cơ, hãy tập trung thêm vào Este-Lipit nhé!</p>
        </div>
      </main>

      <StudentNavbar />
    </div>
  );
}