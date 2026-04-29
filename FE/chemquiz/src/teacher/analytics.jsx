import React from "react";
import TeacherNavbar from "../components/TeacherNavbar";

export default function TeacherAnalytics() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-28">
      <header className="p-6 border-b border-white/5 sticky top-0 bg-[#0b1326]/80 backdrop-blur-md z-40">
        <h1 className="text-xl font-black font-['Space_Grotesk'] text-white">Báo cáo chuyên sâu</h1>
      </header>

      <main className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Thống kê nhanh */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-500/10 p-5 rounded-3xl border border-indigo-500/20">
            <p className="text-[10px] font-bold text-indigo-300 uppercase mb-1">Độ khó TB</p>
            <h3 className="text-2xl font-black text-white">Khá</h3>
          </div>
          <div className="bg-teal-500/10 p-5 rounded-3xl border border-teal-500/20">
            <p className="text-[10px] font-bold text-teal-300 uppercase mb-1">Chất lượng lớp</p>
            <h3 className="text-2xl font-black text-white">↑ 85%</h3>
          </div>
        </div>

        {/* Chuyên đề cần ôn tập */}
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-white/5">
          <h3 className="font-bold text-white mb-4">Lỗ hổng kiến thức của lớp</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Hóa hữu cơ - Este</span>
                <span className="text-red-400">42% hiểu bài</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 w-[42%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Điện phân dung dịch</span>
                <span className="text-yellow-400">65% hiểu bài</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 w-[65%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách học sinh cần hỗ trợ */}
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-white/5">
          <h3 className="font-bold text-white mb-4">Học sinh cần lưu ý</h3>
          <div className="space-y-3">
            {['Nguyễn Văn A', 'Trần Thị B'].map((name, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-2xl">
                <span className="text-sm">{name}</span>
                <span className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 rounded-lg font-bold">Điểm thấp ( {'<'} 5.0 )</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <TeacherNavbar />
    </div>
  );
}