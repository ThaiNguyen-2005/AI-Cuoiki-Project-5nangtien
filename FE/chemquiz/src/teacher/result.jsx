// =====================================================
// src/teacher/result.jsx — Kết quả học sinh (API thật)
// =====================================================
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function TeacherResult() {
  const [quizzes, setQuizzes]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults]   = useState([]);
  const [loadingQ, setLoadingQ] = useState(true);
  const [loadingR, setLoadingR] = useState(false);

  useEffect(() => {
    axiosClient.get("/teacher/quizzes")
      .then(r => setQuizzes(r.data || []))
      .catch(() => setQuizzes([]))
      .finally(() => setLoadingQ(false));
  }, []);

  const loadResults = (quiz) => {
    setSelected(quiz);
    setLoadingR(true);
    axiosClient.get(`/teacher/results/${quiz.id}`)
      .then(r => setResults(r.data || []))
      .catch(() => setResults([]))
      .finally(() => setLoadingR(false));
  };

  const avgScore = results.length
    ? (results.reduce((s, r) => s + (r.score ?? 0), 0) / results.length).toFixed(1)
    : "—";
  const passRate = results.length
    ? Math.round(results.filter(r => r.passed).length / results.length * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pt-20 pb-28 px-4">
      <style>{`
        .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .3s ease both}
      `}</style>

      <div className="max-w-lg mx-auto space-y-5 fade-up">
        <div>
          <h2 className="font-['Space_Grotesk'] font-black text-white text-2xl">Kết quả</h2>
          <p className="text-slate-400 text-sm mt-1">Chọn quiz để xem điểm học sinh</p>
        </div>

        {/* Danh sách quiz */}
        {loadingQ ? (
          <p className="text-slate-500 text-sm text-center py-8">Đang tải...</p>
        ) : quizzes.length === 0 ? (
          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-10 text-center">
            <span className="material-symbols-outlined text-3xl text-slate-600 mb-2 block">quiz</span>
            <p className="text-slate-500 text-sm">Chưa có quiz nào. Tạo quiz trước nhé!</p>
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {quizzes.map(q => (
              <button key={q.id}
                onClick={() => loadResults(q)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  selected?.id === q.id
                    ? "bg-indigo-500 border-indigo-400 text-white"
                    : "bg-[#131b2e] border-white/8 text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                {q.title}
              </button>
            ))}
          </div>
        )}

        {/* Kết quả */}
        {selected && (
          <>
            {/* Stats mini */}
            {!loadingR && results.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Lượt làm", value: results.length, color: "text-indigo-300" },
                  { label: "Điểm TB",  value: `${avgScore}%`, color: "text-teal-300" },
                  { label: "Tỉ lệ đạt", value: `${passRate}%`, color: "text-yellow-300" },
                ].map(s => (
                  <div key={s.label} className="bg-[#131b2e] rounded-xl border border-white/5 p-4 text-center">
                    <p className={`font-black text-xl font-['Space_Grotesk'] ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Bảng kết quả */}
            <div className="bg-[#131b2e] rounded-2xl border border-white/5 overflow-hidden">
              {loadingR ? (
                <p className="text-center text-slate-500 py-10">Đang tải kết quả...</p>
              ) : results.length === 0 ? (
                <div className="p-10 text-center">
                  <span className="material-symbols-outlined text-3xl text-slate-600 mb-2 block">assignment</span>
                  <p className="text-slate-500 text-sm">Chưa có học sinh nào làm bài này.</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-3">Học sinh</th>
                      <th className="text-center px-5 py-3">Điểm</th>
                      <th className="text-center px-5 py-3">Kết quả</th>
                      <th className="text-right px-5 py-3 hidden sm:table-cell">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${r.student_name}`}
                              className="w-7 h-7 rounded-full border border-white/10" alt="" />
                            <span className="text-white font-medium text-sm">{r.student_name || "Học sinh"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <span className={`font-['Space_Grotesk'] font-black ${
                            r.score >= (selected.passing_score || 50) ? "text-teal-300" : "text-red-300"
                          }`}>
                            {r.score}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            r.passed ? "bg-teal-500/10 text-teal-300 border border-teal-500/30"
                            : "bg-red-500/10 text-red-300 border border-red-500/30"
                          }`}>
                            {r.passed ? "Đạt" : "Chưa đạt"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right text-slate-500 text-xs hidden sm:table-cell">
                          {r.submitted_at ? new Date(r.submitted_at).toLocaleDateString("vi-VN") : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}