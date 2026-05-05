import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../api/axiosClient";

// ─── SCREEN: Danh sách quiz ───────────────────────────────────────────────
function QuizList({ onStart }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");

  useEffect(() => {
    axiosClient.get("/student/quizzes")
      .then(r => setQuizzes(r.data?.data ?? r.data ?? []))
      .catch(() => setQuizzes([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = quizzes.filter(q =>
    q.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-60 text-slate-500">⏳ Đang tải...</div>
  );

  return (
    <div className="space-y-5 pt-4 pb-28 px-4 max-w-lg mx-auto">
      <div>
        <h2 className="font-black text-white text-2xl">Làm bài</h2>
        <p className="text-slate-400 text-sm mt-1">{filtered.length} bài kiểm tra đang mở</p>
      </div>

      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍 Tìm bài kiểm tra..."
        className="w-full bg-[#131b2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
      />

      {filtered.length === 0 ? (
        <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-10 text-center">
          <p className="text-slate-500 text-sm">📝 Chưa có bài kiểm tra nào.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <div key={q.id} className="bg-[#131b2e] border border-white/5 rounded-2xl p-5 hover:border-indigo-500/30 transition-all">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{q.title}</h3>
                  {q.description && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{q.description}</p>}
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
                    <span>⏱ {q.time_limit} phút</span>
                    <span>❓ {q.total_questions ?? q.questions_count ?? q.questions?.length ?? "?"} câu</span>
                    <span>🏆 Đạt: {q.passing_score}%</span>
                  </div>
                </div>
                <button
                  onClick={() => onStart(q)}
                  className="shrink-0 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold rounded-xl transition-all"
                >
                  Làm bài
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: Làm bài ─────────────────────────────────────────────────────
function TakeQuiz({ quiz, onDone }) {
  const [questions,   setQuestions]   = useState([]);
  const [answers,     setAnswers]     = useState({});
  const [current,     setCurrent]     = useState(0);
  const [timeLeft,    setTimeLeft]    = useState((quiz.time_limit || 15) * 60);
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // ← đúng endpoint: /student/exam/{quizId}
    axiosClient.get(`/student/exam/${quiz.id}`)
      .then(r => setQuestions(r.data?.questions ?? r.data ?? []))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, [quiz.id]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleSubmit(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [questions]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`;

  const handleSelect = (idx) => setAnswers(a => ({ ...a, [questions[current].id]: idx }));

  const handleSubmit = async (auto = false) => {
    clearInterval(timerRef.current);
    if (!auto && Object.keys(answers).length < questions.length) {
      if (!window.confirm(`Còn ${questions.length - Object.keys(answers).length} câu chưa trả lời. Vẫn nộp?`)) return;
    }
    setSubmitting(true);
    try {
      // ← đúng endpoint: POST /student/exam/{quizId}
      const res = await axiosClient.post(`/student/exam/${quiz.id}`, {
        answers: questions.map(q => ({
          question_id:    q.id,
          selected_index: answers[q.id] ?? null,
        })),
      });
      onDone(res.data, questions, answers);
    } catch {
      onDone({ score: 0, passed: false, error: true }, questions, answers);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-60 text-slate-500">⏳ Đang tải đề...</div>;

  if (questions.length === 0) return (
    <div className="text-center py-16 text-slate-500">❌ Không tải được đề bài.</div>
  );

  const q   = questions[current];
  const opts = q.options || [];
  const selected = answers[q.id];
  const urgent   = timeLeft < 60;

  return (
    <div className="min-h-screen bg-[#0b1326] pb-32 pt-4">
      {/* Timer */}
      <div className="sticky top-0 z-20 bg-[#0b1326]/90 backdrop-blur-xl px-4 pt-3 pb-3 border-b border-white/5">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400">Câu {current + 1}/{questions.length}</span>
            <span className={`font-black text-lg ${urgent ? "text-red-400 animate-pulse" : "text-teal-300"}`}>
              ⏱ {fmt(timeLeft)}
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(((current+1)/questions.length)*100)}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-5">
          <p className="text-xs text-indigo-300 font-bold uppercase mb-3">Câu {current + 1}</p>
          <p className="text-white text-base font-medium leading-relaxed">{q.content}</p>
        </div>

        <div className="space-y-3">
          {opts.map((opt, i) => (
            <button key={i} onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                selected === i
                  ? "bg-indigo-500/20 border-indigo-400 text-white"
                  : "bg-[#131b2e] border-white/5 text-slate-300 hover:border-indigo-500/30"
              }`}
            >
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black mr-3 ${
                selected === i ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-400"
              }`}>{["A","B","C","D"][i]}</span>
              {opt}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setCurrent(c => Math.max(0, c-1))} disabled={current===0}
            className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 font-medium text-sm">
            ← Trước
          </button>
          {current < questions.length - 1 ? (
            <button onClick={() => setCurrent(c => c+1)}
              className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm">
              Tiếp →
            </button>
          ) : (
            <button onClick={() => handleSubmit(false)} disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#0b1326] font-bold text-sm disabled:opacity-50">
              {submitting ? "Đang nộp..." : "Nộp bài ✓"}
            </button>
          )}
        </div>

        {/* Mini map */}
        <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-4">
          <p className="text-xs text-slate-400 mb-3">Trạng thái câu hỏi</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((qq, i) => (
              <button key={qq.id} onClick={() => setCurrent(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  i === current            ? "bg-indigo-500 text-white ring-2 ring-indigo-400"
                  : answers[qq.id] !== undefined ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "bg-white/5 text-slate-500 hover:bg-white/10"
                }`}
              >{i+1}</button>
            ))}
          </div>
          <p className="text-[10px] text-slate-600 mt-3">Đã làm: {Object.keys(answers).length}/{questions.length} câu</p>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: Kết quả ─────────────────────────────────────────────────────
function QuizResult({ result, quiz, questions, answers, onRetry, onBack }) {
  const score   = result?.score   ?? 0;
  const passed  = result?.passed  ?? false;
  const details = result?.details ?? [];

  return (
    <div className="min-h-screen bg-[#0b1326] pb-24 pt-6">
      <div className="max-w-lg mx-auto px-4 space-y-5">
        <div className={`rounded-2xl border p-8 text-center ${passed ? "bg-teal-500/10 border-teal-500/30" : "bg-red-500/10 border-red-500/30"}`}>
          <p className="text-5xl mb-3">{passed ? "🏆" : "😔"}</p>
          <p className={`font-black text-6xl mb-2 ${passed ? "text-teal-300" : "text-red-300"}`}>{score}%</p>
          <p className="text-white font-bold text-lg mb-1">{passed ? "🎉 Đạt yêu cầu!" : "❌ Chưa đạt"}</p>
          <p className="text-slate-400 text-sm">{quiz?.title}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Đúng", value: details.filter(d => d.is_correct).length, color: "text-teal-300" },
            { label: "Sai",  value: details.filter(d => !d.is_correct).length, color: "text-red-300" },
            { label: "Tổng", value: questions.length, color: "text-indigo-300" },
          ].map(s => (
            <div key={s.label} className="bg-[#131b2e] rounded-xl border border-white/5 p-4 text-center">
              <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {questions.length > 0 && (
          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-5 space-y-4">
            <h3 className="font-bold text-white">Chi tiết</h3>
            {questions.map((q, i) => {
              const detail     = details.find(d => d.question_id === q.id);
              const isCorrect  = detail?.is_correct ?? false;
              const myIdx      = answers[q.id];
              const correctIdx = detail?.correct_index ?? q.correct_index;

              return (
                <div key={q.id} className={`rounded-xl p-4 border ${isCorrect ? "border-teal-500/20 bg-teal-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                  <p className="text-sm text-white font-medium mb-3">
                    <span className={`mr-2 ${isCorrect ? "text-teal-400" : "text-red-400"}`}>{isCorrect ? "✓" : "✗"}</span>
                    {i+1}. {q.content}
                  </p>
                  {(q.options || []).map((o, oi) => (
                    <p key={oi} className={`text-xs px-3 py-1.5 rounded-lg mb-1 ${
                      oi === correctIdx          ? "bg-teal-500/20 text-teal-300 font-bold"
                      : oi === myIdx && !isCorrect ? "bg-red-500/20 text-red-300 line-through"
                      : "text-slate-500"
                    }`}>
                      {["A","B","C","D"][oi]}. {o}
                    </p>
                  ))}
                  {q.explanation && (
                    <p className="text-xs text-slate-400 mt-2 italic border-t border-white/5 pt-2">💡 {q.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onBack}
            className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white font-medium text-sm">
            ← Về danh sách
          </button>
          <button onClick={onRetry}
            className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm">
            Làm lại ↩
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────
export default function StudentQuiz() {
  const [screen,    setScreen]   = useState("list");
  const [activeQuiz, setActive]  = useState(null);
  const [result,    setResult]   = useState(null);
  const [finalQs,   setFinalQs]  = useState([]);
  const [finalAns,  setFinalAns] = useState({});

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd]">
      {screen === "list" && (
        <QuizList onStart={q => { setActive(q); setScreen("quiz"); }} />
      )}
      {screen === "quiz" && activeQuiz && (
        <TakeQuiz quiz={activeQuiz} onDone={(res, qs, ans) => {
          setResult(res); setFinalQs(qs); setFinalAns(ans); setScreen("result");
        }} />
      )}
      {screen === "result" && (
        <QuizResult result={result} quiz={activeQuiz} questions={finalQs} answers={finalAns}
          onBack={() => { setScreen("list"); setActive(null); setResult(null); }}
          onRetry={() => setScreen("quiz")}
        />
      )}
    </div>
  );
}