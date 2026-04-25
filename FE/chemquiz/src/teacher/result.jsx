import React from "react";
const TeacherResult = () => {
    return (
        <div className="teacher-question">
            {<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Kết quả học sinh | Kinetic Chemistry</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap"
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
        "\n        .glass-card {\n            background: rgba(19, 27, 46, 0.7);\n            backdrop-filter: blur(20px);\n            border: 1px solid rgba(145, 143, 154, 0.1);\n        }\n        .kinetic-gradient {\n            background: linear-gradient(135deg, #c0c1ff 0%, #6366f1 100%);\n        }\n        .glow-dot {\n            box-shadow: 0 0 8px currentColor;\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  "
    }}
  />
  {/* Top Navigation */}
  <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 bg-[#0b1326]/80 backdrop-blur-lg text-[#c0c1ff] font-['Space_Grotesk'] font-medium tracking-tight z-50 border-b border-slate-800/50 shadow-lg shadow-[#000000]/20">
    <div className="flex items-center gap-4">
      <span className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#c0c1ff] to-[#6366f1]">
        Kinetic Chemistry
      </span>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex gap-6 mr-8">
        <span className="text-[#c0c1ff] font-bold cursor-pointer">Results</span>
        <span className="text-slate-400 hover:bg-white/5 transition-colors cursor-pointer px-2 rounded">
          Students
        </span>
        <span className="text-slate-400 hover:bg-white/5 transition-colors cursor-pointer px-2 rounded">
          Insights
        </span>
      </div>
      <span className="material-symbols-outlined cursor-pointer hover:bg-white/5 p-2 rounded-full transition-colors">
        notifications
      </span>
      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c0c1ff]/30">
        <img
          alt="Teacher Profile"
          data-alt="Close-up portrait of a professional male professor in a laboratory setting with soft blue cinematic lighting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA57By43a7nXjmn7jIRCajl2c31wgg_G80RBtj-xnUaB8nVk5reL0AxTMTgBpoECzy_paRCZudEF7Hqbnn173VmuRckMEgBmezEvdv6ewZ0B5xJ_1mdmredL3Gva5aSD-3dkBplJYp1fW5cnjtLHQ0dbXsFHMLRW94YrItkUNz9H3fqc28klj1B1gnUMmip-jzOXI_A1dQFAQWbqCi_I3TUbnIqZYME_EvxkEoJ_yAuKU6EccsbU6EYUko9cimaczu3hy8Lqf5H0V7b"
        />
      </div>
    </div>
  </header>
  {/* Side Navigation (Desktop) */}
  <nav className="hidden lg:flex fixed left-0 top-0 h-full w-64 border-r border-slate-800 bg-[#0b1326] flex-col p-6 z-40 pt-20">
    <div className="flex items-center gap-3 mb-10 p-2">
      <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-[#c0c1ff]">
        <span className="material-symbols-outlined">account_circle</span>
      </div>
      <div>
        <p className="font-headline-md text-sm text-[#c0c1ff]">Dr. Aris</p>
        <p className="text-xs text-slate-500">Chemistry Dept.</p>
      </div>
    </div>
    <div className="space-y-2">
      <a
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-200"
        href="#"
      >
        <span className="material-symbols-outlined">dashboard</span>
        <span className="font-['Space_Grotesk'] text-sm font-medium">
          Dashboard
        </span>
      </a>
      <a
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-200"
        href="#"
      >
        <span className="material-symbols-outlined">science</span>
        <span className="font-['Space_Grotesk'] text-sm font-medium">
          Quizzes
        </span>
      </a>
      <a
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#c0c1ff] border-r-2 border-[#c0c1ff] bg-gradient-to-r from-[#c0c1ff]/10 to-transparent transition-all duration-200"
        href="#"
      >
        <span className="material-symbols-outlined">analytics</span>
        <span className="font-['Space_Grotesk'] text-sm font-medium">
          Results
        </span>
      </a>
      <a
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-200"
        href="#"
      >
        <span className="material-symbols-outlined">group</span>
        <span className="font-['Space_Grotesk'] text-sm font-medium">
          Students
        </span>
      </a>
      <a
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-200"
        href="#"
      >
        <span className="material-symbols-outlined">settings</span>
        <span className="font-['Space_Grotesk'] text-sm font-medium">
          Settings
        </span>
      </a>
    </div>
  </nav>
  {/* Main Canvas */}
  <main className="lg:ml-64 pt-24 pb-24 px-6 md:px-10 min-h-screen">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-on-background text-3xl mb-2">
            Kết quả học sinh
          </h1>
          <p className="text-on-surface-variant">
            Phân tích hiệu suất học tập - Học kỳ II, 2024
          </p>
        </div>
        <button className="kinetic-gradient text-on-primary-fixed px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-xl">
            file_download
          </span>
          Xuất báo cáo (Excel)
        </button>
      </div>
      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Circular Progress Card */}
        <div className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <span className="material-symbols-outlined absolute top-4 right-4 text-primary opacity-10 text-6xl">
            pie_chart
          </span>
          <h3 className="font-label-caps text-slate-400 mb-6 self-start">
            TỶ LỆ ĐẠT / TRƯỢT
          </h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-surface-container-highest"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeWidth={12}
              />
              <circle
                className="text-tertiary glow-dot"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeDasharray={440}
                strokeDashoffset={66}
                strokeWidth={12}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-headline-lg text-tertiary">
                85%
              </span>
              <span className="text-[10px] font-label-caps text-slate-500">
                TỶ LỆ ĐẠT
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary glow-dot" />
              <span className="text-xs text-slate-300">Đạt (128)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error" />
              <span className="text-xs text-slate-300">Trượt (22)</span>
            </div>
          </div>
        </div>
        {/* Average Grade Card */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
          <span className="material-symbols-outlined absolute top-4 right-4 text-primary opacity-10 text-6xl">
            grade
          </span>
          <div>
            <h3 className="font-label-caps text-slate-400 mb-2">
              ĐIỂM TRUNG BÌNH LỚP
            </h3>
            <p className="font-display text-primary text-5xl">7.8</p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400">So với tháng trước</span>
              <span className="text-tertiary flex items-center gap-1">
                +0.4{" "}
                <span className="material-symbols-outlined text-xs">
                  trending_up
                </span>
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full kinetic-gradient w-[78%] rounded-full" />
            </div>
          </div>
        </div>
        {/* Submission Summary */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
          <span className="material-symbols-outlined absolute top-4 right-4 text-primary opacity-10 text-6xl">
            description
          </span>
          <h3 className="font-label-caps text-slate-400 mb-4">
            TRẠNG THÁI NỘP BÀI
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-sm">
                    done_all
                  </span>
                </div>
                <span className="text-sm">Đã nộp</span>
              </div>
              <span className="font-bold">142</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-sm">
                    pending
                  </span>
                </div>
                <span className="text-sm">Đang làm</span>
              </div>
              <span className="font-bold">8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </div>
                <span className="text-sm">Chưa nộp</span>
              </div>
              <span className="font-bold">0</span>
            </div>
          </div>
        </div>
      </div>
      {/* Filter Bar */}
      <div className="glass-card rounded-2xl p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            className="w-full bg-surface-container-lowest border-none rounded-xl py-2.5 pl-10 pr-4 focus:ring-1 focus:ring-primary-fixed-dim text-sm text-on-background"
            placeholder="Tìm kiếm học sinh..."
            type="text"
          />
        </div>
        <select className="bg-surface-container-lowest border-none rounded-xl py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary-fixed-dim min-w-[120px]">
          <option>Lớp 12A1</option>
          <option>Lớp 12A2</option>
          <option>Lớp 11B3</option>
        </select>
        <select className="bg-surface-container-lowest border-none rounded-xl py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary-fixed-dim min-w-[140px]">
          <option>Tất cả điểm</option>
          <option>Trên 8.0</option>
          <option>Từ 5.0 - 8.0</option>
          <option>Dưới 5.0</option>
        </select>
        <select className="bg-surface-container-lowest border-none rounded-xl py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary-fixed-dim min-w-[160px]">
          <option>Trạng thái</option>
          <option>Đã nộp</option>
          <option>Đang làm</option>
          <option>Chưa nộp</option>
        </select>
      </div>
      {/* Student List Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-slate-800/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-highest/30">
              <th className="py-4 px-6 font-label-caps text-slate-400 border-b border-slate-800">
                HỌC SINH
              </th>
              <th className="py-4 px-6 font-label-caps text-slate-400 border-b border-slate-800">
                MÃ ID
              </th>
              <th className="py-4 px-6 font-label-caps text-slate-400 border-b border-slate-800">
                ĐIỂM SỐ
              </th>
              <th className="py-4 px-6 font-label-caps text-slate-400 border-b border-slate-800">
                TRẠNG THÁI
              </th>
              <th className="py-4 px-6 font-label-caps text-slate-400 border-b border-slate-800 text-right">
                THAO TÁC
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <tr className="hover:bg-white/5 transition-colors group">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-slate-700">
                    <img
                      alt="Student 1"
                      data-alt="Profile photo of a teenage Vietnamese girl student with glasses in school uniform, neutral background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0in-pSAYQiGCRZNH8OER6nYwqmNK7eR5HJo5_ZlTcYHzr1PW47sfoE8E1mGioGNxoR0uYoRVUbhWWqKWGzyUB1hJoXxFqHs509H8KWkqo9Fee_d8b1zu55FGGkC9zbqhLWcqsGtJhiyMq1GaLghOqWTI06RqEzM4BW1EmtkLKfKQjnDO3QTjuv5Dy2iLOJRwhkmOotjKCF0w6BeivBdQiuhpU5qxm5dvZoCUzbRZj5p5YyNN6YATR5l5qKQYz_xg8ys9ASidgYCIR"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Nguyễn Hoàng Nam</p>
                    <p className="text-xs text-slate-500">
                      n.hoangnam@school.edu
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-400 font-mono text-sm">
                #CHM-2024-041
              </td>
              <td className="py-4 px-6">
                <span className="text-lg font-bold text-tertiary">9.5</span>
              </td>
              <td className="py-4 px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-tertiary glow-dot" />
                  Đã nộp
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-[#c0c1ff] hover:text-white transition-colors flex items-center gap-1 ml-auto font-medium text-sm">
                  Chi tiết{" "}
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors group">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-slate-700">
                    <img
                      alt="Student 2"
                      data-alt="Profile photo of a young male student in a white collared shirt, clean studio background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaS6kyFz91sJUd0Y15NafkZEM1ShqXhtMAB6pzTiB3NnDh36Pz1Z9Xfl-g0QeE-ViHH_9ezWa6vv6Ui3ipxcDVLXH8dAngED14m4lHwdbbZyOYECQkWAUS0KFFausYBwW0-iIbZzY32-fKKqj6HYfdEppzxSvqQW3eXGri1HpmjBQAWH6jK0d3J2Y2uTK12rzGYFD8IVX-hZxuHRT_ZBdmS7gBfDrOqUW7psaL2JEl5ntJtIpjs6_AePH-GfXocww9UAAnOPnpobH7"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Lê Thu Anh</p>
                    <p className="text-xs text-slate-500">
                      le.thuanh@school.edu
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-400 font-mono text-sm">
                #CHM-2024-042
              </td>
              <td className="py-4 px-6">
                <span className="text-lg font-bold text-primary">8.2</span>
              </td>
              <td className="py-4 px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-tertiary glow-dot" />
                  Đã nộp
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-[#c0c1ff] hover:text-white transition-colors flex items-center gap-1 ml-auto font-medium text-sm">
                  Chi tiết{" "}
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors group">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-slate-700">
                    <img
                      alt="Student 3"
                      data-alt="Modern geometric avatar icon with vibrant lavender and blue colors"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIGtdHxkfm48FKxF3jSCqYil-82EAOtPOLrK7C5-Lan-qNgrtVh--fmmJATggXq31A1uT2Lhvpj89oE1nkVGZd-XGEbboXvBPpsjiT4ga7TnbsJnky5K1UU-b2vBPievi_iq87gf7hV7leAHWOncgHl3IuXG62l39z6ww00coImblIcW-WZ1wsxQ5bLnui9cA-vCHOv0L-Z-lE2mo_4XQnnIRCm-0HbfPPQLC3fRN20FByqiYTprL9bKBjGHzWei6Gf-6qB8O1D8IY"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Trần Minh Quân</p>
                    <p className="text-xs text-slate-500">
                      tran.mquan@school.edu
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-400 font-mono text-sm">
                #CHM-2024-043
              </td>
              <td className="py-4 px-6">
                <span className="text-lg font-bold text-slate-600">--</span>
              </td>
              <td className="py-4 px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary glow-dot" />
                  Đang làm
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-slate-500 cursor-not-allowed flex items-center gap-1 ml-auto font-medium text-sm">
                  Chi tiết{" "}
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors group">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-slate-700">
                    <img
                      alt="Student 4"
                      data-alt="Profile photo of a young smiling woman with black hair, bright classroom setting background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgGsLdtHfff3erfuqZx3dEbeY122CWZ_eVvFTH3cxNHL9u-wxvc0r1H7jaa2z4Fy1WOZZ3j35CLHpsNNNJZh9SK-gU5d15J_2QZ5r8YVOWHSlE_tgYW5k1cHh2NR4t7ScRvmMVSJjhz7oHPl0LiJExkgR93Qmyjh3F2enGUHaLJjkM2-d4DPsUqHjlkJVvIu6-9TZKUTBLcL1G_WABJAkHprog_FQ1jLB5g-acGjkBtwhFF_BC9Qvud854C_6UQsnfyCYhm4PoAtmn"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Phạm Gia Huy</p>
                    <p className="text-xs text-slate-500">
                      pham.ghuy@school.edu
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-slate-400 font-mono text-sm">
                #CHM-2024-044
              </td>
              <td className="py-4 px-6">
                <span className="text-lg font-bold text-error">4.5</span>
              </td>
              <td className="py-4 px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-tertiary glow-dot" />
                  Đã nộp
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-[#c0c1ff] hover:text-white transition-colors flex items-center gap-1 ml-auto font-medium text-sm">
                  Chi tiết{" "}
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-4 bg-surface-container-lowest flex justify-between items-center text-xs text-slate-500">
          <p>Hiển thị 4 trong tổng số 150 học sinh</p>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-white/5 rounded">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="px-2 py-1 bg-primary/10 text-primary rounded">
              1
            </button>
            <button className="px-2 py-1 hover:bg-white/5 rounded">2</button>
            <button className="px-2 py-1 hover:bg-white/5 rounded">3</button>
            <button className="p-1 hover:bg-white/5 rounded">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* Mobile Navigation Bar */}
  <footer className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-[#131b2e]/90 backdrop-blur-xl border-t border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
    <div className="flex flex-col items-center justify-center text-[#c0c1ff] bg-[#c0c1ff]/10 rounded-xl px-4 py-1">
      <span className="material-symbols-outlined">analytics</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-semibold uppercase tracking-widest">
        Results
      </span>
    </div>
    <div className="flex flex-col items-center justify-center text-slate-500 hover:text-[#c0c1ff]/80 transition-colors">
      <span className="material-symbols-outlined">group</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-semibold uppercase tracking-widest">
        Students
      </span>
    </div>
    <div className="flex flex-col items-center justify-center text-slate-500 hover:text-[#c0c1ff]/80 transition-colors">
      <span className="material-symbols-outlined">psychology</span>
      <span className="font-['Space_Grotesk'] text-[10px] font-semibold uppercase tracking-widest">
        Insights
      </span>
    </div>
  </footer>
</>
}
            </div>
    )
}
