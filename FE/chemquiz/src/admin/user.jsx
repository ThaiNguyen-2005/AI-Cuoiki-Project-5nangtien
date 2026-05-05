import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const ROLES = ["all", "teacher", "student", "admin"];
const ROLE_COLORS = {
  admin:   "text-purple-300 bg-purple-500/10 border border-purple-500/30",
  teacher: "text-indigo-300 bg-indigo-500/10 border border-indigo-500/30",
  student: "text-teal-300   bg-teal-500/10   border border-teal-500/30",
};

export default function AdminUser() {
  const [users,     setUsers]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState("all");
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form,      setForm]      = useState({ name: "", email: "", password: "", role: "student" });
  const [saving,    setSaving]    = useState(false);
  const [error,     setError]     = useState("");

  const fetchUsers = () => {
    setLoading(true);
    axiosClient.get("/admin/users")          // ← đúng endpoint
      .then(res => setUsers(res.data.data ?? res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u => {
    const matchRole   = filter === "all" || u.role === filter;
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) ||
                        u.email?.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Vui lòng điền đủ thông tin."); return;
    }
    setSaving(true); setError("");
    try {
      await axiosClient.post("/admin/users", form);   // ← đúng endpoint
      setShowModal(false);
      setForm({ name: "", email: "", password: "", role: "student" });
      fetchUsers();
    } catch {
      setError("Tạo thất bại. Email có thể đã tồn tại.");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá người dùng này?")) return;
    await axiosClient.delete(`/admin/users/${id}`).catch(() => {}); // ← đúng endpoint
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd]">

      {/* Header */}
      <header className="sticky top-0 z-30 flex justify-between items-center px-6 lg:px-10 py-5 bg-[#131b2e]/80 backdrop-blur-xl border-b border-white/5">
        <div>
          <h2 className="font-bold text-lg text-white">Quản lý người dùng</h2>
          <p className="text-xs text-slate-500">{users.length} tài khoản trong hệ thống</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-all active:scale-95"
        >
          + Thêm mới
        </button>
      </header>

      <div className="p-6 lg:p-10 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 bg-[#131b2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {ROLES.map(r => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === r
                    ? "bg-indigo-500 text-white"
                    : "bg-[#131b2e] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {r === "all" ? "Tất cả" : r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#131b2e] rounded-2xl border border-white/5 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500">Đang tải...</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-slate-500">Không tìm thấy người dùng nào.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-4">Tên</th>
                  <th className="text-left px-6 py-4 hidden sm:table-cell">Email</th>
                  <th className="text-left px-6 py-4">Vai trò</th>
                  <th className="text-right px-6 py-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`}
                          className="w-8 h-8 rounded-full border border-white/10"
                          alt=""
                        />
                        <span className="font-medium text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 hidden sm:table-cell">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${ROLE_COLORS[u.role] || "text-slate-400"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-lg transition-all text-xs"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#131b2e] rounded-2xl border border-white/10 w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-lg">Thêm người dùng</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>

            {error && <p className="text-red-400 text-xs bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}

            {[
              { label: "Họ tên",    key: "name",     type: "text",     placeholder: "Nguyễn Văn A" },
              { label: "Email",     key: "email",    type: "email",    placeholder: "abc@gmail.com" },
              { label: "Mật khẩu", key: "password", type: "password", placeholder: "••••••" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-slate-400 mb-1 block">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full bg-[#0b1326] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            ))}

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Vai trò</label>
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full bg-[#0b1326] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              >
                <option value="student">Học sinh</option>
                <option value="teacher">Giáo viên</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              onClick={handleCreate}
              disabled={saving}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50"
            >
              {saving ? "Đang tạo..." : "Tạo tài khoản"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}