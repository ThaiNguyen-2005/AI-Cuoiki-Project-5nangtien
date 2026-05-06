import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function ViewQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizDetails();
  }, [id]);

  const fetchQuizDetails = async () => {
    try {
      const [quizRes, qRes] = await Promise.all([
        axiosClient.get("/teacher/quizzes"), // Backend doesn't have single quiz GET yet, so filter from list
        axiosClient.get(`/teacher/quizzes/${id}/questions`)
      ]);
      const foundQuiz = quizRes.data.find(q => String(q.id) === id);
      setQuiz(foundQuiz);
      setQuestions(qRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center">
       <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
       <p className="mt-4 text-slate-500 font-black uppercase tracking-widest text-xs">Đang nạp dữ liệu đề thi...</p>
    </div>
  );

  if (!quiz) return <div className="text-white">Không tìm thấy đề thi.</div>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-outlined">arrow_back</span>
           </button>
           <div>
              <h1 className="text-3xl font-black text-white tracking-tight">{quiz.title}</h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                 Khối {quiz.grade} · {questions.length} câu hỏi · {quiz.time_limit} phút
              </p>
           </div>
        </div>
        <button 
           onClick={() => navigate(`/teacher/results/${quiz.id}`)}
           className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-teal-500/20 transition-all flex items-center gap-2"
        >
           <span className="material-symbols-outlined text-sm">analytics</span>
           Xem kết quả học sinh
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6 pb-20">
         <div className="p-6 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-xl italic text-slate-400">
            {quiz.description || "Không có mô tả chi tiết cho đề thi này."}
         </div>

         {questions.map((q, idx) => (
            <div key={q.id} className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
               <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 font-black shrink-0">
                     {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                            q.level === 'hard' ? 'bg-red-500/10 text-red-400' :
                            q.level === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-green-500/10 text-green-400'
                        }`}>
                          {q.level === 'hard' ? 'Khó' : q.level === 'medium' ? 'Vừa' : 'Dễ'}
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase">{q.knowledge_type}</span>
                    </div>
                    <h3 className="text-xl text-white font-medium leading-relaxed">{q.content}</h3>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                  {q.options.map((opt, oi) => (
                     <div key={oi} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${q.correct_index === oi ? "bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-lg shadow-teal-500/5" : "bg-white/2 border-white/5 text-slate-500 opacity-60"}`}>
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${q.correct_index === oi ? "bg-teal-500 text-white" : "bg-white/5"}`}>
                           {String.fromCharCode(65 + oi)}
                        </span>
                        <span>{opt}</span>
                        {q.correct_index === oi && <span className="material-symbols-outlined text-teal-400 ml-auto">check_circle</span>}
                     </div>
                  ))}
               </div>

               {q.explanation && (
                  <div className="mt-8 ml-14 p-5 bg-white/2 rounded-2xl border border-dashed border-white/10">
                     <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">lightbulb</span>
                        Giải thích từ giáo viên
                     </p>
                     <p className="text-sm text-slate-400 italic leading-relaxed">{q.explanation}</p>
                  </div>
               )}
            </div>
         ))}
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
