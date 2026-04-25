import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("teacher");
  const navigate = useNavigate();

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // chuyển trang theo role
    if (role === "admin") navigate("/admin/dashboard");
    if (role === "teacher") navigate("/teacher/dashboard");
    if (role === "student") navigate("/student/dashboard");
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0b1326]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#c0c1ff]"
            data-icon="science"
          >
            science
          </span>
          <span className="text-xl font-bold bg-linear-to-br from-[#c0c1ff] to-[#4b4dd8] bg-clip-text text-transparent font-['Inter'] tracking-tight antialiased">
            ChemAI
          </span>
        </div>
      </header>

      <main className="grow flex items-center justify-center min-h-screen p-6 kinetic-bg relative overflow-hidden">
        <style dangerouslySetInnerHTML={{
          __html: `
          body { font-family: 'Inter', sans-serif; }
          .material-symbols-outlined {
              font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .kinetic-bg {
              background: radial-gradient(circle at 50% 50%, #131b2e 0%, #0b1326 100%);
          }
          .glass-panel {
              background: rgba(45, 52, 73, 0.7);
              backdrop-filter: blur(20px);
          }
        `}} />

        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />

        <div className="w-full max-w-md z-10 pt-20">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              AI Chemistry Quiz System
            </h1>
            <p className="text-gray-400 font-medium text-sm uppercase tracking-widest">
              Nền tảng học tập thông minh
            </p>
          </div>

          <div className="glass-panel border border-white/10 rounded-xl p-8 shadow-2xl">
            <div className="mb-8">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">
                Chọn vai trò của bạn
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => selectRole('admin')}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all ${role === 'admin' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-800/50 border-transparent text-gray-400 hover:border-white/20'}`}
                >
                  <span className="material-symbols-outlined">admin_panel_settings</span>
                  <span className="text-[11px] font-semibold">Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => selectRole('teacher')}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all ${role === 'teacher' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-800/50 border-transparent text-gray-400 hover:border-white/20'}`}
                >
                  <span className="material-symbols-outlined">school</span>
                  <span className="text-[11px] font-semibold">Teacher</span>
                </button>
                <button
                  type="button"
                  onClick={() => selectRole('student')}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all ${role === 'student' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-800/50 border-transparent text-gray-400 hover:border-white/20'}`}
                >
                  <span className="material-symbols-outlined">person</span>
                  <span className="text-[11px] font-semibold">Student</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 ml-1">Tên đăng nhập</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-500 text-xl">person</span>
                  </div>
                  <input
                    className="w-full bg-black/20 border border-white/5 rounded-lg py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="Enter your username"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 ml-1">Mật khẩu</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-500 text-xl">lock</span>
                  </div>
                  <input
                    className="w-full bg-black/20 border border-white/5 rounded-lg py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors">
                  <input type="checkbox" className="rounded bg-black/20 border-white/10 text-blue-600" />
                  <span>Lưu đăng nhập</span>
                </label>
                <a className="text-blue-400 hover:text-blue-300 transition-colors" href="#">Quên mật khẩu?</a>
              </div>

              <button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                Đăng nhập vào bảng điều khiển
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-12 gap-4 bg-[#0b1326] py-8 border-t border-white/5">
        <div className="text-xs uppercase tracking-widest text-gray-500">
          © 2024 ChemAI Kinetic Systems
        </div>
        <div className="flex gap-6">
          {['Chính sách', 'Điều khoản', 'Hỗ trợ'].map(item => (
            <a key={item} className="text-xs uppercase tracking-widest text-gray-500 hover:text-blue-300 transition-colors" href="#">{item}</a>
          ))}
        </div>
      </footer>
    </>
  );
}