import React, { useState } from "react";
import { Link } from "react-router-dom";
import TeacherNavbar from "../components/TeacherNavbar";
// DỮ LIỆU GIẢ: Danh sách câu hỏi ban đầu
const initialQuestions = [
  {
    id: 1,
    content: "Kim loại nào sau đây có tính dẫn điện tốt nhất?",
    options: ["Đồng (Cu)", "Bạc (Ag)", "Vàng (Au)", "Nhôm (Al)"],
    correctAnswer: 1, // Vị trí thứ 1 (Bạc)
    chapter: "Đại cương Kim loại",
    level: "Dễ"
  },
  {
    id: 2,
    content: "Dung dịch nào sau đây làm quỳ tím chuyển sang màu xanh?",
    options: ["NaCl", "H2SO4", "NaOH", "KNO3"],
    correctAnswer: 2, // Vị trí thứ 2 (NaOH)
    chapter: "Axit - Bazơ - Muối",
    level: "Dễ"
  },
  {
    id: 3,
    content: "Thể tích khí CO2 (đktc) thu được khi đốt cháy hoàn toàn 0,1 mol C2H5OH là bao nhiêu?",
    options: ["2,24 lít", "4,48 lít", "3,36 lít", "6,72 lít"],
    correctAnswer: 1, // Vị trí 1 (4,48 lít)
    chapter: "Hydrocarbon",
    level: "Trung bình"
  }
];

