import React from "react";

const AminQuiz = () => {
    return (
        <div>
            <h1>Quiz Management</h1>
            {<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
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
        "\n        .glass-card {\n    background: rgba(23, 31, 51, 0.7);\n    backdrop-filter: blur(12px);\n    border: 1px solid rgba(255, 255, 255, 0.05);\n}\n.kinetic-gradient {\n    background: linear-gradient(135deg, #c0c1ff 0%, #71f8e4 100%);\n}\n        \n        .kinetic-text-gradient {\n            background: linear-gradient(to right, #c0c1ff, #70f8e4);\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n        }\n    "
    }}
  />
  {/* Sidebar Navigation */}
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
  <main className="ml-64 min-h-screen">
    {/* Top Navigation Bar */}
    <header className="flex justify-between items-center px-8 py-4 w-full z-40 sticky top-0 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-indigo-900/20">
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lavender-300 to-indigo-500 font-space-grotesk">
          Quản lý bài kiểm tra
        </h2>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            className="bg-surface-container-lowest border-none rounded-xl pl-10 pr-4 py-2 text-sm w-80 focus:ring-2 focus:ring-indigo-500/50 text-on-surface"
            placeholder="Tìm kiếm đề thi..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-indigo-500/20 rounded-lg text-slate-400 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-secondary-container px-4 py-2 rounded-xl text-white font-bold text-sm shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform duration-150">
          <span className="material-symbols-outlined text-sm">add</span>
          Tạo đề mới
        </button>
      </div>
    </header>
    <div className="p-10 space-y-10">
      {/* Filter Bar */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 px-1">
              Chủ đề
            </label>
            <select className="bg-surface-container border-none text-on-surface rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/50 min-w-[160px]">
              <option>Tất cả chủ đề</option>
              <option>Hóa hữu cơ</option>
              <option>Hóa vô cơ</option>
              <option>Động hóa học</option>
              <option>Hóa phân tích</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 px-1">
              Độ khó
            </label>
            <select className="bg-surface-container border-none text-on-surface rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/50 min-w-[140px]">
              <option>Tất cả mức độ</option>
              <option>Cơ bản</option>
              <option>Trung bình</option>
              <option>Nâng cao</option>
              <option>Chuyên sâu</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <span className="material-symbols-outlined text-sm">sort</span>
          <span>Sắp xếp theo: Mới nhất</span>
        </div>
      </section>
      {/* Quiz Grid (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="glass-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
          <span className="material-symbols-outlined absolute -top-2 -right-2 text-6xl text-white/5 pointer-events-none">
            matter
          </span>
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#70f8e4]" />
              Đang mở
            </span>
            <button className="text-slate-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <h3 className="text-headline-md font-headline-md text-white mb-2 group-hover:text-indigo-300 transition-colors">
            Hóa hữu cơ chương 1: Alkane &amp; Alkene
          </h3>
          <p className="text-slate-400 text-sm mb-6 line-clamp-2">
            Kiểm tra kiến thức cơ bản về cấu tạo, danh pháp và tính chất vật lý
            của các hợp chất hydrocarbon no và không no.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                list_alt
              </span>
              <span className="text-xs font-medium">40 Câu hỏi</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                timer
              </span>
              <span className="text-xs font-medium">60 Phút</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                signal_cellular_alt
              </span>
              <span className="text-xs font-medium">Trung bình</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                person_check
              </span>
              <span className="text-xs font-medium">128 Lượt làm</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-100 text-xs font-bold rounded-lg transition-all">
              Chi tiết
            </button>
            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-lg transition-all">
              Chỉnh sửa
            </button>
          </div>
        </div>
        {/* Card 2 */}
        <div className="glass-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
          <span className="material-symbols-outlined absolute -top-2 -right-2 text-6xl text-white/5 pointer-events-none">
            experiment
          </span>
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 rounded-full bg-slate-500/10 text-slate-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Đã đóng
            </span>
            <button className="text-slate-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <h3 className="text-headline-md font-headline-md text-white mb-2 group-hover:text-indigo-300 transition-colors">
            Nhiệt động hóa học chuyên sâu
          </h3>
          <p className="text-slate-400 text-sm mb-6 line-clamp-2">
            Các định luật nhiệt động lực học áp dụng trong các hệ phản ứng phức
            tạp và tính toán Enthalpy.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                list_alt
              </span>
              <span className="text-xs font-medium">25 Câu hỏi</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                timer
              </span>
              <span className="text-xs font-medium">45 Phút</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                signal_cellular_alt
              </span>
              <span className="text-xs font-medium">Nâng cao</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                person_check
              </span>
              <span className="text-xs font-medium">42 Lượt làm</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-100 text-xs font-bold rounded-lg transition-all">
              Chi tiết
            </button>
            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-lg transition-all">
              Mở lại
            </button>
          </div>
        </div>
        {/* Card 3 */}
        <div className="glass-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
          <span className="material-symbols-outlined absolute -top-2 -right-2 text-6xl text-white/5 pointer-events-none">
            science
          </span>
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#70f8e4]" />
              Đang mở
            </span>
            <button className="text-slate-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <h3 className="text-headline-md font-headline-md text-white mb-2 group-hover:text-indigo-300 transition-colors">
            Kiểm tra Giữa kỳ: Hóa vô cơ 2
          </h3>
          <p className="text-slate-400 text-sm mb-6 line-clamp-2">
            Nội dung bao gồm Kim loại kiềm, kiềm thổ và các hợp chất quan trọng
            trong công nghiệp.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                list_alt
              </span>
              <span className="text-xs font-medium">50 Câu hỏi</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                timer
              </span>
              <span className="text-xs font-medium">90 Phút</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                signal_cellular_alt
              </span>
              <span className="text-xs font-medium">Dễ</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-indigo-400 text-lg">
                person_check
              </span>
              <span className="text-xs font-medium">315 Lượt làm</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-100 text-xs font-bold rounded-lg transition-all">
              Chi tiết
            </button>
            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-lg transition-all">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </section>
      {/* Question Repository Archive */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div>
              <h2 className="text-headline-md font-headline-md text-white">
                Kho lưu trữ câu hỏi
              </h2>
              <p className="text-slate-400 text-sm">
                Các câu hỏi hay nhất được hệ thống đề xuất
              </p>
            </div>
          </div>
          <button className="text-indigo-400 text-sm font-bold hover:underline">
            Xem tất cả kho lưu trữ
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container rounded-2xl p-4 flex gap-4 items-start border border-white/5 hover:bg-surface-container-high transition-colors">
            <div className="text-indigo-400 font-bold text-lg font-space-grotesk mt-1">
              #01
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium mb-3">
                Tính pH của dung dịch CH3COOH 0.1M biết Ka = 1.75 x 10^-5. Giải
                thích ảnh hưởng khi thêm CH3COONa vào dung dịch.
              </p>
              <div className="flex gap-4">
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">tag</span>
                  Hóa đại cương
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">
                    trending_up
                  </span>
                  Độ phân hóa cao
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          </div>
          <div className="bg-surface-container rounded-2xl p-4 flex gap-4 items-start border border-white/5 hover:bg-surface-container-high transition-colors">
            <div className="text-indigo-400 font-bold text-lg font-space-grotesk mt-1">
              #02
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium mb-3">
                Xác định công thức cấu tạo của hợp chất hữu cơ X (C8H10O) dựa
                trên phổ hồng ngoại (IR) và phổ cộng hưởng từ hạt nhân (NMR).
              </p>
              <div className="flex gap-4">
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">tag</span>
                  Hóa lý thuyết
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">
                    military_tech
                  </span>
                  Mức chuyên gia
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          </div>
          <div className="bg-surface-container rounded-2xl p-4 flex gap-4 items-start border border-white/5 hover:bg-surface-container-high transition-colors">
            <div className="text-indigo-400 font-bold text-lg font-space-grotesk mt-1">
              #03
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium mb-3">
                So sánh nhiệt độ sôi của các đồng phân cấu tạo của C5H12 và giải
                thích dựa trên lực tương tác phân tử Van der Waals.
              </p>
              <div className="flex gap-4">
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">tag</span>
                  Hóa hữu cơ 1
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">
                    star
                  </span>
                  Kinh điển
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          </div>
          <div className="bg-surface-container rounded-2xl p-4 flex gap-4 items-start border border-white/5 hover:bg-surface-container-high transition-colors">
            <div className="text-indigo-400 font-bold text-lg font-space-grotesk mt-1">
              #04
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium mb-3">
                Nêu nguyên tắc của phương pháp chuẩn độ Complexon ứng dụng trong
                xác định độ cứng của nước sinh hoạt.
              </p>
              <div className="flex gap-4">
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">tag</span>
                  Phân tích
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">
                    construction
                  </span>
                  Thực hành
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
  {/* Floating Action Button for Mobile Context */}
  <button className="fixed bottom-8 right-8 w-14 h-14 kinetic-gradient rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-500/50 md:hidden z-50 active:scale-90 transition-transform">
    <span className="material-symbols-outlined">add</span>
  </button>
</>
}
        </div>
    );
}