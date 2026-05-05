import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const STAT_CARDS = [
  { key: "total_users",    label: "Tổng người dùng",        icon: "👥", color: "text-indigo-300", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { key: "total_teachers", label: "Giáo viên",              icon: "🎓", color: "text-purple-300", bg: "bg-purple-500/10 border-purple-500/20" },
  { key: "total_students", label: "Học sinh",               icon: "👤", color: "text-teal-300",   bg: "bg-teal-500/10   border-teal-500/20"   },
  { key: "total_quizzes",  label: "Quiz đã tạo",            icon: "📝", color: "text-yellow-300", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { key: "total_attempts", label: "Lượt làm bài",           icon: "✅", color: "text-green-300",  bg: "bg-green-500/10  border-green-500/20"  },
  { key: "avg_score",      label: "Điểm TB toàn hệ thống", icon: "📊", color: "text-pink-300",   bg: "bg-pink-500/10   border-pink-500/20"   },
];

export default function AdminAnalytics() {
  const [stats,      setStats]      = useState(null);
  const [topQuizzes, setTopQuizzes] = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      axiosClient.get("/admin/stats").catch(() => ({ data: {} })),
    ]).then(([statsRes]) => {
      setStats(statsRes.data);
    }).finally(() => setLoading(false));
  }, []);

  const d = stats || {};

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-6 lg:p-10">
      <div className="mb-8">
        <h2 className="font-bold text-2xl text-white">Phân tích hệ thống</h2>
        <p className="text-xs text-slate-500 mt-1">Tổng quan toàn bộ hoạt động</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {STAT_CARDS.map((s) => (
          <div key={s.key} className={`rounded-2xl border p-5 ${s.bg}`}>
            <div className="flex justify-between items-start mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold text-right">{s.label}</span>
            </div>
            <p className={`text-3xl font-black ${s.color}`}>
              {loading ? "..." : (
                s.key === "avg_score"
                  ? (typeof d[s.key] === "number" ? d[s.key].toFixed(1) : (d[s.key] ?? "—"))
                  : (d[s.key] ?? "—")
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Phân bổ vai trò */}
      <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 mb-6">
        <h3 className="font-bold text-white mb-5">Phân bổ người dùng theo vai trò</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { role: "Admin",     key: "total_admins",    color: "#a78bfa", icon: "🛡️" },
            { role: "Giáo viên", key: "total_teachers",  color: "#818cf8", icon: "🎓" },
            { role: "Học sinh",  key: "total_students",  color: "#2dd4bf", icon: "👤" },
          ].map(r => (
            <div key={r.role} className="py-5 px-3 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <span className="text-3xl mb-2 block">{r.icon}</span>
              <p className="text-2xl font-black" style={{ color: r.color }}>
                {loading ? "..." : (d[r.key] ?? d["total_users"] ?? "—")}
              </p>
              <p className="text-xs text-slate-500 mt-1">{r.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ghi chú */}
      <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 text-center">
        <p className="text-slate-500 text-sm">📈 Biểu đồ chi tiết sẽ hiển thị sau khi học sinh làm bài.</p>
      </div>
    </div>
  );
}