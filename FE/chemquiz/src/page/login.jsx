import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState("teacher");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await axiosClient.post('/login', {
        email: username, 
        password: password, 
        role: role 
      });

      const token = response.data.access_token;
      const userData = response.data.user; 

      if (token && userData) {
        login(token, userData); 
        const finalRole = userData.role;
        if (finalRole === "admin") navigate("/admin");
        else if (finalRole === "teacher") navigate("/teacher");
        else if (finalRole === "student") navigate("/student");
      } else {
        setErrorMsg("Dữ liệu phản hồi từ máy chủ không hợp lệ!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg(error.response?.data?.message || "Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0b1326]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#c0c1ff]">science</span>
          <span className="text-xl font-bold bg-linear-to-br from-[#c0c1ff] to-[#4b4dd8] bg-clip-text text-transparent">ChemAI</span>
        </div>
      </header>

      <main className="grow flex items-center justify-center min-h-screen p-6 kinetic-bg relative overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          .kinetic-bg { background: radial-gradient(circle at 50% 50%, #131b2e 0%, #0b1326 100%); }
          .glass-panel { background: rgba(45, 52, 73, 0.7); backdrop-filter: blur(20px); }
        `}} />
        <div className="w-full max-w-md z-10 pt-20">
          <div className="glass-panel border border-white/10 rounded-xl p-8 shadow-2xl">
            <div className="grid grid-cols-3 gap-3 mb-8">
              {['admin', 'teacher', 'student'].map(r => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-all ${role === r ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-800/50 border-transparent text-gray-400'}`}>
                  <span className="material-symbols-outlined">{r === 'admin' ? 'admin_panel_settings' : r === 'teacher' ? 'school' : 'person'}</span>
                  <span className="text-[10px] uppercase font-bold">{r}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {errorMsg && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">{errorMsg}</div>}
              <input className="w-full bg-black/20 border border-white/5 rounded-lg py-3.5 px-4 text-white" placeholder="Email" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input className="w-full bg-black/20 border border-white/5 rounded-lg py-3.5 px-4 text-white" placeholder="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2" type="submit">
                Đăng nhập <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </form>

            {/* Link đăng ký — chỉ hiện với student và teacher */}
            {role !== 'admin' && (
              <p className="text-center text-sm text-gray-400 mt-5">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                  Đăng ký ngay
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}