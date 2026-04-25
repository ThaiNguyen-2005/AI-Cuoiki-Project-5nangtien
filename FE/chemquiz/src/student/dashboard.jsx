import React from 'react';
// Nếu bạn có file CSS riêng cho Dashboard, hãy import ở đây
// import '../../assets/css/student_dashboard.css';

const StudentDashboard = () => {
    return (
        <div className="dashboard-wrapper">
            {/* --- THANH SIDEBAR HOẶC NAVBAR (NẾU CÓ) --- */}
            <nav className="dashboard-nav">
                <div className="user-info">
                    <img src="/images/avatar-default.png" alt="Avatar" width="40" />
                    <span>Chào mừng, [Tên Sinh Viên]!</span>
                </div>
            </nav>

            <main className="dashboard-main">
                {<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .glass-card {\n            background: rgba(19, 27, 46, 0.6);\n            backdrop-filter: blur(12px);\n            border: 1px solid rgba(192, 193, 255, 0.1);\n        }\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #585990 100%);\n        }\n        .glow-accent {\n            box-shadow: 0 0 20px rgba(192, 193, 255, 0.15);\n        }\n        body {\n            background-color: #0b1326;\n            color: #dbe2fd;\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* Top Navigation */}
  <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 z-50 bg-[#2d3449]/70 backdrop-blur-lg border-b border-indigo-500/20 shadow-lg shadow-indigo-500/10">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-primary-container/30">
        <img
          alt="Student Profile Photo"
          className="w-full h-full object-cover"
          data-alt="Professional headshot of a young student with a friendly expression in a modern academic setting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt-CCTvU9fezrKxmYybM_JyeBopBoLiKcLoB0m9cf1vT4njO4djl8mUrL-cSkbuwW_Yb67yFDTgSdlOh5la7c0v7qd8KYvnAMklKyUvf_TZnTgmE-OIhQcb8F90kwRX2wZTymwB9U08wWNjNnjFroyA0tQI4ahnhE-b_MTmiWKUZwaeJZRxspNaFDdi9MHXgQCduzNC2j9vr5cJ1llyEisrbM5Iria4rOk4JGaRYHJ7UgWNC4_7YWPR026s60QFpuNVSpo7Mad4nqt"
        />
      </div>
      <span className="font-display font-black uppercase tracking-widest text-primary-container text-lg">
        Kinetic Chemistry
      </span>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-full hover:bg-indigo-500/10 transition-all duration-300 text-primary-container active:scale-95">
        <span className="material-symbols-outlined">notifications</span>
      </button>
    </div>
  </header>
  {/* Main Content Canvas */}
  <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
    {/* Welcome Section */}
    <div className="mb-section-margin">
      <h1 className="font-display text-headline-lg text-primary mb-2">
        Chào buổi sáng, Minh!
      </h1>
      <p className="text-on-surface-variant font-body-md italic opacity-80">
        Sẵn sàng để chinh phục các liên kết hóa học hôm nay?
      </p>
    </div>
    {/* Bento Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Streak & Daily Goals (Left Column) */}
      <div className="md:col-span-4 space-y-6">
        {/* Streak Card */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
          <span className="material-symbols-outlined absolute -top-2 -right-2 text-primary/10 text-8xl">
            local_fire_department
          </span>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="material-symbols-outlined text-orange-400"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                local_fire_department
              </span>
              <span className="font-headline-md text-primary">
                Chuỗi 12 ngày
              </span>
            </div>
            <div className="flex gap-1">
              <div className="h-1.5 flex-1 rounded-full bg-primary" />
              <div className="h-1.5 flex-1 rounded-full bg-primary" />
              <div className="h-1.5 flex-1 rounded-full bg-primary" />
              <div className="h-1.5 flex-1 rounded-full bg-primary/20" />
              <div className="h-1.5 flex-1 rounded-full bg-primary/20" />
            </div>
            <p className="mt-4 text-body-md text-on-surface-variant">
              Còn 2 ngày nữa để đạt mục tiêu tuần!
            </p>
          </div>
        </div>
        {/* Daily Goals */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-primary">
              Mục tiêu hằng ngày
            </h3>
            <span className="text-label-caps text-tertiary">75%</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border-2 border-tertiary flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[14px] text-tertiary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  check
                </span>
              </div>
              <span className="text-body-md text-on-surface">
                Hoàn thành 1 bài Quiz
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border-2 border-tertiary flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[14px] text-tertiary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  check
                </span>
              </div>
              <span className="text-body-md text-on-surface">
                Xem lại Phản ứng Oxy hóa khử
              </span>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-5 h-5 rounded border-2 border-outline" />
              <span className="text-body-md">Đạt 80+ điểm chương 4</span>
            </div>
          </div>
        </div>
      </div>
      {/* Main Progress (Center Column) */}
      <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Quiz Focus */}
        <div className="md:col-span-2 glass-card rounded-2xl p-8 bg-gradient-to-br from-surface-container-high to-surface-dim border-l-4 border-primary shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-label-caps text-secondary-fixed-dim bg-secondary-container/40 px-3 py-1 rounded-full">
                SẮP DIỄN RA
              </span>
              <h2 className="font-display text-headline-lg text-white mt-4">
                Chương 4: Hydrocarbon
              </h2>
              <p className="text-on-surface-variant mt-1">
                Lớp: Hóa học Hữu cơ nâng cao
              </p>
            </div>
            <div className="text-right">
              <span className="material-symbols-outlined text-primary-container text-4xl">
                science
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex -space-x-2">
              <img
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-surface"
                data-alt="Student profile placeholder small"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbNC4-8MbeF3Gayy4JGFDrhKH1afp-LZMvD-bTtqYVWqyieoglvJBzKC9ucuOLyvcRdvtgrdf3kVP3NX5wlm2qR5bOfbVAxiTycSHUH2hsJkwDc5kjRgCFVf9gw_xWQxzRacp3oLZUHp6AJtGoIotnUT8W8aS8dT0gfg2d2R74rgH3sT0ydcSN-_Uf0JFAWX6PPg_BPmfdA-WGGJd8VfRh-pzq__mhYPuwfEq3F2-6NsjPm8RFyfBy0_AeqWvjH6m2CRpyBv_ddBO6"
              />
              <img
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-surface"
                data-alt="Student profile placeholder small"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJv-oWlUlRtW2r1HM3hFgpxUl0kXwxhUiQrfAnxz8T_1wbn-xefLbl3TMrYV__iiH-i3SxhTSCFuOp-yHgqq87ZA7h0Grv_3WS_sOGy-XOsG9Lwe2tIqPNdoDTu4edYQRFVGtEPOQ9FN-cT10rk-dRuPpuT8AT8d0ZgTn5gntjTfNK7H8IwDDnU_0NfYMIY0SzGr9_6u6BoR9hjgk9jF5mVzpbcyq2Cyi6SACyEhn-hbmV0t5z4dw53FDEF9LZgdIe-0vGvsh2PUm-"
              />
              <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-[10px] border-2 border-surface">
                +42
              </div>
            </div>
            <button className="bg-primary text-on-primary-fixed px-8 py-3 rounded-xl font-bold font-display uppercase tracking-wider hover:brightness-110 transition-all active:scale-95 glow-accent">
              Bắt đầu ôn tập
            </button>
          </div>
        </div>
        {/* Circular Progress Charts */}
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-surface-variant"
                cx={64}
                cy={64}
                fill="transparent"
                r={58}
                stroke="currentColor"
                strokeWidth={8}
              />
              <circle
                className="text-tertiary-container drop-shadow-[0_0_8px_rgba(79,219,200,0.4)]"
                cx={64}
                cy={64}
                fill="transparent"
                r={58}
                stroke="currentColor"
                strokeDasharray="364.4"
                strokeDashoffset="91.1"
                strokeWidth={8}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-headline-md text-white">
                75%
              </span>
            </div>
          </div>
          <h4 className="font-headline-md text-primary">Nhiệt động lực học</h4>
          <p className="text-label-caps text-on-surface-variant mt-2">
            Hoàn thành 15/20 bài
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-surface-variant"
                cx={64}
                cy={64}
                fill="transparent"
                r={58}
                stroke="currentColor"
                strokeWidth={8}
              />
              <circle
                className="text-primary-container drop-shadow-[0_0_8px_rgba(192,193,255,0.4)]"
                cx={64}
                cy={64}
                fill="transparent"
                r={58}
                stroke="currentColor"
                strokeDasharray="364.4"
                strokeDashoffset={200}
                strokeWidth={8}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-headline-md text-white">
                45%
              </span>
            </div>
          </div>
          <h4 className="font-headline-md text-primary">Cân bằng Hóa học</h4>
          <p className="text-label-caps text-on-surface-variant mt-2">
            Hoàn thành 9/20 bài
          </p>
        </div>
      </div>
      {/* AI Recommendations (Bottom or Floating) */}
      <div className="md:col-span-12">
        <div className="glass-card rounded-2xl p-6 border-t-2 border-tertiary/30 bg-gradient-to-r from-surface-container-low to-surface-dim">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-tertiary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-3xl">
                psychology
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-headline-md text-tertiary">
                Gợi ý từ AI: Ôn tập Phản ứng Redox
              </h3>
              <p className="text-body-md text-on-surface-variant">
                Dựa trên lịch sử làm bài, bạn thường gặp khó khăn trong việc cân
                bằng số oxi hóa. Hãy dành 10 phút để xem lại lý thuyết.
              </p>
            </div>
            <button className="w-full md:w-auto px-6 py-3 border border-tertiary text-tertiary rounded-xl font-bold hover:bg-tertiary/10 transition-colors">
              Xem bài giảng nhanh
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* Bottom Navigation Bar */}
  <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe py-3 bg-[#0b1326]/90 backdrop-blur-xl border-t border-indigo-500/30 shadow-[0_-4px_20px_rgba(192,193,255,0.1)] rounded-t-2xl">
    {/* Home / Dashboard */}
    <a
      href="/student/dashboard"
      className="flex flex-col items-center justify-center px-4 py-1.5 transition-all
{{ request()->is('student/dashboard') ? 'text-[#c0c1ff] bg-indigo-500/20 rounded-xl brightness-125 scale-105' : 'text-slate-500 hover:text-slate-300' }}"
    >
      <span className="material-symbols-outlined">home</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">
        Trang chủ
      </span>
    </a>
    {/* Quiz */}
    <a
      href="/student/quiz"
      className="flex flex-col items-center justify-center px-4 py-1.5 transition-all
{{ request()->is('student/quiz') ? 'text-[#c0c1ff] bg-indigo-500/20 rounded-xl brightness-125 scale-105' : 'text-slate-500 hover:text-slate-300' }}"
    >
      <span className="material-symbols-outlined">quiz</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">
        Làm bài
      </span>
    </a>
    {/* History */}
    <a
      href="/student/history"
      className="flex flex-col items-center justify-center px-4 py-1.5 transition-all
{{ request()->is('student/history') ? 'text-[#c0c1ff] bg-indigo-500/20 rounded-xl brightness-125 scale-105' : 'text-slate-500 hover:text-slate-300' }}"
    >
      <span className="material-symbols-outlined">history</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">
        Lịch sử
      </span>
    </a>
    {/* Analytics */}
    <a
      href="/student/analytics"
      className="flex flex-col items-center justify-center px-4 py-1.5 transition-all
{{ request()->is('student/analytics') ? 'text-[#c0c1ff] bg-indigo-500/20 rounded-xl brightness-125 scale-105' : 'text-slate-500 hover:text-slate-300' }}"
    >
      <span className="material-symbols-outlined">insights</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium mt-1">
        Phân tích
      </span>
    </a>
  </nav>
</>
}
                
                <section className="welcome-banner">
                    <h1>Hệ Thống Trắc Nghiệm Hóa Học</h1>
                    <p>Hôm nay bạn muốn ôn luyện kiến thức gì?</p>
                </section>

                <div className="dashboard-grid">
                    {/* Ví dụ Card bài thi sắp tới */}
                    <div className="card">
                        <h3>Bài thi sắp tới</h3>
                        <p>Kiểm tra giữa kỳ - Hóa hữu cơ</p>
                        <small>Bắt đầu lúc: 08:00 - 27/04/2026</small>
                        <button className="btn-go">Chi tiết</button>
                    </div>

                    {/* Ví dụ Card kết quả gần đây */}
                    <div className="card">
                        <h3>Kết quả mới nhất</h3>
                        <p>Chương 2: Nhóm Nitơ</p>
                        <span className="score">8.0/10</span>
                        <button className="btn-view">Xem lại</button>
                    </div>

                    {/* Ví dụ Card ôn tập nhanh */}
                    <div className="card highlight">
                        <h3>Ôn tập nhanh</h3>
                        <p>Luyện tập 10 câu hỏi ngẫu nhiên</p>
                        <button className="btn-start">Bắt đầu ngay</button>
                    </div>
                </div>

                {/* --------------------------------------------------- */}
            </main>
        </div>
    );
};

export default StudentDashboard;