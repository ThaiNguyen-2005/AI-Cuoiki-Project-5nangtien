import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const response = await axiosClient.post('/login', {
        email: email,
        password: password,
      });

      const token = response.data.access_token;
      const userData = response.data.user;

      if (token && userData) {
        login(token, userData);
        const role = userData.role;
        if (role === "admin") navigate("/admin");
        else if (role === "teacher") navigate("/teacher");
        else navigate("/student");
      } else {
        setErrorMsg("Dữ liệu phản hồi không hợp lệ!");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Email hoặc mật khẩu không chính xác!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#050810] py-10 px-4">
      {/* Background elements for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />

      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-4 py-4 md:px-8 md:py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-white text-2xl">science</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white">Kinetic <span className="text-blue-500">Energy</span></span>
        </div>
      </header>

      <main className="w-full max-w-[440px] z-10">
        <div className="bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <div className="mb-10 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Chào mừng trở lại</h1>
            <p className="text-gray-400 font-medium">Hệ thống kiểm tra hóa học trực tuyến</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 animate-shake">
                <span className="material-symbols-outlined text-lg">error</span>
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-blue-500 transition-colors">mail</span>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all" 
                  placeholder="name@example.com" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-gray-300">Mật khẩu</label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Quên mật khẩu?</a>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-blue-500 transition-colors">lock</span>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all" 
                  placeholder="••••••••" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <button 
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Đăng nhập
                  <span className="material-symbols-outlined text-xl">login</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm">
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full p-8 text-center">
        <p className="text-gray-600 text-xs tracking-widest uppercase">&copy; 2026 Kinetic Energy Ecosystem. All rights reserved.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0px 1000px #0b1326 inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}} />
    </div>
  );
}