import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

const LABELS = ["A", "B", "C", "D"];
const KNOWLEDGE_TYPES = ["Khái niệm", "Lý thuyết", "Định lý", "Tính chất", "Bài tập"];
const GRADES = ["10", "11", "12"];

export default function EditQuestionModal({ editingQuestion, setEditingQuestion, handleUpdate, updating }) {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [fetchingMetadata, setFetchingMetadata] = useState(false);

  useEffect(() => {
    if (editingQuestion) {
      fetchSubjects();
      
      // Lấy ID từ dữ liệu lồng nhau của Laravel
      const subId = editingQuestion.lesson?.chapter?.subject_id || editingQuestion.subject_id;
      const chapId = editingQuestion.lesson?.chapter_id || editingQuestion.chapter_id;
      
      if (subId) {
        fetchChapters(subId, editingQuestion.grade);
        if (chapId) {
          fetchLessons(chapId);
        }
      }
    }
  }, [editingQuestion?.id]);

  const fetchSubjects = async () => {
    try {
      const res = await axiosClient.get("/teacher/subjects");
      setSubjects(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchChapters = async (subId, grade) => {
    setFetchingMetadata(true);
    try {
      const res = await axiosClient.get(`/teacher/chapters/${subId}?grade=${grade}`);
      setChapters(res.data);
    } catch (err) { console.error(err); }
    finally { setFetchingMetadata(false); }
  };

  const fetchLessons = async (chapId) => {
    if (!chapId) return;
    setFetchingMetadata(true);
    try {
      const res = await axiosClient.get(`/teacher/lessons/${chapId}`);
      setLessons(res.data);
    } catch (err) { console.error(err); }
    finally { setFetchingMetadata(false); }
  };

  if (!editingQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050810]/95 backdrop-blur-md" onClick={() => setEditingQuestion(null)} />
      <div className="relative z-10 w-full max-w-5xl bg-[#0d1628] rounded-4xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Hiệu Chỉnh <span className="text-teal-400">Câu Hỏi</span></h2>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Cập nhật thông tin chi tiết trong ngân hàng câu hỏi</p>
          </div>
          <button onClick={() => setEditingQuestion(null)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleUpdate} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Cột trái: Nội dung & Metadata */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nội dung câu hỏi *</label>
              <textarea 
                value={editingQuestion.content}
                onChange={e => setEditingQuestion({...editingQuestion, content: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all resize-none text-lg"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Khối lớp</label>
                  <select 
                    value={editingQuestion.grade}
                    onChange={e => {
                        const newGrade = e.target.value;
                        setEditingQuestion({...editingQuestion, grade: newGrade, chapter_id: "", lesson_id: ""});
                        const subId = editingQuestion.lesson?.chapter?.subject_id || editingQuestion.subject_id;
                        if (subId) fetchChapters(subId, newGrade);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50"
                  >
                    {GRADES.map(g => <option key={g} value={g} className="bg-[#0d1628]">Khối {g}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mức độ</label>
                  <select 
                    value={editingQuestion.level}
                    onChange={e => setEditingQuestion({...editingQuestion, level: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50"
                  >
                    <option value="easy" className="bg-[#0d1628]">Dễ</option>
                    <option value="medium" className="bg-[#0d1628]">Vừa</option>
                    <option value="hard" className="bg-[#0d1628]">Khó</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chương học *</label>
               <select 
                 value={editingQuestion.chapter_id || (editingQuestion.lesson?.chapter_id) || ""}
                 onChange={e => {
                   const chapId = e.target.value;
                   setEditingQuestion({...editingQuestion, chapter_id: chapId, lesson_id: ""});
                   fetchLessons(chapId);
                 }}
                 required
                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50"
               >
                 <option value="" className="bg-[#0d1628]">Chọn chương...</option>
                 {chapters.map(c => <option key={c.id} value={c.id} className="bg-[#0d1628]">{c.name}</option>)}
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Bài học *</label>
               <select 
                 value={editingQuestion.lesson_id}
                 onChange={e => setEditingQuestion({...editingQuestion, lesson_id: e.target.value})}
                 required
                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50"
               >
                 <option value="" className="bg-[#0d1628]">Chọn bài học...</option>
                 {lessons.map(l => <option key={l.id} value={l.id} className="bg-[#0d1628]">{l.name}</option>)}
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Loại kiến thức</label>
               <select 
                 value={editingQuestion.knowledge_type}
                 onChange={e => setEditingQuestion({...editingQuestion, knowledge_type: e.target.value})}
                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50"
               >
                 {KNOWLEDGE_TYPES.map(t => <option key={t} value={t} className="bg-[#0d1628]">{t}</option>)}
               </select>
            </div>
          </div>

          {/* Cột phải: Đáp án & Giải thích */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Các phương án & Đáp án đúng *</label>
              <div className="grid grid-cols-1 gap-3">
                {editingQuestion.options.map((opt, oi) => (
                  <div key={oi} className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => setEditingQuestion({...editingQuestion, correct_index: oi})}
                      className={`w-12 h-12 rounded-xl font-black transition-all flex items-center justify-center shrink-0 ${editingQuestion.correct_index === oi ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "bg-white/5 text-slate-500 hover:text-white"}`}
                    >
                      {LABELS[oi]}
                    </button>
                    <input 
                      value={opt}
                      onChange={e => {
                        const newOpts = [...editingQuestion.options];
                        newOpts[oi] = e.target.value;
                        setEditingQuestion({...editingQuestion, options: newOpts});
                      }}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-all"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Giải thích (Không bắt buộc)</label>
              <textarea 
                value={editingQuestion.explanation || ""}
                onChange={e => setEditingQuestion({...editingQuestion, explanation: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-all resize-none"
                rows={4}
              />
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button" 
                onClick={() => setEditingQuestion(null)}
                className="flex-1 py-5 rounded-2xl border border-white/10 text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
              >
                Hủy bỏ
              </button>
              <button 
                type="submit"
                disabled={updating || fetchingMetadata}
                className="flex-1 py-5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {updating ? "Đang lưu..." : (
                  <>
                    <span className="material-symbols-outlined">save</span>
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
