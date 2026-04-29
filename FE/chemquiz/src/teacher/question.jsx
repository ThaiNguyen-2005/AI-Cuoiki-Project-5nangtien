import React, { useState } from "react";
import { Link } from "react-router-dom";
import TeacherNavbar from "../components/TeacherNavbar";

// DỮ LIỆU GIẢ: Danh sách câu hỏi ban đầu
const initialQuestions = [
  {
    id: 1,
    content: "Kim loại nào sau đây có tính dẫn điện tốt nhất?",
    options: ["Đồng (Cu)", "Bạc (Ag)", "Vàng (Au)", "Nhôm (Al)"],
    correctAnswer: 1,
    chapter: "Đại cương Kim loại",
    level: "Dễ"
  },
  {
    id: 2,
    content: "Dung dịch nào sau đây làm quỳ tím chuyển sang màu xanh?",
    options: ["NaCl", "H2SO4", "NaOH", "KNO3"],
    correctAnswer: 2,
    chapter: "Axit - Bazơ - Muối",
    level: "Dễ"
  }
];

export default function TeacherQuestion() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQ, setNewQ] = useState({
    content: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    chapter: "Đại cương Kim loại",
    level: "Dễ"
  });

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQ.options];
    updatedOptions[index] = value;
    setNewQ({ ...newQ, options: updatedOptions });
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const questionToAdd = { id: Date.now(), ...newQ };
    setQuestions([questionToAdd, ...questions]);
    setIsModalOpen(false);
    setNewQ({ content: "", options: ["", "", "", ""], correctAnswer: 0, chapter: "Đại cương Kim loại", level: "Dễ" });
  };

  const handleDelete = (id) => {
    if(window.confirm("Thầy/cô có chắc muốn xóa câu hỏi này không?")) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-24">
      <style dangerouslySetInnerHTML={{ __html: `
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #4fdbc8 100%); }
        .glass-card { background: rgba(19, 27, 46, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(192, 193, 255, 0.1); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-40 glass-card px-6 py-4 border-b border-indigo-500/20 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-teal-400">database</span>
          <h1 className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-wide">Ngân hàng câu hỏi</h1>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-teal-500 text-[#0b1326] px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          <span className="hidden sm:inline">Thêm câu hỏi</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 mt-4">
        {/* Thanh tìm kiếm */}
        <div className="glass-card p-4 rounded-xl mb-6">
          <input 
            type="text" 
            placeholder="Tìm kiếm nội dung..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c2438] border border-white/5 rounded-lg py-2.5 px-4 text-white outline-none"
          />
        </div>

        {/* Danh sách câu hỏi */}
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => (
            <div key={q.id} className="glass-card p-5 rounded-xl group relative">
              <h3 className="text-lg font-semibold text-white mb-4">Câu {index + 1}: {q.content}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, i) => (
                  <div key={i} className={`p-2 rounded-lg ${q.correctAnswer === i ? 'bg-teal-400/10 text-teal-300' : 'bg-white/5 text-slate-400'}`}>
                    {['A', 'B', 'C', 'D'][i]}. {opt}
                  </div>
                ))}
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleDelete(q.id)} className="text-red-400"><span className="material-symbols-outlined">delete</span></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL THÊM CÂU HỎI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#131b2e] border border-white/10 rounded-2xl w-full max-w-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Thêm câu hỏi mới</h2>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <textarea required value={newQ.content} onChange={(e) => setNewQ({...newQ, content: e.target.value})} className="w-full bg-[#0b1326] p-3 text-white rounded-xl border border-white/10" placeholder="Nội dung câu hỏi..."></textarea>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-300">Hủy</button>
                <button type="submit" className="bg-teal-500 px-4 py-2 rounded-lg font-bold text-[#0b1326]">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ĐÃ DỌN DẸP SẠCH SẼ Ở ĐÂY --- */}
      <TeacherNavbar />
      
    </div>
  );
}