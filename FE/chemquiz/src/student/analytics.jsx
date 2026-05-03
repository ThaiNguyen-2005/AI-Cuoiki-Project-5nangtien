import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import các trang bạn đã tạo
import Login from './page/login';
import AdminDashboard from './admin/dashboard';
import TeacherQuiz from './teacher/quiz';
import StudentQuiz from './student/quiz';
import StudentAnalytics from './student/analytics';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Kinetic Chemistry - AI Analysis</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
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
        "\n        .glass-card {\n            background: rgba(45, 52, 73, 0.4);\n            backdrop-filter: blur(20px);\n            border: 1px solid rgba(192, 193, 255, 0.1);\n        }\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #585990 100%);\n        }\n        .text-glow {\n            text-shadow: 0 0 10px rgba(192, 193, 255, 0.5);\n        }\n        .radar-grid {\n            stroke: rgba(192, 193, 255, 0.2);\n            stroke-width: 1;\n        }\n        .radar-area {\n            fill: rgba(112, 248, 228, 0.3);\n            stroke: #70f8e4;\n            stroke-width: 2;\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* TopAppBar */}
  <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 z-50 bg-[#2d3449]/70 backdrop-blur-lg border-b border-indigo-500/20 shadow-lg shadow-indigo-500/10">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
        <img
          alt="Student Profile Photo"
          className="w-full h-full object-cover"
          data-alt="Portrait of a focused young student in a modern educational environment with soft blue lighting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs-MVTxOC0NQMX4wQfQ4GRdI5oo-gQXg4fpCcLxKjo2IVfdIPm2_7NUD-OAhGJUhHqZziSXQ-C6hrjepUEWNp8qFTrUf9ztgtM5FZ9UMNickARmgpDGGiQb0BIYn8vjl2BsE3ZsC3O9oUcOKDGhh2C3joJ60RFCse5LBQcitue9-CnsJCw0-Cg_BEbCN-9FZ5atvhimN24Mlubqi-AlHd93OqwOFol7CWkhJrWkIVDXD1WAdhpd_lDmyVca4mgd7D4Ikq1UAcv6Pxj"
        />
      </div>
      <span className="text-lg font-black uppercase tracking-widest text-[#c0c1ff] font-['Space_Grotesk']">
        Kinetic Chemistry
      </span>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-xl text-[#c0c1ff] hover:bg-indigo-500/10 transition-all duration-300">
        <span className="material-symbols-outlined" data-icon="notifications">
          notifications
        </span>
      </button>
    </div>
  </header>
  <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
    {/* Header Section */}
    <section className="flex flex-col md:flex-row justify-between items-end gap-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-primary text-glow">
          Phân Tích Năng Lực AI
        </h1>
        <p className="text-on-surface-variant font-body-md mt-2">
          Dựa trên dữ liệu 12 bài kiểm tra gần nhất của bạn.
        </p>
      </div>
      <div className="flex gap-3">
        <span className="px-4 py-2 rounded-full bg-tertiary/10 border border-tertiary/30 text-tertiary flex items-center gap-2 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#70f8e4]" />
          Phân tích thời gian thực
        </span>
      </div>
    </section>
    {/* Bento Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Knowledge Radar Chart */}
      <div className="lg:col-span-7 glass-card p-8 rounded-2xl relative overflow-hidden">
        <span
          className="material-symbols-outlined absolute -top-4 -right-4 text-primary opacity-10 text-9xl pointer-events-none"
          data-icon="insights"
        >
          insights
        </span>
        <h3 className="font-headline-md text-headline-md mb-6 flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            data-icon="analytics"
          >
            analytics
          </span>
          Biểu Đồ Kiến Thức
        </h3>
        <div className="aspect-square max-w-md mx-auto relative flex items-center justify-center">
          {/* SVG Radar Chart Simulation */}
          <svg
            className="w-full h-full transform -rotate-18"
            viewBox="0 0 200 200"
          >
            <circle
              className="radar-grid"
              cx={100}
              cy={100}
              fill="none"
              r={80}
            />
            <circle
              className="radar-grid"
              cx={100}
              cy={100}
              fill="none"
              r={60}
            />
            <circle
              className="radar-grid"
              cx={100}
              cy={100}
              fill="none"
              r={40}
            />
            <circle
              className="radar-grid"
              cx={100}
              cy={100}
              fill="none"
              r={20}
            />
            <line className="radar-grid" x1={100} x2={100} y1={20} y2={180} />
            <line className="radar-grid" x1={24} x2={176} y1={74} y2={126} />
            <line className="radar-grid" x1={24} x2={176} y1={126} y2={74} />
            {/* Data Polygon */}
            <polygon
              className="radar-area"
              points="100,40 160,80 140,140 70,150 40,110 50,60"
            />
          </svg>
          {/* Labels */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 font-label-caps text-label-caps text-on-surface-variant">
            HỮU CƠ
          </div>
          <div className="absolute top-1/4 right-0 font-label-caps text-label-caps text-on-surface-variant">
            VÔ CƠ
          </div>
          <div className="absolute bottom-1/4 right-0 font-label-caps text-label-caps text-on-surface-variant">
            NHIỆT ĐỘNG
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-label-caps text-label-caps text-on-surface-variant">
            ĐỘNG HÓA
          </div>
          <div className="absolute bottom-1/4 left-0 font-label-caps text-label-caps text-on-surface-variant">
            ĐIỆN HÓA
          </div>
          <div className="absolute top-1/4 left-0 font-label-caps text-label-caps text-on-surface-variant">
            PHÂN TÍCH
          </div>
        </div>
      </div>
      {/* AI Coach Tips */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-card p-8 rounded-2xl border-l-4 border-tertiary">
          <h3 className="font-headline-md text-headline-md text-tertiary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined" data-icon="psychology">
              psychology
            </span>
            Lời khuyên từ AI Coach
          </h3>
          <p className="text-on-surface leading-relaxed italic">
            "Bạn đang thể hiện sự vượt trội trong phần Hóa Hữu Cơ. Tuy nhiên,
            các lỗi sai trong phần Nhiệt Động Lực Học thường bắt nguồn từ việc
            chuyển đổi đơn vị. Hãy tập trung vào việc chuẩn hóa đơn vị Joule và
            Calorie trước khi tính toán Delta G."
          </p>
        </div>
        {/* Projected Score Improvement */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="font-headline-md text-headline-md mb-6">
            Dự Báo Điểm Số
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="font-label-caps text-label-caps text-outline mb-1">
                  HIỆN TẠI
                </div>
                <div className="text-3xl font-black text-primary">7.5</div>
              </div>
              <span
                className="material-symbols-outlined text-tertiary"
                data-icon="trending_up"
              >
                trending_up
              </span>
              <div className="text-right">
                <div className="font-label-caps text-label-caps text-outline mb-1">
                  MỤC TIÊU 30 NGÀY
                </div>
                <div className="text-3xl font-black text-tertiary">8.8</div>
              </div>
            </div>
            <div className="h-3 bg-surface-container-lowest rounded-full overflow-hidden p-0.5">
              <div
                className="h-full kinetic-gradient rounded-full"
                style={{ width: "75%" }}
              />
            </div>
            <p className="text-sm text-on-surface-variant">
              Tăng 1.3 điểm nếu hoàn thành lộ trình ôn tập được đề xuất.
            </p>
          </div>
        </div>
      </div>
      {/* Top 3 Weak Areas */}
      <div className="lg:col-span-12 glass-card p-8 rounded-2xl">
        <h3 className="font-headline-md text-headline-md mb-8">
          Top 3 Lỗ Hổng Kiến Thức
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weak Area 1 */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-error/20 group hover:border-error/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-error/10 text-error rounded-lg">
                <span className="material-symbols-outlined" data-icon="bolt">
                  bolt
                </span>
              </span>
              <span className="text-error font-bold">-24%</span>
            </div>
            <h4 className="font-headline-md text-on-surface mb-2">
              Định Luật Hess
            </h4>
            <p className="text-sm text-on-surface-variant mb-6">
              Thường xuyên nhầm lẫn dấu trong các chu trình nhiệt động phức tạp.
            </p>
            <a
              className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all"
              href="#"
            >
              Xem tài liệu ôn tập
              <span
                className="material-symbols-outlined text-sm"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </a>
          </div>
          {/* Weak Area 2 */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-error/20 group hover:border-error/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-error/10 text-error rounded-lg">
                <span className="material-symbols-outlined" data-icon="science">
                  science
                </span>
              </span>
              <span className="text-error font-bold">-18%</span>
            </div>
            <h4 className="font-headline-md text-on-surface mb-2">
              Phản Ứng Thế SN1/SN2
            </h4>
            <p className="text-sm text-on-surface-variant mb-6">
              Chưa phân biệt rõ ảnh hưởng của dung môi phân cực đến tốc độ phản
              ứng.
            </p>
            <a
              className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all"
              href="#"
            >
              Ôn tập cơ chế
              <span
                className="material-symbols-outlined text-sm"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </a>
          </div>
          {/* Weak Area 3 */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-error/20 group hover:border-error/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-error/10 text-error rounded-lg">
                <span
                  className="material-symbols-outlined"
                  data-icon="calculate"
                >
                  calculate
                </span>
              </span>
              <span className="text-error font-bold">-12%</span>
            </div>
            <h4 className="font-headline-md text-on-surface mb-2">
              Cân Bằng Ion
            </h4>
            <p className="text-sm text-on-surface-variant mb-6">
              Gặp khó khăn khi tính pH của các hệ đệm đa acid hoặc đa base.
            </p>
            <a
              className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all"
              href="#"
            >
              Luyện bài tập mẫu
              <span
                className="material-symbols-outlined text-sm"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* BottomNavBar */}
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
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                {/* Các URL để bạn check giao diện nhanh */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/teacher/quiz" element={<TeacherQuiz />} />
                <Route path="/student/quiz" element={<StudentQuiz />} />
                <Route path="/student/analytics" element={<StudentAnalytics />} />

                {/* Nếu gõ sai URL thì về Login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;