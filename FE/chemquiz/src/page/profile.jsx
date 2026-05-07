import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

export default function Profile() {
  const { user, role, logout, updateUser } = useContext(AuthContext);
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
      const res = await axiosClient.put("/profile", payload);
      
      if (res.data.password_changed) {
        setMsg({ type: "success", text: "Đổi mật khẩu thành công! Hệ thống sẽ tự động đăng xuất sau 2 giây..." });
        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        updateUser(res.data.user);
        setMsg({ type: "success", text: "Hồ sơ đã được cập nhật thành công!" });
        setForm(f => ({ ...f, current_password: "", new_password: "", confirm_password: "" }));
      }
    } catch (e) {
      setMsg({ type: "error", text: e?.response?.data?.message || "Cập nhật thất bại." });
    } finally { setSaving(false); }
  };

  const backPath = role === "admin" ? "/admin/dashboard"
    : role === "teacher" ? "/teacher/dashboard"
    : "/student/dashboard";

  const ROLE_LABEL = { admin: "Quản trị viên", teacher: "Giáo viên", student: "Học sinh" };
  const ROLE_COLOR = { admin: "text-purple-400 bg-purple-500/10 border-purple-500/20", teacher: "text-teal-400 bg-teal-500/10 border-teal-500/20", student: "text-blue-400 bg-blue-500/10 border-blue-500/20" };

  return (
    <div className="py-2 min-h-full pb-32 animate-in fade-in duration-500">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">Thiết Lập <span className="text-teal-500">Cá Nhân</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Quản lý thông tin tài khoản và bảo mật hệ thống</p>
        </div>
        
        <button onClick={() => navigate(backPath)} className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border border-white/5 transition-all active:scale-[0.98] flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span>
          Quay lại
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Profile Card */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[60px] group-hover:scale-150 transition-transform duration-700" />
               <div className="relative z-10 space-y-6">
                  <div className="relative inline-block">
                     <div className="w-32 h-32 rounded-[2.5rem] p-1 bg-linear-to-br from-teal-500 to-emerald-600 shadow-xl shadow-teal-500/20">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name || "user"}`}
                          className="w-full h-full rounded-[2.2rem] bg-[#0b1326] object-cover"
                          alt="avatar"
                        />
                     </div>
                     <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center border-4 border-[#0b1326] text-white shadow-lg">
                        <span className="material-symbols-outlined text-lg">photo_camera</span>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-2xl font-black text-white tracking-tight">{loading ? "..." : form.name}</h3>
                     <p className="text-slate-500 text-sm font-medium mt-1">{user?.email}</p>
                  </div>

                  <span className={`inline-flex items-center gap-2 text-[10px] font-black px-4 py-1.5 rounded-full border uppercase tracking-widest ${ROLE_COLOR[role] || "text-slate-400"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {ROLE_LABEL[role] || role}
                  </span>

                  <button onClick={logout} className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/10 text-red-400 font-black uppercase tracking-widest text-[10px] border border-red-500/20 hover:bg-red-500/20 transition-all mt-4">
                     <span className="material-symbols-outlined text-lg">logout</span>
                     Đăng xuất khỏi hệ thống
                  </button>
               </div>
            </div>
         </div>

         {/* Settings Form */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 sm:p-10 shadow-2xl space-y-10">
                {/* Section: Basic Info */}
                <div className="space-y-6">
                   {/* Honeypot fields to catch aggressive browser autofill */}
                   <div style={{ position: 'absolute', top: '-1000px', left: '-1000px', opacity: 0 }}>
                      <input type="text" name="fake_user_name_prevent_autofill" tabIndex="-1" />
                      <input type="password" name="fake_password_prevent_autofill" tabIndex="-1" />
                   </div>

                   <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-teal-500">person</span>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Thông tin cơ bản</h4>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Họ và tên hiển thị</label>
                         <input
                            value={form.name}
                            name="display_name_field"
                            readOnly
                            onFocus={(e) => e.target.removeAttribute('readonly')}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all font-bold"
                            placeholder="Nhập họ tên của bạn..."
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Địa chỉ Email (Cố định)</label>
                         <input
                            value={user?.email || ""}
                            readOnly
                            className="w-full bg-white/2 border border-white/5 rounded-2xl px-6 py-4 text-slate-600 cursor-not-allowed font-medium"
                         />
                      </div>
                   </div>
                </div>

                {/* Section: Security */}
                <div className="space-y-6 pt-10 border-t border-white/5">
                   <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-teal-500">shield</span>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Bảo mật tài khoản</h4>
                   </div>
                   <p className="text-xs text-slate-500 italic">Để trống các trường bên dưới nếu bạn không có nhu cầu thay đổi mật khẩu đăng nhập.</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mật khẩu hiện tại</label>
                         <input
                            type="password"
                            value={form.current_password}
                            autoComplete="new-password"
                            readOnly
                            onFocus={(e) => e.target.removeAttribute('readonly')}
                            onChange={e => { setMsg({ type: "", text: "" }); setForm({ ...form, current_password: e.target.value }); }}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                            placeholder="••••••••"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mật khẩu mới</label>
                         <input
                            type="password"
                            value={form.new_password}
                            autoComplete="new-password"
                            readOnly
                            onFocus={(e) => e.target.removeAttribute('readonly')}
                            onChange={e => { setMsg({ type: "", text: "" }); setForm({ ...form, new_password: e.target.value }); }}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                            placeholder="Tối thiểu 6 ký tự"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Xác nhận mật khẩu mới</label>
                         <input
                            type="password"
                            value={form.confirm_password}
                            autoComplete="new-password"
                            readOnly
                            onFocus={(e) => e.target.removeAttribute('readonly')}
                            onChange={e => { setMsg({ type: "", text: "" }); setForm({ ...form, confirm_password: e.target.value }); }}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                            placeholder="Nhập lại mật khẩu mới"
                         />
                      </div>
                   </div>
                </div>

               {/* Notifications & Action */}
               <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                     {msg.text && (
                        <div className={`px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-3 animate-in slide-in-from-left-4 duration-300 ${
                           msg.type === "success" ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                           : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                           <span className="material-symbols-outlined">{msg.type === 'success' ? 'check_circle' : 'error'}</span>
                           {msg.text}
                        </div>
                     )}
                  </div>
                  <button
                     onClick={handleSave}
                     disabled={saving || loading}
                     className="w-full md:w-auto px-12 py-5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 rounded-4xl text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                     {saving ? "Đang xử lý..." : "Cập nhật hồ sơ"}
                     <span className="material-symbols-outlined">save</span>
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}