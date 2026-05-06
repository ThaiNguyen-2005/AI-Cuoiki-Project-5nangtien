import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

const LEVEL_MAP = {
  easy: "Dễ",
  medium: "Vừa",
  hard: "Khó",
  mixed: "Hỗn hợp",
  all: "Tất cả"
};

export default function EditQuizQuestions() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter States (Auto-populated from Quiz)
  const [search, setSearch] = useState("");
  const [fGrade, setFGrade] = useState("all");
  const [fChapter, setFChapter] = useState("all");
  const [fLesson, setFLesson] = useState("all");
  const [fType, setFType] = useState("all");
  const [fLevel, setFLevel] = useState("all");

  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Quiz Details
      const quizRes = await axiosClient.get(`/teacher/quizzes/${id}/questions`);
      const quizInfoRes = await axiosClient.get(`/teacher/quizzes`);
      const currentQuiz = quizInfoRes.data.find(q => q.id === id);
      
      if (!currentQuiz) throw new Error("Không tìm thấy đề thi!");
      if (currentQuiz.status !== 'draft') {
        alert("Chỉ có thể sửa câu hỏi cho đề nháp!");
        return navigate("/teacher/quiz");
      }

      setQuiz(currentQuiz);
      setSelectedQuestions(quizRes.data);
      
      // Auto-set filters based on Quiz metadata
      setFGrade(String(currentQuiz.grade));
      setFType(currentQuiz.knowledge_type || "all");
      setFLevel(currentQuiz.difficulty === 'mixed' ? 'all' : currentQuiz.difficulty);

      // 2. Fetch Master Bank
      const bankRes = await axiosClient.get("/teacher/all-questions");
      setQuestions(bankRes.data);

    } catch (err) {
      console.error(err);
      alert("Lỗi tải dữ liệu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (q) => {
    if (selectedQuestions.find(sq => sq.id === q.id || sq.content === q.content)) {
      setSelectedQuestions(selectedQuestions.filter(sq => sq.id !== q.id && sq.content !== q.content));
    } else {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  const handleSave = async () => {
    if (selectedQuestions.length === 0) return alert("Vui lòng chọn ít nhất 1 câu hỏi!");

    setSaving(true);
    try {
      const payload = {
        questions: selectedQuestions.map((q, idx) => ({
          content: q.content,
          options: q.options,
          correct_index: q.correct_index,
          explanation: q.explanation,
          level: q.level || 'medium',
          order: idx
        }))
      };
      await axiosClient.post(`/teacher/quizzes/${id}/sync-questions`, payload);
      setSuccess(true);
      setTimeout(() => navigate("/teacher/quiz"), 2000);
    } catch (err) {
      alert("Lỗi khi cập nhật đề: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // Filter Logic
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.content?.toLowerCase().includes(search.toLowerCase()) || q.chapter_name?.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = fGrade === "all" || String(q.grade) === fGrade;
    const matchesChapter = fChapter === "all" || q.chapter_name === fChapter;
    const matchesLesson = fLesson === "all" || q.lesson_name === fLesson;
    const matchesType = fType === "all" || q.knowledge_type === fType;
    const matchesLevel = fLevel === "all" || q.level === fLevel;
    return matchesSearch && matchesGrade && matchesChapter && matchesLesson && matchesType && matchesLevel;
  });

  const availableChapters = ["all", ...new Set(questions.filter(q => fGrade === "all" || String(q.grade) === fGrade).map(q => q.chapter_name))];
  const availableLessons = ["all", ...new Set(questions.filter(q => (fGrade === "all" || String(q.grade) === fGrade) && (fChapter === "all" || q.chapter_name === fChapter)).map(q => q.lesson_name))];

  if (loading || !quiz) return (
    <div className="h-full flex items-center justify-center text-slate-500 italic">
       <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
          <span>Đang đồng bộ dữ liệu đề thi...</span>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Hiệu Chỉnh <span className="text-amber-400">Câu Hỏi</span></h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[10px] font-black text-slate-500 uppercase">{quiz.title}</span>
            <span className="text-xs text-slate-600 font-bold italic">- Chế độ chỉnh sửa đề nháp</span>
          </div>

          {success && (
            <div className="mt-4 p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
              <span className="material-symbols-outlined text-teal-400">check_circle</span>
              <span className="text-teal-400 font-black uppercase tracking-widest text-[10px]">Cập nhật thành công!</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Số câu hiện tại</p>
            <p className="text-2xl font-black text-amber-400">{selectedQuestions.length}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-600 hover:bg-teal-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center gap-3"
          >
            <span className="material-symbols-outlined">save</span>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden min-h-0">
        {/* Left Side: Selected Questions */}
        <div className="w-1/3 flex flex-col p-8 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl overflow-hidden">
            <h3 className="text-lg font-black text-white flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-teal-500">format_list_numbered</span>
                Câu hỏi của đề
              </div>
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {selectedQuestions.map((sq, idx) => (
                  <div key={idx} className={`group bg-white/2 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${expandedIdx === idx ? 'ring-1 ring-teal-500/50 bg-white/5' : ''}`}>
                    <div 
                      className="p-4 flex items-center gap-4 cursor-pointer"
                      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 font-black text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm text-white/80 transition-all ${expandedIdx === idx ? '' : 'line-clamp-1'}`}>{sq.content}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[9px] font-black uppercase ${sq.level === 'easy' ? 'text-green-400' : sq.level === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>{LEVEL_MAP[sq.level] || sq.level}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10"></span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase">{sq.knowledge_type || quiz.knowledge_type}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSelect(sq); }}
                        className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                    </div>

                    {expandedIdx === idx && (
                      <div className="px-4 pb-4 pt-0 border-t border-white/5 bg-black/20 animate-in slide-in-from-top-2">
                        <div className="space-y-2 mt-3">
                          {sq.options.map((opt, oi) => (
                            <div key={oi} className={`p-2 rounded-xl text-[11px] flex items-center gap-3 border ${sq.correct_index === oi ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' : 'bg-white/2 border-white/5 text-slate-400'}`}>
                              <span className="font-black w-4">{String.fromCharCode(65+oi)}.</span>
                              <span className="flex-1">{opt}</span>
                              {sq.correct_index === oi && <span className="material-symbols-outlined text-sm">check_circle</span>}
                            </div>
                          ))}
                        </div>
                        {sq.explanation && (
                          <div className="mt-3 p-3 bg-white/2 rounded-xl border border-dashed border-white/10">
                            <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Giải thích:</p>
                            <p className="text-[10px] text-slate-400 italic">{sq.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
        </div>

        {/* Right Side: Bank with Auto-Filters */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
            <div className="p-6 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-4">
                    <div className="flex-1 relative min-w-[200px]">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-lg">search</span>
                        <input
                        type="text"
                        placeholder="Tìm câu hỏi..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm outline-none focus:border-teal-500/50"
                        />
                    </div>
                    
                    <div className="shrink-0 flex items-center px-4 py-3 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-2 shrink-0">Loại:</span>
                        <span className="text-xs font-black text-teal-400 uppercase tracking-widest whitespace-nowrap">{quiz.knowledge_type}</span>
                    </div>

                    <div className="shrink-0 flex items-center px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-2 shrink-0">Khối:</span>
                        <span className="text-xs font-black text-white uppercase tracking-widest whitespace-nowrap">{quiz.grade}</span>
                    </div>

                    <div className="shrink-0 w-full lg:w-48 relative">
                      <select
                          value={fLevel} onChange={e => setFLevel(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer"
                      >
                          <option value="all" className="bg-[#0d1628]">Tất cả độ khó</option>
                          <option value="easy" className="bg-[#0d1628]">Dễ</option>
                          <option value="medium" className="bg-[#0d1628]">Vừa</option>
                          <option value="hard" className="bg-[#0d1628]">Khó</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-sm pointer-events-none">expand_more</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic">Lọc theo: Khối {quiz.grade} - {quiz.knowledge_type} - {LEVEL_MAP[fLevel]}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {filteredQuestions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map(q => {
                  const isSelected = selectedQuestions.find(sq => sq.id === q.id || sq.content === q.content);
                  return (
                    <div key={q.id} className={`group p-6 border transition-all duration-300 rounded-[2.5rem] backdrop-blur-xl ${isSelected ? 'bg-teal-500/10 border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.1)]' : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/8'}`}>
                      <div className="flex items-start gap-6">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-black text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-md uppercase">{q.chapter_name}</span>
                            <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md uppercase">{q.knowledge_type}</span>
                            <span className="text-[10px] font-black text-slate-400 bg-white/5 px-2 py-0.5 rounded-md uppercase line-clamp-1">{q.lesson_name}</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${q.level === 'easy' ? 'bg-green-400/10 text-green-400' : q.level === 'medium' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-400/10 text-red-400'}`}>{LEVEL_MAP[q.level] || q.level}</span>
                          </div>
                          
                          <p className="text-lg font-black text-white mb-6 group-hover:text-teal-400 transition-colors leading-relaxed">{q.content}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((opt, oi) => (
                              <div key={oi} className="flex items-center gap-3 p-3 bg-white/2 rounded-2xl border border-white/5 group-hover:bg-white/5 transition-all">
                                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-teal-400 transition-colors">
                                  {String.fromCharCode(65+oi)}
                                </div>
                                <span className="text-xs text-slate-400 truncate">{opt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleSelect(q)}
                          className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                            isSelected 
                              ? 'bg-red-500 text-white hover:bg-red-600' 
                              : 'bg-white/5 text-slate-500 hover:bg-teal-500 hover:text-white border border-white/5'
                          }`}
                          title={isSelected ? "Bỏ chọn" : "Chọn câu này"}
                        >
                          <span className="material-symbols-outlined">{isSelected ? 'remove' : 'add'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Pagination */}
            {filteredQuestions.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-center gap-2 bg-white/5 p-3 rounded-3xl backdrop-blur-xl">
                 <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-8 h-8 rounded-lg bg-white/5 text-white disabled:opacity-20"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                 <span className="text-[10px] font-black text-slate-500">{currentPage} / {Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)}</span>
                 <button disabled={currentPage === Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)} onClick={() => setCurrentPage(p => p + 1)} className="w-8 h-8 rounded-lg bg-white/5 text-white disabled:opacity-20"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
              </div>
            )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}} />
    </div>
  );
}
