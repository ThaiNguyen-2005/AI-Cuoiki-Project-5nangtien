import React from "react";
import StudentNavbar from "../components/StudentNavbar";

export default function StudentAnalytics() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-28">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card { background: rgba(19, 27, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }
      `}} />

      <header className="p-6 text-center">
        <h1 className="text-xl font-black font-['Space_Grotesk'] text-white">Năng lực cá nhân</h1>
        <p className="text-xs text-slate-500 uppercase mt-1 tracking-widest font-bold">Dựa trên 15 bài đã làm</p>
      </header>

      <main className="px-6 space-y-8 max-w-lg mx-auto">
        {/* Biểu đồ mạng nhện phân tích năng lực (Vẽ bằng SVG) */}
        <div className="relative flex justify-center py-10">
          <svg width="240" height="240" viewBox="0 0 200 200" className="drop-shadow-[0_0_20px_rgba(79,219,200,0.2)]">
            {/* Các vòng đa giác nền */}
            <polygon points="100,10 190,70 160,180 40,180 10,70" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
            <polygon points="100,40 160,85 140,150 60,150 40,85" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            {/* Vùng chỉ số của học sinh */}
            <polygon points="100,30 180,80 150,170 80,160 30,90" fill="rgba(79, 219, 200, 0.4)" stroke="#4fdbc8" strokeWidth="2" />
          </svg>
          
          {/* Nhãn các đỉnh */}
          <span className="absolute top-2 text-[10px] font-bold text-indigo-300">VÔ CƠ</span>
          <span className="absolute right-0 top-1/3 text-[10px] font-bold text-indigo-300">HỮU CƠ</span>
          <span className="absolute bottom-2 left-1/4 text-[10px] font-bold text-indigo-300">TÍNH TOÁN</span>
          <span className="absolute bottom-2 right-1/4 text-[10px] font-bold text-indigo-300">LÝ THUYẾT</span>
          <span className="absolute left-0 top-1/3 text-[10px] font-bold text-indigo-300">TỐC ĐỘ</span>
        </div>

        {/* Khối dự đoán điểm số */}
        <div className="bg-gradient-to-r from-teal-500/20 to-indigo-500/20 p-8 rounded-[40px] border border-white/10 text-center relative overflow-hidden shadow-xl shadow-teal-500/10">
          <div className="absolute top-0 right-0 w-20 h-20 bg-teal-400/10 blur-3xl"></div>
          <p className="text-xs font-bold text-teal-400 mb-2">DỰ ĐOÁN ĐIỂM THI THẬT</p>
          <h2 className="text-6xl font-black text-white font-['Space_Grotesk']">8.75</h2>
          <p className="text-[10px] text-slate-400 mt-4">
            Cố gắng thêm <b className="text-white">20%</b> phần <b className="text-white">Hữu cơ</b> để đạt 9+
          </p>
        </div>
        
        {/* Khối gợi ý từ hệ thống AI */}
        <div className="glass-card p-6 rounded-3xl flex items-start gap-4">
           <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
             <span className="material-symbols-outlined text-indigo-400">tips_and_updates</span>
           </div>
           <div>
             <h3 className="font-bold text-white mb-1">Gợi ý lộ trình</h3>
             <p className="text-sm text-slate-400 leading-relaxed">
               Bạn đang giải quyết rất tốt các bài tập Vô cơ. Tuần này hãy tập trung làm thêm các đề thi thử chuyên đề Este-Lipit để củng cố kỹ năng Hữu cơ nhé!
             </p>
           </div>
        </div>
      </main>

      <StudentNavbar />
    </div>
  );
}