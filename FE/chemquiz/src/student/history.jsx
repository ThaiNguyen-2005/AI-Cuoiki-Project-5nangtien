import React from 'react';
// import '../../assets/css/history.css'; // Import CSS của bạn nếu có

const StudentHistory = () => {
    return (
        <div className="history-wrapper">
            <header className="history-header">
                <h2>Lịch sử làm bài thi</h2>
                <p>Xem lại kết quả và chi tiết các bài thi bạn đã tham gia</p>
            </header>

            <main className="history-content">
                {<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Lịch Sử Làm Bài | Kinetic Chemistry</title>
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #585990 100%);\n        }\n        .glass-card {\n            background: rgba(19, 27, 46, 0.6);\n            backdrop-filter: blur(12px);\n            border: 1px solid rgba(192, 193, 255, 0.1);\n        }\n        .status-glow-passed {\n            box-shadow: 0 0 8px rgba(112, 248, 228, 0.4);\n        }\n        .status-glow-failed {\n            box-shadow: 0 0 8px rgba(255, 180, 171, 0.4);\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* TopAppBar */}
  <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 z-50 bg-[#2d3449]/70 backdrop-blur-lg border-b border-indigo-500/20 shadow-lg shadow-indigo-500/10">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
        <img
          alt="Student Profile Photo"
          className="w-full h-full object-cover"
          data-alt="close-up portrait of a young professional student with a modern aesthetic, soft indigo studio lighting, clean background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF5dacDm1U82uG81tctY1pDD9GoODFDstjNwUd-8GQJEqCXm-bHKey9Kih-gXB-4Z7Ziy_Xpw9SopUxdQARDPieW8vT2L2iloYvzTsjm5bSFBMgjPeEC4vqKPphfRLJyh_myZjGqjddOEVzzsgMh73cnnOjoXmFWtnBoStusS6K2w1B4jKbha4hXcVVzwTKTKV4z0sS25FAH59lJLs8LAY7DKBQwYxDouOH1EFzxFAMNTdz7qO2a-YvmyiZS4ZwoiBn_fRp36fhIEo"
        />
      </div>
      <h1 className="text-lg font-black uppercase tracking-widest text-[#c0c1ff] font-['Space_Grotesk']">
        Kinetic Chemistry
      </h1>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-full text-[#c0c1ff] hover:bg-indigo-500/10 transition-all duration-300">
        <span className="material-symbols-outlined">notifications</span>
      </button>
    </div>
  </header>
  <main className="pt-24 px-6 md:px-12 max-w-6xl mx-auto">
    {/* Header Section */}
    <section className="mb-section-margin">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-widest mb-2 block">
            Dữ liệu học tập
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Lịch Sử Kiểm Tra
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-lg">
            Theo dõi và phân tích kết quả các bài kiểm tra Hóa học Kinetic của
            bạn qua từng giai đoạn.
          </p>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative group">
            <select className="appearance-none bg-surface-container border-none rounded-xl px-4 py-2.5 pr-10 text-body-md text-on-surface focus:ring-2 focus:ring-primary-container transition-all cursor-pointer">
              <option>Tất cả môn học</option>
              <option>Hóa Đại Cương</option>
              <option>Hóa Hữu Cơ</option>
              <option>Động Hóa Học</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
              expand_more
            </span>
          </div>
          <div className="relative group">
            <select className="appearance-none bg-surface-container border-none rounded-xl px-4 py-2.5 pr-10 text-body-md text-on-surface focus:ring-2 focus:ring-primary-container transition-all cursor-pointer">
              <option>30 ngày qua</option>
              <option>Học kỳ này</option>
              <option>Năm học này</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
              calendar_today
            </span>
          </div>
        </div>
      </div>
    </section>
    {/* Stats Overview (Bento Style) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-element-gap mb-section-margin">
      <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
        <span className="material-symbols-outlined absolute top-4 right-4 text-primary opacity-10 text-6xl">
          analytics
        </span>
        <p className="text-on-surface-variant font-medium">Điểm trung bình</p>
        <h3 className="text-display font-display text-primary mt-1">8.4</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-tertiary text-sm font-bold">+0.6</span>
          <span className="text-outline text-xs">so với tháng trước</span>
        </div>
      </div>
      <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
        <span className="material-symbols-outlined absolute top-4 right-4 text-primary opacity-10 text-6xl">
          checklist
        </span>
        <p className="text-on-surface-variant font-medium">Bài đã hoàn thành</p>
        <h3 className="text-display font-display text-primary mt-1">24</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-tertiary text-sm font-bold">92%</span>
          <span className="text-outline text-xs">tỷ lệ đạt chuẩn</span>
        </div>
      </div>
      <div className="glass-card p-6 rounded-2xl relative overflow-hidden border-l-4 border-l-tertiary">
        <span className="material-symbols-outlined absolute top-4 right-4 text-tertiary opacity-10 text-6xl">
          workspace_premium
        </span>
        <p className="text-on-surface-variant font-medium">Thứ hạng lớp</p>
        <h3 className="text-display font-display text-tertiary mt-1">05</h3>
        <div className="flex items-center gap-2 mt-2 text-outline text-xs">
          Trong tổng số 42 học viên
        </div>
      </div>
    </div>
    {/* Quiz History List */}
    <div className="space-y-4">
      {/* Item 1 */}
      <div className="glass-card hover:bg-surface-container-high transition-all duration-300 p-4 md:p-6 rounded-2xl group">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary-container shrink-0">
              <span className="material-symbols-outlined text-3xl">
                science
              </span>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                Cấu tạo nguyên tử &amp; Bảng tuần hoàn
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    event
                  </span>
                  14/05/2024
                </span>
                <span className="text-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    folder
                  </span>
                  Hóa Đại Cương
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-8 border-t border-indigo-500/10 md:border-none pt-4 md:pt-0">
            <div className="text-center">
              <p className="text-xs text-outline-variant font-label-caps uppercase mb-1">
                Điểm số
              </p>
              <span className="text-2xl font-black text-primary">
                9.5<span className="text-sm text-outline font-normal">/10</span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 status-glow-passed">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                Đạt
              </span>
              <button className="mt-2 text-primary-container text-xs hover:underline flex items-center gap-1">
                Chi tiết{" "}
                <span className="material-symbols-outlined text-xs">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Item 2 */}
      <div className="glass-card hover:bg-surface-container-high transition-all duration-300 p-4 md:p-6 rounded-2xl group">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary-container shrink-0">
              <span className="material-symbols-outlined text-3xl">
                medication
              </span>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                Liên kết Hóa học nâng cao
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    event
                  </span>
                  10/05/2024
                </span>
                <span className="text-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    folder
                  </span>
                  Hóa Hữu Cơ
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-8 border-t border-indigo-500/10 md:border-none pt-4 md:pt-0">
            <div className="text-center">
              <p className="text-xs text-outline-variant font-label-caps uppercase mb-1">
                Điểm số
              </p>
              <span className="text-2xl font-black text-primary">
                7.0<span className="text-sm text-outline font-normal">/10</span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 status-glow-passed">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
                Đạt
              </span>
              <button className="mt-2 text-primary-container text-xs hover:underline flex items-center gap-1">
                Chi tiết{" "}
                <span className="material-symbols-outlined text-xs">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Item 3 (Failed) */}
      <div className="glass-card hover:bg-surface-container-high transition-all duration-300 p-4 md:p-6 rounded-2xl group border-l-4 border-l-error/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error shrink-0">
              <span className="material-symbols-outlined text-3xl">
                experiment
              </span>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                Nhiệt Động Lực Học Cơ Bản
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    event
                  </span>
                  05/05/2024
                </span>
                <span className="text-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    folder
                  </span>
                  Động Hóa Học
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-8 border-t border-indigo-500/10 md:border-none pt-4 md:pt-0">
            <div className="text-center">
              <p className="text-xs text-outline-variant font-label-caps uppercase mb-1">
                Điểm số
              </p>
              <span className="text-2xl font-black text-error">
                4.5<span className="text-sm text-outline font-normal">/10</span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-3 py-1 rounded-full bg-error/10 text-error text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 status-glow-failed">
                <span className="w-2 h-2 rounded-full bg-error" />
                Chưa đạt
              </span>
              <button className="mt-2 text-primary-container text-xs hover:underline flex items-center gap-1">
                Chi tiết{" "}
                <span className="material-symbols-outlined text-xs">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Item 4 */}
      <div className="glass-card hover:bg-surface-container-high transition-all duration-300 p-4 md:p-6 rounded-2xl group">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary-container shrink-0">
              <span className="material-symbols-outlined text-3xl">bolt</span>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                Đại cương Phản ứng Oxi hóa khử
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    event
                  </span>
                  28/04/2024
                </span>
                <span className="text-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    folder
                  </span>
                  Hóa Đại Cương
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-8 border-t border-indigo-500/10 md:border-none pt-4 md:pt-0">
            <div className="text-center">
              <p className="text-xs text-outline-variant font-label-caps uppercase mb-1">
                Điểm số
              </p>
              <span className="text-2xl font-black text-primary">
                8.8<span className="text-sm text-outline font-normal">/10</span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 status-glow-passed">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
                Đạt
              </span>
              <button className="mt-2 text-primary-container text-xs hover:underline flex items-center gap-1">
                Chi tiết{" "}
                <span className="material-symbols-outlined text-xs">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Load More */}
    <div className="flex justify-center mt-12">
      <button className="px-8 py-3 rounded-xl border border-indigo-500/30 text-primary-container font-semibold hover:bg-indigo-500/10 transition-all flex items-center gap-2">
        Xem thêm kết quả
        <span className="material-symbols-outlined">expand_more</span>
      </button>
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
                <div className="filter-section">
                    <input type="text" placeholder="Tìm kiếm tên bài thi..." className="search-box" />
                    <select className="filter-select">
                        <option value="all">Tất cả chương</option>
                        <option value="organic">Hóa hữu cơ</option>
                        <option value="inorganic">Hóa vô cơ</option>
                    </select>
                </div>

                <table className="history-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên bài thi</th>
                            <th>Ngày thực hiện</th>
                            <th>Thời gian làm</th>
                            <th>Số câu đúng</th>
                            <th>Điểm số</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Dữ liệu tĩnh để hiển thị trước */}
                        <tr>
                            <td>1</td>
                            <td>Kiểm tra Este - Lipit</td>
                            <td>20/04/2026</td>
                            <td>25:10</td>
                            <td>18/20</td>
                            <td className="high-score">9.0</td>
                            <td>
                                <button className="btn-detail">Xem chi tiết</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Ôn tập chương Halogen</td>
                            <td>15/04/2026</td>
                            <td>15:00</td>
                            <td>12/20</td>
                            <td className="mid-score">6.0</td>
                            <td>
                                <button className="btn-detail">Xem chi tiết</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* -------------------------------------- */}
            </main>
        </div>
    );
};

export default StudentHistory;