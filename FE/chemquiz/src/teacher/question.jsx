import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "./components/QuestionCard";
import EditQuestionModal from "./components/EditQuestionModal";
import CreateQuestionModal from "./components/CreateQuestionModal";

const ITEMS_PER_PAGE = 10;

export default function TeacherQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [academicData, setAcademicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [quizFilter, setQuizFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  // Filtering States
  const [fGrade, setFGrade] = useState("10");
  const [fChapter, setFChapter] = useState("all");
  const [fLesson, setFLesson] = useState("all");
  const [fType, setFType] = useState("all");
  const [fLevel, setFLevel] = useState("all");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { 
    fetchInitialData(); 
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (location.state?.quizId) {
      setQuizFilter(location.state.quizId);
    }
  }, [location.state, questions]);

  // Metadata Extraction (Sử dụng dữ liệu học thuật chuẩn)
  const currentSubject = academicData.find(s => s.name === "Hóa học") || academicData[0];
  
  const availableChapters = (currentSubject?.chapters || [])
    .filter(c => fGrade === "all" || String(c.grade) === fGrade)
    .map(c => c.name);

  const selectedChapterObj = currentSubject?.chapters?.find(c => c.name === fChapter);
  const availableLessons = (selectedChapterObj?.lessons || []).map(l => l.name);

  // Reset nested filters
  useEffect(() => { setFChapter("all"); setFLesson("all"); }, [fGrade]);
  useEffect(() => { setFLesson("all"); }, [fChapter]);
  useEffect(() => { setCurrentPage(1); }, [search, quizFilter, fGrade, fChapter, fLesson, fType, fLevel]);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/teacher/all-questions");
      setQuestions(res.data || []);
    } catch {
      setQuestions([]);
    }
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const aRes = await axiosClient.get("/teacher/academic-structure");
      setAcademicData(aRes.data || []);
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const q = questions.find(x => x.id === id);
    if (!q) return;
    if (!window.confirm("Bạn có chắc chắn muốn xoá câu hỏi này khỏi ngân hàng?")) return;
    
    setDeletingId(id);
    try {
      await axiosClient.delete(`/teacher/questions/${id}`);
      setQuestions(prev => prev.filter(x => x.id !== id));
    } catch { 
      alert("Xoá thất bại!"); 
    } finally { 
      setDeletingId(null); 
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axiosClient.put(`/teacher/questions/${editingQuestion.id}`, {
        content: editingQuestion.content,
        options: editingQuestion.options,
        correct_index: editingQuestion.correct_index,
        explanation: editingQuestion.explanation,
        grade: editingQuestion.grade,
        lesson_id: editingQuestion.lesson_id,
        knowledge_type: editingQuestion.knowledge_type,
        level: editingQuestion.level
      });
      // Refresh data to get names of chapters/lessons updated in the list
      fetchData();
      setEditingQuestion(null);
    } catch (err) { 
      alert("Cập nhật thất bại: " + (err.response?.data?.message || err.message)); 
    } finally { 
      setUpdating(false); 
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.content?.toLowerCase().includes(search.toLowerCase()) ||
                         q.chapter_name?.toLowerCase().includes(search.toLowerCase());
    const matchesQuiz = quizFilter === "all" || q.quiz_id === quizFilter;
    const matchesGrade = fGrade === "all" || String(q.grade) === fGrade;
    const matchesChapter = fChapter === "all" || q.chapter_name === fChapter;
    const matchesLesson = fLesson === "all" || q.lesson_name === fLesson;
    const matchesType = fType === "all" || q.knowledge_type === fType;
    const matchesLevel = fLevel === "all" || q.level === fLevel;

    return matchesSearch && matchesQuiz && matchesGrade && matchesChapter && matchesLesson && matchesType && matchesLevel;
  });

  const totalItems = filteredQuestions.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
        <span>Đang lục lại kho học liệu...</span>
      </div>
    </div>
  );

  return (
    <div className="py-2 min-h-full pb-32">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Ngân Hàng <span className="text-teal-500">Câu Hỏi</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Quản lý và tối ưu kho học liệu của bạn</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center gap-3"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Thêm Câu Hỏi Mới
        </button>
      </div>

      {/* Create Modal */}
      <CreateQuestionModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={fetchData}
      />

      {/* Filters */}
      <div className="mb-8 p-6 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Khối</label>
               <select value={fGrade} onChange={e => setFGrade(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-teal-500/50">
                  <option value="10" className="bg-[#0d1628]">Lớp 10</option>
                  <option value="11" className="bg-[#0d1628]">Lớp 11</option>
                  <option value="12" className="bg-[#0d1628]">Lớp 12</option>
               </select>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chương</label>
               <select value={fChapter} onChange={e => setFChapter(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-teal-500/50">
                  <option value="all" className="bg-[#0d1628]">Tất cả chương</option>
                  {availableChapters.map(c => <option key={c} value={c} className="bg-[#0d1628]">{c}</option>)}
               </select>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Bài học</label>
               <select value={fLesson} onChange={e => setFLesson(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-teal-500/50">
                  <option value="all" className="bg-[#0d1628]">Tất cả bài</option>
                  {availableLessons.map(l => <option key={l} value={l} className="bg-[#0d1628]">{l}</option>)}
               </select>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phân loại</label>
               <select value={fType} onChange={e => setFType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-teal-500/50">
                  <option value="all" className="bg-[#0d1628]">Tất cả loại</option>
                  <option value="Khái niệm" className="bg-[#0d1628]">Khái niệm</option>
                  <option value="Lý thuyết" className="bg-[#0d1628]">Lý thuyết</option>
                  <option value="Định lý" className="bg-[#0d1628]">Định lý</option>
                  <option value="Tính chất" className="bg-[#0d1628]">Tính chất</option>
                  <option value="Bài tập" className="bg-[#0d1628]">Bài tập</option>
               </select>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Độ khó</label>
               <select value={fLevel} onChange={e => setFLevel(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-teal-500/50">
                  <option value="all" className="bg-[#0d1628]">Tất cả</option>
                  <option value="easy" className="bg-[#0d1628]">Dễ</option>
                  <option value="medium" className="bg-[#0d1628]">Vừa</option>
                  <option value="hard" className="bg-[#0d1628]">Khó</option>
               </select>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tìm kiếm nhanh</label>
               <input 
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Từ khóa..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal-500/50"
               />
            </div>
         </div>
      </div>

      {/* Item Count Display at Top */}
      <div className="mb-6 px-6 py-4 bg-white/2 rounded-3xl border border-white/5">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
           Hiển thị <span className="text-teal-400">{totalItems > 0 ? startIndex + 1 : 0}-{endIndex}</span> trên <span className="text-white">{totalItems}</span> câu hỏi trong hệ thống
        </p>
      </div>

      {/* List */}
      <div className="space-y-8">
        {paginatedQuestions.map((q, i) => (
          <QuestionCard 
            key={q.id} 
            q={q} 
            displayIndex={startIndex + i + 1} 
            onEdit={setEditingQuestion} 
            onDelete={handleDelete} 
            deletingId={deletingId} 
          />
        ))}

        {totalItems === 0 && (
          <div className="py-32 text-center bg-white/5 border border-dashed border-white/10 rounded-4xl backdrop-blur-xl">
             <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">search_off</span>
             <p className="text-slate-500 font-bold tracking-widest uppercase text-xs italic">Không tìm thấy câu hỏi!</p>
          </div>
        )}
      </div>

      {/* Status & Pagination - Centered at Bottom */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center bg-white/2 p-4 rounded-3xl border border-white/5">
          <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-20 transition-all">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <div className="flex items-center gap-1">
                  {(() => {
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
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-20 transition-all">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
          </div>
        </div>
      )}
      
      {/* Modals */}
      <EditQuestionModal 
        editingQuestion={editingQuestion}
        setEditingQuestion={setEditingQuestion}
        handleUpdate={handleUpdate}
        updating={updating}
      />
    </div>
  );
}