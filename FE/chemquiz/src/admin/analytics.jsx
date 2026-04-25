import React from 'react';
// import '../../assets/css/admin_analytics.css';

const AdminAnalytics = () => {
    return (
        <div className="admin-analytics-wrapper">
            { <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Kinetic Admin - Phân tích hệ thống</title>
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
        "\n    .kinetic-gradient {\n      background: linear-gradient(135deg, #c0c1ff 0%, #70f8e4 100%);\n    }\n    .glass-card {\n      background: rgba(19, 27, 46, 0.7);\n      backdrop-filter: blur(20px);\n      border: 1px solid rgba(255, 255, 255, 0.05);\n    }\n    .glow-accent {\n      box-shadow: 0 0 20px rgba(112, 248, 228, 0.2);\n    }\n  "
    }}
  />
  {/* SideNavBar Anchor */}
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
  {/* TopNavBar Anchor */}
  <header className="fixed top-0 right-0 left-64 h-16 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-8 z-40 shadow-lg shadow-indigo-900/20">
    <div className="flex items-center gap-6 flex-1">
      <div className="relative w-96">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
          search
        </span>
        <input
          className="w-full bg-surface-container-lowest border-none rounded-xl py-2 pl-10 pr-4 text-sm text-on-surface focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-500"
          placeholder="Tìm kiếm dữ liệu phân tích..."
          type="text"
        />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="bg-indigo-500/20 text-indigo-400 p-2 rounded-lg hover:bg-indigo-500/30 transition-all active:scale-95">
        <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="kinetic-gradient text-on-primary font-headline-md px-5 py-2 rounded-xl text-sm flex items-center gap-2 glow-accent transition-transform active:scale-95">
        <span className="material-symbols-outlined text-sm">download</span>
        Xuất báo cáo
      </button>
    </div>
  </header>
  {/* Main Content Canvas */}
  <main className="ml-64 pt-24 px-10 pb-12 min-h-screen">
    <header className="mb-8">
      <h2 className="font-headline-lg text-headline-lg text-white mb-2">
        Phân tích hệ thống
      </h2>
      <p className="text-on-surface-variant flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(112,248,228,0.8)]" />
        Dữ liệu thời gian thực được cập nhật 2 phút trước
      </p>
    </header>
    {/* Bento Grid Layout */}
    <div className="grid grid-cols-12 gap-6">
      {/* Insight AI Card (Featured) */}
      <div className="col-span-12 lg:col-span-4 glass-card rounded-2xl p-6 relative overflow-hidden group">
        <span className="material-symbols-outlined absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
          auto_awesome
        </span>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-tertiary/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-tertiary">
              psychology
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-white">
            Insight AI
          </h3>
        </div>
        <div className="space-y-4">
          <p className="text-on-surface leading-relaxed italic">
            "Hệ thống nhận thấy xu hướng học tập đang giảm nhẹ ở mảng{" "}
            <span className="text-tertiary font-bold">Hóa vô cơ</span>. Học sinh
            gặp khó khăn nhất với phần Phản ứng Oxy hóa khử."
          </p>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-2">
              Đề xuất hành động
            </p>
            <p className="text-sm text-indigo-300">
              Tạo thêm 05 bài giảng tương tác về phương pháp thăng bằng
              electron.
            </p>
          </div>
        </div>
      </div>
      {/* User Growth Chart (Line Chart representation) */}
      <div className="col-span-12 lg:col-span-8 glass-card rounded-2xl p-6 relative group">
        <span className="material-symbols-outlined absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
          trending_up
        </span>
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-headline-md text-headline-md text-white">
            Số lượng người dùng mới theo tháng
          </h3>
          <div className="flex gap-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-1 rounded-full border border-indigo-500/20">
              Tháng 1 - Tháng 6
            </span>
          </div>
        </div>
        {/* Mock Chart Visualization */}
        <div className="h-48 w-full flex items-end justify-between px-4 pb-4 border-b border-white/5">
          <div className="group/bar flex flex-col items-center gap-2 w-full">
            <div className="w-1 bg-white/10 rounded-full h-12 relative flex justify-center">
              <div className="absolute bottom-0 w-3 h-[40%] kinetic-gradient rounded-full shadow-[0_0_10px_rgba(112,248,228,0.3)]" />
            </div>
            <span className="text-[10px] text-slate-500">T1</span>
          </div>
          <div className="group/bar flex flex-col items-center gap-2 w-full">
            <div className="w-1 bg-white/10 rounded-full h-24 relative flex justify-center">
              <div className="absolute bottom-0 w-3 h-[60%] kinetic-gradient rounded-full shadow-[0_0_10px_rgba(112,248,228,0.3)]" />
            </div>
            <span className="text-[10px] text-slate-500">T2</span>
          </div>
          <div className="group/bar flex flex-col items-center gap-2 w-full">
            <div className="w-1 bg-white/10 rounded-full h-32 relative flex justify-center">
              <div className="absolute bottom-0 w-3 h-[50%] kinetic-gradient rounded-full shadow-[0_0_10px_rgba(112,248,228,0.3)]" />
            </div>
            <span className="text-[10px] text-slate-500">T3</span>
          </div>
          <div className="group/bar flex flex-col items-center gap-2 w-full">
            <div className="w-1 bg-white/10 rounded-full h-40 relative flex justify-center">
              <div className="absolute bottom-0 w-3 h-[85%] kinetic-gradient rounded-full shadow-[0_0_10px_rgba(112,248,228,0.3)]" />
            </div>
            <span className="text-[10px] text-slate-500">T4</span>
          </div>
          <div className="group/bar flex flex-col items-center gap-2 w-full">
            <div className="w-1 bg-white/10 rounded-full h-36 relative flex justify-center">
              <div className="absolute bottom-0 w-3 h-[75%] kinetic-gradient rounded-full shadow-[0_0_10px_rgba(112,248,228,0.3)]" />
            </div>
            <span className="text-[10px] text-slate-500">T5</span>
          </div>
          <div className="group/bar flex flex-col items-center gap-2 w-full">
            <div className="w-1 bg-white/10 rounded-full h-44 relative flex justify-center">
              <div className="absolute bottom-0 w-3 h-[95%] kinetic-gradient rounded-full shadow-[0_0_10px_rgba(112,248,228,0.3)]" />
            </div>
            <span className="text-[10px] text-slate-500 font-bold text-indigo-300">
              T6
            </span>
          </div>
        </div>
      </div>
      {/* Completion Rate (Column Chart) */}
      <div className="col-span-12 lg:col-span-5 glass-card rounded-2xl p-6 relative group">
        <span className="material-symbols-outlined absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
          fact_check
        </span>
        <h3 className="font-headline-md text-headline-md text-white mb-6">
          Tỷ lệ hoàn thành bài thi
        </h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface">Kỳ thi Học kỳ 1</span>
              <span className="text-tertiary">88%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full kinetic-gradient w-[88%] rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface">
                Kiểm tra 15 phút - Hóa hữu cơ
              </span>
              <span className="text-tertiary">94%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full kinetic-gradient w-[94%] rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface">Khảo sát năng lực - Vô cơ</span>
              <span className="text-error">62%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-error/50 w-[62%] rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface">Thử thách cuối tuần</span>
              <span className="text-tertiary">79%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full kinetic-gradient w-[79%] rounded-full" />
            </div>
          </div>
        </div>
      </div>
      {/* User Heatmap / Map */}
      <div className="col-span-12 lg:col-span-7 glass-card rounded-2xl p-6 relative overflow-hidden h-[400px]">
        <div className="flex justify-between items-center mb-4 z-10 relative">
          <div>
            <h3 className="font-headline-md text-headline-md text-white">
              Địa lý người dùng truy cập
            </h3>
            <p className="text-xs text-on-surface-variant">
              Phân bố lưu lượng truy cập trên bản đồ Việt Nam
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary" /> Cao
            </span>
            <span className="flex items-center gap-1 text-[10px] text-indigo-400">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> Thấp
            </span>
          </div>
        </div>
        {/* Abstract Heatmap/Map Background */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          data-alt="abstract digital heatmap map of Vietnam showing glowing energy nodes in teal and indigo over a dark navy background grid"
          data-location="Vietnam"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGU-fEJhmwEEus1ku9YUWHLippTHxZVP3M85X-lBkUe_PhNEa0w35PF7mr6I2oflUKZxxUDkS4l00uh8aaRbsXGh4iPO9MdfmUZFwRp94jHdq74gzr9JkqUlUIWn_2qHdjfnoryaCnsWJcBIeL50kU3owvdzGBhWOLSMAPYsZN6xw1ylsyzpAWU_kzXhIGrMThYLOBciFhJdm3KRfOIrPwSO-PndujtZekZaiwyXLWo-uJX1Ux6TT8BoaD3PxwtvALyML9zdppbGTh")',
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        {/* Interactive Pins / Points of interest */}
        <div className="absolute top-[30%] left-[45%] group/pin">
          <div className="w-4 h-4 rounded-full bg-tertiary glow-accent animate-pulse" />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-high px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
            Hà Nội: 12.4k
          </div>
        </div>
        <div className="absolute top-[65%] left-[55%] group/pin">
          <div className="w-6 h-6 rounded-full bg-tertiary/60 glow-accent animate-pulse" />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-high px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
            TP. HCM: 25.8k
          </div>
        </div>
        <div className="absolute top-[48%] left-[51%] group/pin">
          <div className="w-3 h-3 rounded-full bg-indigo-500/80 animate-pulse" />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-high px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
            Đà Nẵng: 5.2k
          </div>
        </div>
        {/* Floating Data Pill */}
        <div className="absolute bottom-6 left-6 right-6 flex gap-4">
          <div className="flex-1 glass-card p-3 rounded-xl border-indigo-500/20">
            <p className="text-[10px] uppercase text-slate-500 tracking-widest">
              Khu vực sôi động nhất
            </p>
            <p className="text-sm font-bold text-white">
              TP. Hồ Chí Minh (+12% YoY)
            </p>
          </div>
          <div className="flex-1 glass-card p-3 rounded-xl border-indigo-500/20">
            <p className="text-[10px] uppercase text-slate-500 tracking-widest">
              Thời gian cao điểm
            </p>
            <p className="text-sm font-bold text-white">
              20:00 - 22:00 Hàng ngày
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Quick Actions Row */}
    <div className="mt-8 flex gap-4">
      <div className="flex-1 glass-card p-4 rounded-xl flex items-center gap-4 hover:border-indigo-500/30 transition-colors cursor-pointer group">
        <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">description</span>
        </div>
        <div>
          <h4 className="font-bold text-white">Báo cáo tóm tắt tuần</h4>
          <p className="text-xs text-on-surface-variant">
            Tải xuống PDF chi tiết các chỉ số chính
          </p>
        </div>
        <span className="material-symbols-outlined ml-auto text-slate-600">
          arrow_forward_ios
        </span>
      </div>
      <div className="flex-1 glass-card p-4 rounded-xl flex items-center gap-4 hover:border-tertiary/30 transition-colors cursor-pointer group">
        <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">history</span>
        </div>
        <div>
          <h4 className="font-bold text-white">Lịch sử xuất dữ liệu</h4>
          <p className="text-xs text-on-surface-variant">
            Xem lại các tệp CSV đã tạo trước đó
          </p>
        </div>
        <span className="material-symbols-outlined ml-auto text-slate-600">
          arrow_forward_ios
        </span>
      </div>
    </div>
  </main>
  {/* Global Footer Branding (Subtle) */}
  <footer className="ml-64 py-6 px-10 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest">
    <p>© 2024 Kinetic Chemistry Systems. All Rights Reserved.</p>
    <div className="flex gap-4">
      <a className="hover:text-indigo-400 transition-colors" href="#">
        Điều khoản
      </a>
      <a className="hover:text-indigo-400 transition-colors" href="#">
        Bảo mật
      </a>
    </div>
  </footer>
</>
}
            
        </div>
    );
};

export default AdminAnalytics;