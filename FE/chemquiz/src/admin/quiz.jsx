import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { fetchQuizzes(); }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/admin/quizzes");
      setQuizzes(res.data?.data ?? res.data ?? []);
    } catch (e) {
      console.error("Lỗi tải quiz:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Xóa quiz "${title}"? Hành động này không thể hoàn tác.`)) return;
    setDeleting(id);
    try {
      await axiosClient.delete(`/admin/quizzes/${id}`);
      setQuizzes(prev => prev.filter(q => q.id !== id));
    } catch (e) {
      alert("Xóa thất bại: " + (e.response?.data?.message ?? "Lỗi không xác định"));
    } finally {
      setDeleting(null);
    }
  };

  const filtered = quizzes.filter(q =>
    q.title?.toLowerCase().includes(search.toLowerCase()) ||
    q.teacher_name?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s) =>
    s === "published" ? "bg-teal-500/20 text-teal-300 border-teal-500/30"
                      : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";

  const gradeColor = (g) =>
    g === "Lớp 10" ? "text-indigo-300"
    : g === "Lớp 11" ? "text-purple-300"
    : "text-pink-300";

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-bold text-2xl text-white">Quản lý Quiz</h2>
          <p className="text-xs text-slate-500 mt-1">
            {loading ? "Đang tải..." : `${filtered.length} quiz trong hệ thống`}
          </p>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Tìm theo tên quiz hoặc giáo viên..."
          className="w-full sm:w-72 bg-[#131b2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Tổng quiz",     value: quizzes.length,                                        color: "text-indigo-300" },
          { label: "Đã đăng",       value: quizzes.filter(q => q.status === "published").length,  color: "text-teal-300"   },
          { label: "Bản nháp",      value: quizzes.filter(q => q.status === "draft").length,      color: "text-yellow-300" },
        ].map(s => (
          <div key={s.label} className="bg-[#131b2e] rounded-2xl border border-white/5 p-4 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{loading ? "..." : s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quiz list */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-500">⏳ Đang tải...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          {search ? "Không tìm thấy quiz nào." : "Chưa có quiz nào trong hệ thống."}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(q => (
            <div key={q.id} className="bg-[#131b2e] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-white truncate">{q.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor(q.status)}`}>
                      {q.status === "published" ? "Đã đăng" : "Nháp"}
                    </span>
                    {q.grade && (
                      <span className={`text-[10px] font-bold ${gradeColor(q.grade)}`}>
                        {q.grade}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-1">
                    <span>👤 GV: <span className="text-slate-300">{q.teacher_name ?? "—"}</span></span>
                    <span>❓ {q.questions_count ?? 0} câu hỏi</span>
                    <span>✅ {q.attempts_count ?? 0} lượt làm</span>
                    <span>📅 {q.created_at ? new Date(q.created_at).toLocaleDateString("vi-VN") : "—"}</span>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(q.id, q.title)}
                  disabled={deleting === q.id}
                  className="shrink-0 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  {deleting === q.id ? "Đang xóa..." : "🗑 Xóa"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}