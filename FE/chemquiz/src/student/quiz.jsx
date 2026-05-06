import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const QUIZZES_PER_PAGE = 6;

function QuizList({ onStart }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fGrade, setFGrade] = useState("all");
  const [fLevel, setFLevel] = useState("all");
  const [fType, setFType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosClient.get("/student/quizzes")
      .then(r => setQuizzes(r.data?.data ?? r.data ?? []))
      .catch(() => setQuizzes([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = quizzes.filter(q => {
    const matchesSearch = q.title?.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = fGrade === "all" || String(q.grade) === fGrade;
    const matchesLevel = fLevel === "all" || q.difficulty === fLevel;
    const matchesType = fType === "all" || q.knowledge_type?.toLowerCase() === fType.toLowerCase();
    return matchesSearch && matchesGrade && matchesLevel && matchesType;
  });

  const totalPages = Math.ceil(filtered.length / QUIZZES_PER_PAGE);
  const paginatedQuizzes = filtered.slice((currentPage - 1) * QUIZZES_PER_PAGE, currentPage * QUIZZES_PER_PAGE);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <span>Đang tìm kiếm bài thi phù hợp...</span>
      </div>
    </div>
  );

  return (
    <div className="py-2 min-h-full pb-20">
      <div className="mb-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">Làm Bài <span className="text-blue-500">Kiểm Tra</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">
            {filtered.length} bài thi đang sẵn sàng cho bạn
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative group w-full md:w-64">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
            <input
              value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Tìm tên bài thi..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-xs text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all focus:bg-white/10"
            />
          </div>

          <select
            value={fGrade} onChange={e => { setFGrade(e.target.value); setCurrentPage(1); }}
            className="w-full md:w-40 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:border-blue-500/50 appearance-none cursor-pointer hover:bg-white/10"
          >
            <option value="all" className="bg-[#0b1326]">Tất cả lớp</option>
            <option value="10" className="bg-[#0b1326]">Lớp 10</option>
            <option value="11" className="bg-[#0b1326]">Lớp 11</option>
            <option value="12" className="bg-[#0b1326]">Lớp 12</option>
          </select>

          <select
            value={fLevel} onChange={e => { setFLevel(e.target.value); setCurrentPage(1); }}
            className="w-full md:w-40 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:border-blue-500/50 appearance-none cursor-pointer hover:bg-white/10"
          >
            <option value="all" className="bg-[#0b1326]">Tất cả mức độ</option>
            <option value="easy" className="bg-[#0b1326]">Dễ</option>
            <option value="medium" className="bg-[#0b1326]">Vừa</option>
            <option value="hard" className="bg-[#0b1326]">Khó</option>
            <option value="mixed" className="bg-[#0b1326]">Hỗn hợp</option>
          </select>

          <select
            value={fType} onChange={e => { setFType(e.target.value); setCurrentPage(1); }}
            className="w-full md:w-40 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:border-blue-500/50 appearance-none cursor-pointer hover:bg-white/10"
          >
            <option value="all" className="bg-[#0b1326]">Tất cả phân loại</option>
            <option value="Khái niệm" className="bg-[#0b1326]">Khái niệm</option>
            <option value="Lý thuyết" className="bg-[#0b1326]">Lý thuyết</option>
            <option value="Định lý" className="bg-[#0b1326]">Định lý</option>
            <option value="Tính chất" className="bg-[#0b1326]">Tính chất</option>
            <option value="Dạng bài tập" className="bg-[#0b1326]">Dạng bài tập</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-10 flex justify-center">
          <div className="bg-white/5 rounded-[3rem] border border-white/5 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden group max-w-xl w-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px]" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl text-blue-500 animate-pulse">description</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Không tìm thấy</h3>
              <p className="text-slate-500 font-medium mb-0 text-lg leading-relaxed">
                Không có bài thi nào khớp với bộ lọc của bạn.<br />
                Vui lòng thử tìm kiếm với từ khóa khác.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedQuizzes.map((q) => (
              <div key={q.id} className={`bg-white/5 backdrop-blur-xl border rounded-[2.5rem] p-6 sm:p-8 transition-all group relative overflow-hidden flex flex-col ${q.is_blocked ? 'border-white/5 opacity-80' : 'border-white/5 hover:border-blue-500/30 hover:bg-white/10 shadow-xl'}`}>
                <div className="flex-1 relative z-10">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-tighter border border-blue-500/10">
                      Lớp {q.grade || "10"}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter border ${q.difficulty === 'hard' ? 'bg-rose-500/10 text-rose-400 border-rose-500/10' :
                        q.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/10' :
                          q.difficulty === 'mixed' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/10' :
                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/10'
                      }`}>
                      {q.difficulty === 'hard' ? 'Mức: Khó' : q.difficulty === 'medium' ? 'Mức: Vừa' : q.difficulty === 'mixed' ? 'Mức: Hỗn hợp' : 'Mức: Dễ'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase tracking-tighter border border-purple-500/10">
                      {q.knowledge_type || "Tổng hợp"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-[9px] font-black uppercase tracking-tighter border border-white/10">
                      {q.time_limit} Phút
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors mb-2 tracking-tight">{q.title}</h3>

                  {/* Chapter Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(q.chapters) && q.chapters.map((chapter, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 text-[9px] font-black uppercase tracking-tighter border border-teal-500/10">
                        {typeof chapter === 'string' ? chapter : chapter.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[10px] text-blue-400">school</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">GV: {q.teacher_name}</p>
                  </div>

                  <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed min-h-[40px]">{q.description || "Chưa có mô tả cho bài thi này."}</p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-slate-600 uppercase font-black mb-1">Số câu hỏi</p>
                      <p className="text-white font-bold text-sm">{q.total_questions || "?"} câu</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-slate-600 uppercase font-black mb-1">Lượt làm</p>
                      <p className={`font-bold text-sm ${q.is_blocked ? 'text-red-400' : 'text-teal-400'}`}>
                        {q.attempts_count || 0}/{q.max_attempts || 3}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  disabled={q.is_blocked}
                  onClick={() => onStart(q)}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all relative z-10 ${q.is_blocked
                    ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98]'
                    }`}
                >
                  <span>{q.is_blocked ? "Đã hết lượt" : (q.attempted ? "Làm lại bài" : "Bắt đầu thi")}</span>
                  {!q.is_blocked && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                </button>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors" />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/10 transition-all shadow-xl"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl font-black text-xs transition-all border ${currentPage === i + 1 ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/10 transition-all shadow-xl"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TakeQuiz({ quiz, questions, onFinish, onCancel }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.time_limit * 60);
  const [showConfirm, setShowConfirm] = useState(false);

  const completedCount = Object.keys(answers).length;
  const progress = (completedCount / questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      answers: Object.entries(answers).map(([qid, ans]) => ({
        question_id: qid,
        selected_index: ans
      })),
      time_spent: quiz.time_limit * 60 - timeLeft
    };
    try {
      const res = await axiosClient.post(`/student/exam/${quiz.id}`, payload);
      onFinish(res.data);
    } catch (err) { alert("Lỗi khi nộp bài!"); }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[current];
  const urgent = timeLeft < 60;

  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto py-6 lg:py-10">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Tiến độ làm bài</span>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">{completedCount} / {questions.length} Câu</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div className="h-full bg-linear-to-r from-blue-600 to-indigo-500 transition-all duration-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Quiz Area */}
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl lg:text-4xl font-black text-white tracking-tight">{quiz.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Câu hỏi {current + 1} / {questions.length}</p>
                <span className="text-slate-700 text-xs">•</span>
                <p className="text-xs text-blue-400 font-black uppercase tracking-widest italic">GV: {quiz.teacher_name}</p>
              </div>
            </div>
            <div className={`px-8 py-4 rounded-4xl border flex items-center gap-4 transition-all ${urgent ? 'bg-red-500/10 border-red-500/20 shadow-lg shadow-red-500/10' : 'bg-white/5 border-white/10 shadow-xl'}`}>
              <span className={`material-symbols-outlined text-3xl ${urgent ? 'text-red-400 animate-pulse' : 'text-blue-500'}`}>timer</span>
              <span className={`text-3xl lg:text-4xl font-black font-mono ${urgent ? 'text-red-400' : 'text-white'}`}>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px]" />
            <div className="relative z-10">
              <p className="text-xl lg:text-2xl text-white font-bold leading-relaxed mb-12">{currentQuestion.content}</p>
              <div className="grid grid-cols-1 gap-5">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers({ ...answers, [currentQuestion.id]: i })}
                    className={`flex items-center gap-6 p-6 lg:p-8 rounded-4xl border transition-all text-left group ${answers[currentQuestion.id] === i ? "bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-500/30 scale-[1.01]" : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"}`}
                  >
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${answers[currentQuestion.id] === i ? "bg-white text-blue-600" : "bg-white/10 text-slate-500"}`}>{String.fromCharCode(65 + i)}</span>
                    <span className="font-bold text-base lg:text-lg">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white/5 border border-white/5 rounded-[2.5rem] p-4 backdrop-blur-xl shadow-xl">
            <button onClick={onCancel} className="px-8 py-4 text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Thoát</button>
            <div className="flex gap-4">
              <button disabled={current === 0} onClick={() => setCurrent(current - 1)} className="p-4 rounded-2xl bg-white/5 text-white disabled:opacity-20 hover:bg-white/10 border border-white/5 transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
              {current === questions.length - 1 ? (
                <button onClick={() => setShowConfirm(true)} className="px-10 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98]">Nộp bài</button>
              ) : (
                <button onClick={() => setCurrent(current + 1)} className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"><span className="material-symbols-outlined">chevron_right</span></button>
              )}
            </div>
          </div>
        </div>

        {/* Question Map Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl sticky top-4">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Bản đồ câu hỏi</h3>
            <div className="grid grid-cols-5 gap-3">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrent(i)}
                  className={`h-12 rounded-2xl font-bold text-sm transition-all border ${current === i ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-110 z-10" :
                      answers[q.id] !== undefined ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" :
                        "bg-white/5 border-white/10 text-slate-500 hover:border-white/20"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-[10px] text-slate-500 font-bold">Đang xem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500/20 border border-indigo-500/30"></div>
                <span className="text-[10px] text-slate-500 font-bold">Đã làm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-[#0b1326] border border-white/10 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 text-blue-500">
              <span className="material-symbols-outlined text-4xl">send</span>
            </div>
            <h3 className="text-2xl font-black text-white text-center mb-2 tracking-tight">Xác nhận nộp bài?</h3>
            <p className="text-slate-400 text-center text-sm mb-8 leading-relaxed">
              Bạn đã hoàn thành <span className="text-white font-bold">{completedCount}/{questions.length}</span> câu hỏi.
              Bạn có chắc chắn muốn kết thúc bài thi ngay bây giờ không?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-4 rounded-2xl bg-white/5 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Làm tiếp
              </button>
              <button
                onClick={() => { setShowConfirm(false); handleSubmit(); }}
                className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizResult({ result, quiz, onBack }) {
  return (
    <div className="py-2 min-h-full pb-20">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">Kết Quả <span className="text-blue-500">Bài Thi</span></h1>
        <div className="flex items-center gap-3 mt-2 ml-1">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Hoàn thành bài thi: {quiz?.title}</p>
          <span className="text-slate-700 text-xs">•</span>
          <p className="text-xs text-blue-400 font-black uppercase tracking-widest italic">Biên soạn bởi: {quiz?.teacher_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[60px]" />
            <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-4">Điểm số của bạn</p>
            <h2 className="text-6xl sm:text-8xl font-black text-white mb-6 tracking-tighter">{result.score}<span className="text-xl sm:text-2xl text-slate-600 ml-2">/100</span></h2>
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] ${result.passed ? "bg-teal-500/10 text-teal-400 border border-teal-500/10" : "bg-red-500/10 text-red-400 border border-red-500/10"}`}>
              <span className="material-symbols-outlined text-sm">{result.passed ? "check_circle" : "cancel"}</span>
              {result.passed ? "Vượt qua" : "Chưa đạt"}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Số câu đúng</span>
                <span className="text-xl font-black text-white">{result.correct} / {result.total}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(result.correct / result.total) * 100}%` }} />
              </div>

              <div className="p-5 bg-blue-500/5 rounded-3xl border border-blue-500/10">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                  Nhận xét hệ thống
                </p>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  {result.score >= 90 ? "Xuất sắc! Bạn đã làm chủ hoàn toàn kiến thức trong bài này. Hãy tiếp tục duy trì phong độ nhé!" :
                    result.score >= 70 ? "Rất tốt! Bạn nắm vững hầu hết các nội dung. Chỉ cần rà soát lại một vài chi tiết nhỏ là sẽ hoàn hảo." :
                      result.score >= 50 ? "Khá ổn! Bạn đã đạt mức an toàn nhưng cần ôn tập lại những phần chưa chính xác để tự tin hơn." :
                        "Cố gắng lên! Có vẻ mảng kiến thức này vẫn còn hơi mới mẻ với bạn. Hãy xem lại phần giải thích chi tiết ở bên phải."}
                </p>
              </div>

              <button onClick={onBack} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">Quay lại danh sách</button>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-500">fact_check</span>
              Xem lại bài làm
            </h3>

            <div className="space-y-12">
              {result.details?.map((det, idx) => (
                <div key={idx} className="relative pl-12 border-b border-white/5 pb-10 last:border-0 last:pb-0">
                  <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border ${det.is_correct ? "bg-teal-500/10 text-teal-400 border-teal-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                    {idx + 1}
                  </div>

                  <div className="space-y-6">
                    <p className="text-lg text-white font-bold leading-relaxed">{det.question_text}</p>

                    <div className="grid grid-cols-1 gap-3">
                      {det.options?.map((opt, i) => {
                        const isUserChoice = det.student_answer !== null && parseInt(det.student_answer) === i;
                        const isCorrect = parseInt(det.correct_index) === i;

                        let style = "bg-white/5 border-white/5 text-slate-400";
                        if (isCorrect) style = "bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-lg shadow-teal-500/5";
                        if (isUserChoice && !isCorrect) style = "bg-red-500/10 border-red-500/30 text-red-400";

                        return (
                          <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${style}`}>
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] border ${isCorrect ? "bg-teal-500 text-white border-teal-500" : isUserChoice ? "bg-red-500 text-white border-red-500" : "bg-white/10 border-white/10"}`}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="font-bold text-sm">{opt}</span>
                            {isCorrect && <span className="material-symbols-outlined text-lg ml-auto">check_circle</span>}
                            {isUserChoice && !isCorrect && <span className="material-symbols-outlined text-lg ml-auto">cancel</span>}
                          </div>
                        );
                      })}
                    </div>

                    {det.explanation && (
                      <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-3xl mt-4">
                        <div className="flex items-center gap-2 mb-2 text-blue-400">
                          <span className="material-symbols-outlined text-lg">info</span>
                          <span className="text-[10px] font-black uppercase tracking-widest">Giải thích chi tiết</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed italic">{det.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentQuiz() {
  const [view, setView] = useState("list");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);

  const startQuiz = async (quiz) => {
    try {
      const res = await axiosClient.get(`/student/exam/${quiz.id}`);
      setSelectedQuiz(res.data.quiz);
      setQuestions(res.data.questions);
      setView("taking");
    } catch (err) { alert("Lỗi khi tải đề thi!"); }
  };

  return (
    <div className="h-full">
      {view === "list" && <QuizList onStart={startQuiz} />}
      {view === "taking" && <TakeQuiz quiz={selectedQuiz} questions={questions} onFinish={(res) => { setResult(res); setView("result"); }} onCancel={() => setView("list")} />}
      {view === "result" && <QuizResult result={result} quiz={selectedQuiz} onBack={() => setView("list")} />}
    </div>
  );
}
