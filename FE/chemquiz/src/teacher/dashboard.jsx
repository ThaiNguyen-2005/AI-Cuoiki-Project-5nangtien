import React from "react";
const TeacherDashboard = () => {
    return (
        <div className="teacher-dashboard">
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #4fdbc8 100%);\n        }\n        .glass-card {\n            background: rgba(19, 27, 46, 0.7);\n            backdrop-filter: blur(20px);\n            border: 1px solid rgba(192, 193, 255, 0.1);\n        }\n        body {\n            background-color: #0b1326;\n            color: #dbe2fd;\n            -webkit-tap-highlight-color: transparent;\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* TopAppBar */}
  <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-slate-900/70 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-indigo-900/20">
    <div className="flex items-center gap-3">
      <span
        className="material-symbols-outlined text-indigo-400"
        data-icon="science"
      >
        science
      </span>
      <h1 className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-500 font-space-grotesk">
        Kinetic Chemistry
      </h1>
    </div>
    <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 overflow-hidden active:scale-95 duration-200">
      <img
        alt="Teacher Profile"
        className="w-full h-full object-cover"
        data-alt="Close up portrait of a professional male science teacher with friendly expression in a modern lab setting"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0dSrP84C7KVK6gtOitVKX37u7TvjvQ71rZitEoPgEuXnvi4PRSFmmDBFTI64BCmYJDZkC6dC1VBpmLzUbag5_VeD4V7wuA-ul356RUdCs-vlribh42FxjiVNcVsfwIzjFlvKiDbDra8GOrAuwdJe2rOuLwpFRq1wP6xvfd8yT8GO2_Hh8svFo56yNe-bWvaYKQkfCgp8LP5R1YNTkUufE2hRc3aB4huLFAOQg0fePqtu5_-86KrsnbQsdkHWuqXz2OGRBH_l4w-pN"
      />
    </div>
  </header>
  <main className="pt-20 px-4 space-y-6">
    {/* Welcome Section */}
    <section className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-headline-lg text-headline-lg text-primary">
          Xin chào, thầy Minh
        </h2>
        <span
          className="material-symbols-outlined text-tertiary animate-pulse"
          data-icon="notifications_active"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          notifications_active
        </span>
      </div>
      <p className="text-on-surface-variant font-body-md">
        Hôm nay có 12 bài làm mới cần chấm.
      </p>
    </section>
    {/* Stats Grid */}
    <section className="grid grid-cols-2 gap-4">
      <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden">
        <span
          className="material-symbols-outlined absolute -right-2 -top-2 text-indigo-400/10 text-6xl"
          data-icon="school"
        >
          school
        </span>
        <span className="text-label-caps font-label-caps text-on-surface-variant">
          LỚP ĐANG DẠY
        </span>
        <div className="mt-auto">
          <span className="text-4xl font-display font-bold text-primary">
            08
          </span>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden">
        <span
          className="material-symbols-outlined absolute -right-2 -top-2 text-tertiary-container/10 text-6xl"
          data-icon="quiz"
        >
          quiz
        </span>
        <span className="text-label-caps font-label-caps text-on-surface-variant">
          QUIZ ĐÃ TẠO
        </span>
        <div className="mt-auto">
          <span className="text-4xl font-display font-bold text-tertiary-container">
            42
          </span>
        </div>
      </div>
    </section>
    {/* Chart Section: Performance */}
    <section className="glass-card p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-headline-md text-headline-md text-primary">
            Điểm trung bình
          </h3>
          <p className="text-label-caps font-label-caps text-on-surface-variant">
            HỌC KỲ II - 2024
          </p>
        </div>
        <span
          className="material-symbols-outlined text-indigo-400"
          data-icon="trending_up"
        >
          trending_up
        </span>
      </div>
      <div className="flex items-end justify-between h-32 px-2 gap-3">
        <div className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-surface-container-highest rounded-t-lg relative"
            style={{ height: "75%" }}
          >
            <div className="absolute inset-0 kinetic-gradient opacity-60 rounded-t-lg" />
          </div>
          <span className="text-[10px] mt-2 text-on-surface-variant font-medium">
            10A1
          </span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-surface-container-highest rounded-t-lg relative"
            style={{ height: "90%" }}
          >
            <div className="absolute inset-0 kinetic-gradient rounded-t-lg" />
          </div>
          <span className="text-[10px] mt-2 text-indigo-300 font-bold">
            12B4
          </span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-surface-container-highest rounded-t-lg relative"
            style={{ height: "60%" }}
          >
            <div className="absolute inset-0 kinetic-gradient opacity-40 rounded-t-lg" />
          </div>
          <span className="text-[10px] mt-2 text-on-surface-variant font-medium">
            11C2
          </span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-surface-container-highest rounded-t-lg relative"
            style={{ height: "82%" }}
          >
            <div className="absolute inset-0 kinetic-gradient opacity-80 rounded-t-lg" />
          </div>
          <span className="text-[10px] mt-2 text-on-surface-variant font-medium">
            10A5
          </span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-surface-container-highest rounded-t-lg relative"
            style={{ height: "45%" }}
          >
            <div className="absolute inset-0 kinetic-gradient opacity-30 rounded-t-lg" />
          </div>
          <span className="text-[10px] mt-2 text-on-surface-variant font-medium">
            12D1
          </span>
        </div>
      </div>
    </section>
    {/* Notifications: Recent Activity */}
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-headline-md text-headline-md text-primary">
          Thông báo mới
        </h3>
        <button className="text-indigo-400 text-sm font-medium">
          Xem tất cả
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-xl border-l-4 border-indigo-500">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-indigo-400 text-xl"
              data-icon="assignment_turned_in"
            >
              assignment_turned_in
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary font-medium truncate text-sm">
              Nguyễn Văn An (12B4) đã nộp bài
            </p>
            <p className="text-on-surface-variant text-xs">
              Quiz: Phản ứng Oxi hóa - Khử • 2 phút trước
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-xl border-l-4 border-tertiary">
          <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-tertiary text-xl"
              data-icon="auto_awesome"
            >
              auto_awesome
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary font-medium truncate text-sm">
              Hệ thống đã chấm xong 42 bài
            </p>
            <p className="text-on-surface-variant text-xs">
              Quiz: Este - Lipit • 1 giờ trước
            </p>
          </div>
        </div>
      </div>
    </section>
    {/* Ongoing Exams */}
    <section className="pb-8">
      <h3 className="font-headline-md text-headline-md text-primary mb-4">
        Kiểm tra đang diễn ra
      </h3>
      <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4 -mx-4 px-4">
        <div className="min-w-[280px] glass-card p-5 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-bold uppercase tracking-wider">
              ĐANG DIỄN RA
            </div>
            <span className="text-on-surface-variant text-xs">45/48 HS</span>
          </div>
          <div>
            <h4 className="font-bold text-primary">
              Kim loại Kiềm &amp; Kiềm thổ
            </h4>
            <p className="text-on-surface-variant text-xs">
              Lớp 12B4 • Kết thúc trong 15p
            </p>
          </div>
          <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
            <div className="h-full kinetic-gradient w-[92%]" />
          </div>
          <button className="w-full py-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-sm font-bold active:scale-95 transition-transform">
            Theo dõi LIVE
          </button>
        </div>
        <div className="min-w-[280px] glass-card p-5 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="px-2 py-1 bg-tertiary/20 text-tertiary rounded text-[10px] font-bold uppercase tracking-wider">
              CHỜ BẮT ĐẦU
            </div>
            <span className="text-on-surface-variant text-xs">0/40 HS</span>
          </div>
          <div>
            <h4 className="font-bold text-primary">Cấu tạo nguyên tử</h4>
            <p className="text-on-surface-variant text-xs">
              Lớp 10A1 • Bắt đầu lúc 14:00
            </p>
          </div>
          <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-on-surface-variant/20 w-0" />
          </div>
          <button className="w-full py-2 bg-white/5 text-slate-400 border border-white/10 rounded-lg text-sm font-bold">
            Cài đặt
          </button>
        </div>
      </div>
    </section>
  </main>
  {/* FAB for quick action */}
  <button className="fixed bottom-24 right-6 w-14 h-14 kinetic-gradient rounded-2xl shadow-lg shadow-indigo-500/40 flex items-center justify-center text-on-primary-fixed z-50 active:scale-90 transition-transform">
    <span
      className="material-symbols-outlined text-3xl"
      data-icon="add"
      style={{ fontVariationSettings: '"wght" 700' }}
    >
      add
    </span>
  </button>
  {/* BottomNavBar */}
  <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 pb-safe bg-[#0b1326]/80 backdrop-blur-md border-t border-indigo-500/20 shadow-[0_-4px_20px_rgba(192,193,255,0.1)] rounded-t-2xl">
    <a
      href="/teacher/dashboard"
      className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200`}
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
      className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200`}
    >
      <span className="material-symbols-outlined">auto_awesome</span>
      <span className="font-space-grotesk text-[10px] font-medium mt-1">
        Tạo Quiz
      </span>
    </a>
    <a
      href="/teacher/question"
      className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200`}
    >
      <span className="material-symbols-outlined">database</span>
      <span className="font-space-grotesk text-[10px] font-medium mt-1">
        Ngân hàng
      </span>
    </a>
    <a
      href="/teacher/result"
      className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200`}
    >
      <span className="material-symbols-outlined">assignment_turned_in</span>
      <span className="font-space-grotesk text-[10px] font-medium mt-1">
        Kết quả
      </span>
    </a>
    <a
      href="/teacher/analytics"
      className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200`}
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
    );
}

export default TeacherDashboard;