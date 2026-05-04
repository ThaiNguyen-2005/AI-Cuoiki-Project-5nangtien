import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EMPTY_QUESTION = () => ({
  id: Date.now() + Math.random(),
  content: "",
  type: "multiple_choice",
  options: ["", "", "", ""],
  correct_index: 0,
  explanation: "",
});

export default function TeacherQuiz() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=Info, 2=Questions, 3=Preview
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Quiz meta
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const subject = "Hóa học";  const [grade, setGrade] = useState("10");
  const [timeLimit, setTimeLimit] = useState(30);
  const [passingScore, setPassingScore] = useState(70);

  // Questions
  const [questions, setQuestions] = useState([EMPTY_QUESTION()]);
  const [activeQ, setActiveQ] = useState(0);

  // ---- Helpers ----
  const updateQuestion = (idx, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (qIdx, oIdx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIdx) return q;
        const opts = [...q.options];
        opts[oIdx] = value;
        return { ...q, options: opts };
      })
    );
  };

  const addQuestion = () => {
    const newQ = EMPTY_QUESTION();
    setQuestions((prev) => [...prev, newQ]);
    setActiveQ(questions.length);
  };

  const removeQuestion = (idx) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
    setActiveQ(Math.max(0, idx - 1));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setErrorMsg("");
    try {
      await axiosClient.post("/teacher/quizzes", {
        title,
        description,
        subject,
        grade,
        time_limit: timeLimit,
        passing_score: passingScore,
        questions: questions.map((q) => ({
          content: q.content,
          type: q.type,
          options: q.options,
          correct_index: q.correct_index,
          explanation: q.explanation,
        })),
      });
      setSuccessMsg("Quiz đã được tạo thành công!");
      setTimeout(() => navigate("/teacher/dashboard"), 1500);
    } catch (e) {
      setErrorMsg(e.response?.data?.message || "Có lỗi xảy ra, thử lại nhé!");
    } finally {
      setSaving(false);
    }
  };

  const currentQ = questions[activeQ];
  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="min-h-screen bg-[#080e1c] text-[#dbe2fd] pb-32 font-['Space_Grotesk',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .glass { background: rgba(15,22,40,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(99,102,241,0.15); }
        .glass-bright { background: rgba(30,40,70,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(99,102,241,0.25); }
        .glow-indigo { box-shadow: 0 0 20px rgba(99,102,241,0.3); }
        .glow-teal { box-shadow: 0 0 20px rgba(79,219,200,0.25); }
        .step-active { background: linear-gradient(135deg, #6366f1, #4fdbc8); color: #080e1c; }
        .step-done { background: rgba(99,102,241,0.2); border: 1px solid #6366f1; color: #6366f1; }
        .step-idle { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #4b5563; }
        .option-correct { border-color: #4fdbc8; background: rgba(79,219,200,0.08); }
        .option-idle { border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }
        .option-idle:hover { border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.06); }
        .q-chip { transition: all 0.2s; }
        .q-chip:hover { transform: scale(1.05); }
        .q-chip-active { background: linear-gradient(135deg,#6366f1,#4fdbc8); color:#080e1c; font-weight:700; }
        .q-chip-idle { background: rgba(255,255,255,0.06); color:#9ca3af; border:1px solid rgba(255,255,255,0.08); }
        .btn-primary { background: linear-gradient(135deg,#6366f1,#4fdbc8); color:#080e1c; font-weight:700; transition:all 0.2s; }
        .btn-primary:hover { opacity:0.9; transform:translateY(-1px); box-shadow:0 8px 25px rgba(99,102,241,0.4); }
        .btn-primary:active { transform:translateY(0); }
        .btn-ghost { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); transition:all 0.2s; }
        .btn-ghost:hover { background:rgba(255,255,255,0.1); }
        input, textarea, select { background:rgba(255,255,255,0.04) !important; border:1px solid rgba(99,102,241,0.2) !important; color:#dbe2fd !important; transition:border 0.2s; }
        input:focus, textarea:focus, select:focus { outline:none; border-color:#6366f1 !important; box-shadow:0 0 0 2px rgba(99,102,241,0.15); }
        select option { background:#1a2035; }
        .progress-bar { transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:rgba(99,102,241,0.3); border-radius:2px; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-indigo-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/teacher/dashboard")} className="btn-ghost p-2 rounded-xl text-gray-400 hover:text-white">
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Tạo mới</p>
            <h1 className="text-base font-black font-['Syne',sans-serif] text-white leading-tight">Bài Quiz</h1>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2">
          {[{ n: 1, label: "Thông tin" }, { n: 2, label: "Câu hỏi" }, { n: 3, label: "Xem lại" }].map(({ n, label }) => (
            <button key={n} onClick={() => step > n && setStep(n)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${step === n ? "step-active" : step > n ? "step-done cursor-pointer" : "step-idle cursor-default"}`}>
              <span>{step > n ? "✓" : n}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Progress */}
      <div className="fixed top-[57px] w-full z-40 h-0.5 bg-white/5">
        <div className="progress-bar h-full bg-gradient-to-r from-indigo-500 to-teal-400" style={{ width: `${progress}%` }} />
      </div>

      {/* ===== STEP 1: Thông tin ===== */}
      {step === 1 && (
<main className="pt-28 px-4 max-w-lg mx-auto space-y-5 animate-[fadeIn_0.3s_ease]">          <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

          <div className="glass-bright rounded-2xl p-5 space-y-4">
            <h2 className="font-black text-lg font-['Syne',sans-serif] text-white">Thông tin Quiz</h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Tiêu đề *</label>
              <input className="w-full rounded-xl px-4 py-3 text-sm" placeholder="VD: Kiểm tra chương 3 - Liên kết hóa học" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Mô tả</label>
              <textarea className="w-full rounded-xl px-4 py-3 text-sm resize-none" rows={3} placeholder="Nội dung, phạm vi kiến thức..." value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Môn học</label>
<input className="w-full rounded-xl px-4 py-3 text-sm" value="Hóa học" readOnly />              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Khối lớp</label>
                <select className="w-full rounded-xl px-4 py-3 text-sm" value={grade} onChange={e => setGrade(e.target.value)}>
                  {["10","11","12"].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Thời gian (phút)</label>
                <input type="number" min={5} max={180} className="w-full rounded-xl px-4 py-3 text-sm" value={timeLimit} onChange={e => setTimeLimit(+e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Điểm đạt (%)</label>
                <input type="number" min={0} max={100} className="w-full rounded-xl px-4 py-3 text-sm" value={passingScore} onChange={e => setPassingScore(+e.target.value)} />
              </div>
            </div>
          </div>

          {/* Stats preview */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "timer", label: "Thời gian", value: `${timeLimit} phút` },
              { icon: "school", label: "Khối", value: `Lớp ${grade}` },
              { icon: "emoji_events", label: "Điểm đạt", value: `${passingScore}%` },
            ].map(({ icon, label, value }) => (
              <div key={icon} className="glass rounded-xl p-3 text-center">
                <span className="material-symbols-outlined text-indigo-400 text-xl">{icon}</span>
                <p className="text-[10px] text-gray-500 mt-1">{label}</p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <button onClick={() => { if (!title.trim()) { setErrorMsg("Vui lòng nhập tiêu đề!"); return; } setErrorMsg(""); setStep(2); }}
            className="btn-primary w-full py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
            Tiếp theo — Thêm câu hỏi
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
          {errorMsg && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}
        </main>
      )}

      {/* ===== STEP 2: Câu hỏi ===== */}
      {step === 2 && (
        <main className="pt-20 px-4 max-w-lg mx-auto animate-[fadeIn_0.3s_ease]">
          {/* Question chips */}
          <div className="flex gap-2 overflow-x-auto py-3 pb-4 scrollbar-none" style={{ scrollbarWidth: "none" }}>
            {questions.map((q, i) => (
              <button key={q.id} onClick={() => setActiveQ(i)}
                className={`q-chip flex-shrink-0 w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center ${activeQ === i ? "q-chip-active" : "q-chip-idle"}`}>
                {q.content && q.options.every(o => o.trim()) ? (
                  <span className="material-symbols-outlined text-sm" style={{ fontSize: "14px" }}>check</span>
                ) : i + 1}
              </button>
            ))}
            <button onClick={addQuestion}
              className="q-chip flex-shrink-0 w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center glass-bright text-indigo-400 hover:text-white">
              <span className="material-symbols-outlined text-sm" style={{ fontSize: "14px" }}>add</span>
            </button>
          </div>

          {/* Question editor */}
          <div className="glass-bright rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 tracking-wider uppercase">Câu {activeQ + 1} / {questions.length}</span>
              {questions.length > 1 && (
                <button onClick={() => removeQuestion(activeQ)} className="text-red-400 hover:text-red-300 transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nội dung câu hỏi *</label>
              <textarea className="w-full rounded-xl px-4 py-3 text-sm resize-none" rows={3}
                placeholder="Nhập câu hỏi tại đây..."
                value={currentQ.content}
                onChange={e => updateQuestion(activeQ, "content", e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Các đáp án — Click để chọn đáp án đúng</label>
              {currentQ.options.map((opt, oi) => (
                <div key={oi} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border cursor-pointer transition-all ${currentQ.correct_index === oi ? "option-correct" : "option-idle"}`}
                  onClick={() => updateQuestion(activeQ, "correct_index", oi)}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black ${currentQ.correct_index === oi ? "bg-teal-400 text-[#080e1c]" : "bg-white/10 text-gray-500"}`}>
                    {["A","B","C","D"][oi]}
                  </div>
                  <input className="flex-1 bg-transparent !border-0 !border-none text-sm p-0 focus:ring-0 !shadow-none"
                    style={{ background: "transparent !important", border: "none !important", boxShadow: "none !important" }}
                    placeholder={`Đáp án ${["A","B","C","D"][oi]}`}
                    value={opt}
                    onChange={e => { e.stopPropagation(); updateOption(activeQ, oi, e.target.value); }}
                    onClick={e => e.stopPropagation()} />
                  {currentQ.correct_index === oi && (
                    <span className="material-symbols-outlined text-teal-400 text-sm flex-shrink-0" style={{ fontSize: "16px" }}>check_circle</span>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Giải thích (tuỳ chọn)</label>
              <textarea className="w-full rounded-xl px-4 py-3 text-sm resize-none" rows={2}
                placeholder="Giải thích đáp án đúng..."
                value={currentQ.explanation}
                onChange={e => updateQuestion(activeQ, "explanation", e.target.value)} />
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-4">
            <button onClick={() => setStep(1)} className="btn-ghost px-4 py-3 rounded-xl text-sm font-bold text-gray-400">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <button onClick={addQuestion} className="btn-ghost flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 text-indigo-300">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Thêm câu hỏi
            </button>
            <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
              Xem lại
              <span className="material-symbols-outlined text-lg">preview</span>
            </button>
          </div>
        </main>
      )}

      {/* ===== STEP 3: Preview ===== */}
      {step === 3 && (
        <main className="pt-24 px-4 max-w-lg mx-auto space-y-4 animate-[fadeIn_0.3s_ease]">
          {/* Quiz info card */}
          <div className="glass-bright rounded-2xl p-5 glow-indigo">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-indigo-400 font-bold tracking-widest uppercase mb-1">{subject} · Lớp {grade}</p>
                <h2 className="text-xl font-black font-['Syne',sans-serif] text-white">{title}</h2>
                {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
              </div>
            </div>
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="material-symbols-outlined text-indigo-400" style={{ fontSize: "16px" }}>quiz</span>
                {questions.length} câu hỏi
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="material-symbols-outlined text-teal-400" style={{ fontSize: "16px" }}>timer</span>
                {timeLimit} phút
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="material-symbols-outlined text-yellow-400" style={{ fontSize: "16px" }}>emoji_events</span>
                Đạt {passingScore}%
              </div>
            </div>
          </div>

          {/* Questions preview */}
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={q.id} className="glass rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <p className="text-sm text-white font-medium">{q.content || <span className="text-gray-500 italic">Chưa nhập câu hỏi</span>}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-10">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${q.correct_index === oi ? "bg-teal-400/10 border border-teal-400/30 text-teal-300 font-bold" : "bg-white/3 text-gray-500"}`}>
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 ${q.correct_index === oi ? "bg-teal-400 text-[#080e1c]" : "bg-white/10"}`}>
                        {["A","B","C","D"][oi]}
                      </span>
                      {opt || <span className="italic opacity-50">Trống</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {successMsg && (
            <div className="glass-bright border border-teal-400/30 rounded-2xl p-4 flex items-center gap-3 text-teal-400">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="text-sm font-bold">{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="glass-bright border border-red-400/30 rounded-2xl p-4 flex items-center gap-3 text-red-400">
              <span className="material-symbols-outlined">error</span>
              <span className="text-sm font-bold">{errorMsg}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-ghost px-4 py-3 rounded-xl text-sm font-bold text-gray-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Sửa
            </button>
            <button onClick={handleSubmit} disabled={saving}
              className="btn-primary flex-1 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {saving ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Đang lưu...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">publish</span>
                  Tạo Quiz
                </>
              )}
            </button>
          </div>
        </main>
      )}
    </div>
  );
}