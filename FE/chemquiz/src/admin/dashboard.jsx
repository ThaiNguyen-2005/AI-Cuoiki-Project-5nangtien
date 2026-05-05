import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const ROLES = ["admin", "teacher", "student"];
const ROLE_COLORS = {
  admin: "text-purple-400",
  teacher: "text-blue-400",
  student: "text-green-400",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal tạo user
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        axiosClient.get("/admin/stats"),
        axiosClient.get("/admin/users"),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data.data ?? usersRes.data);
    } catch (e) {
      console.error("Lỗi tải dashboard:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setSaving(true);
    setError("");
    try {
      await axiosClient.post("/admin/users", form);
      setShowModal(false);
      setForm({ name: "", email: "", password: "", role: "student" });
      fetchData();
    } catch (e) {
      setError(e.response?.data?.message ?? "Lỗi tạo người dùng");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa người dùng này?")) return;
    try {
      await axiosClient.delete(`/admin/users/${id}`);
      fetchData();
    } catch (e) {
      console.error("Lỗi xóa:", e);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1326] text-white">
        Đang tải...
      </div>
    );

  return (
    <div className="p-6 bg-[#0b1326] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#c0c1ff]">Tổng Quan Hệ Thống</h1>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Tổng người dùng", value: stats.total_users ?? 0, color: "text-purple-400" },
            { label: "Giáo viên", value: stats.total_teachers ?? 0, color: "text-blue-400" },
            { label: "Học sinh", value: stats.total_students ?? 0, color: "text-green-400" },
            { label: "Bài quiz", value: stats.total_quizzes ?? 0, color: "text-yellow-400" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
              <p className="text-sm text-gray-400">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Header danh sách */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách người dùng</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Thêm người dùng
        </button>
      </div>

      {/* Bảng users */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Tên</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Vai trò</th>
              <th className="px-4 py-3 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 text-gray-400">{u.email}</td>
                <td className={`px-4 py-3 font-medium ${ROLE_COLORS[u.role] ?? ""}`}>
                  {u.role}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  Chưa có người dùng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1a2540] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Thêm người dùng mới</h3>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <div className="space-y-3">
              {[
                { label: "Tên", key: "name", type: "text" },
                { label: "Email", key: "email", type: "email" },
                { label: "Mật khẩu", key: "password", type: "password" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Vai trò</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-sm transition"
              >
                Hủy
              </button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {saving ? "Đang lưu..." : "Tạo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}