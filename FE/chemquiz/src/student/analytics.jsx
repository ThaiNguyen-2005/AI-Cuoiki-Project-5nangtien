import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export default function StudentAnalytics() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/student/analytics")
      .then(res => setData(res.data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const getGrade = (score) => {
    if (score >= 85) return { label: "Xuất sắc",     color: "text-teal-300"   };
    if (score >= 70) return { label: "Giỏi",         color: "text-indigo-300" };
    if (score >= 50) return { label: "Trung bình",   color: "text-yellow-300" };
    return              { label: "Cần cố gắng",  color: "text-red-300"    };
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1326] text-slate-400">
      ⏳ Đang tải thống kê...
    </div>
  );

  if (!data || data.total_attempts === 0) return (
    <div className="min-h-screen bg-[#0b1326] flex items-center justify-center p-4">
      <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-12 text-center max-w-md">
        <p className="text-5xl mb-4">📊</p>
        <h3 className="text-lg font-semibold text-white mb-2">Chưa có dữ liệu</h3>
        <p className="text-slate-400">Hãy làm bài quiz để xem thống kê của bạn</p>
      </div>
    </div>
  );

  const grade    = getGrade(data.average_score ?? 0);
  const accuracy = data.total_questions > 0
    ? Math.round((data.total_correct / data.total_questions) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-4 pb-28">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Phân tích kết quả</h1>
          <p className="text-slate-500 text-sm mt-1">Tổng quan hiệu suất học tập</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Lần làm bài",    value: data.total_attempts, color: "text-indigo-300" },
            { label: "Điểm TB",        value: `${data.average_score ?? 0}%`, color: grade.color },
            { label: "Điểm cao nhất",  value: `${data.best_score ?? 0}%`,   color: "text-teal-300" },
            { label: "Độ chính xác",   value: `${accuracy}%`,               color: "text-purple-300" },
          ].map(s => (
            <div key={s.label} className="bg-[#131b2e] rounded-xl border border-white/5 p-4 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Xếp loại */}
        <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 mb-6">
          <h2 className="text-base font-semibold text-white mb-3">Xếp loại học lực</h2>
          <div className="flex items-center gap-4">
            <div className={`text-3xl font-black ${grade.color}`}>{grade.label}</div>
            <div className="flex-1">
              <div className="bg-white/5 rounded-full h-3 overflow-hidden">
                <div className="bg-indigo-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${data.average_score ?? 0}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>0%</span><span>100%</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-3">
            Tổng: <strong className="text-white">{data.total_correct}</strong> câu đúng /&nbsp;
            <strong className="text-white">{data.total_questions}</strong> câu đã làm
          </p>
        </div>

        {/* Biểu đồ điểm gần đây */}
        {data.recent_scores?.length > 0 && (
          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 mb-6">
            <h2 className="text-base font-semibold text-white mb-4">Điểm 10 lần gần nhất</h2>
            <div className="flex items-end gap-2 h-32">
              {data.recent_scores.slice().reverse().map((r, i) => {
                const pct = (r.score / 100) * 100;
                const color = r.score >= 80 ? "bg-teal-400" : r.score >= 50 ? "bg-indigo-400" : "bg-red-400";
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs text-slate-400 font-medium">{r.score}%</div>
                    <div className="w-full flex items-end justify-center" style={{ height: "80px" }}>
                      <div className={`w-full rounded-t-md ${color}`}
                        style={{ height: `${pct}%`, minHeight: "4px" }} />
                    </div>
                    <div className="text-[10px] text-slate-600">{r.date}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Theo từng quiz */}
        {data.by_quiz?.length > 0 && (
          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6">
            <h2 className="text-base font-semibold text-white mb-4">Theo từng quiz</h2>
            <div className="space-y-4">
              {data.by_quiz.map(q => (
                <div key={q.quiz_id} className="border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white truncate flex-1">{q.quiz_title}</span>
                    <span className="text-sm text-slate-400 ml-2">{q.attempts} lần</span>
                  </div>
                  <div className="flex gap-4 text-sm mb-2">
                    <span className="text-slate-400">Tốt nhất: <strong className={getGrade(q.best_score).color}>{q.best_score}%</strong></span>
                    <span className="text-slate-400">TB: <strong className="text-white">{q.avg_score}%</strong></span>
                  </div>
                  <div className="bg-white/5 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-400 h-2 rounded-full" style={{ width: `${q.best_score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}