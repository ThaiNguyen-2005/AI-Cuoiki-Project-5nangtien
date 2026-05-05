import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) { 
      setErrorMsg("Mật khẩu xác nhận không khớp!"); 
      return; 
    }
    setLoading(true); 
    setErrorMsg("");
    try {
      // Role is fixed to student as per requirements
      const res = await axiosClient.post("/register", { ...form, role: "student" });
      const token = res.data.access_token;
      const userData = res.data.user;
      if (token && userData) {
        login(token, userData);
        navigate("/student");
      }
    } catch (e) {
      const errors = e.response?.data?.errors;
      if (errors) {
        const first = Object.values(errors)[0];
        setErrorMsg(Array.isArray(first) ? first[0] : first);
      } else {
        setErrorMsg(e.response?.data?.message || "Đăng ký thất bại!");
      }
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050810]">
      {/* Background elements for depth */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />

      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-white text-2xl">science</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white">Kinetic <span className="text-blue-500">Energy</span></span>
        </div>
      </header>

      <main className="w-full max-w-[480px] px-6 z-10 py-24">
        <div className="bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl relative">
          <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Tạo tài khoản</h1>
            <p className="text-gray-400 font-medium">Hệ thống kiểm tra hóa học trực tuyến</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 animate-shake">
                <span className="material-symbols-outlined text-lg">error</span>
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Họ và tên</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-blue-500 transition-colors">person</span>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all" 
                  placeholder="Nguyễn Văn A" 
                  type="text" 
                  value={form.name} 
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-blue-500 transition-colors">mail</span>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all" 
                  placeholder="name@example.com" 
                  type="email" 
                  value={form.email} 
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Mật khẩu</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-blue-500 transition-colors">lock</span>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all" 
                    placeholder="••••••••" 
                    type="password" 
                    value={form.password} 
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))} 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Xác nhận</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-blue-500 transition-colors">lock_reset</span>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all" 
                    placeholder="••••••••" 
                    type="password" 
                    value={form.password_confirmation} 
                    onChange={e => setForm(f => ({ ...f, password_confirmation: e.target.value }))} 
                    required 
                  />
                </div>
              </div>
            </div>

            <button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Tạo tài khoản
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full p-8 text-center">
        <p className="text-gray-600 text-xs tracking-widest uppercase">&copy; 2026 Kinetic Energy Ecosystem. All rights reserved.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}} />
    </div>
  );
}