import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Chào buổi sáng";
    if (h < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
        <span>Đang tổng hợp dữ liệu giảng dạy...</span>
      </div>
    </div>
  );

  const STATS = [
    { label: "Bài thi đã tạo", value: stats.quizCount, icon: "quiz", color: "text-teal-400", bg: "bg-teal-500/5" },
    { label: "Ngân hàng câu hỏi", value: stats.questionCount, icon: "database", color: "text-blue-400", bg: "bg-blue-500/5" },
    { label: "Lớp học quản lý", value: stats.studentCount || 1, icon: "groups", color: "text-emerald-400", bg: "bg-emerald-500/5" },
    { label: "Kết quả bài nộp", value: "85+", icon: "fact_check", color: "text-purple-400", bg: "bg-purple-500/5" },
  ];

  const QUICK_ACTIONS = [
    { label: "Tạo Quiz mới", icon: "add_circle", path: "/teacher/quiz", color: "from-teal-500 to-emerald-600" },
    { label: "Quản lý câu hỏi", icon: "database", path: "/teacher/question", color: "from-blue-500 to-indigo-600" },
    { label: "Thống kê kết quả", icon: "insights", path: "/teacher/result", color: "from-purple-500 to-pink-600" },
  ];

  return (
    <div className="py-2 min-h-full">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">{greeting()}, <span className="text-teal-500">{user?.name || "Giáo viên"}</span>! 👨‍🏫</h1>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Hôm nay bạn muốn quản lý nội dung giảng dạy nào?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-xl hover:bg-white/10 transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${s.bg} blur-3xl group-hover:scale-150 transition-transform duration-700`} />
            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{s.label}</span>
            </div>
            <p className={`text-3xl sm:text-4xl font-black relative z-10 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 mb-10">
        {/* Recent Content - Full Width */}
        <div className="w-full">
           <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 sm:p-8 shadow-2xl h-full">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-white flex items-center gap-2">
                   <span className="material-symbols-outlined text-teal-500">history</span>
                   Bài thi mới tạo
                 </h3>
                 <button onClick={() => navigate("/teacher/quiz")} className="text-[10px] font-black text-teal-500 uppercase tracking-widest hover:text-teal-400 transition-colors">Xem tất cả</button>
              </div>

              {recentQuizzes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                   <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-4xl text-slate-700">quiz</span>
                   </div>
                   <p className="text-slate-500 font-medium max-w-xs">Bạn chưa tạo bài thi nào. Hãy bắt đầu xây dựng nội dung giảng dạy đầu tiên!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentQuizzes.map((quiz) => (
                    <div key={quiz.id} className="p-5 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                             <span className="material-symbols-outlined">description</span>
                          </div>
                          <div>
                             <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors">{quiz.title}</h4>
                             <p className="text-xs text-slate-500 mt-0.5">{quiz.questions_count ?? 0} câu hỏi · {quiz.time_limit} phút</p>
                          </div>
                       </div>
                        <div className="flex items-center gap-2">
                            <button 
                              onClick={() => navigate("/teacher/quiz")}
                              className="p-2 rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white transition-all flex items-center gap-2 px-3"
                              title="Xem danh sách bài thi"
                            >
                              <span className="material-symbols-outlined text-lg">database</span>
                              <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Câu hỏi</span>
                            </button>
                        </div>
                    </div>
                  ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}