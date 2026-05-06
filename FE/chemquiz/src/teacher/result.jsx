import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function TeacherResult() {
  const { id: paramId } = useParams();
  const [quizzes,  setQuizzes]  = useState([]);
  const [selected, setSelected] = useState(null);
  const [results,  setResults]  = useState([]);
  const [loadingQ, setLoadingQ] = useState(true);
  const [loadingR, setLoadingR] = useState(false);

  useEffect(() => {
    axiosClient.get("/teacher/quizzes")
      .then(r => {
        const data = r.data || [];
        setQuizzes(data);
        if (paramId) {
          const q = data.find(item => String(item.id) === paramId);
          if (q) loadResults(q);
          else if (data.length > 0) loadResults(data[0]);
        } else if (data.length > 0) {
          loadResults(data[0]);
        }
      })
      .catch(() => setQuizzes([]))
      .finally(() => setLoadingQ(false));
  }, [paramId]);

  const loadResults = (quiz) => {
    setSelected(quiz);
    setLoadingR(true);
    axiosClient.get(`/teacher/results/${quiz.id}`)
      .then(r => setResults(r.data || []))
      .catch(() => setResults([]))
      .finally(() => setLoadingR(false));
  };

  const [passRate, setPassRate] = useState(0);
  const [avgScoreVal, setAvgScoreVal] = useState("—");

  // Aggregate results: Group by student and keep max score + count attempts
  const aggregatedResults = React.useMemo(() => {
    const map = new Map();
    results.forEach(r => {
      const key = r.student_id || r.student_name;
      if (!map.has(key)) {
        map.set(key, {
          ...r,
          attempts: 1,
          maxScore: r.score,
          latestSubmit: r.submitted_at
        });
      } else {
        const existing = map.get(key);
        existing.attempts += 1;
        if (r.score > existing.maxScore) {
          existing.maxScore = r.score;
          existing.passed = r.passed; // Status based on best performance
        }
        if (new Date(r.submitted_at) > new Date(existing.latestSubmit)) {
          existing.latestSubmit = r.submitted_at;
        }
      }
    });
    return Array.from(map.values()).sort((a, b) => b.maxScore - a.maxScore);
  }, [results]);

  // Quiz Search State
  const [quizSearch, setQuizSearch] = useState("");
  const filteredQuizzes = quizzes.filter(q => 
    q.title.toLowerCase().includes(quizSearch.toLowerCase())
  );

  // Student Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(aggregatedResults.length / itemsPerPage);
  const paginatedResults = aggregatedResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selected?.id]);

  useEffect(() => {
    if (results.length > 0) {
      const avg = (results.reduce((s, r) => s + (r.score ?? 0), 0) / results.length).toFixed(1);
      const rate = Math.round(results.filter(r => r.passed).length / results.length * 100);
      setAvgScoreVal(avg);
      setPassRate(rate);
    } else {
      setAvgScoreVal("—");
      setPassRate(0);
    }
  }, [results]);

  if (loadingQ && quizzes.length === 0) return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
        <span>Đang tải danh sách bài thi...</span>
      </div>
    </div>
  );

  return (
    <div className="py-2 min-h-full pb-32">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Bảng Vàng <span className="text-teal-500">Thành Tích</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Theo dõi và đánh giá kết quả làm bài của học sinh</p>
        </div>
      </div>

      {/* Quiz Selector & Search Area */}
      <div className="mb-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
         <div className="relative w-full md:w-1/3 group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Chọn đề thi muốn xem kết quả</label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-teal-500 text-sm">quiz</span>
                <select 
                   value={selected?.id || ""}
                   onChange={(e) => {
                      const q = quizzes.find(item => item.id === e.target.value);
                      if (q) loadResults(q);
                   }}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-10 py-4 text-white text-sm font-bold outline-none focus:border-teal-500/50 transition-all appearance-none cursor-pointer"
                >
                   <option value="" disabled className="bg-[#0b1326]">-- Chọn bài thi --</option>
                   {quizzes.map(q => (
                      <option key={q.id} value={q.id} className="bg-[#0b1326] py-2">
                        {q.title} (Khối {q.grade})
                      </option>
                   ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
            </div>
         </div>

         {selected && (
            <div className="flex-1 flex items-center gap-4 animate-in fade-in slide-in-from-left-4">
                <div className="h-12 w-1 bg-teal-500 rounded-full" />
                <div>
                    <h2 className="text-2xl font-black text-white leading-none tracking-tight">{selected.title}</h2>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Đang xem báo cáo chi tiết</p>
                </div>
            </div>
         )}
      </div>

      {selected && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Summary Stats */}
          {!loadingR && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                { label: "Lượt làm bài", value: results.length, icon: "groups", color: "text-blue-400", bg: "bg-blue-500/5" },
                { label: "Điểm trung bình", value: `${avgScoreVal}%`, icon: "analytics", color: "text-teal-400", bg: "bg-teal-500/5" },
                { label: "Tỷ lệ vượt qua", value: `${passRate}%`, icon: "workspace_premium", color: "text-emerald-400", bg: "bg-emerald-500/5" },
               ].map(s => (
                <div key={s.label} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
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
          )}

          {/* Table Area */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
            <div className="p-8 border-b border-white/5 bg-white/2">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                        <span className="material-symbols-outlined">assignment_ind</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white leading-none">Bảng Điểm Chi Tiết</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2 italic">Hiển thị {paginatedResults.length} / {aggregatedResults.length} học sinh</p>
                    </div>
                </div>
            </div>

            {loadingR ? (
              <div className="py-20 text-center">
                 <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-slate-500 italic">Đang bóc tách dữ liệu...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="py-20 text-center">
                 <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-700">
                    <span className="material-symbols-outlined text-4xl">person_off</span>
                 </div>
                 <h3 className="text-xl font-black text-white mb-2">Chưa có bài làm</h3>
                 <p className="text-slate-500 max-w-xs mx-auto italic uppercase text-[10px] tracking-widest font-black">Các em học sinh vẫn chưa tham gia bài thi này.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/2 border-b border-white/5">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Học sinh</th>
                      <th className="text-center px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Điểm số</th>
                      <th className="text-center px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Trạng thái</th>
                      <th className="text-right px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Thời gian nộp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {paginatedResults.map((r) => (
                      <tr key={r.id} className="hover:bg-white/2 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-teal-500/50 transition-colors shadow-lg bg-slate-800">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${r.student_name}`} alt={r.student_name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-white font-bold group-hover:text-teal-400 transition-colors">{r.student_name || "Học sinh ẩn danh"}</span>
                               <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">Số lần làm: {r.attempts}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={`text-2xl font-black ${r.maxScore >= (selected.passing_score || 70) ? "text-teal-400" : "text-red-400"}`}>
                            {r.maxScore}%
                          </span>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                            r.passed
                              ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${r.passed ? "bg-teal-500" : "bg-red-500"}`} />
                            {r.passed ? "Vượt qua" : "Chưa đạt"}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right text-slate-500 text-xs font-medium italic">
                          {new Date(r.latestSubmit).toLocaleString('vi-VN', { 
                             day: '2-digit', 
                             month: '2-digit', 
                             year: 'numeric',
                             hour: '2-digit',
                             minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Student Pagination UI */}
                {totalPages > 1 && (
                   <div className="p-8 border-t border-white/5 flex justify-center items-center gap-3 bg-white/2">
                      <button 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all border border-white/5"
                      >
                         <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      
                      <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => {
                            const p = i + 1;
                            if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                                return (
                                    <button
                                        key={p}
                                        onClick={() => setCurrentPage(p)}
                                        className={`w-10 h-10 rounded-xl font-black text-xs transition-all border ${
                                            currentPage === p 
                                                ? "bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-500/20" 
                                                : "bg-white/5 border-white/5 text-slate-500 hover:text-white"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                );
                            }
                            if (p === currentPage - 2 || p === currentPage + 2) return <span key={p} className="text-slate-700">...</span>;
                            return null;
                        })}
                      </div>

                      <button 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all border border-white/5"
                      >
                         <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                   </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}