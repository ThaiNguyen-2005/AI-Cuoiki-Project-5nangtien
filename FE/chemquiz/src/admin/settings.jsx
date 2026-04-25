import React from "react";
const AdminSettings = () => {
    return (
        <div className="admin-settings">
            {<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
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
        "\n        .glass-card {\n            background: rgba(19, 27, 46, 0.7);\n            backdrop-filter: blur(20px);\n            border: 1px solid rgba(255, 255, 255, 0.05);\n        }\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #70f8e4 100%);\n        }\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        input:focus {\n            outline: none;\n            box-shadow: 0 0 0 2px rgba(192, 193, 255, 0.3);\n        }\n    "
    }}
  />
  <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/5 bg-[#0b1326] flex flex-col py-6 px-4 z-50">
    <div className="mb-10 px-4">
      <span className="text-lg font-black text-white tracking-widest uppercase font-space-grotesk">
        Kinetic Admin
      </span>
      <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold opacity-80 mt-1">
        Precision Control
      </p>
    </div>
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/5 bg-[#0b1326] flex flex-col py-6 px-4 z-50">
      <div className="mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl kinetic-gradient flex items-center justify-center neon-glow">
            <span className="material-symbols-outlined text-on-primary">
              science
            </span>
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-widest uppercase font-headline-lg">
              Kinetic Admin
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Precision Control
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        <a
          href="/admin/dashboard"
          className="{{ request()->is('admin/dashboard') ? 'bg-[#2d3449]/50 text-[#c0c1ff] border-r-2 border-[#c0c1ff]' : 'text-slate-400 hover:text-slate-200' }} px-6 py-3 flex items-center gap-3 transition-all font-display text-sm font-medium"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span>Tổng quan</span>
        </a>
        <a
          href="/admin/class"
          className="{{ request()->is('admin/class') ? 'bg-[#2d3449]/50 text-[#c0c1ff] border-r-2 border-[#c0c1ff]' : 'text-slate-400 hover:text-slate-200' }} px-6 py-3 flex items-center gap-3 transition-all font-display text-sm font-medium"
        >
          <span className="material-symbols-outlined">group</span>
          <span>Người dùng</span>
        </a>
        <a
          href="/admin/quiz"
          className="{{ request()->is('admin/quiz') ? 'bg-[#2d3449]/50 text-[#c0c1ff] border-r-2 border-[#c0c1ff]' : 'text-slate-400 hover:text-slate-200' }} px-6 py-3 flex items-center gap-3 transition-all font-display text-sm font-medium"
        >
          <span className="material-symbols-outlined">science</span>
          <span>Bài kiểm tra</span>
        </a>
        <a
          href="/admin/analytics"
          className="{{ request()->is('admin/analytics') ? 'bg-[#2d3449]/50 text-[#c0c1ff] border-r-2 border-[#c0c1ff]' : 'text-slate-400 hover:text-slate-200' }} px-6 py-3 flex items-center gap-3 transition-all font-display text-sm font-medium"
        >
          <span className="material-symbols-outlined">analytics</span>
          <span>Phân tích</span>
        </a>
        <a
          href="/admin/settings"
          className="{{ request()->is('admin/settings') ? 'bg-[#2d3449]/50 text-[#c0c1ff] border-r-2 border-[#c0c1ff]' : 'text-slate-400 hover:text-slate-200' }} px-6 py-3 flex items-center gap-3 transition-all font-display text-sm font-medium"
        >
          <span className="material-symbols-outlined">settings</span>
          <span>Cài đặt</span>
        </a>
      </nav>
      <div className="mt-auto p-4 rounded-2xl glass-card">
        <div className="flex items-center gap-3">
          <img
            alt="Administrator Profile"
            className="w-10 h-10 rounded-full border-2 border-indigo-500/30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS_n8rX28ax--ZtW8TIZmSQgvsZxauYh2hXhIN7S6ZK1NCBA5JfQWXaMy-dKkHsnvH0ejxjoP3QHXqRuJfH3lJSNK6kUu6cPopTwMtv_EI8TfecTXj83T-1VTV3nXmG-p2Al3MzTVfPbssw_HulRIYed69m-zX19R7Vdbpf7Vn7Z2jCxjZntx_Cs4T8UQBAlnjHHURQ6S1tOLGlekktYmx1-Ks8-X0kNYTpbO1BIYYuFfcYGtvcF8aQG9AaZWMx9KjiItCnwbEPxHi"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Admin K.C.</p>
            <p className="text-xs text-indigo-400 truncate">Hệ thống cấp cao</p>
          </div>
        </div>
      </div>
    </aside>
    <div className="mt-auto p-4 glass-card rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
          A
        </div>
        <div>
          <p className="text-xs font-bold text-white">Administrator</p>
          <p className="text-[10px] text-slate-400">admin@kinetic.io</p>
        </div>
      </div>
    </div>
  </aside>
  <header className="fixed top-0 left-64 right-0 h-16 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 z-40">
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-indigo-500 font-space-grotesk">
        Cài đặt hệ thống
      </h1>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 relative">
        <span className="material-symbols-outlined">notifications</span>
        <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#131b2e]" />
      </button>
      <div className="h-8 w-[1px] bg-white/10 mx-2" />
      <img
        alt="Administrator Profile"
        className="w-8 h-8 rounded-full border border-indigo-500/50"
        data-alt="professional male administrator profile picture with a clean minimalist background"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq2O_VxHTe31EVJ5eDX4F05UxipGVmR3x6B91jbW7wSoOG0yfFSUgDl1341KzkvArgOnNmz_23oq-6aSddlmIUlnRPIJwZptIj-m_akRmL9PVo94F4bzh3kvI-kSXWpXpr-Td12vXogRuN4gHCKGH0LuourHMS-zOPNbbmboonjmBBIJDJuXhmyjOsG86VFoscUXXLlD0hJ2iS0zTK1EnOsTwcht39QRpfWippzpZOv28i6rRgjhR4tMlxmD3P4_s5kkmLonD0ISIx"
      />
    </div>
  </header>
  <main className="ml-64 pt-24 px-10 pb-16 min-h-screen">
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl w-fit glass-card">
        <button className="px-6 py-2 rounded-lg bg-indigo-500/20 text-indigo-100 font-bold text-sm transition-all">
          Cấu hình chung
        </button>
        <button className="px-6 py-2 rounded-lg text-slate-400 hover:bg-white/5 text-sm transition-all">
          Bài kiểm tra
        </button>
        <button className="px-6 py-2 rounded-lg text-slate-400 hover:bg-white/5 text-sm transition-all">
          Trí tuệ nhân tạo (AI)
        </button>
        <button className="px-6 py-2 rounded-lg text-slate-400 hover:bg-white/5 text-sm transition-all">
          Bảo mật
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Section: Cấu hình chung */}
          <section className="glass-card rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-indigo-400">
                language
              </span>
              <h2 className="text-headline-md font-headline-md text-white">
                Cấu hình chung
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Tên Website
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-indigo-500 transition-colors"
                  type="text"
                  defaultValue="Kinetic Chemistry Admin Portal"
                />
              </div>
              <div className="pt-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Logo Hệ Thống
                </label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-surface-container-highest border-2 border-dashed border-white/20 flex flex-col items-center justify-center group cursor-pointer hover:border-indigo-500/50 transition-all">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-indigo-400">
                      upload_file
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">
                      Tải lên
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 font-medium">
                      kinetic-logo-dark.svg
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Khuyên dùng: SVG hoặc PNG trong suốt. Tối đa 2MB.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button className="text-xs font-bold text-indigo-400 hover:underline">
                        Thay đổi
                      </button>
                      <button className="text-xs font-bold text-error hover:underline">
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Section: Bài kiểm tra */}
          <section className="glass-card rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-indigo-400">
                timer
              </span>
              <h2 className="text-headline-md font-headline-md text-white">
                Cấu hình Bài kiểm tra
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Thời gian mặc định (Phút)
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-indigo-500"
                    type="number"
                    defaultValue={45}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
                    min
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Điểm đạt (%)
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-indigo-500"
                    type="number"
                    defaultValue={50}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
              <div>
                <p className="text-sm font-bold text-indigo-100">
                  Xáo trộn câu hỏi
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tự động thay đổi thứ tự câu hỏi cho mỗi lượt thi
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  defaultChecked=""
                  className="sr-only peer"
                  type="checkbox"
                />
                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
              </label>
            </div>
          </section>
          {/* Section: AI Configuration */}
          <section className="glass-card rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-tertiary">
                psychology
              </span>
              <h2 className="text-headline-md font-headline-md text-white">
                Trí tuệ nhân tạo (AI)
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">
                    Tự động tạo câu hỏi
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Sử dụng AI để phân tích tài liệu và đề xuất câu hỏi mới
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    defaultChecked=""
                    className="sr-only peer"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-tertiary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                </label>
              </div>
              <div className="pt-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Mô hình ngôn ngữ (LLM)
                </label>
                <select className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-indigo-500 appearance-none">
                  <option>GPT-4 Turbo (Khuyên dùng)</option>
                  <option>Claude 3 Opus</option>
                  <option>Gemini 1.5 Pro</option>
                </select>
              </div>
            </div>
          </section>
        </div>
        <div className="space-y-8">
          {/* Section: Bảo mật */}
          <section className="glass-card rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-indigo-400">
                shield
              </span>
              <h2 className="text-headline-md font-headline-md text-white">
                Bảo mật
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Mật khẩu hiện tại
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-indigo-500"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Mật khẩu mới
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-indigo-500"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <button className="w-full kinetic-gradient py-3 rounded-xl text-on-primary font-bold text-sm shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-transform">
                Cập nhật mật khẩu
              </button>
            </div>
          </section>
          {/* Action: Quick Info */}
          <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 relative overflow-hidden">
            <span
              className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-indigo-500/10"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              info
            </span>
            <h3 className="text-sm font-bold text-indigo-200 mb-2">
              Mẹo Admin
            </h3>
            <p className="text-xs text-indigo-300/80 leading-relaxed">
              Việc thay đổi thời gian mặc định sẽ không ảnh hưởng đến các bài
              kiểm tra đã được xuất bản trước đó.
            </p>
          </div>
        </div>
      </div>
      {/* Vùng Nguy Hiểm */}
      <section className="border border-error/30 bg-error-container/10 rounded-2xl p-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error">
                warning
              </span>
              <h2 className="text-headline-md font-headline-md text-error">
                Vùng nguy hiểm
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant">
              Thực hiện các hành động này sẽ ảnh hưởng vĩnh viễn đến toàn bộ dữ
              liệu hệ thống.
            </p>
          </div>
          <button className="px-8 py-3 bg-error text-on-error font-bold rounded-xl hover:bg-error/90 transition-all active:scale-95">
            Đặt lại hệ thống
          </button>
        </div>
      </section>
      <div className="flex justify-end gap-4 pt-8">
        <button className="px-8 py-3 rounded-xl text-slate-400 font-bold hover:bg-white/5 transition-all">
          Hủy bỏ
        </button>
        <button className="px-8 py-3 kinetic-gradient rounded-xl text-on-primary font-bold shadow-xl shadow-indigo-500/30 active:scale-95 transition-all">
          Lưu thay đổi
        </button>
      </div>
    </div>
  </main>
  {/* Floating Background Elements */}
  <div className="fixed top-0 right-0 -z-10 opacity-20">
    <div className="w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full" />
  </div>
  <div className="fixed bottom-0 left-0 -z-10 opacity-20">
    <div className="w-[400px] h-[400px] bg-tertiary/20 blur-[100px] rounded-full" />
  </div>
</>
}
        </div>
    );
}