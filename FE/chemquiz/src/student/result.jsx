import React from 'react';
// import '../../assets/css/result.css';

const StudentResult = () => {
    return (
        <div className="result-container">
            {/* --- PHẦN TỔNG KẾT ĐIỂM SỐ --- */}
            <section className="result-summary">
                <div className="score-circle">
                    <h2>8.5</h2>
                    <span>Điểm số</span>
                </div>
                <div className="stats-detail">
                    <p>Tên bài thi: <strong>Kiểm tra Este - Lipit</strong></p>
                    <p>Số câu đúng: <span className="text-success">17/20</span></p>
                    <p>Thời gian làm bài: <span>22 phút 15 giây</span></p>
                    <p>Xếp loại: <strong>Giỏi</strong></p>
                </div>
            </section>

            {/* --- CHI TIẾT TỪNG CÂU HỎI --- */}
            <section className="questions-review">
                <h3>Xem lại chi tiết</h3>

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
        "\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #585990 100%);\n        }\n        .glass-panel {\n            background: rgba(45, 52, 73, 0.4);\n            backdrop-filter: blur(20px);\n            border: 1px solid rgba(192, 193, 255, 0.1);\n        }\n        .glow-accent {\n            box-shadow: 0 0 20px rgba(192, 193, 255, 0.2);\n        }\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* Top Navigation Bar */}
  <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 z-50 bg-[#2d3449]/70 backdrop-blur-lg border-b border-indigo-500/20 shadow-lg shadow-indigo-500/10">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
        <img
          alt="Student Profile Photo"
          data-alt="Student profile photo, young male student with a friendly expression in a modern bright setting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2mnNLEmoiHedqMzqEGXJf5Q83Fl7RQ6caSKCWzVFySVV_VxgxADocCVSGnXduu1M4L_Wafyx6LOVpynvLeJD8TJw59LdZsvw9zZ8X8qqdT4U9lQbuDSSSnPZKD6DEMRLVJZE54uDb7xsJTgUr08PqmQvdJnomzqXTXlYN5FQ_KQd1d4YylRssqazUpmJYDBk437ab6uF2AeNAYzMf1Rk4i4kKI2PeRMNUgRt-Uqa0Zhn12YP8I36up4ye71FoCvRBOX7ltlQ_AKZF"
        />
      </div>
      <span className="font-display font-bold tracking-tight text-[#c0c1ff] text-lg uppercase tracking-widest">
        Kinetic Chemistry
      </span>
    </div>
    <div className="flex items-center gap-4">
      <button className="material-symbols-outlined text-[#c0c1ff] hover:bg-indigo-500/10 p-2 rounded-full transition-all duration-300">
        notifications
      </button>
    </div>
  </header>
  <main className="pt-24 pb-32 px-6 md:px-10 max-w-7xl mx-auto">
    {/* Hero Result Section */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
      {/* Main Score Card */}
      <div className="md:col-span-8 glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[120px] text-primary">
            emoji_events
          </span>
        </div>
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              className="text-surface-container-highest"
              cx={96}
              cy={96}
              fill="transparent"
              r={88}
              stroke="currentColor"
              strokeWidth={12}
            />
            <circle
              className="text-primary-container drop-shadow-[0_0_8px_rgba(192,193,255,0.6)]"
              cx={96}
              cy={96}
              fill="transparent"
              r={88}
              stroke="currentColor"
              strokeDasharray="552.92"
              strokeDashoffset="55.29"
              strokeWidth={12}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display text-5xl font-black text-primary">
              9/10
            </span>
            <span className="font-label-caps text-on-surface-variant">
              ĐIỂM SỐ
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="font-display text-headline-lg text-primary">
            Kết quả xuất sắc!
          </h1>
          <p className="text-on-surface-variant max-w-md">
            Bạn đã hoàn thành bài kiểm tra Động học Hóa học với kết quả rất ấn
            tượng. Hãy xem chi tiết phân tích bên dưới.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-surface-container-high px-4 py-2 rounded-2xl border border-outline-variant/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">
                timer
              </span>
              <span className="font-headline-md text-tertiary">12:45</span>
              <span className="text-xs text-outline">Thời gian</span>
            </div>
            <div className="bg-surface-container-high px-4 py-2 rounded-2xl border border-outline-variant/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">
                target
              </span>
              <span className="font-headline-md text-primary-container">
                90%
              </span>
              <span className="text-xs text-outline">Chính xác</span>
            </div>
          </div>
        </div>
      </div>
      {/* AI Insights Card */}
      <div className="md:col-span-4 glass-panel rounded-3xl p-6 border-l-4 border-tertiary relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="material-symbols-outlined text-tertiary"
            data-weight="fill"
          >
            neurology
          </span>
          <h3 className="font-headline-md text-primary">AI Phân Tích</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-tertiary/10 p-4 rounded-2xl border border-tertiary/20">
            <p className="text-sm text-on-surface italic">
              "Làm tốt lắm phần lý thuyết cơ bản, bạn nắm rất vững các định
              luật. Cần luyện tập thêm các bài toán tính toán vận tốc phản ứng
              bậc 2."
            </p>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm">
              <span className="material-symbols-outlined text-tertiary text-lg">
                check_circle
              </span>
              <span>Mạnh nhất: Định luật bảo toàn</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="material-symbols-outlined text-error text-lg">
                error
              </span>
              <span>Cần cải thiện: Tính hằng số k</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* Detailed Breakdown Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Questions List (Bento Box 1) */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="font-headline-md text-primary flex items-center gap-2 px-2">
          <span className="material-symbols-outlined">fact_check</span>
          Chi tiết câu trả lời
        </h2>
        {/* Question Card 1 (Correct) */}
        <div className="glass-panel rounded-2xl p-6 transition-all hover:bg-surface-container-high/60 group">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center font-bold">
                1
              </span>
              <h4 className="font-headline-md text-on-surface">
                Yếu tố nào ảnh hưởng đến vận tốc?
              </h4>
            </div>
            <span className="bg-tertiary/20 text-tertiary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Đúng
            </span>
          </div>
          <div className="ml-11 space-y-3">
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-tertiary/30 text-on-surface">
              <span className="text-xs text-outline block mb-1">
                Câu trả lời của bạn:
              </span>
              Nhiệt độ, Nồng độ và Chất xúc tác
            </div>
            <div className="text-sm text-outline-variant leading-relaxed">
              <span className="text-tertiary font-bold">Giải thích:</span> Theo
              lý thuyết va chạm, nhiệt độ tăng làm tăng động năng hạt, nồng độ
              tăng làm tăng mật độ va chạm, và chất xúc tác làm giảm năng lượng
              hoạt hóa.
            </div>
          </div>
        </div>
        {/* Question Card 2 (Incorrect) */}
        <div className="glass-panel rounded-2xl p-6 border-l-4 border-error/50">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-error/20 text-error flex items-center justify-center font-bold">
                7
              </span>
              <h4 className="font-headline-md text-on-surface">
                Tính hằng số k của phản ứng bậc 1?
              </h4>
            </div>
            <span className="bg-error/20 text-error px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Sai
            </span>
          </div>
          <div className="ml-11 space-y-3">
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-error/30 text-error/80">
              <span className="text-xs text-outline block mb-1">
                Câu trả lời của bạn:
              </span>
              k = 0.045 s⁻¹
            </div>
            <div className="p-3 rounded-xl bg-tertiary/5 border border-tertiary/30 text-tertiary/90">
              <span className="text-xs text-outline block mb-1">
                Đáp án đúng:
              </span>
              k = 0.023 s⁻¹
            </div>
            <div className="text-sm text-outline-variant leading-relaxed">
              <span className="text-primary font-bold">Phân tích lỗi:</span> Bạn
              đã quên chia cho hệ số logarit tự nhiên (ln2) khi tính toán thời
              gian bán hủy. Hãy xem lại công thức k = ln2 / t½.
            </div>
          </div>
        </div>
        {/* Question Card 3 (Correct) */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center font-bold">
                3
              </span>
              <h4 className="font-headline-md text-on-surface">
                Phản ứng tỏa nhiệt có đồ thị như thế nào?
              </h4>
            </div>
            <span className="bg-tertiary/20 text-tertiary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Đúng
            </span>
          </div>
          <div className="ml-11">
            <img
              alt="Đồ thị năng lượng"
              className="w-full h-40 object-cover rounded-xl border border-outline-variant/30 mb-3"
              data-alt="Abstract scientific graph showing energy levels over time with a downward curve, glowing blue and purple lines"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEshBGg_AQ56B9iJGSPOA6TIDofVfgi9OQudGRLclFrxeS6tx1hPCYqTPsPIzG8A43tmfynAhF4pS5kJWrBvkoZdwh-J1__6WIFlNT_MKfJ7mKJtGEVfEkiAU6NJXfiS55aDv6GkhpJZ6ei23_K8yNmxTUPKa7GMHM9xPFpRvTaSR32GVbzQK_68rcVC7-RNGZHQ_9jSEIpYHgwriRkY5KirReb-V6wWauj4_Gq7DWzejhWPUR6eLAk44pWZIS2FsJEXDPd5L1Qofm"
            />
            <div className="text-sm text-outline-variant leading-relaxed">
              <span className="text-tertiary font-bold">Giải thích:</span> Đồ
              thị cho thấy năng lượng sản phẩm thấp hơn năng lượng chất phản ứng
              ban đầu, chứng tỏ hệ giải phóng năng lượng ra môi trường.
            </div>
          </div>
        </div>
      </div>
      {/* Stats & Sidebar (Bento Box 2) */}
      <div className="space-y-6">
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="font-headline-md text-primary mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">analytics</span>
            Thống kê học tập
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-on-surface">Lý thuyết</span>
                <span className="text-tertiary">100%</span>
              </div>
              <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full kinetic-gradient w-[100%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-on-surface">Tính toán</span>
                <span className="text-primary-container">65%</span>
              </div>
              <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[65%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-on-surface">Phân tích đồ thị</span>
                <span className="text-secondary">90%</span>
              </div>
              <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[90%]" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/20">
            <h4 className="text-xs font-bold text-outline-variant uppercase tracking-widest mb-4">
              Lịch sử gần đây
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl">
                <span className="text-sm">Cân bằng hóa học</span>
                <span className="text-sm font-bold text-primary">8.5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl">
                <span className="text-sm">Liên kết cộng hóa trị</span>
                <span className="text-sm font-bold text-primary">9.0</span>
              </div>
            </div>
          </div>
        </div>
        {/* Action Card */}
        <div className="kinetic-gradient rounded-3xl p-6 glow-accent text-on-primary">
          <h3 className="font-headline-md mb-2">Cải thiện ngay?</h3>
          <p className="text-sm opacity-90 mb-6">
            Chúng tôi đã chuẩn bị bộ bài tập tập trung vào phần tính toán hằng
            số k dành riêng cho bạn.
          </p>
          <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md py-3 rounded-2xl font-bold transition-all active:scale-95">
            Luyện tập ngay
          </button>
        </div>
      </div>
    </div>
  </main>
  {/* Bottom Navigation Bar */}
  <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe py-3 bg-[#0b1326]/90 backdrop-blur-xl border-t border-indigo-500/30 shadow-[0_-4px_20px_rgba(192,193,255,0.1)] rounded-t-2xl">
    <a
      className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 px-4 py-1.5 hover:bg-slate-800/50 transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">home</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium">
        Home
      </span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-[#c0c1ff] bg-indigo-500/20 rounded-xl px-4 py-1.5 brightness-125 scale-105"
      href="#"
    >
      <span className="material-symbols-outlined">quiz</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium">
        Quiz
      </span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 px-4 py-1.5 hover:bg-slate-800/50 transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">history</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium">
        History
      </span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 px-4 py-1.5 hover:bg-slate-800/50 transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">insights</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-medium">
        Analysis
      </span>
    </a>
  </nav>
</>
}
                {/* Ví dụ một câu trả lời ĐÚNG */}
                <div className="question-item correct">
                    <p><strong>Câu 1:</strong> Thủy phân Este trong môi trường Kiềm gọi là phản ứng gì?</p>
                    <ul className="options-list">
                        <li className="selected-correct">A. Phản ứng xà phòng hóa</li>
                        <li>B. Phản ứng Este hóa</li>
                        <li>C. Phản ứng trùng ngưng</li>
                    </ul>
                    <div className="explanation">
                        <small>Giải thích: Đáp án A đúng vì đây là định nghĩa cơ bản về thủy phân Este trong NaOH/KOH.</small>
                    </div>
                </div>

                {/* Ví dụ một câu trả lời SAI */}
                <div className="question-item incorrect">
                    <p><strong>Câu 2:</strong> Công thức phân tử của Glucozo là?</p>
                    <ul className="options-list">
                        <li className="selected-wrong">A. C12H22O11 (Bạn chọn)</li>
                        <li className="correct-answer">B. C6H12O6 (Đáp án đúng)</li>
                    </ul>
                </div>
                {/* ------------------------------------------- */}
            </section>

            <div className="action-buttons">
                <button className="btn-back">Quay lại trang chủ</button>
                <button className="btn-print">In kết quả (PDF)</button>
            </div>
        </div>
    );
};

export default StudentResult;