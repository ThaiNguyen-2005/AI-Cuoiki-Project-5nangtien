import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

export default function ManualQuiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Quiz Info
  const [quizInfo, setQuizInfo] = useState({
    title: "",
    description: "",
    grade: "10",
    time_limit: 45,
    passing_score: 50,
    subject: "Hóa học",
    knowledge_type: "Tổng hợp",
    difficulty: "mixed"
  });

  // Filter States
  const [search, setSearch] = useState("");
  const [fGrade, setFGrade] = useState("all");
  const [fChapter, setFChapter] = useState("all");
  const [fLesson, setFLesson] = useState("all");
  const [fType, setFType] = useState("all");
  const [fLevel, setFLevel] = useState("all");

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const container = document.getElementById('bank-list-container');
    if (container) container.scrollTo(0, 0);
  }, [currentPage]);

  const fetchQuestions = async () => {
    try {
      const res = await axiosClient.get("/teacher/all-questions");
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (q) => {
    if (selectedQuestions.find(sq => sq.id === q.id)) {
      setSelectedQuestions(selectedQuestions.filter(sq => sq.id !== q.id));
    } else {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  const handleSaveQuiz = async () => {
    if (!quizInfo.title) return alert("Vui lòng nhập tên đề thi!");
    if (selectedQuestions.length === 0) return alert("Vui lòng chọn ít nhất 1 câu hỏi!");

    setSaving(true);
    try {
      const payload = {
        ...quizInfo,
        description: quizInfo.description || "",
        status: "published",
        questions: selectedQuestions.map((q, idx) => ({
          content: q.content,
          options: q.options,
          correct_index: q.correct_index,
          explanation: q.explanation,
          order: idx
        }))
      };
      await axiosClient.post("/teacher/quizzes", payload);
      setSuccess(true);
      setTimeout(() => navigate("/teacher/quiz"), 2000);
    } catch (err) {
      alert("Lỗi khi tạo đề: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // Metadata Extraction
  const availableGrades = ["all", ...new Set(questions.map(q => String(q.grade)))];
  const availableChapters = ["all", ...new Set(questions.filter(q => fGrade === "all" || String(q.grade) === fGrade).map(q => q.chapter_name))];
  const availableLessons = ["all", ...new Set(questions.filter(q => (fGrade === "all" || String(q.grade) === fGrade) && (fChapter === "all" || q.chapter_name === fChapter)).map(q => q.lesson_name))];
  const availableTypes = ["all", ...new Set(questions.map(q => q.knowledge_type))];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.content?.toLowerCase().includes(search.toLowerCase()) || q.chapter_name?.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = fGrade === "all" || String(q.grade) === fGrade;
    const matchesChapter = fChapter === "all" || q.chapter_name === fChapter;
    const matchesLesson = fLesson === "all" || q.lesson_name === fLesson;
    const matchesType = fType === "all" || q.knowledge_type === fType;
    const matchesLevel = fLevel === "all" || q.level === fLevel;
    return matchesSearch && matchesGrade && matchesChapter && matchesLesson && matchesType && matchesLevel;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Tạo Đề <span className="text-teal-400">Thủ Công</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Tự tay lựa chọn những câu hỏi tinh túy nhất cho kỳ thi</p>

          {/* Success/Error Message */}
          {success && (
            <div className="mt-4 p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
              <span className="material-symbols-outlined text-teal-400">check_circle</span>
              <span className="text-teal-400 font-black uppercase tracking-widest text-[10px]">Tạo đề thành công! Đang chuyển hướng...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Đã chọn</p>
            <p className="text-2xl font-black text-teal-400">{selectedQuestions.length} <span className="text-sm text-white/50">câu hỏi</span></p>
          </div>
          <button
            onClick={handleSaveQuiz}
            disabled={saving || selectedQuestions.length === 0}
            className="bg-teal-600 hover:bg-teal-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center gap-3 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">rocket_launch</span>
            {saving ? "Đang xuất bản..." : "Xuất bản đề thi"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden min-h-0">
        {/* Left Side: Quiz Settings & Selected List */}
        <div className="w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="p-8 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-teal-500">settings</span>
              Thông tin đề thi
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên đề thi *</label>
                <input
                  type="text"
                  value={quizInfo.title}
                  onChange={e => setQuizInfo({ ...quizInfo, title: e.target.value })}
                  placeholder="VD: Kiểm tra 15 phút - Chương 1"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mô tả đề thi</label>
                <textarea
                  rows="2"
                  value={quizInfo.description || ""}
                  onChange={e => setQuizInfo({ ...quizInfo, description: e.target.value })}
                  placeholder="VD: Kiểm tra kiến thức chương 1, phần Este - Lipit..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Lớp</label>
                  <select
                    value={quizInfo.grade}
                    onChange={e => setQuizInfo({ ...quizInfo, grade: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none"
                  >
                    <option value="10" className="bg-[#0d1628]">Khối 10</option>
                    <option value="11" className="bg-[#0d1628]">Khối 11</option>
                    <option value="12" className="bg-[#0d1628]">Khối 12</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Độ khó</label>
                  <select
                    value={quizInfo.difficulty}
                    onChange={e => setQuizInfo({ ...quizInfo, difficulty: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none"
                  >
                    <option value="easy" className="bg-[#0d1628]">Dễ</option>
                    <option value="medium" className="bg-[#0d1628]">Vừa</option>
                    <option value="hard" className="bg-[#0d1628]">Khó</option>
                    <option value="mixed" className="bg-[#0d1628]">Hỗn hợp</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phân loại kiến thức</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Khái niệm", "Lý thuyết", "Định lý", "Tính chất", "Dạng bài tập", "Tổng hợp"].map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => setQuizInfo({ ...quizInfo, knowledge_type: t })}
                      className={`py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${quizInfo.knowledge_type === t ? 'bg-teal-500/10 border-teal-500/50 text-teal-400' : 'bg-white/2 border-white/5 text-slate-500'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-8 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl flex flex-col min-h-0">
            <h3 className="text-lg font-black text-white flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-teal-500">format_list_numbered</span>
                Câu hỏi đã chọn
              </div>
              <button onClick={() => setSelectedQuestions([])} className="text-[10px] text-red-400 font-bold uppercase hover:underline">Xóa hết</button>
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {selectedQuestions.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-slate-500">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-20">inventory_2</span>
                  <p className="text-xs font-bold uppercase tracking-widest italic opacity-50 text-center px-4">Chưa có câu hỏi nào. Hãy chọn từ ngân hàng!</p>
                </div>
              ) : (
                selectedQuestions.map((sq, idx) => (
                  <div key={sq.id} className="group p-4 bg-white/2 hover:bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 transition-all animate-in slide-in-from-left-4 duration-300">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 font-black text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 line-clamp-1 leading-relaxed">{sq.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">{sq.chapter_name}</span>
                        <span className="w-1 h-1 rounded-full bg-white/10"></span>
                        <span className={`text-[9px] font-black uppercase ${sq.level === 'easy' ? 'text-green-400' : sq.level === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>{sq.level}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSelect(sq)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Question Bank with Filters */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Filters */}
          <div className="p-6 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-lg">search</span>
                <input
                  type="text"
                  placeholder="Tìm câu hỏi..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm outline-none focus:border-teal-500/50"
                />
              </div>
              <select
                value={fGrade} onChange={e => { setFGrade(e.target.value); setCurrentPage(1); }}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none"
              >
                {availableGrades.map(g => <option key={g} value={g} className="bg-[#0d1628]">{g === 'all' ? 'Tất cả khối' : `Khối ${g}`}</option>)}
              </select>
              <select
                value={fChapter} onChange={e => { setFChapter(e.target.value); setFLesson("all"); setCurrentPage(1); }}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none"
              >
                {availableChapters.map(c => <option key={c} value={c} className="bg-[#0d1628]">{c === 'all' ? 'Tất cả chương' : c}</option>)}
              </select>
              <select
                value={fLesson} onChange={e => { setFLesson(e.target.value); setCurrentPage(1); }}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none"
              >
                {availableLessons.map(l => <option key={l} value={l} className="bg-[#0d1628]">{l === 'all' ? 'Tất cả bài học' : l}</option>)}
              </select>
              <select
                value={fLevel} onChange={e => { setFLevel(e.target.value); setCurrentPage(1); }}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none"
              >
                <option value="all" className="bg-[#0d1628]">Tất cả mức độ</option>
                <option value="easy" className="bg-[#0d1628]">Dễ</option>
                <option value="medium" className="bg-[#0d1628]">Vừa</option>
                <option value="hard" className="bg-[#0d1628]">Khó</option>
              </select>
            </div>
          </div>

          {/* Item Count Display at Top */}
          <div className="px-6 py-2">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic opacity-80">
              Hiển thị {filteredQuestions.length > 0 ? ((currentPage - 1) * ITEMS_PER_PAGE) + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredQuestions.length)} trên {filteredQuestions.length} câu hỏi trong ngân hàng
            </p>
          </div>

          {/* Bank List */}
          <div id="bank-list-container" className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {loading ? (
              <div className="h-60 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Đang tải ngân hàng...</p>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="h-60 flex flex-col items-center justify-center bg-white/2 border border-white/5 rounded-4xl border-dashed">
                <span className="material-symbols-outlined text-5xl mb-4 opacity-10">search_off</span>
                <p className="text-slate-500 font-bold uppercase tracking-widest">Không tìm thấy câu hỏi phù hợp</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map(q => {
                  const isSelected = selectedQuestions.find(sq => sq.id === q.id);
                  return (
                    <div key={q.id} className={`p-6 border transition-all rounded-4xl group ${isSelected ? 'bg-teal-500/10 border-teal-500/30' : 'bg-[#0d1628]/50 border-white/5 hover:border-white/10 hover:bg-white/2'}`}>
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-black text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-md uppercase">{q.chapter_name}</span>
                            <span className="text-[10px] font-black text-slate-400 bg-white/5 px-2 py-0.5 rounded-md uppercase">{q.lesson_name}</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${q.level === 'easy' ? 'bg-green-400/10 text-green-400' : q.level === 'medium' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-400/10 text-red-400'}`}>{q.level}</span>
                          </div>
                          <p className="text-lg text-white font-medium leading-relaxed mb-4">{q.content}</p>

                          {/* Options Preview */}
                          <div className="grid grid-cols-2 gap-3">
                            {q.options.map((opt, oi) => (
                              <div key={oi} className={`px-4 py-2 rounded-xl text-xs flex items-center gap-3 border ${q.correct_index === oi ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' : 'bg-white/5 border-transparent text-slate-400'}`}>
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-black ${q.correct_index === oi ? 'bg-teal-500 text-[#0d1628]' : 'bg-white/10'}`}>
                                  {String.fromCharCode(65 + oi)}
                                </span>
                                <span className="truncate">{opt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSelect(q)}
                          className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 shrink-0 ${isSelected ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-white/5 text-slate-400 hover:bg-teal-600 hover:text-white'}`}
                        >
                          {isSelected ? (
                            <><span className="material-symbols-outlined text-sm">close</span> Bỏ chọn</>
                          ) : (
                            <><span className="material-symbols-outlined text-sm">add</span> Chọn câu</>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination Controls - Centered at bottom */}
          {filteredQuestions.length > ITEMS_PER_PAGE && (
            <div className="mt-4 flex items-center justify-center bg-white/5 border border-white/5 rounded-3xl p-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <div className="flex items-center gap-1">
                  {(() => {
                    const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
                    const range = [];
                    const delta = 1;

                    for (let i = 1; i <= totalPages; i++) {
                      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                        range.push(i);
                      }
                    }

                    const withDots = [];
                    let l;
                    for (let i of range) {
                      if (l) {
                        if (i - l === 2) withDots.push(l + 1);
                        else if (i - l !== 1) withDots.push("...");
                      }
                      withDots.push(i);
                      l = i;
                    }

                    return withDots.map((p, i) => (
                      p === "..." ? (
                        <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-600 text-[10px]">...</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setCurrentPage(p)}
                          className={`w-8 h-8 rounded-lg font-black text-[10px] hover:bg-white/10 hover:text-white transition-colors duration-150 ${currentPage === p ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' : 'bg-white/5 text-slate-500'}`}
                          style={{ transitionProperty: currentPage === p ? 'none' : 'background-color, color, border-color' }}
                        >
                          {p}
                        </button>
                      )
                    ));
                  })()}
                </div>
                <button
                  disabled={currentPage === Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
}
