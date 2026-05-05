import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

export default function Profile() {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm]     = useState({ name: "", current_password: "", new_password: "", confirm_password: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/profile")
      .then(res => setForm(f => ({ ...f, name: res.data.name || "" })))
      .catch(() => setForm(f => ({ ...f, name: user?.name || "" })))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (form.new_password && form.new_password !== form.confirm_password) {
      setMsg({ type: "error", text: "Mật khẩu mới không khớp." }); return;
    }
    setSaving(true); setMsg({ type: "", text: "" });

    const payload = { name: form.name };
    if (form.new_password) {
      payload.current_password = form.current_password;
      payload.new_password     = form.new_password;
    }

    try {
      await axiosClient.put("/profile", payload);
      setMsg({ type: "success", text: "Cập nhật thành công!" });
      setForm(f => ({ ...f, current_password: "", new_password: "", confirm_password: "" }));
    } catch (e) {
      setMsg({ type: "error", text: e?.response?.data?.message || "Cập nhật thất bại." });
    } finally { setSaving(false); }
  };

  const backPath = role === "admin" ? "/admin/dashboard"
    : role === "teacher" ? "/teacher/dashboard"
    : "/student/dashboard";

  const ROLE_LABEL = { admin: "Quản trị viên", teacher: "Giáo viên", student: "Học sinh" };
  const ROLE_COLOR = { admin: "text-purple-300 bg-purple-500/10 border-purple-500/30", teacher: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30", student: "text-teal-300 bg-teal-500/10 border-teal-500/30" };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-12">
      <style>{`
        .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp .35s ease both; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-[#131b2e]/80 backdrop-blur-xl border-b border-white/5">
        <button onClick={() => navigate(backPath)} className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-all">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span className="text-sm font-medium">Quay lại</span>
        </button>
        <h2 className="font-['Space_Grotesk'] font-bold text-white text-base">Hồ sơ cá nhân</h2>
        <button onClick={logout} className="text-red-400 hover:bg-red-500/10 p-2 rounded-xl transition-all">
          <span className="material-symbols-outlined text-base">logout</span>
        </button>
      </header>

      <div className="max-w-md mx-auto px-4 pt-8 space-y-6 fade-up">
        {/* Avatar + Info */}
        <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 text-center space-y-3">
          <div className="relative inline-block">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name || "user"}`}
              className="w-20 h-20 rounded-full border-2 border-indigo-500/50 mx-auto"
              alt="avatar"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: "14px" }}>edit</span>
            </div>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl">{loading ? "..." : form.name}</h3>
            <p className="text-slate-400 text-sm mt-0.5">{user?.email}</p>
          </div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${ROLE_COLOR[role] || "text-slate-400"}`}>
            {ROLE_LABEL[role] || role}
          </span>
        </div>

        {/* Thông báo */}
        {msg.text && (
          <div className={`px-4 py-3 rounded-xl text-sm font-medium ${
            msg.type === "success" ? "bg-green-500/10 text-green-300 border border-green-500/20"
            : "bg-red-500/10 text-red-300 border border-red-500/20"
          }`}>
            {msg.text}
          </div>
        )}

        {/* Form chỉnh sửa */}
        <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 space-y-5">
          <h4 className="font-['Space_Grotesk'] font-semibold text-white">Thông tin cơ bản</h4>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Họ tên</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#0b1326] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              placeholder="Nhập họ tên..."
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full bg-[#0b1326] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Đổi mật khẩu */}
        <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 space-y-4">
          <h4 className="font-['Space_Grotesk'] font-semibold text-white">Đổi mật khẩu</h4>
          <p className="text-xs text-slate-500">Để trống nếu không muốn đổi mật khẩu.</p>

          {[
            { label: "Mật khẩu hiện tại", key: "current_password" },
            { label: "Mật khẩu mới",      key: "new_password" },
            { label: "Xác nhận mật khẩu", key: "confirm_password" },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs text-slate-400 mb-1.5 block">{f.label}</label>
              <input
                type="password"
                value={form[f.key]}
                onChange={e => { setMsg({ type: "", text: "" }); setForm({ ...form, [f.key]: e.target.value }); }}
                className="w-full bg-[#0b1326] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                placeholder="••••••"
              />
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 rounded-xl text-white font-bold text-sm transition-all active:scale-95"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
}