export default function TeacherQuestion() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [search, setSearch] = useState("");
  
  // State quản lý Cửa sổ thêm câu hỏi (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQ, setNewQ] = useState({
    content: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    chapter: "Đại cương Kim loại",
    level: "Dễ"
  });

  // Hàm cập nhật chữ trong 4 ô đáp án
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQ.options];
    updatedOptions[index] = value;
    setNewQ({ ...newQ, options: updatedOptions });
  };

  // Hàm Lưu câu hỏi mới
  const handleAddQuestion = (e) => {
    e.preventDefault();
    const questionToAdd = {
      id: Date.now(), // Tạo ID ngẫu nhiên
      ...newQ
    };
    setQuestions([questionToAdd, ...questions]); // Thêm lên đầu danh sách
    setIsModalOpen(false); // Đóng modal
    // Reset form
    setNewQ({ content: "", options: ["", "", "", ""], correctAnswer: 0, chapter: "Đại cương Kim loại", level: "Dễ" });
  };

  // Hàm Xóa câu hỏi
  const handleDelete = (id) => {
    if(window.confirm("Thầy/cô có chắc muốn xóa câu hỏi này không?")) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  // Lọc câu hỏi theo ô tìm kiếm
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
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-500 hover:bg-teal-400 text-[#0b1326] px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(79,219,200,0.3)]"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="hidden sm:inline">Thêm câu hỏi</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 mt-4">
        
        {/* Thanh tìm kiếm và bộ lọc */}
        <div className="glass-card p-4 rounded-xl mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm nội dung câu hỏi..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1c2438] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-[#1c2438] border border-white/5 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-teal-400 flex-1 sm:flex-none cursor-pointer">
              <option>Tất cả chuyên đề</option>
              <option>Đại cương Kim loại</option>
              <option>Hydrocarbon</option>
              <option>Axit - Bazơ - Muối</option>
            </select>
            <select className="bg-[#1c2438] border border-white/5 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-teal-400 flex-1 sm:flex-none cursor-pointer">
              <option>Độ khó</option>
              <option>Dễ</option>
              <option>Trung bình</option>
              <option>Khó</option>
            </select>
          </div>
        </div>

        {/* Danh sách câu hỏi */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-10 text-slate-400">Không tìm thấy câu hỏi nào!</div>
          ) : (
            filteredQuestions.map((q, index) => (
              <div key={q.id} className="glass-card p-5 rounded-xl hover:border-indigo-400/50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full kinetic-gradient opacity-50"></div>
                
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-400/10 px-2 py-0.5 rounded border border-teal-400/20">{q.chapter}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${q.level === 'Dễ' ? 'text-green-300 border-green-400/20 bg-green-400/10' : q.level === 'Trung bình' ? 'text-yellow-300 border-yellow-400/20 bg-yellow-400/10' : 'text-red-300 border-red-400/20 bg-red-400/10'}`}>{q.level}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-4">Câu {index + 1}: {q.content}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, i) => (
                        <div key={i} className={`flex items-center gap-2 text-sm p-2 rounded-lg border ${q.correctAnswer === i ? 'bg-teal-400/10 border-teal-400/30 text-teal-300 font-medium' : 'bg-white/5 border-transparent text-slate-400'}`}>
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${q.correctAnswer === i ? 'bg-teal-400 text-[#0b1326]' : 'bg-slate-700 text-slate-300'}`}>
                            {['A', 'B', 'C', 'D'][i]}
                          </span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => handleDelete(q.id)} className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Nút FAB Thêm ở Mobile */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed sm:hidden bottom-20 right-6 w-14 h-14 bg-teal-500 text-[#0b1326] rounded-full shadow-[0_0_20px_rgba(79,219,200,0.4)] flex items-center justify-center z-40 active:scale-90 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* --- CỬA SỔ MODAL THÊM CÂU HỎI --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#131b2e] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl relative my-auto">
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#131b2e] rounded-t-2xl z-10">
              <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Thêm câu hỏi trắc nghiệm</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-2">Nội dung câu hỏi *</label>
                <textarea 
                  required
                  rows="3"
                  value={newQ.content}
                  onChange={(e) => setNewQ({...newQ, content: e.target.value})}
                  className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-teal-400 transition-colors"
                  placeholder="Nhập câu hỏi tại đây..."
                ></textarea>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-indigo-300">Các đáp án (Chọn đáp án đúng) *</label>
                {newQ.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="correctAnswer" 
                      required
                      checked={newQ.correctAnswer === i}
                      onChange={() => setNewQ({...newQ, correctAnswer: i})}
                      className="w-5 h-5 accent-teal-400 cursor-pointer"
                    />
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">{['A', 'B', 'C', 'D'][i]}</span>
                      <input 
                        type="text" 
                        required
                        value={opt}
                        onChange={(e) => handleOptionChange(i, e.target.value)}
                        className={`w-full bg-[#0b1326] border rounded-lg py-2.5 pl-10 pr-3 text-white focus:outline-none transition-colors ${newQ.correctAnswer === i ? 'border-teal-400/50 bg-teal-400/5' : 'border-white/10 focus:border-indigo-400'}`}
                        placeholder={`Nhập đáp án ${['A', 'B', 'C', 'D'][i]}...`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-300 mb-2">Chuyên đề</label>
                  <select 
                    value={newQ.chapter}
                    onChange={(e) => setNewQ({...newQ, chapter: e.target.value})}
                    className="w-full bg-[#0b1326] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-400 cursor-pointer"
                  >
                    <option>Đại cương Kim loại</option>
                    <option>Hydrocarbon</option>
                    <option>Axit - Bazơ - Muối</option>
                    <option>Hữu cơ tổng hợp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-300 mb-2">Độ khó</label>
                  <select 
                    value={newQ.level}
                    onChange={(e) => setNewQ({...newQ, level: e.target.value})}
                    className="w-full bg-[#0b1326] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-400 cursor-pointer"
                  >
                    <option>Dễ</option>
                    <option>Trung bình</option>
                    <option>Khó</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg font-bold text-slate-300 hover:bg-white/5 transition-colors">
                  Hủy
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-lg font-bold bg-teal-500 hover:bg-teal-400 text-[#0b1326] shadow-[0_0_15px_rgba(79,219,200,0.3)] transition-all">
                  Lưu câu hỏi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom NavBar (Giống hệt Teacher Dashboard) */}
<TeacherNavbar />        <Link to="/teacher/dashboard" className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">Tổng quan</span>
        </Link>
        <Link to="/teacher/quiz" className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">Tạo Quiz</span>
        </Link>
        <Link to="/teacher/question" className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-indigo-300">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>database</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">Ngân hàng</span>
        </Link>
        <Link to="/teacher/result" className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200">
          <span className="material-symbols-outlined">assignment_turned_in</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">Kết quả</span>
        </Link>
        <Link to="/teacher/analytics" className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200">
          <span className="material-symbols-outlined">insights</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">Phân tích</span>
        </Link>
      <TeacherNavbar />
    </div>
  );
}