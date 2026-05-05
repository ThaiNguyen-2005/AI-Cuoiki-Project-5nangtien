import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("system");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [sysForm, setSysForm] = useState({
    site_name: "Kinetic Chemistry",
    passing_score: 50,
    allow_register: true,
    max_attempts: 3,
  });

  // Load settings từ API khi vào trang
  useEffect(() => {
    axiosClient.get("/admin/settings").then(res => {
      const d = res.data ?? {};
      setSysForm(prev => ({
        site_name: d.site_name ?? prev.site_name,
        passing_score: Number(d.passing_score ?? prev.passing_score),
        allow_register: d.allow_register === "1" || d.allow_register === true,
        max_attempts: Number(d.max_attempts ?? prev.max_attempts),
      }));
    }).catch(() => { });
  }, []);

  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  const handleSaveSystem = async () => {
    setSaving(true);
    try {
      await axiosClient.put("/admin/settings", sysForm);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert("Lưu thất bại, thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePw = async () => {
    if (pwForm.next !== pwForm.confirm) { setPwError("Mật khẩu mới không khớp."); return; }
    if (pwForm.next.length < 6) { setPwError("Mật khẩu ít nhất 6 ký tự."); return; }
    setPwError(""); setSaving(true);
    try {
      // Đúng field name: new_password và new_password_confirmation
      await axiosClient.put("/profile/password", {
        current_password: pwForm.current,
        new_password: pwForm.next,
        new_password_confirmation: pwForm.confirm,
      });
      setPwSaved(true);
      setPwForm({ current: "", next: "", confirm: "" });
      setTimeout(() => setPwSaved(false), 2500);
    } catch (e) {
      setPwError(e?.response?.data?.message || "Đổi mật khẩu thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const TABS = [
    { id: "system", label: "Hệ thống", icon: "settings" },
    { id: "security", label: "Bảo mật", icon: "lock" },
    { id: "about", label: "Thông tin", icon: "info" },
  ];

  return (
    <div className="py-2 min-h-full text-[#dbe2fd]">
      <div className="mb-10">
        <h1 className="text-5xl font-black text-white tracking-tighter">Cài đặt <span className="text-blue-500">Hệ Thống</span></h1>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Tuỳ chỉnh cấu hình toàn cục</p>
      </div>

      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 w-fit">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === t.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-xl">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: System */}
        {activeTab === "system" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/5 p-8 space-y-8 shadow-2xl">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">settings_suggest</span>
              Cài đặt chung
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tên hệ thống</label>
              <input
                value={sysForm.site_name}
                onChange={e => setSysForm({ ...sysForm, site_name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                <span>Điểm đạt mặc định</span>
                <span className="text-blue-400 font-black">{sysForm.passing_score}%</span>
              </label>
              <input type="range" min="30" max="100" step="5"
                value={sysForm.passing_score}
                onChange={e => setSysForm({ ...sysForm, passing_score: +e.target.value })}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                <span>Số lần làm tối đa</span>
                <span className="text-blue-400 font-black">{sysForm.max_attempts} lần</span>
              </label>
              <input type="range" min="1" max="10"
                value={sysForm.max_attempts}
                onChange={e => setSysForm({ ...sysForm, max_attempts: +e.target.value })}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <button onClick={handleSaveSystem} disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              {saved ? (
                <><span className="material-symbols-outlined">check_circle</span> Đã lưu thành công!</>
              ) : saving ? (
                "Đang lưu..."
              ) : (
                <><span className="material-symbols-outlined">save</span> Lưu cài đặt</>
              )}
            </button>
          </div>
        )}

        {/* Tab: Security */}
        {activeTab === "security" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/5 p-8 space-y-6 shadow-2xl">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">lock_person</span>
              Đổi mật khẩu Admin
            </h3>

            {pwError && <p className="text-red-400 text-xs bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20 font-bold uppercase tracking-widest">{pwError}</p>}
            {pwSaved && <p className="text-green-400 text-xs bg-green-500/10 rounded-xl px-4 py-3 border border-green-500/20 font-bold uppercase tracking-widest">✅ Đổi mật khẩu thành công!</p>}

            {[
              { label: "Mật khẩu hiện tại", key: "current" },
              { label: "Mật khẩu mới", key: "next" },
              { label: "Xác nhận mật khẩu mới", key: "confirm" },
            ].map(f => (
              <div key={f.key} className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{f.label}</label>
                <input type="password" value={pwForm[f.key]}
                  onChange={e => { setPwError(""); setPwForm({ ...pwForm, [f.key]: e.target.value }); }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/5"
                  placeholder="••••••••"
                />
              </div>
            ))}

            <button onClick={handleChangePw} disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">key</span>
              {saving ? "Đang lưu..." : "Cập nhật mật khẩu"}
            </button>
          </div>
        )}

        {/* Tab: About */}
        {activeTab === "about" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/5 p-8 space-y-8 shadow-2xl overflow-hidden relative group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all duration-1000"></div>

            <div className="flex items-center gap-6 pb-6 border-b border-white/5 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="material-symbols-outlined text-3xl text-white">science</span>
              </div>
              <div>
                <h3 className="font-black text-white text-2xl tracking-tight">Kinetic Chemistry</h3>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mt-1">Version 1.0.0 Platinum Edition</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                { label: "Frontend Stack", value: "React + Vite + TailwindCSS", icon: "code" },
                { label: "Backend Core", value: "Laravel 11 + Sanctum", icon: "database" },
                { label: "Design System", value: "Kinetic Glassmorphism", icon: "palette" },
                { label: "Subject Area", value: "Chemistry (Grades 10-12)", icon: "menu_book" },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-3 px-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-500 text-sm">{item.icon}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <span className="text-sm text-white font-bold tracking-tight">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
