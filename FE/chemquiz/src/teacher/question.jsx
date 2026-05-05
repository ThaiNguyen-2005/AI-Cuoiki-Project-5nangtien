import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function TeacherQuestion() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("quizzes");
  const [deletingId, setDeletingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qRes, quizRes] = await Promise.all([
        axiosClient.get("/teacher/all-questions"),
        axiosClient.get("/teacher/quizzes"),
      ]);
      setQuestions(Array.isArray(qRes.data) ? qRes.data : []);
      setQuizzes(Array.isArray(quizRes.data) ? quizRes.data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id) => {
    if (!confirm("Xoá quiz này?")) return;
    setDeletingId(id);
    try {
      await axiosClient.delete(`/teacher/quizzes/${id}`);
      setQuizzes(prev => prev.filter(q => q.id !== id));
      setQuestions(prev => prev.filter(q => q.quiz_id !== id));
    } catch { alert("Xoá thất bại!"); }
    finally { setDeletingId(null); }
  };

  const filteredQuestions = questions.filter(q =>
    q.content?.toLowerCase().includes(search.toLowerCase()) ||
    q.quiz_title?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredQuizzes = quizzes.filter(q =>
    q.title?.toLowerCase().includes(search.toLowerCase())
  );

  const LABELS = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-[#080e1c] text-[#dbe2fd] pb-32 font-['Space_Grotesk',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .glass { background: rgba(15,22,40,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(99,102,241,0.15); }
        .glass-bright { background: rgba(30,40,70,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(99,102,241,0.25); }
        .btn-primary { background: linear-gradient(135deg,#6366f1,#4fdbc8); color:#080e1c; font-weight:700; transition:all 0.2s; }
        .btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
        .btn-ghost { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); transition:all 0.2s; }
        .btn-ghost:hover { background:rgba(255,255,255,0.1); }
        input { background:rgba(255,255,255,0.04) !important; border:1px solid rgba(99,102,241,0.2) !important; color:#dbe2fd !important; }
        input:focus { outline:none; border-color:#6366f1 !important; }
        .tab-active { background:linear-gradient(135deg,#6366f1,#4fdbc8); color:#080e1c; font-weight:800; }
        .tab-idle { background:rgba(255,255,255,0.05); color:#6b7280; }
        .card-hover { transition: all 0.2s; }
        .card-hover:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-1px); }
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade-in { animation: fadeIn 0.3s ease; }
        .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      <header className="fixed top-0 w-full z-50 glass border-b border-indigo-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/teacher/dashboard")} className="btn-ghost p-2 rounded-xl text-gray-400 hover:text-white">
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Giáo viên</p>
            <h1 className="text-base font-black font-['Syne',sans-serif] text-white leading-tight">Ngân hàng</h1>
          </div>
        </div>
        <button onClick={() => navigate("/teacher/quiz")} className="btn-primary px-4 py-2 rounded-xl text-xs flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm" style={{ fontSize: "16px" }}>add</span>
          Tạo Quiz
        </button>
      </header>

      <main className="pt-20 px-4 max-w-lg mx-auto space-y-4 fade-in">
        <div className="relative pt-3">
          <span className="material-symbols-outlined absolute left-3 top-1/2 translate-y-0.5 text-indigo-400 pointer-events-none" style={{ fontSize: "18px" }}>search</span>
          <input className="w-full rounded-xl pl-9 pr-4 py-3 text-sm" placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[{ key: "quizzes", label: "Quiz", icon: "quiz" }, { key: "questions", label: "Câu hỏi", icon: "help" }].map(({ key, label, icon }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === key ? "tab-active" : "tab-idle"}`}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{icon}</span>
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-md ${activeTab === key ? "bg-black/20" : "bg-white/10"}`}>
                {key === "quizzes" ? filteredQuizzes.length : filteredQuestions.length}
              </span>
            </button>
          ))}
        </div>

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}
          </div>
        )}

        {/* Tab Quiz */}
        {!loading && activeTab === "quizzes" && (
          <div className="space-y-3">
            {filteredQuizzes.length === 0 ? (
              <div className="glass rounded-2xl p-10 text-center">
                <span className="material-symbols-outlined text-4xl text-indigo-400/40">quiz</span>
                <p className="text-gray-500 text-sm mt-2">Chưa có quiz nào</p>
                <button onClick={() => navigate("/teacher/quiz")} className="btn-primary mt-4 px-5 py-2.5 rounded-xl text-xs">
                  Tạo quiz đầu tiên
                </button>
              </div>
            ) : filteredQuizzes.map(quiz => (
              <div key={quiz.id} className="glass card-hover rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${quiz.status === "published" ? "bg-teal-400/15 text-teal-400" : "bg-gray-500/15 text-gray-400"}`}>
                        {quiz.status === "published" ? "Đã đăng" : "Nháp"}
                      </span>
                      <span className="text-[10px] text-gray-500">Lớp {quiz.grade}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{quiz.title}</h3>
                    {quiz.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{quiz.description}</p>}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="material-symbols-outlined text-indigo-400" style={{ fontSize: "13px" }}>quiz</span>
                        {quiz.questions_count ?? 0} câu
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="material-symbols-outlined text-teal-400" style={{ fontSize: "13px" }}>timer</span>
                        {quiz.time_limit} phút
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="material-symbols-outlined text-yellow-400" style={{ fontSize: "13px" }}>emoji_events</span>
                        {quiz.passing_score}%
                      </span>
                    </div>
                  </div>
                  <button onClick={() => deleteQuiz(quiz.id)} disabled={deletingId === quiz.id}
                    className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0 disabled:opacity-40">
                    {deletingId === quiz.id
                      ? <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      : <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>delete</span>
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Câu hỏi */}
        {!loading && activeTab === "questions" && (
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="glass rounded-2xl p-10 text-center">
                <span className="material-symbols-outlined text-4xl text-indigo-400/40">help_outline</span>
                <p className="text-gray-500 text-sm mt-2">Chưa có câu hỏi nào</p>
                <p className="text-gray-600 text-xs mt-1">Tạo quiz và thêm câu hỏi vào</p>
              </div>
            ) : filteredQuestions.map(q => (
              <div key={q.id} className="glass card-hover rounded-2xl overflow-hidden">
                <button className="w-full text-left p-4" onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}>
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>help</span>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium line-clamp-2">{q.content}</p>
                      <p className="text-xs text-indigo-400 mt-1">📚 {q.quiz_title} · Lớp {q.quiz_grade}</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-500 flex-shrink-0 transition-transform" style={{ fontSize: "18px", transform: expandedId === q.id ? "rotate(180deg)" : "rotate(0deg)" }}>
                      expand_more
                    </span>
                  </div>
                </button>

                {expandedId === q.id && q.options && (
                  <div className="px-4 pb-4 space-y-2 border-t border-white/5 pt-3">
                    {(Array.isArray(q.options) ? q.options : JSON.parse(q.options)).map((opt, oi) => (
                      <div key={oi} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${q.correct_index === oi ? "bg-teal-400/10 border border-teal-400/30 text-teal-300 font-bold" : "bg-white/3 text-gray-400"}`}>
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 ${q.correct_index === oi ? "bg-teal-400 text-[#080e1c]" : "bg-white/10"}`}>
                          {LABELS[oi]}
                        </span>
                        {opt}
                        {q.correct_index === oi && <span className="material-symbols-outlined ml-auto" style={{ fontSize: "14px" }}>check_circle</span>}
                      </div>
                    ))}
                    {q.explanation && (
                      <div className="mt-2 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300">
                        <span className="font-bold">Giải thích: </span>{q.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}