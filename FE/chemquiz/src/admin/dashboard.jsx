import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="admin-layout">          
            <aside>Menu Admin</aside>
            <main>
                {<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Kinetic Chemistry - Dashboard Quản trị</title>
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
        "\n        body {\n            background-color: #0b1326;\n            color: #dbe2fd;\n        }\n        .kinetic-gradient {\n    background: linear-gradient(135deg, #c0c1ff 0%, #71f8e4 100%);\n}\n        .glass-card {\n    background: rgba(23, 31, 51, 0.7);\n    backdrop-filter: blur(12px);\n    border: 1px solid rgba(255, 255, 255, 0.05);\n}\n        \n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .glow-dot {\n            box-shadow: 0 0 8px #70f8e4;\n        }\n    "
    }}
  />
  {/* Sidebar Navigation Drawer */}
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
  {/* Main Content Canvas */}
  <main className="ml-64 min-h-screen bg-surface">
    {/* TopAppBar */}
    <header className="sticky top-0 z-30 w-full flex justify-between items-center px-10 py-6 bg-[#131b2e]/70 backdrop-blur-xl border-b border-[#2d3449]/50 shadow-lg shadow-indigo-900/10">
      <div className="flex items-center gap-8 flex-1">
        <h2 className="font-display font-bold text-lg text-white whitespace-nowrap">
          Tổng quan hệ thống
        </h2>
        <div className="relative w-full max-w-md">
          <span
            className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"
            data-icon="search"
          >
            search
          </span>
          <input
            className="w-full bg-surface-container-lowest border-none rounded-xl pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#c0c1ff]/50 text-on-surface-variant placeholder-slate-600"
            placeholder="Tìm kiếm dữ liệu, bài thi..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-[#c0c1ff] transition-colors">
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-tertiary rounded-full glow-dot" />
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-[#2d3449]">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-none">
              Admin Chem
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
              Quản trị viên
            </p>
          </div>
          <img
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-primary-container object-cover"
            data-alt="Close-up portrait of a professional male administrator with clean background in soft studio lighting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN1res_n1TZJmngoD6zSew8PsIOs6BW3neQllN61pMfIvHQTedWMjZdn15dzevCHEg-TzuVUQxaREWa_Bj0wzCF1MhNdwzrjpE1MyBOVpP3Jkxa2LQ--AE4iKjjKPN89or3SsM3axibqOnokvDItAHKw4Kx5b1MjTVxicJuQEn6ziXsNXHabLCmTUNaRZyaIM2P02i4JDBg2SppxfxCgxKX0inWrdQ2bQ_JxsBI0jA5qsmSFa6j5iy66SbymwT6JDGScYe7hqdVYvR"
          />
        </div>
      </div>
    </header>
    <div className="p-10 space-y-element-gap">
      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="glass-card p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span
              className="material-symbols-outlined text-4xl"
              data-icon="group"
            >
              group
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            Tổng số người dùng
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <h3 className="font-display text-2xl font-extrabold text-white">
              12,842
            </h3>
            <span className="text-tertiary text-xs font-bold">+12%</span>
          </div>
          <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full kinetic-gradient w-[70%]" />
          </div>
        </div>
        {/* Card 2 */}
        <div className="glass-card p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span
              className="material-symbols-outlined text-4xl"
              data-icon="assignment"
            >
              assignment
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Bài thi đang mở</p>
          <div className="mt-4 flex items-baseline gap-2">
            <h3 className="font-display text-2xl font-extrabold text-white">
              452
            </h3>
            <span className="text-tertiary text-xs font-bold">+5%</span>
          </div>
          <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full kinetic-gradient w-[45%]" />
          </div>
        </div>
        {/* Card 3 */}
        <div className="glass-card p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span
              className="material-symbols-outlined text-4xl"
              data-icon="history_edu"
            >
              history_edu
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            Tổng lượt làm bài
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <h3 className="font-display text-2xl font-extrabold text-white">
              89k
            </h3>
            <span className="text-error text-xs font-bold">-2%</span>
          </div>
          <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full kinetic-gradient w-[85%]" />
          </div>
        </div>
        {/* Card 4 */}
        <div className="glass-card p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span
              className="material-symbols-outlined text-4xl"
              data-icon="verified"
            >
              verified
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Tỷ lệ hoàn thành</p>
          <div className="mt-4 flex items-baseline gap-2">
            <h3 className="font-display text-2xl font-extrabold text-white">
              94%
            </h3>
            <div className="w-2 h-2 rounded-full bg-tertiary glow-dot ml-auto" />
          </div>
          <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-tertiary w-[94%]" />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 glass-card p-8 rounded-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="font-display font-bold text-white">
                Lượng người dùng truy cập
              </h4>
              <p className="text-xs text-slate-500 uppercase tracking-tighter">
                Thống kê 7 ngày gần nhất
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs text-secondary font-medium">
                Hàng tuần
              </span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-3">
            <div className="w-full bg-surface-container-highest/50 rounded-t-lg h-[40%] hover:bg-secondary/20 transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2d3449] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                1.2k
              </div>
            </div>
            <div className="w-full bg-surface-container-highest/50 rounded-t-lg h-[65%] hover:bg-secondary/20 transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2d3449] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                2.4k
              </div>
            </div>
            <div className="w-full kinetic-gradient rounded-t-lg h-[85%] relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2d3449] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                4.1k
              </div>
            </div>
            <div className="w-full bg-surface-container-highest/50 rounded-t-lg h-[55%] hover:bg-secondary/20 transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2d3449] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                1.9k
              </div>
            </div>
            <div className="w-full bg-surface-container-highest/50 rounded-t-lg h-[75%] hover:bg-secondary/20 transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2d3449] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                3.2k
              </div>
            </div>
            <div className="w-full bg-surface-container-highest/50 rounded-t-lg h-[90%] hover:bg-secondary/20 transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2d3449] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                4.8k
              </div>
            </div>
            <div className="w-full bg-surface-container-highest/50 rounded-t-lg h-[45%] hover:bg-secondary/20 transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2d3449] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                1.5k
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-500 font-bold font-display uppercase tracking-widest">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>
        </div>
        {/* AI Insight Panel */}
        <div className="glass-card p-8 rounded-xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-tertiary"
                data-icon="auto_awesome"
              >
                auto_awesome
              </span>
            </div>
            <h4 className="font-display font-bold text-white">Insight AI</h4>
          </div>
          <div className="flex-1 space-y-6">
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-[#2d3449]">
              <p className="text-xs text-tertiary font-bold uppercase tracking-widest mb-2">
                Xu hướng
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Người dùng đang gặp khó khăn ở chương{" "}
                <b>"Nhiệt động hóa học"</b>. Tỷ lệ sai sót tăng 15% so với tuần
                trước.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-[#2d3449]">
              <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-2">
                Đề xuất
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Cập nhật thêm 20 câu hỏi giải thích chi tiết cho phần{" "}
                <b>"Cân bằng hóa học"</b> để tăng hiệu suất học tập.
              </p>
            </div>
          </div>
          <button className="mt-8 text-xs font-bold text-tertiary flex items-center gap-2 hover:opacity-80 transition-opacity">
            XEM BÁO CÁO CHI TIẾT
            <span
              className="material-symbols-outlined text-sm"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </button>
        </div>
      </div>
      {/* Recent Activities / User Management */}
      <section className="glass-card rounded-xl overflow-hidden">
        <div className="px-8 py-6 flex justify-between items-center border-b border-[#2d3449]/50">
          <h4 className="font-display font-bold text-white">
            Hoạt động gần đây
          </h4>
          <button className="text-xs font-bold text-secondary uppercase tracking-widest">
            Xem tất cả
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-lowest/50 text-[10px] text-slate-500 uppercase tracking-widest">
                <th className="px-8 py-4 font-black">Người dùng</th>
                <th className="px-8 py-4 font-black">Vai trò</th>
                <th className="px-8 py-4 font-black">Thời gian</th>
                <th className="px-8 py-4 font-black">Trạng thái</th>
                <th className="px-8 py-4 font-black text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3449]/30">
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300">
                      NH
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Nguyễn Văn Hùng
                      </p>
                      <p className="text-[10px] text-slate-500">
                        hung.nv@student.edu.vn
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container/30 text-secondary border border-secondary/20">
                    Sinh viên
                  </span>
                </td>
                <td className="px-8 py-4 text-xs text-slate-400">
                  2 phút trước
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary glow-dot" />
                    <span className="text-xs text-on-surface">
                      Đang làm bài
                    </span>
                  </div>
                </td>
                <td className="px-8 py-4 text-right">
                  <button
                    className="material-symbols-outlined text-slate-500 hover:text-white"
                    data-icon="more_vert"
                  >
                    more_vert
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-300">
                      TM
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Trần Thị Minh
                      </p>
                      <p className="text-[10px] text-slate-500">
                        minh.tt@teacher.edu.vn
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-tertiary-container/10 text-tertiary border border-tertiary/20">
                    Giảng viên
                  </span>
                </td>
                <td className="px-8 py-4 text-xs text-slate-400">
                  15 phút trước
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <span className="text-xs text-on-surface">Ngoại tuyến</span>
                  </div>
                </td>
                <td className="px-8 py-4 text-right">
                  <button
                    className="material-symbols-outlined text-slate-500 hover:text-white"
                    data-icon="more_vert"
                  >
                    more_vert
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-300">
                      LA
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Lê Tuấn Anh
                      </p>
                      <p className="text-[10px] text-slate-500">
                        anh.lt@student.edu.vn
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container/30 text-secondary border border-secondary/20">
                    Sinh viên
                  </span>
                </td>
                <td className="px-8 py-4 text-xs text-slate-400">
                  42 phút trước
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary glow-dot" />
                    <span className="text-xs text-on-surface">
                      Đã hoàn thành
                    </span>
                  </div>
                </td>
                <td className="px-8 py-4 text-right">
                  <button
                    className="material-symbols-outlined text-slate-500 hover:text-white"
                    data-icon="more_vert"
                  >
                    more_vert
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</>
}
                <h1>Bảng điều khiển Quản trị viên</h1>
                <div className="stats-grid">
                    <p>Tổng số sinh viên: 500</p>
                    <p>Tổng số đề thi: 20</p>
                </div>
                {/* ----------------------------------------------- */}
            </main>
        </div>
    );
};

export default AdminDashboard;