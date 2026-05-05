import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => { logout(); navigate("/login"); };

  useEffect(() => {
    axiosClient.get("/student/dashboard")
      .then(r => setData(r.data))
      .catch(e => console.error("Lỗi dashboard:", e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-indigo-200">
      ⏳ Đang tải dữ liệu...
    </div>
  );

  return (
    <>
      <style>{`
        .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
        .glass-card { background:rgba(19,27,46,0.6); backdrop-filter:blur(12px); border:1px solid rgba(192,193,255,0.1); }
      `}</style>

      {/* Top header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 z-50 bg-[#2d3449]/70 backdrop-blur-lg border-b border-indigo-500/20 shadow-lg">
        <div className="flex items-center gap-4">
          <Link to="/student/profile" className="w-10 h-10 rounded-full bg-indigo-900 overflow-hidden border border-indigo-500/30 hover:border-teal-400 transition-all">
            <img alt="avatar" className="w-full h-full object-cover"
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "Student"}`} />
          </Link>
          <span className="font-black uppercase tracking-widest text-indigo-200 text-lg hidden sm:block">
            Kinetic Chemistry
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-indigo-500/10 text-indigo-200 transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button onClick={handleLogout} className="p-2 rounded-full hover:bg-red-500/10 text-red-400 transition-all">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      {/* Main content — pt-20 để tránh header, pb-24 để tránh bottom nav */}
      <main className="pt-20 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Xin chào, {user?.name || "bạn"}! 👋
          </h1>
          <p className="text-gray-400 italic">Sẵn sàng để chinh phục hóa học hôm nay?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Streak + Daily goal */}
          <div className="md:col-span-4 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-orange-400">local_fire_department</span>
                <span className="text-lg font-bold text-white">Chuỗi {data?.streak_days ?? 0} ngày</span>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i < (data?.streak_days ?? 0) % 5 ? "bg-indigo-400" : "bg-indigo-400/20"}`} />
                ))}
              </div>
              <p className="text-sm text-gray-400">Tiếp tục duy trì chuỗi học tập!</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white">Mục tiêu hằng ngày</h3>
                <span className="text-xs font-bold text-teal-400 bg-teal-400/10 px-2 py-1 rounded">
                  {data?.daily_goal_progress ?? 0}%
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-teal-400">✅</span>
                  <span className="text-sm text-white">Hoàn thành 1 bài Quiz</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-400">✅</span>
                  <span className="text-sm text-white">Ôn tập bài học mới</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bài kiểm tra sắp tới */}
          <div className="md:col-span-8">
            <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-[#1c2438] to-[#0f172a] border-l-4 border-indigo-400 h-full">
              <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full">
                SẮP DIỄN RA
              </span>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">
                {data?.upcoming_quiz?.title ?? "Chưa có bài kiểm tra nào"}
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Môn: {data?.upcoming_quiz?.subject ?? "Hóa học"}
              </p>
              <button
                onClick={() => navigate("/student/quiz")}
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wide transition-all active:scale-95"
              >
                Làm bài ngay →
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StudentDashboard;