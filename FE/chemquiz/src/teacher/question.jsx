import React from "react";
const TeacherQuestion = () => {
    return (
        <div className="teacher-question">
            {<>
  <meta charSet="utf-8" />
  <meta
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    name="viewport"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        ::-webkit-scrollbar {\n            display: none;\n        }\n        body {\n            -ms-overflow-style: none;\n            scrollbar-width: none;\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* Top AppBar */}
  <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-slate-900/70 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-indigo-900/20">
    <div className="flex items-center gap-3">
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
    <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center overflow-hidden">
      <img
        alt="Teacher Profile"
        className="w-full h-full object-cover"
        data-alt="Close up portrait of a friendly professional teacher in a high-tech laboratory setting with soft bokeh lights"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIvjzH0MIsAXMKiUoLvPOyZL9rvI3Xajaq2AsONyazPtYHs1qwiL5QK1lDv9hLdJkLb65e02z2n9FgmnFhQaO4YCf47E6G3lGhrjRXY5nXgt_O6oUbEcE-NHD9yKrrsH43bSVKorOzTsphjAwoSsMc1V4h-aB5gXQCtdx1xDsxOgiK237wHzVWWMY3NX3CJop4balYVPMZVgA6Ir77fj0b1BJQqoTHk46lZTOoVGbcioVI0n8t8Ccg3-BbVr4Uzh_USARDQFzvUKxX"
      />
    </div>
  </header>
  {/* Main Canvas */}
  <main className="pt-20 pb-28 px-4 flex flex-col gap-6">
    {/* Header Section */}
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Ngân hàng
        </h2>
        <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary-fixed text-label-caps font-label-caps border border-tertiary/20">
          128 CÂU HỎI
        </span>
      </div>
      <p className="text-on-surface-variant font-body-md">
        Quản lý và tổ chức các câu hỏi hóa học của bạn.
      </p>
    </section>
    {/* Search & Quick Filters */}
    <section className="flex flex-col gap-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-indigo-400 group-focus-within:text-tertiary transition-colors">
          <span className="material-symbols-outlined" data-icon="search">
            search
          </span>
        </div>
        <input
          className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-xl text-on-surface placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 font-body-md transition-all shadow-inner"
          placeholder="Tìm kiếm câu hỏi, kiến thức..."
          type="text"
        />
      </div>
      {/* Chapter Filters (Horizontal Scroll) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button className="flex-none px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-label-caps text-label-caps">
          TẤT CẢ
        </button>
        <button className="flex-none px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant border border-white/5 font-label-caps text-label-caps whitespace-nowrap">
          CHƯƠNG 1: NGUYÊN TỬ
        </button>
        <button className="flex-none px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant border border-white/5 font-label-caps text-label-caps whitespace-nowrap">
          CHƯƠNG 2: BẢNG TUẦN HOÀN
        </button>
        <button className="flex-none px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant border border-white/5 font-label-caps text-label-caps whitespace-nowrap">
          CHƯƠNG 3: LIÊN KẾT HÓA HỌC
        </button>
      </div>
    </section>
    {/* Question Grid */}
    <section className="grid grid-cols-1 gap-4">
      {/* Question Card 1 */}
      <div className="bg-surface-container-low border border-white/5 p-5 rounded-2xl relative overflow-hidden group active:scale-[0.98] transition-transform">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 -mr-8 -mt-8 rounded-full blur-2xl" />
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                VÔ CƠ
              </span>
              <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider border border-orange-500/20">
                KHÓ
              </span>
            </div>
            <span className="text-slate-500 text-[11px] font-medium">
              ID: #CH2401
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md leading-snug">
            Cấu hình electron của ion Fe2+ (Z=26) là gì? Giải thích sự hình
            thành ion.
          </h3>
          <div className="flex items-center gap-4 py-2 border-y border-white/5">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="history"
              >
                history
              </span>
              <span className="text-[11px]">Sửa: 2 giờ trước</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="visibility"
              >
                visibility
              </span>
              <span className="text-[11px]">1.2k lượt xem</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-1">
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-indigo-300 hover:bg-indigo-500/10 transition-colors">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="edit"
              >
                edit
              </span>
              <span className="text-[11px] font-bold uppercase">SỬA</span>
            </button>
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-on-surface-variant hover:bg-white/5 transition-colors">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="info"
              >
                info
              </span>
              <span className="text-[11px] font-bold uppercase">CHI TIẾT</span>
            </button>
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-error/80 hover:bg-error/10 transition-colors">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="delete"
              >
                delete
              </span>
              <span className="text-[11px] font-bold uppercase">XÓA</span>
            </button>
          </div>
        </div>
      </div>
      {/* Question Card 2 */}
      <div className="bg-surface-container-low border border-white/5 p-5 rounded-2xl relative overflow-hidden group active:scale-[0.98] transition-transform">
        <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/5 -mr-8 -mt-8 rounded-full blur-2xl" />
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary-fixed text-[10px] font-bold uppercase tracking-wider border border-tertiary/20">
                HỮU CƠ
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                DỄ
              </span>
            </div>
            <span className="text-slate-500 text-[11px] font-medium">
              ID: #CH2402
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md leading-snug">
            Xác định tên gọi IUPAC của hợp chất có công thức cấu tạo
            CH3-CH(OH)-CH3.
          </h3>
          <div className="flex items-center gap-4 py-2 border-y border-white/5">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="history"
              >
                history
              </span>
              <span className="text-[11px]">Sửa: 5 ngày trước</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="visibility"
              >
                visibility
              </span>
              <span className="text-[11px]">840 lượt xem</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-1">
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-indigo-300">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="edit"
              >
                edit
              </span>
              <span className="text-[11px] font-bold uppercase">SỬA</span>
            </button>
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-on-surface-variant">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="info"
              >
                info
              </span>
              <span className="text-[11px] font-bold uppercase">CHI TIẾT</span>
            </button>
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-error/80">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="delete"
              >
                delete
              </span>
              <span className="text-[11px] font-bold uppercase">XÓA</span>
            </button>
          </div>
        </div>
      </div>
      {/* Question Card 3 */}
      <div className="bg-surface-container-low border border-white/5 p-5 rounded-2xl relative overflow-hidden group active:scale-[0.98] transition-transform">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 -mr-8 -mt-8 rounded-full blur-2xl" />
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                NHIỆT ĐỘNG
              </span>
              <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">
                TRUNG BÌNH
              </span>
            </div>
            <span className="text-slate-500 text-[11px] font-medium">
              ID: #CH2403
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md leading-snug">
            Tính biến thiên enthalpy của phản ứng đốt cháy 1 mol khí methane ở
            điều kiện chuẩn.
          </h3>
          <div className="flex items-center gap-4 py-2 border-y border-white/5">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="history"
              >
                history
              </span>
              <span className="text-[11px]">Sửa: 1 tuần trước</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="visibility"
              >
                visibility
              </span>
              <span className="text-[11px]">312 lượt xem</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-1">
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-indigo-300">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="edit"
              >
                edit
              </span>
              <span className="text-[11px] font-bold uppercase">SỬA</span>
            </button>
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-on-surface-variant">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="info"
              >
                info
              </span>
              <span className="text-[11px] font-bold uppercase">CHI TIẾT</span>
            </button>
            <button className="flex items-center justify-center gap-1 py-2.5 rounded-lg bg-surface-container-highest text-error/80">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="delete"
              >
                delete
              </span>
              <span className="text-[11px] font-bold uppercase">XÓA</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    {/* Pagination / Load More */}
    <div className="flex justify-center pt-2">
      <button className="px-6 py-3 bg-surface-container-high border border-white/10 rounded-full text-indigo-400 font-label-caps text-label-caps flex items-center gap-2 active:scale-95 transition-all">
        <span
          className="material-symbols-outlined text-lg"
          data-icon="expand_more"
        >
          expand_more
        </span>
        TẢI THÊM CÂU HỎI
      </button>
    </div>
  </main>
  {/* FAB for New Question */}
  <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/40 flex items-center justify-center text-white active:scale-90 transition-transform z-40">
    <span className="material-symbols-outlined scale-125" data-icon="add">
      add
    </span>
  </button>
  {/* Bottom Navigation Bar */}
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
</>
}
            </div>
    )
}
