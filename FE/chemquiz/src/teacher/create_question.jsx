import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function CreateQuestion() {
  const navigate = useNavigate();

  // State lưu thông tin chung của câu hỏi
  const [question, setQuestion] = useState({
    content: '',
    chapter: 'Hydrocarbon',
    level: 'Dễ'
  });

  // State lưu 4 đáp án (Mặc định cho đáp án A là đúng để tránh việc user quên chọn)
  const [options, setOptions] = useState([
    { id: 'A', text: '', is_correct: true },
    { id: 'B', text: '', is_correct: false },
    { id: 'C', text: '', is_correct: false },
    { id: 'D', text: '', is_correct: false }
  ]);

  // Xử lý khi gõ nội dung đáp án
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  // Xử lý khi chọn đáp án đúng (Radio button)
  const handleSetCorrect = (selectedIndex) => {
    const newOptions = options.map((opt, index) => ({
      ...opt,
      is_correct: index === selectedIndex
    }));
    setOptions(newOptions);
  };

  // Xử lý Nộp Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem đã nhập đủ 4 đáp án chưa
    const isOptionsValid = options.every(opt => opt.text.trim() !== '');
    if (!question.content.trim() || !isOptionsValid) {
      alert("Vui lòng nhập đầy đủ nội dung câu hỏi và 4 đáp án!");
      return;
    }

    // Cục dữ liệu chuẩn bị bắn xuống Backend
    const payload = {
      content: question.content,
      chapter: question.chapter,
      level: question.level,
      options: options
    };

    console.log("Dữ liệu gửi đi:", payload);

    try {
      // Bật dòng này lên khi BE đã có API
      // await axiosClient.post('/questions', payload);
      alert("Thêm câu hỏi thành công!");
      navigate('/teacher/questions'); // Quay lại trang danh sách
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-6 font-['Inter'] flex justify-center items-center">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card { background: rgba(19, 27, 46, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }
      `}} />

      <div className="max-w-3xl w-full glass-card p-8 rounded-2xl shadow-2xl mt-10">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">post_add</span>
            Soạn Câu Hỏi Mới
          </h1>
          <button onClick={() => navigate('/teacher/questions')} className="text-gray-400 hover:text-white transition">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hàng 1: Chương và Độ khó */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Chương Hóa học</label>
              <select 
                value={question.chapter}
                onChange={(e) => setQuestion({...question, chapter: e.target.value})}
                className="w-full bg-[#1a233a] border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              >
                <option value="Hydrocarbon">Hydrocarbon</option>
                <option value="Phản ứng Oxy hóa khử">Phản ứng Oxy hóa khử</option>
                <option value="Đại cương Kim loại">Đại cương Kim loại</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Độ khó</label>
              <select 
                value={question.level}
                onChange={(e) => setQuestion({...question, level: e.target.value})}
                className="w-full bg-[#1a233a] border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              >
                <option value="Dễ">Dễ (Nhận biết)</option>
                <option value="Trung bình">Trung bình (Thông hiểu)</option>
                <option value="Khó">Khó (Vận dụng)</option>
              </select>
            </div>
          </div>

          {/* Hàng 2: Nội dung câu hỏi */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nội dung câu hỏi</label>
            <textarea 
              rows="3"
              required
              value={question.content}
              onChange={(e) => setQuestion({...question, content: e.target.value})}
              placeholder="VD: Chất nào sau đây làm mất màu dung dịch Brom?"
              className="w-full bg-[#1a233a] border border-white/10 rounded-lg p-4 text-white focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          {/* Hàng 3: 4 Đáp án */}
          <div>
            <label className="block text-sm text-gray-400 mb-4">Các đáp án (Chọn vào ô tròn để thiết lập đáp án đúng)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((opt, index) => (
                <div key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${opt.is_correct ? 'bg-indigo-600/20 border-indigo-500' : 'bg-[#1a233a] border-white/5 hover:border-white/20'}`}>
                  {/* Nút chọn đáp án đúng */}
                  <input 
                    type="radio" 
                    name="correct_answer" 
                    checked={opt.is_correct}
                    onChange={() => handleSetCorrect(index)}
                    className="w-5 h-5 accent-indigo-500 cursor-pointer"
                  />
                  <span className="font-bold text-gray-500">{opt.id}.</span>
                  {/* Ô nhập nội dung đáp án */}
                  <input 
                    type="text" 
                    required
                    value={opt.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Nhập đáp án ${opt.id}...`}
                    className="w-full bg-transparent text-white outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Nút Submit */}
          <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/teacher/questions')} className="px-6 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
              Hủy bỏ
            </button>
            <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all">
              Lưu câu hỏi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}