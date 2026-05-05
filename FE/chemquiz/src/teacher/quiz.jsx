import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function TeacherQuizList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axiosClient.get("/teacher/quizzes");
      setQuizzes(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách đề thi:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (quiz) => {
    try {
      await axiosClient.patch(`/teacher/quizzes/${quiz.id}/toggle`);
      fetchQuizzes();
    } catch (err) {
      alert("Lỗi khi đổi trạng thái!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đề thi này không?")) return;
    try {
      await axiosClient.delete(`/teacher/quizzes/${id}`);
      setQuizzes(quizzes.filter(q => q.id !== id));
    } catch (err) {
      alert("Lỗi khi xóa!");
    }
  };

  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredQuizzes = quizzes.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = filterGrade === "all" || String(q.grade) === filterGrade;
    const matchesStatus = filterStatus === "all" || q.status === filterStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);
  const paginatedQuizzes = filteredQuizzes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterGrade, filterStatus]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Danh Sách <span className="text-teal-400">Đề Thi</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Quản lý và theo dõi hiệu quả các kỳ thi của bạn</p>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tổng số đề</p>
           <p className="text-3xl font-black text-white">{quizzes.length}</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Đã xuất bản</p>
           <p className="text-3xl font-black text-teal-400">{quizzes.filter(q => q.status === 'published').length}</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-4xl backdrop-blur-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Đang soạn thảo</p>
           <p className="text-3xl font-black text-yellow-500">{quizzes.filter(q => q.status === 'draft').length}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
           <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors">search</span>
           <input 
             type="text" 
             placeholder="Tìm kiếm tên đề thi..." 
             className="w-full bg-white/5 border border-white/5 focus:border-teal-500/50 focus:bg-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none transition-all"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
        
        <div className="flex gap-4">
           {/* Grade Filter */}
           <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">school</span>
              <select 
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-2xl pl-11 pr-10 py-4 text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-teal-500/50 transition-all appearance-none cursor-pointer"
              >
                 <option value="all" className="bg-[#0b1326] text-white">Tất cả khối</option>
                 <option value="10" className="bg-[#0b1326] text-white">Lớp 10</option>
                 <option value="11" className="bg-[#0b1326] text-white">Lớp 11</option>
                 <option value="12" className="bg-[#0b1326] text-white">Lớp 12</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs pointer-events-none">expand_more</span>
           </div>

           {/* Status Filter */}
           <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">filter_list</span>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-2xl pl-11 pr-10 py-4 text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-teal-500/50 transition-all appearance-none cursor-pointer"
              >
                 <option value="all" className="bg-[#0b1326] text-white">Mọi trạng thái</option>
                 <option value="published" className="bg-[#0b1326] text-white">Đã xuất bản</option>
                 <option value="draft" className="bg-[#0b1326] text-white">Đang soạn thảo</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs pointer-events-none">expand_more</span>
           </div>
        </div>
      </div>

      {/* Quiz List Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-10">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-black uppercase tracking-widest text-[10px]">Đang tải danh sách đề...</p>
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <div className="h-80 flex flex-col items-center justify-center bg-white/2 border-2 border-dashed border-white/5 rounded-[3rem]">
             <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">search_off</span>
             <p className="text-slate-500 font-black uppercase tracking-widest text-sm italic">Không tìm thấy đề thi nào khớp với bộ lọc.</p>
          </div>
        ) : (
          paginatedQuizzes.map((quiz) => (
            <div key={quiz.id} className="group p-6 bg-white/5 border border-white/5 hover:border-teal-500/30 hover:bg-white/8 rounded-[2.5rem] transition-all duration-300 backdrop-blur-xl">
               <div className="flex items-center gap-6">
                 {/* Status Badge */}
                 <div className={`w-14 h-14 rounded-3xl flex flex-col items-center justify-center border transition-all duration-500 shadow-lg ${
                   quiz.status === 'published' 
                     ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' 
                     : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                 }`}>
                    <span className="material-symbols-outlined text-xl mb-0.5">
                       {quiz.status === 'published' ? 'check_circle' : 'pending'}
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-widest">{quiz.status === 'published' ? 'Public' : 'Draft'}</span>
                 </div>

                 {/* Main Info */}
                 <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Khối {quiz.grade}</span>
                       <span className="text-[10px] text-slate-600 font-bold">{new Date(quiz.created_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white group-hover:text-teal-400 transition-colors tracking-tight mb-3">{quiz.title}</h3>
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2 text-slate-500">
                          <span className="material-symbols-outlined text-sm">article</span>
                          <span className="text-xs font-bold">{quiz.questions_count ?? 0} câu hỏi</span>
                       </div>
                       <div className="flex items-center gap-2 text-slate-500">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          <span className="text-xs font-bold">{quiz.time_limit} phút</span>
                       </div>
                       <div className="flex items-center gap-2 text-slate-500">
                          <span className="material-symbols-outlined text-sm">groups</span>
                          <span className="text-xs font-bold">{quiz.attempts_count ?? 0} lượt thi</span>
                       </div>
                    </div>
                 </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={() => navigate(`/teacher/quiz/view/${quiz.id}`)}
                    className="w-12 h-12 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center shadow-lg border border-white/5"
                    title="Xem chi tiết đề"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(quiz)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${quiz.status === 'published' ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white' : 'bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white'}`}
                    title={quiz.status === 'published' ? 'Gỡ bài' : 'Xuất bản'}
                  >
                    <span className="material-symbols-outlined">{quiz.status === 'published' ? 'block' : 'publish'}</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(quiz.id)}
                    className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-lg"
                    title="Xóa đề thi"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
               </div>
            </div>
          ))
        )}

        {/* Pagination UI */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10 mb-20 animate-in fade-in slide-in-from-bottom-4">
             <button 
               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
               disabled={currentPage === 1}
               className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 transition-all shadow-xl"
             >
                <span className="material-symbols-outlined">chevron_left</span>
             </button>

             <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const p = i + 1;
                  // Hiển thị logic 1, 2, ..., total
                  if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                    return (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-12 h-12 rounded-2xl font-black transition-all shadow-xl border ${
                          currentPage === p 
                            ? "bg-teal-600 border-teal-500 text-white scale-110 shadow-teal-500/20" 
                            : "bg-white/5 border-white/5 text-slate-500 hover:text-white"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  }
                  if (p === currentPage - 2 || p === currentPage + 2) {
                    return <span key={p} className="text-slate-700 font-black">...</span>;
                  }
                  return null;
                })}
             </div>

             <button 
               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
               disabled={currentPage === totalPages}
               className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 transition-all shadow-xl"
             >
                <span className="material-symbols-outlined">chevron_right</span>
             </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
}