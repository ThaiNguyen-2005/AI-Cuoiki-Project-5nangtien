import React from 'react';
// import '../../assets/css/admin_class.css';

const AdminClass = () => {
    return (
        <div className="admin-class-container">
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
        "\n        body { background-color: #0b1326; color: #dbe2fd; }\n        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }\n        .glass-card { background: rgba(23, 31, 51, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }\n        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #71f8e4 100%); }\n        .neon-glow { box-shadow: 0 0 20px rgba(192, 193, 255, 0.3); }\n        ::-webkit-scrollbar { width: 6px; }\n        ::-webkit-scrollbar-track { background: #0b1326; }\n        ::-webkit-scrollbar-thumb { background: #2d3449; border-radius: 10px; }\n    "
    }}
  />
  {/* SideNavBar */}
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
  {/* Main Content */}
  <main className="ml-64 min-h-screen">
    {/* TopNavBar */}
    <header className="flex justify-between items-center px-8 py-4 w-full z-40 sticky top-0 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-indigo-900/20 font-space-grotesk">
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-indigo-500">
          Quản lý người dùng
        </h2>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400">
            search
          </span>
          <input
            className="bg-surface-container-lowest border-none rounded-xl pl-10 pr-4 py-2 w-80 text-sm focus:ring-2 focus:ring-indigo-500/50 text-on-surface"
            placeholder="Tìm kiếm tên, email hoặc ID..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/20 transition-all">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="kinetic-gradient text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-transform duration-150 neon-glow">
          <span className="material-symbols-outlined">person_add</span>
          Thêm người dùng
        </button>
      </div>
    </header>
    <div className="p-8 space-y-element-gap">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <span className="material-symbols-outlined absolute top-4 right-4 text-6xl text-indigo-500/10 group-hover:scale-110 transition-transform">
            school
          </span>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">
            Học sinh tích cực
          </p>
          <h3 className="text-headline-lg font-headline-lg text-white mt-2">
            1,284
          </h3>
          <div className="flex items-center gap-2 mt-2 text-tertiary text-xs font-bold">
            <span className="material-symbols-outlined text-sm">
              trending_up
            </span>
            <span>+12.5% tháng này</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <span className="material-symbols-outlined absolute top-4 right-4 text-6xl text-indigo-500/10 group-hover:scale-110 transition-transform">
            person_celebrate
          </span>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">
            Giáo viên mới
          </p>
          <h3 className="text-headline-lg font-headline-lg text-white mt-2">
            42
          </h3>
          <div className="flex items-center gap-2 mt-2 text-tertiary text-xs font-bold">
            <span className="material-symbols-outlined text-sm">
              auto_awesome
            </span>
            <span>Đang chờ duyệt: 5</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <span className="material-symbols-outlined absolute top-4 right-4 text-6xl text-indigo-500/10 group-hover:scale-110 transition-transform">
            query_stats
          </span>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">
            Tỷ lệ hoạt động
          </p>
          <h3 className="text-headline-lg font-headline-lg text-white mt-2">
            94.2%
          </h3>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-4">
            <div
              className="kinetic-gradient h-full rounded-full"
              style={{ width: "94%" }}
            />
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <span className="material-symbols-outlined absolute top-4 right-4 text-6xl text-indigo-500/10 group-hover:scale-110 transition-transform">
            block
          </span>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">
            Tài khoản bị khóa
          </p>
          <h3 className="text-headline-lg font-headline-lg text-white mt-2">
            18
          </h3>
          <p className="text-slate-500 text-xs mt-2">
            Giảm 2% so với tuần trước
          </p>
        </div>
      </div>
      {/* Filter Bar */}
      <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-2xl border border-white/5">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-xl border border-white/5">
            <span className="text-xs font-bold text-slate-400">Vai trò:</span>
            <select className="bg-transparent border-none text-sm text-white focus:ring-0 cursor-pointer p-0">
              <option value="all">Tất cả</option>
              <option value="teacher">Giáo viên</option>
              <option value="student">Học sinh</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-xl border border-white/5">
            <span className="text-xs font-bold text-slate-400">
              Trạng thái:
            </span>
            <select className="bg-transparent border-none text-sm text-white focus:ring-0 cursor-pointer p-0">
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="locked">Bị khóa</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <span>Sắp xếp theo:</span>
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            Mới nhất{" "}
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </button>
        </div>
      </div>
      {/* Table Bento Container */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-400 uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-400 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-400 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-400 uppercase tracking-wider">
                Ngày tham gia
              </th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-400 uppercase tracking-wider text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {/* Row 1 */}
            <tr className="hover:bg-indigo-500/5 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                    NH
                  </div>
                  <div>
                    <p className="font-bold text-white">Nguyễn Văn Hoàng</p>
                    <p className="text-xs text-slate-500">
                      hoang.nv@kinetic.edu.vn
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold border border-secondary/20">
                  Giáo viên
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#70f8e4]" />
                  <span className="text-sm text-on-surface">Hoạt động</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">12/10/2023</td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-lg">
                    more_vert
                  </span>
                </button>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="hover:bg-indigo-500/5 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-container font-bold border border-tertiary-container/30">
                    LT
                  </div>
                  <div>
                    <p className="font-bold text-white">Lê Minh Tú</p>
                    <p className="text-xs text-slate-500">
                      tu.lm@student.edu.vn
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-bold border border-white/5">
                  Học sinh
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#70f8e4]" />
                  <span className="text-sm text-on-surface">Hoạt động</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">15/10/2023</td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-lg">
                    more_vert
                  </span>
                </button>
              </td>
            </tr>
            {/* Row 3 */}
            <tr className="hover:bg-indigo-500/5 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center text-error font-bold border border-error/30">
                    PT
                  </div>
                  <div>
                    <p className="font-bold text-white">Phạm Anh Thư</p>
                    <p className="text-xs text-slate-500">
                      thu.pa@kinetic.edu.vn
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-bold border border-white/5">
                  Học sinh
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error shadow-[0_0_8px_#ffb4ab]" />
                  <span className="text-sm text-on-surface">Bị khóa</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">01/09/2023</td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-lg">
                    more_vert
                  </span>
                </button>
              </td>
            </tr>
            {/* Row 4 */}
            <tr className="hover:bg-indigo-500/5 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                    QD
                  </div>
                  <div>
                    <p className="font-bold text-white">Quách Đình Dũng</p>
                    <p className="text-xs text-slate-500">
                      dung.qd@kinetic.edu.vn
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold border border-secondary/20">
                  Giáo viên
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#70f8e4]" />
                  <span className="text-sm text-on-surface">Hoạt động</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">20/08/2023</td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-lg">
                    more_vert
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Pagination */}
        <div className="px-6 py-4 bg-white/5 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Hiển thị <span className="text-white font-bold">1-4</span> trong số{" "}
            <span className="text-white font-bold">1,344</span> người dùng
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-slate-400 transition-all">
              <span className="material-symbols-outlined text-lg">
                chevron_left
              </span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500 text-white font-bold text-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-slate-400 text-sm">
              2
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-slate-400 text-sm">
              3
            </button>
            <span className="px-2 text-slate-600">...</span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-slate-400 text-sm">
              34
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-slate-400 transition-all">
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Footer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-headline-md text-headline-md text-white">
              Yêu cầu tham gia mới
            </h4>
            <a className="text-xs text-indigo-400 hover:underline" href="#">
              Xem tất cả
            </a>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">person_pin</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Trần Thùy Linh</p>
                  <p className="text-xs text-slate-500">
                    Giáo viên - THPT Chuyên
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-tertiary/20 text-tertiary text-xs font-bold hover:bg-tertiary hover:text-on-tertiary transition-all">
                  Duyệt
                </button>
                <button className="px-3 py-1 rounded-lg bg-error/10 text-error text-xs font-bold">
                  Từ chối
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">person_pin</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Vũ Mạnh Hùng</p>
                  <p className="text-xs text-slate-500">
                    Giáo viên - Đại học KHTN
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-tertiary/20 text-tertiary text-xs font-bold hover:bg-tertiary hover:text-on-tertiary transition-all">
                  Duyệt
                </button>
                <button className="px-3 py-1 rounded-lg bg-error/10 text-error text-xs font-bold">
                  Từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl overflow-hidden relative">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
          <h4 className="font-headline-md text-headline-md text-white mb-4">
            Lưu lượng truy cập hệ thống
          </h4>
          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <div
                className="absolute bottom-0 w-full kinetic-gradient rounded-t-lg"
                style={{ height: "45%" }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                T2
              </div>
            </div>
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <div
                className="absolute bottom-0 w-full kinetic-gradient rounded-t-lg"
                style={{ height: "65%" }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                T3
              </div>
            </div>
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <div
                className="absolute bottom-0 w-full kinetic-gradient rounded-t-lg"
                style={{ height: "85%" }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                T4
              </div>
            </div>
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <div
                className="absolute bottom-0 w-full kinetic-gradient rounded-t-lg shadow-[0_-4px_12px_rgba(113,248,228,0.3)]"
                style={{ height: "100%" }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-tertiary font-bold">
                Hôm nay
              </div>
            </div>
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <div
                className="absolute bottom-0 w-full kinetic-gradient rounded-t-lg opacity-40"
                style={{ height: "55%" }}
              />
            </div>
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <div
                className="absolute bottom-0 w-full kinetic-gradient rounded-t-lg opacity-40"
                style={{ height: "40%" }}
              />
            </div>
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <div
                className="absolute bottom-0 w-full kinetic-gradient rounded-t-lg opacity-40"
                style={{ height: "30%" }}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xs text-slate-400 italic">
              Dữ liệu được cập nhật tự động mỗi 5 phút.
            </p>
            <div className="flex items-center gap-1 text-tertiary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Live: 248 người dùng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</>
}
            
        </div>
    );
};

export default AdminClass;