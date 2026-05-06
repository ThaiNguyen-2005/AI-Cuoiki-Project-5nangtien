import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

const LABELS = ["A", "B", "C", "D"];
const KNOWLEDGE_TYPES = ["Khái niệm", "Lý thuyết", "Định lý", "Tính chất", "Bài tập"];
const GRADES = ["10", "11", "12"];

export default function CreateQuestionModal({ isOpen, onClose, onCreated }) {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [fetchingMetadata, setFetchingMetadata] = useState(false);

  const [formData, setFormData] = useState({
    content: "",
    options: ["", "", "", ""],
    correct_index: 0,
    explanation: "",
    grade: "10",
    subject_id: "",
    chapter_id: "",
    lesson_id: "",
    knowledge_type: "Khái niệm",
    level: "easy"
  });

  useEffect(() => {
    if (isOpen) {
      fetchSubjects();
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData.subject_id && formData.grade) {
      fetchChapters(formData.subject_id, formData.grade);
    }
  }, [formData.grade, formData.subject_id]);

  const fetchSubjects = async () => {
    try {
      const res = await axiosClient.get("/teacher/subjects");
      setSubjects(res.data);
      if (res.data.length > 0) {
        const chem = res.data.find(s => s.name.includes("Hóa")) || res.data[0];
        setFormData(prev => ({ ...prev, subject_id: chem.id }));
      }
    } catch (err) { console.error(err); }
  };

  const fetchChapters = async (subId, grade) => {
    setFetchingMetadata(true);
    try {
      const res = await axiosClient.get(`/teacher/chapters/${subId}?grade=${grade}`);
      setChapters(res.data);
      setFormData(prev => ({ ...prev, chapter_id: "", lesson_id: "" }));
    } catch (err) { console.error(err); }
    finally { setFetchingMetadata(false); }
  };

  const fetchLessons = async (chapId) => {
    if (!chapId) return;
    setFetchingMetadata(true);
    try {
      const res = await axiosClient.get(`/teacher/lessons/${chapId}`);
      setLessons(res.data);
      setFormData(prev => ({ ...prev, lesson_id: "" }));
    } catch (err) { console.error(err); }
    finally { setFetchingMetadata(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.lesson_id) {
      alert("Vui lòng chọn đầy đủ Chương và Bài học!");
      return;
    }

    setLoading(true);
    try {
      // Chuẩn bị dữ liệu theo format Backend yêu cầu
      const payload = {
        content: formData.content,
        option_a: formData.options[0],
        option_b: formData.options[1],
        option_c: formData.options[2],
        option_d: formData.options[3],
        correct_answer: LABELS[formData.correct_index],
        explanation: formData.explanation,
        grade: formData.grade,
        lesson_id: formData.lesson_id,
        knowledge_type: formData.knowledge_type,
        level: formData.level,
        difficulty: formData.level === 'hard' ? 5 : formData.level === 'medium' ? 3 : 1
      };

      await axiosClient.post("/teacher/questions", payload);
      onCreated();
      onClose();
      // Reset form
      setFormData(prev => ({ ...prev, content: "", options: ["", "", "", ""], explanation: "" }));
    } catch (err) {
      alert("Lỗi khi thêm câu hỏi: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050810]/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl bg-[#0d1628] rounded-4xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Thêm <span className="text-teal-400">Câu Hỏi Mới</span></h2>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Bổ sung học liệu vào kho lưu trữ giảng dạy</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Cột trái: Nội dung & Metadata */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nội dung câu hỏi *</label>
              <textarea 
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all resize-none text-lg"
                rows={4}
                required
                placeholder="Nhập nội dung câu hỏi..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Khối lớp</label>
                  <select 
                    value={formData.grade}
                    onChange={e => setFormData({...formData, grade: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50"
                  >
                    {GRADES.map(g => <option key={g} value={g} className="bg-[#0d1628]">Khối {g}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mức độ</label>
                  <select 
                    value={formData.level}
                    onChange={e => setFormData({...formData, level: e.target.value})}
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
                 value={formData.chapter_id}
                 onChange={e => {
                   setFormData({...formData, chapter_id: e.target.value});
                   fetchLessons(e.target.value);
                 }}
                 required
                 disabled={fetchingMetadata}
                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50 disabled:opacity-30"
               >
                 <option value="" className="bg-[#0d1628]">Chọn chương...</option>
                 {chapters.map(c => <option key={c.id} value={c.id} className="bg-[#0d1628]">{c.name}</option>)}
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Bài học *</label>
               <select 
                 value={formData.lesson_id}
                 onChange={e => setFormData({...formData, lesson_id: e.target.value})}
                 required
                 disabled={!formData.chapter_id || fetchingMetadata}
                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50 disabled:opacity-30"
               >
                 <option value="" className="bg-[#0d1628]">Chọn bài học...</option>
                 {lessons.map(l => <option key={l.id} value={l.id} className="bg-[#0d1628]">{l.name}</option>)}
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Loại kiến thức</label>
               <select 
                 value={formData.knowledge_type}
                 onChange={e => setFormData({...formData, knowledge_type: e.target.value})}
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
                {formData.options.map((opt, oi) => (
                  <div key={oi} className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, correct_index: oi})}
                      className={`w-12 h-12 rounded-xl font-black transition-all flex items-center justify-center shrink-0 ${formData.correct_index === oi ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "bg-white/5 text-slate-500 hover:text-white"}`}
                    >
                      {LABELS[oi]}
                    </button>
                    <input 
                      value={opt}
                      onChange={e => {
                        const newOpts = [...formData.options];
                        newOpts[oi] = e.target.value;
                        setFormData({...formData, options: newOpts});
                      }}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-all"
                      required
                      placeholder={`Đáp án ${LABELS[oi]}...`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Giải thích (Không bắt buộc)</label>
              <textarea 
                value={formData.explanation}
                onChange={e => setFormData({...formData, explanation: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-all resize-none"
                rows={4}
                placeholder="Giải thích tại sao đáp án này đúng..."
              />
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-5 rounded-2xl border border-white/10 text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
              >
                Hủy bỏ
              </button>
              <button 
                type="submit"
                disabled={loading || fetchingMetadata}
                className="flex-1 py-5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? "Đang lưu..." : (
                  <>
                    <span className="material-symbols-outlined">database</span>
                    Lưu vào ngân hàng
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
