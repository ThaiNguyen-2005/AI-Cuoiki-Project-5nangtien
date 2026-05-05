import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) { setErrorMsg("Mật khẩu xác nhận không khớp!"); return; }
    setLoading(true); setErrorMsg("");
    try {
      const res = await axiosClient.post("/register", { ...form, role });
      const token = res.data.access_token;
      const userData = res.data.user;
      if (token && userData) {
        login(token, userData);
        if (userData.role === "teacher") navigate("/teacher/dashboard");
        else navigate("/student/dashboard");
      }
    } catch (e) {
      const errors = e.response?.data?.errors;
      if (errors) {
        const first = Object.values(errors)[0];
        setErrorMsg(Array.isArray(first) ? first[0] : first);
      } else {
        setErrorMsg(e.response?.data?.message || "Đăng ký thất bại!");
      }
    } finally { setLoading(false); }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0b1326]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#c0c1ff]">science</span>
          <span className="text-xl font-bold bg-gradient-to-br from-[#c0c1ff] to-[#4b4dd8] bg-clip-text text-transparent">ChemAI</span>
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center p-6 bg-radial-gradient relative overflow-hidden" style={{ background: "radial-gradient(circle at 50% 50%, #131b2e 0%, #0b1326 100%)" }}>
        <style>{`
          .glass-panel { background: rgba(45, 52, 73, 0.7); backdrop-filter: blur(20px); }
          input { background: rgba(0,0,0,0.2) !important; border: 1px solid rgba(255,255,255,0.05) !important; color: #fff !important; }
          input:focus { outline: none; border-color: #6366f1 !important; }
        `}</style>

        <div className="w-full max-w-md z-10 pt-20">
          <div className="glass-panel border border-white/10 rounded-xl p-8 shadow-2xl space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white">Tạo tài khoản</h2>
              <p className="text-gray-400 text-sm mt-1">Tham gia ChemAI ngay hôm nay</p>
            </div>

            {/* Role selector — không cho đăng ký admin */}
            <div className="grid grid-cols-2 gap-3">
              {[{ r: "student", icon: "person", label: "Học sinh" }, { r: "teacher", icon: "school", label: "Giáo viên" }].map(({ r, icon, label }) => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-all ${role === r ? "bg-blue-600 border-blue-400 text-white" : "bg-gray-800/50 border-transparent text-gray-400"}`}>
                  <span className="material-symbols-outlined">{icon}</span>
                  <span className="text-[10px] uppercase font-bold mt-1">{label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {errorMsg && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">{errorMsg}</div>}

              <input className="w-full rounded-lg py-3.5 px-4 text-white text-sm" placeholder="Họ và tên" type="text"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              <input className="w-full rounded-lg py-3.5 px-4 text-white text-sm" placeholder="Email" type="email"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              <input className="w-full rounded-lg py-3.5 px-4 text-white text-sm" placeholder="Mật khẩu (ít nhất 6 ký tự)" type="password"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
              <input className="w-full rounded-lg py-3.5 px-4 text-white text-sm" placeholder="Xác nhận mật khẩu" type="password"
                value={form.password_confirmation} onChange={e => setForm(f => ({ ...f, password_confirmation: e.target.value }))} required />

              <button type="submit" disabled={loading}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                {loading ? (
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : <>Đăng ký <span className="material-symbols-outlined text-xl">arrow_forward</span></>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}