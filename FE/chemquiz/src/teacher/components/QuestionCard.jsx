import React from "react";

const LABELS = ["A", "B", "C", "D"];

export default function QuestionCard({ q, displayIndex, onEdit, onDelete, deletingId }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-4xl overflow-hidden group hover:border-teal-500/20 transition-all shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col lg:flex-row">
          {/* Left Info Bar */}
          <div className="lg:w-48 bg-white/2 border-b lg:border-b-0 lg:border-r border-white/5 p-6 flex lg:flex-col justify-between items-center lg:items-start gap-4">
            <div className="flex items-center lg:flex-col lg:items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 border border-teal-500/10 mb-2">
                      <span className="material-symbols-outlined">quiz</span>
                  </span>
                  <span className="text-[10px] font-black text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded-md uppercase">Câu Hỏi</span>
                </div>
                <div className="min-w-0 flex-1 lg:mt-2">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Nguồn</p>
                  <p className="text-white text-xs font-bold truncate" title={q.quiz_title}>{q.quiz_title}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button 
                  onClick={() => onEdit({...q, displayIndex})}
                  className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white transition-all flex items-center justify-center"
                  title="Sửa câu hỏi"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button 
                  onClick={() => onDelete(q.id)}
                  disabled={deletingId === q.id}
                  className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center disabled:opacity-30"
                  title="Xoá câu hỏi"
                >
                  <span className="material-symbols-outlined text-lg">{deletingId === q.id ? 'sync' : 'delete'}</span>
                </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
               <span>Lớp {q.grade}</span>
               <span className="material-symbols-outlined text-[10px]">chevron_right</span>
               <span className="text-blue-400">{q.chapter_name}</span>
               <span className="material-symbols-outlined text-[10px]">chevron_right</span>
               <span className="text-purple-400">{q.lesson_name}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-lg bg-teal-500/10 text-teal-500 text-[10px] font-black uppercase tracking-widest border border-teal-500/10">
                  Khối {q.grade || "10"}
                </span>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                    q.level === 'hard' ? 'bg-red-500/10 text-red-400 border-red-500/10' :
                    q.level === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/10' :
                    'bg-green-500/10 text-green-400 border-green-500/10'
                }`}>
                  {q.level === 'hard' ? 'Khó' : q.level === 'medium' ? 'Vừa' : 'Dễ'}
                </span>
                {q.knowledge_type && (
                    <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/10">
                        {q.knowledge_type}
                    </span>
                )}
            </div>
            
            <div className="flex justify-between items-start gap-6 mb-6">
                <p className="text-xl text-white font-medium leading-relaxed flex-1">{q.content}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {q.options.map((opt, oi) => (
                  <div key={oi} className={`p-4 rounded-2xl text-xs flex items-center gap-3 border ${q.correct_index === oi ? "bg-teal-500/10 text-teal-400 border-teal-500/20 font-bold shadow-lg shadow-teal-500/5" : "bg-white/2 text-slate-500 border-white/5"}`}>
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${q.correct_index === oi ? "bg-teal-500 text-white" : "bg-white/5"}`}>{LABELS[oi]}</span>
                      <span className="truncate text-sm">{opt}</span>
                  </div>
                ))}
            </div>

            {q.explanation && (
                <div className="p-4 bg-teal-500/5 border border-teal-500/10 rounded-2xl text-xs text-teal-300/80 leading-relaxed italic flex items-start gap-3">
                  <span className="material-symbols-outlined text-sm text-teal-400 shrink-0">lightbulb</span>
                  <p>
                      <strong className="text-teal-400 not-italic uppercase tracking-widest mr-2">Giải thích:</strong>
                      {q.explanation}
                  </p>
                </div>
            )}
          </div>
      </div>
    </div>
  );
}
