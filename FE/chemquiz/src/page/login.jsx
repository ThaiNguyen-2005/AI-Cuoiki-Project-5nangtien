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
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body { font-family: 'Inter', sans-serif; }\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .kinetic-bg {\n            background: radial-gradient(circle at 50% 50%, #131b2e 0%, #0b1326 100%);\n        }\n        .glass-panel {\n            background: rgba(45, 52, 73, 0.7);\n            backdrop-filter: blur(20px);\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* TopAppBar */}
  <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0b1326]/80 backdrop-blur-xl">
    <div className="flex items-center gap-2">
      <span
        className="material-symbols-outlined text-[#c0c1ff]"
        data-icon="science"
      >
        science
      </span>
      <span className="text-xl font-bold bg-gradient-to-br from-[#c0c1ff] to-[#4b4dd8] bg-clip-text text-transparent font-['Inter'] tracking-tight antialiased">
        ChemAI
      </span>
    </div>
  </header>
  {/* Main Content Canvas */}
  <main className="flex-grow flex items-center justify-center p-6 kinetic-bg relative overflow-hidden">
    {/* Ambient background elements */}
    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-tertiary/5 blur-[120px]" />
    <div className="w-full max-w-md z-10">
      {/* Brand Context */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">
          AI Chemistry Quiz System
        </h1>
        <p className="text-on-surface-variant font-medium text-sm uppercase tracking-[0.1em]">
          Nền tảng học tập thông minh
        </p>
      </div>
      {/* Login Card */}
      <div className="glass-panel border border-outline-variant/15 rounded-xl p-8 shadow-[0_32px_32px_-4px_rgba(218,226,253,0.06)]">
        {/* Role Selection */}
        {/* Role Selection */}
        <div className="mb-8">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-4">
            Chọn vai trò của bạn
          </label>
          <div className="grid grid-cols-3 gap-3">
            {/* Admin */}
            <button
              type="button"
              onclick="selectRole(event, 'admin')"
              className="role-btn flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-surface-container-high text-on-surface border border-transparent hover:border-primary/40 transition-all duration-300 group active:scale-95"
            >
              <span className="material-symbols-outlined">
                admin_panel_settings
              </span>
              <span className="text-[11px] font-semibold">Admin</span>
            </button>
            <button
              type="button"
              onclick="selectRole(event, 'teacher')"
              className="role-btn flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-surface-container-high text-on-surface border border-transparent hover:border-primary/40 transition-all duration-300 group active:scale-95"
            >
              <span className="material-symbols-outlined">school</span>
              <span className="text-[11px] font-semibold">Teacher</span>
            </button>
            <button
              type="button"
              onclick="selectRole(event, 'student')"
              className="role-btn flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-surface-container-high text-on-surface border border-transparent hover:border-primary/40 transition-all duration-300 group active:scale-95"
            >
              <span className="material-symbols-outlined">person</span>
              <span className="text-[11px] font-semibold">Student</span>
            </button>
          </div>
        </div>
        <form method="POST" action="/login" className="space-y-5">
          {/* Username */}
          <input type="hidden" name="role" id="role" defaultValue="teacher" />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant ml-1">
              Tên đăng nhập
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span
                  className="material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors"
                  data-icon="person"
                >
                  person
                </span>
              </div>
              <input
                className="w-full bg-surface-container-lowest border-none rounded-lg py-3.5 pl-11 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                placeholder="Enter your username"
                type="text"
              />
            </div>
          </div>
          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant ml-1">
              Mật khẩu
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span
                  className="material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors"
                  data-icon="lock"
                >
                  lock
                </span>
              </div>
              <input
                className="w-full bg-surface-container-lowest border-none rounded-lg py-3.5 pl-11 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  className="peer h-4 w-4 bg-surface-container-lowest border-outline-variant/30 text-primary rounded-sm focus:ring-offset-background"
                  type="checkbox"
                />
              </div>
              <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">
                Lưu đăng nhập
              </span>
            </label>
            <a
              className="text-primary font-medium hover:text-primary-fixed-dim transition-colors"
              href="#"
            >
              Quên mật khẩu ?
            </a>
          </div>
          {/* Error Message Placeholder */}
          <div className="hidden flex items-center gap-2 p-3 bg-error-container/10 border border-error/20 rounded-lg text-error text-[11px] leading-snug">
            <span
              className="material-symbols-outlined text-lg"
              data-icon="error"
            >
              error
            </span>
            <p>
              Thông tin đăng nhập không hợp lệ. Vui lòng xác minh vai trò của
              bạn và thử lại.
            </p>
          </div>
          {/* Submit Button */}
          <button
            className="w-full mt-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold py-4 rounded-lg shadow-xl shadow-primary-container/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
            type="submit"
          >
            Đăng nhập vào bảng điều khiển
            <span
              className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-outline-variant/10 text-center">
          <p className="text-on-surface-variant text-xs">
            Bạn mới sử dụng nền tảng này?{" "}
            <a className="text-tertiary font-semibold hover:underline" href="#">
              Yêu cầu quyền truy cập
            </a>
          </p>
        </div>
      </div>
    </div>
  </main>
  {/* Footer */}
  <footer className="w-full flex flex-col md:flex-row justify-between items-center px-12 gap-4 bg-[#0b1326] py-8 border-t border-[#464555]/15">
    <div className="text-xs font-['Inter'] uppercase tracking-[0.05em] text-[#c7c4d8]">
      © 2024 ChemAI Kinetic Systems
    </div>
    <div className="flex gap-6">
      <a
        className="text-xs font-['Inter'] uppercase tracking-[0.05em] text-[#c7c4d8] hover:text-[#c0c1ff] transition-colors cursor-pointer"
        href="#"
      >
        Chính sách
      </a>
      <a
        className="text-xs font-['Inter'] uppercase tracking-[0.05em] text-[#c7c4d8] hover:text-[#c0c1ff] transition-colors cursor-pointer"
        href="#"
      >
        Điều khoản
      </a>
      <a
        className="text-xs font-['Inter'] uppercase tracking-[0.05em] text-[#c7c4d8] hover:text-[#c0c1ff] transition-colors cursor-pointer"
        href="#"
      >
        Hỗ trợ
      </a>
    </div>
  </footer>
</>

  );
}