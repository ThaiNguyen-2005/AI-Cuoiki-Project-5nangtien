import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("system");
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);

  const [sysForm, setSysForm] = useState({
    site_name:      "Kinetic Chemistry",
    passing_score:  50,
    allow_register: true,
    max_attempts:   3,
  });

  // Load settings từ API khi vào trang
  useEffect(() => {
    axiosClient.get("/admin/settings").then(res => {
      const d = res.data ?? {};
      setSysForm(prev => ({
        site_name:      d.site_name      ?? prev.site_name,
        passing_score:  Number(d.passing_score  ?? prev.passing_score),
        allow_register: d.allow_register === "1" || d.allow_register === true,
        max_attempts:   Number(d.max_attempts   ?? prev.max_attempts),
      }));
    }).catch(() => {});
  }, []);

  const [pwForm,  setPwForm]  = useState({ current: "", next: "", confirm: "" });
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
    if (pwForm.next.length < 6)         { setPwError("Mật khẩu ít nhất 6 ký tự."); return; }
    setPwError(""); setSaving(true);
    try {
      // Đúng field name: new_password và new_password_confirmation
      await axiosClient.put("/profile/password", {
        current_password:      pwForm.current,
        new_password:          pwForm.next,
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
    { id: "system",   label: "Hệ thống", icon: "⚙️" },
    { id: "security", label: "Bảo mật",  icon: "🔒" },
    { id: "about",    label: "Thông tin", icon: "ℹ️" },
  ];

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-6 lg:p-10">
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-white">Cài đặt</h2>
        <p className="text-xs text-slate-500 mt-1">Tuỳ chỉnh hệ thống</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 bg-[#131b2e] p-1.5 rounded-xl border border-white/5 w-fit">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.id ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: System */}
        {activeTab === "system" && (
          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 space-y-6">
            <h3 className="font-semibold text-white">Cài đặt chung</h3>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Tên hệ thống</label>
              <input
                value={sysForm.site_name}
                onChange={e => setSysForm({ ...sysForm, site_name: e.target.value })}
                className="w-full bg-[#0b1326] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Điểm đạt mặc định: <span className="text-indigo-300 font-bold">{sysForm.passing_score}%</span>
              </label>
              <input type="range" min="30" max="100" step="5"
                value={sysForm.passing_score}
                onChange={e => setSysForm({ ...sysForm, passing_score: +e.target.value })}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-1"><span>30%</span><span>100%</span></div>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Số lần làm tối đa: <span className="text-indigo-300 font-bold">{sysForm.max_attempts}</span>
              </label>
              <input type="range" min="1" max="10"
                value={sysForm.max_attempts}
                onChange={e => setSysForm({ ...sysForm, max_attempts: +e.target.value })}
                className="w-full accent-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-white/5">
              <div>
                <p className="text-sm text-white font-medium">Cho phép tự đăng ký</p>
                <p className="text-xs text-slate-500">Học sinh có thể tự tạo tài khoản</p>
              </div>
              <input type="checkbox" checked={sysForm.allow_register}
                onChange={e => setSysForm({ ...sysForm, allow_register: e.target.checked })}
                className="accent-indigo-500 w-4 h-4"
              />
            </div>

            <button onClick={handleSaveSystem} disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50"
            >
              {saved ? "✅ Đã lưu!" : saving ? "Đang lưu..." : "💾 Lưu cài đặt"}
            </button>
          </div>
        )}

        {/* Tab: Security */}
        {activeTab === "security" && (
          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 space-y-5">
            <h3 className="font-semibold text-white">Đổi mật khẩu Admin</h3>

            {pwError && <p className="text-red-400 text-xs bg-red-500/10 rounded-lg px-3 py-2">{pwError}</p>}
            {pwSaved && <p className="text-green-400 text-xs bg-green-500/10 rounded-lg px-3 py-2">✅ Đổi mật khẩu thành công!</p>}

            {[
              { label: "Mật khẩu hiện tại",     key: "current" },
              { label: "Mật khẩu mới",           key: "next"    },
              { label: "Xác nhận mật khẩu mới", key: "confirm" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-slate-400 mb-1 block">{f.label}</label>
                <input type="password" value={pwForm[f.key]}
                  onChange={e => { setPwError(""); setPwForm({ ...pwForm, [f.key]: e.target.value }); }}
                  className="w-full bg-[#0b1326] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="••••••"
                />
              </div>
            ))}

            <button onClick={handleChangePw} disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50"
            >
              🔑 {saving ? "Đang lưu..." : "Đổi mật khẩu"}
            </button>
          </div>
        )}

        {/* Tab: About */}
        {activeTab === "about" && (
          <div className="bg-[#131b2e] rounded-2xl border border-white/5 p-6 space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-3xl">
                🧪
              </div>
              <div>
                <h3 className="font-black text-white text-xl">Kinetic Chemistry</h3>
                <p className="text-xs text-slate-400">Hệ thống kiểm tra Hóa học trực tuyến</p>
              </div>
            </div>
            {[
              { label: "Phiên bản",  value: "1.0.0" },
              { label: "Frontend",   value: "React + Vite + TailwindCSS" },
              { label: "Backend",    value: "Laravel 11 + Sanctum" },
              { label: "Database",   value: "MySQL" },
              { label: "Môn học",    value: "Hóa học (10, 11, 12)" },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-slate-400">{item.label}</span>
                <span className="text-sm text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
