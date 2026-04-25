import React from "react";
const TeacherQuiz = () => {
    return (
        <div className="teacher-question">
            {<>
  <meta charSet="utf-8" />
  <meta
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    name="viewport"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
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
        "\n        body { background-color: #0b1326; color: #dbe2fd; overflow-x: hidden; }\n        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #71f8e4 100%); }\n        .glass-card { background: rgba(19, 27, 46, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }\n        .active-step { box-shadow: 0 0 15px rgba(192, 193, 255, 0.3); }\n        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* Top AppBar */}
  <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-slate-900/70 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-indigo-900/20">
    <div className="flex items-center gap-2">
      <span
        className="material-symbols-outlined text-indigo-400"
        data-icon="science"
      >
        science
      </span>
      <h1 className="font-space-grotesk font-bold text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-500">
        Kinetic Chemistry
      </h1>
    </div>
    <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-500/30">
      <img
        alt="Teacher Profile"
        className="w-full h-full object-cover"
        data-alt="close-up portrait of a professional educator with a friendly expression in a modern academic setting"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKvX0XdEQR0b2wlhO6WaRAbQ4fPFRpzhJ0niGLGndwb0tNBk_kWxB0jcclGYqUuNaAIDWpe6_lpWtSdvY16ePm0WJvx5TwkZkaXlLH26eQ-HDQvhzP_jcKSQk7urK7Ot8IQUOfo4fZv_rH0V-8uMIr4tYtUmtTa5W2vyYc6K4Er0Yb9DOW2UKz2Cm3cnUtdwragc09WzlcgFGZc3br4jsC_tuHRwJUDldnj0q22GvsWoNYE-cLh8rGzsDDqi9cYlLtYU_qIG772B_m"
      />
    </div>
  </header>
  <main className="pt-20 pb-32 px-4 max-w-md mx-auto">
    {/* Stepper */}
    <div className="flex justify-between items-center mb-8 px-4">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 active-step">
          <span
            className="material-symbols-outlined"
            data-icon="format_list_bulleted"
          >
            format_list_bulleted
          </span>
        </div>
        <span className="font-label-caps text-label-caps text-indigo-300">
          NỘI DUNG
        </span>
      </div>
      <div className="flex-1 h-px bg-surface-container-highest mx-2 mb-6" />
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-slate-500 border border-white/5">
          <span
            className="material-symbols-outlined"
            data-icon="settings_input_component"
          >
            settings_input_component
          </span>
        </div>
        <span className="font-label-caps text-label-caps text-slate-500">
          THIẾT LẬP
        </span>
      </div>
      <div className="flex-1 h-px bg-surface-container-highest mx-2 mb-6" />
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-slate-500 border border-white/5">
          <span className="material-symbols-outlined" data-icon="auto_awesome">
            auto_awesome
          </span>
        </div>
        <span className="font-label-caps text-label-caps text-slate-500">
          REVIEW
        </span>
      </div>
    </div>
    {/* Step 1 Content: Selection */}
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-headline-md text-primary">
          Bước 1: Chọn nội dung
        </h2>
        <span className="text-tertiary text-xs bg-tertiary/10 px-2 py-1 rounded-full font-bold">
          LIVE
        </span>
      </div>
      {/* Program Selector */}
      <div className="glass-card p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <span className="material-symbols-outlined" data-icon="menu_book">
              menu_book
            </span>
          </div>
          <span className="font-headline-md text-sm">Chương trình đào tạo</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-indigo-500/20 border border-indigo-400/50 text-indigo-200 py-3 rounded-xl font-medium transition-all active:scale-95">
            Hóa học 10
          </button>
          <button className="bg-surface-container-high border border-white/5 text-slate-400 py-3 rounded-xl font-medium transition-all active:scale-95">
            Hóa học 11
          </button>
        </div>
      </div>
      {/* Bento Cards for Topics */}
      <div className="grid grid-cols-1 gap-4">
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <span
            className="material-symbols-outlined absolute -top-2 -right-2 text-6xl text-white/5 rotate-12"
            data-icon="biotech"
          >
            biotech
          </span>
          <h3 className="font-bold text-indigo-300 mb-3">
            Chương I: Cấu tạo nguyên tử
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 active:bg-white/10">
              <input
                defaultChecked=""
                className="rounded border-indigo-500 text-indigo-500 focus:ring-indigo-500 bg-transparent"
                type="checkbox"
              />
              <span className="text-sm">Bài 1: Thành phần nguyên tử</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 active:bg-white/10">
              <input
                className="rounded border-indigo-500 text-indigo-500 focus:ring-indigo-500 bg-transparent"
                type="checkbox"
              />
              <span className="text-sm">Bài 2: Nguyên tố hóa học</span>
            </label>
          </div>
        </div>
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <span
            className="material-symbols-outlined absolute -top-2 -right-2 text-6xl text-white/5 -rotate-12"
            data-icon="dynamic_form"
          >
            dynamic_form
          </span>
          <h3 className="font-bold text-slate-400 mb-3">Loại kiến thức</h3>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-tertiary-container/20 border border-tertiary/30 text-tertiary-fixed text-xs font-bold uppercase tracking-wider">
              Lý thuyết
            </button>
            <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
              Bài tập
            </button>
          </div>
        </div>
      </div>
      {/* Primary Action Button */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-40">
        <button className="w-full kinetic-gradient text-on-secondary font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 group">
          Tiếp tục thiết lập
          <span
            className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
            data-icon="arrow_forward"
          >
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  </main>
  {/* Bottom NavBar */}
  <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 pb-safe bg-[#0b1326]/80 backdrop-blur-md border-t border-indigo-500/20 shadow-[0_-4px_20px_rgba(192,193,255,0.1)] rounded-t-2xl">
    <a
      href="/teacher/dashboard"
      className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90
{{ request()->is('teacher/dashboard') ? 'text-indigo-300 bg-indigo-500/10 scale-105' : 'text-slate-500 hover:text-indigo-200' }}"
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        dashboard
      </span>
      <span className="font-space-grotesk text-[10px] font-medium mt-1">
        Tổng quan
      </span>
    </a>
    <a
      href="/teacher/quiz"
      className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90
{{ request()->is('teacher/quiz') ? 'text-indigo-300 bg-indigo-500/10 scale-105' : 'text-slate-500 hover:text-indigo-200' }}"
    >
      <span className="material-symbols-outlined">auto_awesome</span>
      <span className="font-space-grotesk text-[10px] font-medium mt-1">
        Tạo Quiz
      </span>
    </a>
    <a
      href="/teacher/question"
      className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90
{{ request()->is('teacher/question') ? 'text-indigo-300 bg-indigo-500/10 scale-105' : 'text-slate-500 hover:text-indigo-200' }}"
    >
      <span className="material-symbols-outlined">database</span>
      <span className="font-space-grotesk text-[10px] font-medium mt-1">
        Ngân hàng
      </span>
    </a>
    <a
      href="/teacher/result"
      className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90
{{ request()->is('teacher/result') ? 'text-indigo-300 bg-indigo-500/10 scale-105' : 'text-slate-500 hover:text-indigo-200' }}"
    >
      <span className="material-symbols-outlined">assignment_turned_in</span>
      <span className="font-space-grotesk text-[10px] font-medium mt-1">
        Kết quả
      </span>
    </a>
    <a
      href="/teacher/analytics"
      className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90
{{ request()->is('teacher/analytics') ? 'text-indigo-300 bg-indigo-500/10 scale-105' : 'text-slate-500 hover:text-indigo-200' }}"
    >
      <span className="material-symbols-outlined">insights</span>
      <span className="font-space-grotesk text-[10px] font-medium mt-1">
        Phân tích
      </span>
    </a>
  </nav>
  {/* Visual Background Element */}
  <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
    <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-indigo-600 rounded-full blur-[100px]" />
    <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-tertiary rounded-full blur-[120px]" />
  </div>
</>
}
            </div>
    )
}
