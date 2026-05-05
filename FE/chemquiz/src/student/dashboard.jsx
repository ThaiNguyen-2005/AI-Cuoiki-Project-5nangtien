import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/student/dashboard")
      .then(r => setData(r.data))
      .catch(e => console.error("Lỗi dashboard:", e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <span>Đang chuẩn bị lộ trình học tập...</span>
      </div>
    </div>
  );

  const STATS = [
    { label: "Lượt làm bài",   value: data?.total_attempts ?? 0, icon: "assignment", color: "text-blue-400", bg: "bg-blue-500/5" },
    { label: "Điểm trung bình", value: `${data?.average_score ?? 0}%`, icon: "analytics", color: "text-teal-400", bg: "bg-teal-500/5" },
    { label: "Điểm cao nhất",  value: `${data?.best_score ?? 0}%`, icon: "emoji_events", color: "text-yellow-400", bg: "bg-yellow-500/5" },
    { label: "Bài đã vượt qua", value: data?.total_passed ?? 0, icon: "verified", color: "text-purple-400", bg: "bg-purple-500/5" },
  ];

  return (
    <div className="py-2 min-h-full text-white">
      <div className="mb-10">
        <h1 className="text-5xl font-black text-white tracking-tighter">Chào mừng, <span className="text-blue-500">{user?.name || "Học viên"}</span>! 👋</h1>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Hôm nay bạn muốn chinh phục kiến thức nào?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-xl hover:bg-white/10 transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${s.bg} blur-3xl group-hover:scale-150 transition-transform duration-700`} />
            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{s.label}</span>
            </div>
            <p className={`text-4xl font-black relative z-10 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Streak & Goals */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/5 p-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 blur-3xl"></div>
             <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="material-symbols-outlined text-orange-400 text-3xl animate-pulse">local_fire_department</span>
                <div>
                  <h3 className="text-xl font-black text-white leading-tight">Chuỗi {data?.streak_days ?? 0} ngày</h3>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tuyệt vời! Tiếp tục duy trì nhé</p>
                </div>
             </div>
             <div className="flex gap-1.5 mb-2 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full transition-all ${i < (data?.streak_days ?? 0) % 5 ? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]" : "bg-white/5"}`} />
                ))}
             </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/5 p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-400">task_alt</span>
                Mục tiêu hằng ngày
              </h3>
              <span className="text-[10px] font-black text-teal-400 bg-teal-400/10 px-2 py-1 rounded-lg border border-teal-400/20 uppercase tracking-tighter">
                {data?.daily_goal_progress ?? 0}%
              </span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${data?.daily_goal_progress >= 100 ? "bg-teal-500 text-white" : "bg-white/5 text-slate-500"}`}>
                <span className="material-symbols-outlined text-lg">{data?.daily_goal_progress >= 100 ? "check" : "radio_button_unchecked"}</span>
              </div>
              <span className={`text-sm font-medium ${data?.daily_goal_progress >= 100 ? "text-white line-through opacity-50" : "text-slate-300"}`}>
                Hoàn thành 1 bài Quiz hôm nay
              </span>
            </div>
          </div>
        </div>

        {/* Highlight Section */}
        <div className="lg:col-span-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-10 shadow-2xl h-full relative overflow-hidden group flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] -mr-32 -mt-32 group-hover:bg-blue-500/20 transition-all duration-1000"></div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20 uppercase tracking-widest inline-block mb-6">
                Đề xuất học tập
              </span>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight max-w-lg">
                {data?.upcoming_quiz?.title ?? "🎉 Chúc mừng! Bạn đã hoàn thành tất cả bài thi."}
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md leading-relaxed">
                {data?.upcoming_quiz 
                  ? `Môn: ${data?.upcoming_quiz?.subject || "Hóa học"}. Bài thi này sẽ giúp bạn củng cố kiến thức nền tảng một cách tốt nhất.`
                  : "Bạn đã vượt qua mọi thử thách hôm nay. Hãy nghỉ ngơi hoặc xem lại lịch sử làm bài để rút kinh nghiệm nhé!"}
              </p>
              
              <button
                onClick={() => navigate(data?.upcoming_quiz ? "/student/quiz" : "/student/history")}
                className="group/btn relative inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-blue-500/20 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                <span className="relative">{data?.upcoming_quiz ? "Bắt đầu làm bài" : "Xem lịch sử"}</span>
                <span className="material-symbols-outlined relative transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;