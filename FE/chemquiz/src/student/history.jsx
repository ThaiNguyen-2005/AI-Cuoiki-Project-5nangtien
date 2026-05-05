import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function StudentHistory() {
  const navigate = useNavigate();
  const [history,  setHistory]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

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
    if (score >= 80) return "text-teal-300";
    if (score >= 50) return "text-yellow-300";
    return "text-red-300";
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1326] text-slate-400">
      ⏳ Đang tải lịch sử...
    </div>
  );

  // Modal chi tiết
  if (selected) {
    if (detailLoading) return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1326] text-slate-400">⏳</div>
    );
    return (
      <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-4 pb-28">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setSelected(null)}
            className="mb-4 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium text-sm">
            ← Quay lại lịch sử
          </button>

          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-1">{selected.quiz_title}</h2>
            <p className="text-slate-500 text-sm mb-4">{selected.date}</p>
            <div className="flex gap-6 flex-wrap">
              <div className="text-center">
                <div className={`text-3xl font-black ${scoreColor(selected.score)}`}>{selected.score}%</div>
                <div className="text-xs text-slate-500 mt-1">Điểm số</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-indigo-300">{selected.correct}/{selected.total}</div>
                <div className="text-xs text-slate-500 mt-1">Câu đúng</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {(selected.details || []).map((d, i) => (
              <div key={d.question_id}
                className={`bg-[#131b2e] rounded-xl border p-5 ${d.is_correct ? "border-teal-500/20" : "border-red-500/20"}`}>
                <div className="flex items-start justify-between mb-3">
                  <p className="font-medium text-white flex-1">
                    <span className="text-slate-500 mr-2">Câu {i+1}.</span>{d.question_text}
                  </p>
                  <span className={`ml-4 px-2 py-1 rounded-full text-xs font-bold ${d.is_correct ? "bg-teal-500/10 text-teal-300" : "bg-red-500/10 text-red-300"}`}>
                    {d.is_correct ? "✓ Đúng" : "✗ Sai"}
                  </span>
                </div>
                <div className="space-y-1">
                  {(d.options || []).map((opt, idx) => {
                    const isCorrect = idx === d.correct_answer;
                    const isPicked  = idx === d.student_answer;
                    return (
                      <div key={idx} className={`px-3 py-2 rounded-lg text-sm ${
                        isCorrect             ? "bg-teal-500/10 text-teal-300 font-semibold"
                        : isPicked && !isCorrect ? "bg-red-500/10 text-red-300 line-through"
                        : "text-slate-500"
                      }`}>
                        {String.fromCharCode(65+idx)}. {opt}
                        {isCorrect && " ✓"}
                        {isPicked && !isCorrect && " (Bạn chọn)"}
                      </div>
                    );
                  })}
                </div>
                {d.explanation && (
                  <div className="mt-3 text-xs text-indigo-300 bg-indigo-500/10 rounded-lg p-3">
                    💡 {d.explanation}
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
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-4 pb-28">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Lịch sử làm bài</h1>
            <p className="text-slate-500 text-sm mt-1">Xem lại kết quả các bài đã làm</p>
          </div>
          <button onClick={() => navigate("/student/quiz")}
            className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
            + Làm bài mới
          </button>
        </div>

        {history.length === 0 ? (
          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-12 text-center">
            <p className="text-5xl mb-4">📝</p>
            <h3 className="text-lg font-semibold text-white mb-2">Chưa có lịch sử</h3>
            <p className="text-slate-500 mb-6">Bạn chưa làm bài quiz nào</p>
            <button onClick={() => navigate("/student/quiz")}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-xl font-bold">
              Bắt đầu làm bài
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id}
                className="bg-[#131b2e] rounded-xl border border-white/5 hover:border-indigo-500/30 p-5 flex items-center justify-between gap-4 cursor-pointer transition-all"
                onClick={() => fetchDetail(item.id)}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{item.quiz_title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{item.date}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded-lg">
                      {item.correct}/{item.total} câu đúng
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-2xl font-black ${scoreColor(item.score)}`}>{item.score}%</div>
                  <div className="text-xs text-slate-500 mt-1">điểm</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}