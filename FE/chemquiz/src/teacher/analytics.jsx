import React from "react";
const TeacherAnalytics = () => {
    return (
        <div>
        {<>
  <meta charSet="utf-8" />
  <meta
    content="width=device-width, initial-scale=1.0, viewport-fit=cover"
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
        "\n        .glass-panel {\n            background: rgba(19, 27, 46, 0.7);\n            backdrop-filter: blur(12px);\n            border: 1px solid rgba(192, 193, 255, 0.1);\n        }\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #3131c0 100%);\n        }\n        .text-kinetic {\n            background: linear-gradient(135deg, #e1dfff 0%, #c0c1ff 100%);\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n        }\n        .status-glow {\n            box-shadow: 0 0 12px rgba(112, 248, 228, 0.4);\n        }\n    "
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
      <h1 className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-500 font-display">
        Kinetic Chemistry
      </h1>
    </div>
    <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 overflow-hidden">
      <img
        alt="Teacher Profile"
        className="w-full h-full object-cover"
        data-alt="close up professional portrait of a science teacher with subtle indigo lighting background"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAay-ykmp6YzDCxhENeeRFEQYlSSKgEon1WOJ-K2PMSvdfsw391081Q-pvMbrosFpqZTNE1N5vj5j3i8K0d_dPSYq9IOUTYO9iYO1rIGZooag-qZmxQmwPRzsJC5zZL-6Hcl-vGU-yS8Zt81cw9DSMta1vTIXPh98_NaH6GfkYcaSOlelA8H1fHfhTWuuJC0ZcT73nkAQ2JNNaqMmuhx2xgmG7hw4Iw5L5KPfqwhqpfy2U9jKYD0NvGm9fNoQ6U5upAlf_9YmZQ9zQh"
      />
    </div>
  </header>
  <main className="pt-20 px-4 space-y-6">
    {/* AI Insight Header */}
    <section className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="material-symbols-outlined text-tertiary"
          data-icon="auto_awesome"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          auto_awesome
        </span>
        <h2 className="font-headline-lg text-headline-lg text-indigo-200">
          AI Insight
        </h2>
      </div>
      <p className="font-body-md text-on-surface-variant">
        Phân tích chuyên sâu về hiệu suất của lớp 12A1 dựa trên dữ liệu 30 ngày
        qua.
      </p>
    </section>
    {/* Main Bento Grid */}
    <div className="grid grid-cols-1 gap-4">
      {/* Coverage Chart Card */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <span
          className="material-symbols-outlined absolute top-4 right-4 opacity-10 text-6xl text-primary"
          data-icon="hub"
        >
          hub
        </span>
        <h3 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
          <span
            className="material-symbols-outlined text-indigo-400"
            data-icon="radar"
          >
            radar
          </span>
          Độ phủ kiến thức
        </h3>
        {/* Mock Radar Chart Layout */}
        <div className="relative w-full aspect-square flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-full h-full border border-indigo-500/30 rounded-full" />
            <div className="absolute w-3/4 h-3/4 border border-indigo-500/30 rounded-full" />
            <div className="absolute w-1/2 h-1/2 border border-indigo-500/30 rounded-full" />
            <div className="absolute w-1/4 h-1/4 border border-indigo-500/30 rounded-full" />
          </div>
          {/* Representation of Radar Data */}
          <svg
            className="w-full h-full transform -rotate-18"
            viewBox="0 0 100 100"
          >
            <polygon
              fill="rgba(192, 193, 255, 0.2)"
              points="50,10 85,35 75,80 25,80 15,35"
              stroke="#c0c1ff"
              strokeWidth="1.5"
            />
            <circle cx={50} cy={10} fill="#71f8e4" r="1.5" />
            <circle cx={85} cy={35} fill="#71f8e4" r="1.5" />
            <circle cx={75} cy={80} fill="#71f8e4" r="1.5" />
            <circle cx={25} cy={80} fill="#71f8e4" r="1.5" />
            <circle cx={15} cy={35} fill="#71f8e4" r="1.5" />
          </svg>
          {/* Labels */}
          <span className="absolute top-0 text-label-caps font-label-caps text-indigo-300">
            Hữu cơ
          </span>
          <span className="absolute right-0 top-1/3 text-label-caps font-label-caps text-indigo-300">
            Vô cơ
          </span>
          <span className="absolute bottom-0 right-1/4 text-label-caps font-label-caps text-indigo-300">
            Nhiệt nhôm
          </span>
          <span className="absolute bottom-0 left-1/4 text-label-caps font-label-caps text-indigo-300">
            Điện phân
          </span>
          <span className="absolute left-0 top-1/3 text-label-caps font-label-caps text-indigo-300">
            Polyme
          </span>
        </div>
      </div>
      {/* AI Suggestions */}
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-tertiary">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-headline-md text-headline-md text-tertiary">
            Gợi ý ôn tập (AI)
          </h3>
          <div className="w-2 h-2 rounded-full bg-tertiary status-glow" />
        </div>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-tertiary"
                data-icon="lightbulb"
              >
                lightbulb
              </span>
            </div>
            <div>
              <p className="font-headline-md text-sm text-primary">
                Phản ứng Este hóa
              </p>
              <p className="font-body-md text-xs text-on-surface-variant">
                42% học sinh sai ở phần tính hiệu suất. Cần bổ sung 2-3 ví dụ
                thực tế.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-tertiary"
                data-icon="menu_book"
              >
                menu_book
              </span>
            </div>
            <div>
              <p className="font-headline-md text-sm text-primary">
                Kim loại kiềm thổ
              </p>
              <p className="font-body-md text-xs text-on-surface-variant">
                Lớp đang nắm vững lý thuyết nhưng yếu phần giải bài tập đồ thị.
              </p>
            </div>
          </li>
        </ul>
      </div>
      {/* Students Highlight Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md">
            Học sinh tiêu biểu
          </h3>
          <span className="font-label-caps text-indigo-400">Xem tất cả</span>
        </div>
        {/* Bento: Progress Highlights */}
        <div className="grid grid-cols-2 gap-4">
          {/* Progress Card */}
          <div className="glass-panel rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full border-2 border-tertiary/50 overflow-hidden">
                <img
                  alt="Student Progress"
                  className="w-full h-full object-cover"
                  data-alt="close up avatar of a diligent young male student with glasses in a modern lab setting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlZ4szKtTij5e2ikIj5ERxUn2TIq0DqfBcNJxRXPnc7irYFmGM8B6THIqz0J_GBzcxR0J03QHGNVtbswU1GhgU_VCwMCKLtMx2AIOdOcGbiZELH1d2_RmCE-l1MiOdIr0vKxWQAmMHy1AWyfgfDB3MMDeaCEUPw7X_6M84D7D-7jx2acca2H8uaLgsGhBY0VQm0_D_gOE2QsxAS5fjoOQG5F-rpqb48a76EmpW1HNMPXBzQ7Sb09r3YhwMMpVtAe1lolYf3hhyTzvZ"
                />
              </div>
              <span className="bg-tertiary/20 text-tertiary text-[10px] font-black px-2 py-1 rounded-full">
                +15%
              </span>
            </div>
            <div>
              <p className="font-headline-md text-sm text-white">Minh Quang</p>
              <p className="font-body-md text-xs text-on-surface-variant">
                Đang tiến bộ nhanh
              </p>
            </div>
          </div>
          {/* Support Card */}
          <div className="glass-panel rounded-2xl p-4 flex flex-col gap-3 border border-error-container/30">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full border-2 border-error/50 overflow-hidden">
                <img
                  alt="Student Support"
                  className="w-full h-full object-cover"
                  data-alt="avatar of a young female student looking thoughtful in a science classroom with blue light"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFs-PczrzCG79-FyEyd6l8WaqQ3xuVYfPZQ5dnklFM52vz0SXml1wBz72QPZrmdqulONiIzKR3mw5is_w5gbrpzSjIRd3_W266ro2bvcFubzZ1NEkwPMueBEJdTN6aikIYJzwa4yAmuTi4OdJIksoFL-m0fLcbH4Il5XrJdC2Nn_6s3QJTyZhF_9KaFmGCTAU0kICd2tHXYp7e4K4dNLiHOwPWp1-41HMWL-AoguGKc6APu3D4PGrQZtKBHftxeZTiinLP82502LvO"
                />
              </div>
              <span className="bg-error-container/20 text-error text-[10px] font-black px-2 py-1 rounded-full">
                SOS
              </span>
            </div>
            <div>
              <p className="font-headline-md text-sm text-white">Bảo Trân</p>
              <p className="font-body-md text-xs text-on-surface-variant">
                Cần hỗ trợ kiến thức
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Detailed Stats Table (Condensed for Mobile) */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 bg-surface-container-high flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md">
            Phân tích chi tiết
          </h3>
          <span
            className="material-symbols-outlined text-indigo-400"
            data-icon="filter_list"
          >
            filter_list
          </span>
        </div>
        <div className="divide-y divide-white/5">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300">
                01
              </div>
              <span className="font-body-md text-sm">Anh Tuấn</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-on-surface-variant">Điểm TB</p>
                <p className="font-headline-md text-sm text-tertiary">9.2</p>
              </div>
              <span
                className="material-symbols-outlined text-indigo-500"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300">
                02
              </div>
              <span className="font-body-md text-sm">Hoàng Yến</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-on-surface-variant">Điểm TB</p>
                <p className="font-headline-md text-sm text-tertiary">8.8</p>
              </div>
              <span
                className="material-symbols-outlined text-indigo-500"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
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
    );
    }