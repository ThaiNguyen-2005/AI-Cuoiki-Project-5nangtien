import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function StudentHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [expandedQuizId, setExpandedQuizId] = useState(null);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const res = await axiosClient.get("/student/history");
      setHistory(res.data?.history ?? res.data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Grouping logic
  const groupedHistory = history.reduce((acc, curr) => {
    const qid = curr.quiz_id;
    if (!acc[qid]) {
      acc[qid] = {
        quiz_id: qid,
        quiz_title: curr.quiz_title,
        bestScore: 0,
        totalAttempts: 0,
        attempts: []
      };
    }
    acc[qid].attempts.push(curr);
    acc[qid].bestScore = Math.max(acc[qid].bestScore, curr.score);
    acc[qid].totalAttempts += 1;
    return acc;
  }, {});

  const historyList = Object.values(groupedHistory);

  const fetchDetail = async (attemptId) => {
    setDetailLoading(true);
    try {
      const res = await axiosClient.get(`/student/attempt/${attemptId}`);
      setSelected(res.data?.attempt ?? res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setDetailLoading(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 80) return "text-teal-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <span>Đang lục lại lịch sử thi của bạn...</span>
      </div>
    </div>
  );

  // Màn hình chi tiết bài làm
  if (selected) {
    if (detailLoading) return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
        <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
    return (
      <div className="py-2 min-h-full pb-20">
        <div className="mb-8">
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-500 font-bold text-xs uppercase tracking-widest transition-all mb-4">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Quay lại lịch sử
          </button>
          <h1 className="text-4xl font-black text-white tracking-tight">{selected.quiz_title}</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">{selected.date}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className={`rounded-3xl border p-8 text-center shadow-xl relative overflow-hidden bg-white/5 ${selected.passed ? "border-teal-500/20" : "border-red-500/20"}`}>
              <p className={`font-black text-6xl mb-2 tabular-nums tracking-tighter ${scoreColor(selected.score)}`}>{selected.score}%</p>
              <div className={`px-4 py-1.5 rounded-full inline-block text-[10px] font-black uppercase tracking-widest ${selected.passed ? "bg-teal-500/10 text-teal-400" : "bg-red-500/10 text-red-400"}`}>
                {selected.passed ? "Đạt yêu cầu" : "Chưa đạt"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 text-center">
                <p className="text-2xl font-black text-blue-400">{selected.correct}/{selected.total}</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Câu đúng</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 text-center">
                <p className="text-2xl font-black text-slate-300">{selected.total - selected.correct}</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Câu sai</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {(selected.details || []).map((d, i) => (
              <div key={d.question_id} className={`bg-white/5 backdrop-blur-xl rounded-3xl border p-8 shadow-xl ${d.is_correct ? "border-teal-500/10" : "border-red-500/10"}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-black text-sm ${d.is_correct ? "bg-teal-500 text-white" : "bg-red-500 text-white"}`}>
                    {i + 1}
                  </div>
                  <p className="text-white font-medium leading-relaxed">{d.question_text}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                  {(d.options || []).map((opt, idx) => {
                    const isCorrect = idx === d.correct_answer;
                    const isPicked = idx === d.student_answer;
                    return (
                      <div key={idx} className={`p-4 rounded-xl border text-sm transition-all flex items-center gap-3 ${isCorrect
                          ? "bg-teal-500/10 border-teal-500/30 text-teal-400 font-bold"
                          : (isPicked && !isCorrect ? "bg-red-500/10 border-red-500/30 text-red-400 line-through opacity-70" : "bg-white/2 border-white/5 text-slate-500")
                        }`}>
                        <span className="w-5 h-5 rounded flex items-center justify-center bg-white/5 text-[10px] font-black">{String.fromCharCode(65 + idx)}</span>
                        {opt}
                      </div>
                    );
                  })}
                </div>
                {d.explanation && (
                  <div className="mt-6 ml-12 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <p className="text-xs text-blue-400 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm font-bold">lightbulb</span>
                      <span className="font-black uppercase tracking-widest text-[10px]">Giải thích:</span>
                      <span className="leading-relaxed">{d.explanation}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 min-h-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Lịch Sử <span className="text-blue-500">Thi Đấu</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Nhìn lại hành trình chinh phục kiến thức của bạn</p>
        </div>
        <button onClick={() => navigate("/student/quiz")}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]">
          <span className="material-symbols-outlined">add</span>
          Làm bài mới
        </button>
      </div>

      {historyList.length === 0 ? (
        <div className="py-10 flex justify-center">
          <div className="bg-white/5 rounded-[3rem] border border-white/5 p-12 text-center shadow-2xl relative overflow-hidden group max-w-xl w-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px]" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl text-blue-500 animate-pulse">history_edu</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Chưa có dấu ấn nào</h3>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Hành trình vạn dặm bắt đầu từ một bước chân.<br />
                Bạn chưa thực hiện bài kiểm tra nào trong hệ thống,<br />
                hãy bắt đầu ngay hôm nay nhé!
              </p>
              <button onClick={() => navigate("/student/quiz")}
                className="mt-12 bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20 transition-all active:scale-95">
                Bắt đầu thi ngay
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 pb-32">
          {historyList.map((quizGroup) => (
            <div key={quizGroup.quiz_id} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-4xl overflow-hidden shadow-xl transition-all">
              <div 
                className="p-8 cursor-pointer hover:bg-white/5 transition-colors flex flex-col md:flex-row justify-between items-center gap-6"
                onClick={() => setExpandedQuizId(expandedQuizId === quizGroup.quiz_id ? null : quizGroup.quiz_id)}
              >
                <div className="flex items-center gap-6 flex-1 min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-blue-500 text-3xl">assignment</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tight truncate">{quizGroup.quiz_title}</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Đã thực hiện {quizGroup.totalAttempts} lượt làm bài</p>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    <div className="text-center">
                        <p className={`text-5xl font-black tabular-nums tracking-tighter ${scoreColor(quizGroup.bestScore)}`}>{quizGroup.bestScore}%</p>
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">Điểm cao nhất</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${expandedQuizId === quizGroup.quiz_id ? "rotate-180" : ""}`}>
                        <span className="material-symbols-outlined text-slate-500">expand_more</span>
                    </div>
                </div>
              </div>

              {expandedQuizId === quizGroup.quiz_id && (
                  <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
                      <div className="border-t border-white/5 pt-6 space-y-3">
                          {quizGroup.attempts.map((attempt, idx) => (
                              <div key={attempt.id} className="group flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
                                  <div className="flex items-center gap-4">
                                      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-slate-500">
                                          {quizGroup.attempts.length - idx}
                                      </span>
                                      <div>
                                          <p className="text-sm font-black text-white">Lần {quizGroup.attempts.length - idx}</p>
                                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{attempt.date}</p>
                                      </div>
                                  </div>

                                  <div className="flex items-center gap-8">
                                      <div className="text-right">
                                          <p className={`text-xl font-black ${scoreColor(attempt.score)}`}>{attempt.score}%</p>
                                          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{attempt.correct}/{attempt.total} câu</p>
                                      </div>
                                      <button 
                                          onClick={() => fetchDetail(attempt.id)}
                                          className="p-2.5 rounded-xl bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-600/0 hover:shadow-blue-600/20"
                                      >
                                          <span className="material-symbols-outlined text-sm">visibility</span>
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}