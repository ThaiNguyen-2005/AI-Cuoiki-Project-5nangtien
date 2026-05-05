import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import TeacherNavbar from "../components/TeacherNavbar";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [stats, setStats] = useState({ quizCount: 0, questionCount: 0, studentCount: 0 });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizRes, allQRes] = await Promise.all([
          axiosClient.get("/teacher/quizzes"),
          axiosClient.get("/teacher/all-questions").catch(() => ({ data: [] })),
        ]);
        const quizzes = Array.isArray(quizRes.data) ? quizRes.data : [];
        const questions = Array.isArray(allQRes.data) ? allQRes.data : [];
        setStats({
          quizCount: quizzes.length,
          questionCount: questions.length,
          studentCount: 0,
        });
        setRecentQuizzes(quizzes.slice(0, 3));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout ? logout() : (localStorage.clear(), navigate("/login"));
  };

  const displayName = user?.name || localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data") || "{}").name
    : "Giáo viên";

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Chào buổi sáng";
    if (h < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const statCards = [
    {
      label: "Quiz đã tạo",
      value: stats.quizCount,
      icon: "auto_awesome",
      color: "from-violet-500/20 to-indigo-500/20",
      border: "border-violet-500/30",
      textColor: "text-violet-300",
      iconColor: "text-violet-400",
    },
    {
      label: "Câu hỏi",
      value: stats.questionCount,
      icon: "help",
      color: "from-teal-500/20 to-cyan-500/20",
      border: "border-teal-500/30",
      textColor: "text-teal-300",
      iconColor: "text-teal-400",
    },
  ];

  const quickActions = [
    { label: "Tạo Quiz mới", icon: "add_circle", path: "/teacher/quiz", color: "bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/20" },
    { label: "Ngân hàng", icon: "database", path: "/teacher/question", color: "bg-teal-500/10 border-teal-500/20 text-teal-300 hover:bg-teal-500/20" },
    { label: "Kết quả", icon: "assignment_turned_in", path: "/teacher/result", color: "bg-amber-500/10 border-amber-500/20 text-amber-300 hover:bg-amber-500/20" },
    { label: "Phân tích", icon: "insights", path: "/teacher/analytics", color: "bg-pink-500/10 border-pink-500/20 text-pink-300 hover:bg-pink-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#070d1a] text-[#dbe2fd] pb-28 font-['DM_Sans',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Clash+Display:wght@600;700&display=swap');
        .glass { background: rgba(13,20,40,0.8); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.07); }
        .glow-violet { box-shadow: 0 0 40px rgba(139,92,246,0.15); }
        .glow-teal { box-shadow: 0 0 40px rgba(79,219,200,0.12); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.4s 0.1s ease both; }
        .fade-up-3 { animation: fadeUp 0.4s 0.2s ease both; }
        .fade-up-4 { animation: fadeUp 0.4s 0.3s ease both; }
        .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 16px; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .mesh-bg { background: radial-gradient(ellipse 80% 50% at 10% 10%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(79,219,200,0.08) 0%, transparent 60%); }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/5 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm" style={{ fontSize: "16px" }}>science</span>
          </div>
          <span className="font-bold text-white text-sm tracking-wide">Kinetic Chemistry</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleLogout} className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>logout</span>
          </button>
          <Link to="/profile" className="w-9 h-9 rounded-xl overflow-hidden border border-violet-500/30 hover:border-violet-400/60 transition-all">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" alt="avatar" className="w-full h-full object-cover" />
          </Link>
        </div>
      </header>

      <main className="pt-20 px-4 max-w-lg mx-auto mesh-bg">
        {/* Greeting */}
        <div className="fade-up pt-4 pb-2">
          <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">{greeting()}</p>
          <h2 className="text-2xl font-bold text-white mt-0.5">
            {displayName || "Giáo viên"} 👋
          </h2>
          <p className="text-sm text-slate-400 mt-1">Hôm nay bạn muốn làm gì?</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-5 fade-up-2">
          {loading
            ? [1, 2].map(i => <div key={i} className="skeleton h-28" />)
            : statCards.map((card, i) => (
              <div key={i} className={`glass rounded-2xl p-4 bg-gradient-to-br ${card.color} border ${card.border}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`material-symbols-outlined ${card.iconColor}`} style={{ fontSize: "20px" }}>{card.icon}</span>
                  <div className={`w-2 h-2 rounded-full ${card.iconColor.replace("text-", "bg-")} opacity-60`} />
                </div>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">{card.label}</p>
              </div>
            ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 fade-up-3">
          <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase mb-3">Truy cập nhanh</p>
          <div className="grid grid-cols-2 gap-2.5">
            {quickActions.map((action, i) => (
              <button key={i} onClick={() => navigate(action.path)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${action.color}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{action.icon}</span>
                <span className="text-sm font-semibold">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="mt-6 fade-up-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Quiz gần đây</p>
            <button onClick={() => navigate("/teacher/question")} className="text-xs text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              Xem tất cả →
            </button>
          </div>

          {loading ? (
            <div className="space-y-2.5">
              {[1, 2].map(i => <div key={i} className="skeleton h-16" />)}
            </div>
          ) : recentQuizzes.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <span className="material-symbols-outlined text-3xl text-slate-600">quiz</span>
              <p className="text-slate-500 text-sm mt-2">Chưa có quiz nào</p>
              <button onClick={() => navigate("/teacher/quiz")}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-500 to-teal-400 text-white">
                Tạo quiz đầu tiên
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentQuizzes.map((quiz, i) => (
                <div key={quiz.id} className="glass rounded-2xl p-4 flex items-center justify-between hover:border-violet-500/20 transition-all cursor-pointer"
                  onClick={() => navigate("/teacher/question")}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-violet-400" style={{ fontSize: "18px" }}>quiz</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white line-clamp-1">{quiz.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{quiz.questions_count ?? 0} câu · {quiz.time_limit} phút</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-lg font-bold ${quiz.status === "published" ? "bg-teal-400/15 text-teal-400" : "bg-slate-500/15 text-slate-400"}`}>
                    {quiz.status === "published" ? "Đã đăng" : "Nháp"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <TeacherNavbar />
    </div>
  );
}