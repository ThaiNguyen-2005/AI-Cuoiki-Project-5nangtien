import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import TeacherNavbar from "../components/TeacherNavbar";
export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  // 1. Chức năng Đăng xuất
  const handleLogout = () => {
    // Xóa sạch thông tin thẻ nhớ
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    // Đẩy về trang đăng nhập
    navigate("/login");
  };

  // 2. Tự động gọi API lấy dữ liệu (Sẵn sàng cho Backend)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // const response = await axiosClient.get('/teacher/stats');
        // setStats(response.data);
        console.log("Sẵn sàng gọi API lấy dữ liệu Dashboard!");
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="teacher-dashboard">
      <meta charSet="utf-8" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .material-symbols-outlined {
                font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            }
            .kinetic-gradient {
                background: linear-gradient(135deg, #c0c1ff 0%, #4fdbc8 100%);
            }
            .glass-card {
                background: rgba(19, 27, 46, 0.7);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(192, 193, 255, 0.1);
            }
            body {
                background-color: #0b1326;
                color: #dbe2fd;
                -webkit-tap-highlight-color: transparent;
                min-height: max(884px, 100dvh);
            }
          `
        }}
      />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-slate-900/70 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-indigo-900/20">
        <div className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-indigo-400"
            data-icon="science"
          >
            science
          </span>
          <h1 className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-500 font-space-grotesk">
            Kinetic Chemistry
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Nút Đăng xuất */}
          <button 
            onClick={handleLogout} 
            className="text-red-400 hover:text-red-300 transition-colors flex items-center"
            title="Đăng xuất"
          >
            <span className="material-symbols-outlined text-2xl">logout</span>
          </button>
          
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 overflow-hidden active:scale-95 duration-200">
            <img
              alt="Teacher Profile"
              className="w-full h-full object-cover"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Minh" // Avatar tạm thời
            />
          </div>
        </div>
      </header>

      <main className="pt-20 px-4 space-y-6 pb-24">
        {/* Welcome Section */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline-lg text-headline-lg text-primary text-xl font-bold">
              Xin chào, thầy Minh
            </h2>
            <span
              className="material-symbols-outlined text-tertiary animate-pulse text-yellow-400"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              notifications_active
            </span>
          </div>
          <p className="text-on-surface-variant font-body-md text-gray-400">
            Hôm nay có 12 bài làm mới cần chấm.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden">
            <span className="material-symbols-outlined absolute -right-2 -top-2 text-indigo-400/10 text-6xl">
              school
            </span>
            <span className="text-xs font-bold text-gray-400 tracking-wider">
              LỚP ĐANG DẠY
            </span>
            <div className="mt-auto">
              <span className="text-4xl font-display font-bold text-indigo-300">
                08
              </span>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden">
            <span className="material-symbols-outlined absolute -right-2 -top-2 text-teal-400/10 text-6xl">
              quiz
            </span>
            <span className="text-xs font-bold text-gray-400 tracking-wider">
              QUIZ ĐÃ TẠO
            </span>
            <div className="mt-auto">
              <span className="text-4xl font-display font-bold text-teal-300">
                42
              </span>
            </div>
          </div>
        </section>

        {/* Chart Section: Performance */}
        <section className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-indigo-100">
                Điểm trung bình
              </h3>
              <p className="text-xs text-gray-400 tracking-wider mt-1">
                HỌC KỲ II - 2024
              </p>
            </div>
            <span className="material-symbols-outlined text-indigo-400">
              trending_up
            </span>
          </div>
          <div className="flex items-end justify-between h-32 px-2 gap-3">
            {[
              { height: "75%", label: "10A1", active: false },
              { height: "90%", label: "12B4", active: true },
              { height: "60%", label: "11C2", active: false },
              { height: "82%", label: "10A5", active: false },
              { height: "45%", label: "12D1", active: false },
            ].map((bar, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-white/5 rounded-t-lg relative"
                  style={{ height: bar.height }}
                >
                  <div className={`absolute inset-0 kinetic-gradient rounded-t-lg ${bar.active ? 'opacity-100' : 'opacity-40'}`} />
                </div>
                <span className={`text-[10px] mt-2 ${bar.active ? 'text-indigo-300 font-bold' : 'text-gray-400 font-medium'}`}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications: Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-indigo-100">
              Thông báo mới
            </h3>
            <button className="text-indigo-400 text-sm font-medium">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border-l-4 border-indigo-500">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-indigo-400 text-xl">
                  assignment_turned_in
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-sm">
                  Nguyễn Văn An (12B4) đã nộp bài
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  Quiz: Phản ứng Oxi hóa - Khử • 2 phút trước
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border-l-4 border-teal-500">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-teal-400 text-xl">
                  auto_awesome
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-sm">
                  Hệ thống đã chấm xong 42 bài
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  Quiz: Este - Lipit • 1 giờ trước
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ongoing Exams */}
        <section className="pb-8">
          <h3 className="text-lg font-bold text-indigo-100 mb-4">
            Kiểm tra đang diễn ra
          </h3>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4" style={{scrollbarWidth: 'none'}}>
            <div className="min-w-[280px] glass-card p-5 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-bold uppercase tracking-wider">
                  ĐANG DIỄN RA
                </div>
                <span className="text-gray-400 text-xs">45/48 HS</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">
                  Kim loại Kiềm & Kiềm thổ
                </h4>
                <p className="text-gray-400 text-xs mt-1">
                  Lớp 12B4 • Kết thúc trong 15p
                </p>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="h-full kinetic-gradient w-[92%]" />
              </div>
              <button className="w-full py-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-sm font-bold active:scale-95 transition-transform hover:bg-indigo-500/30">
                Theo dõi LIVE
              </button>
            </div>
            
            <div className="min-w-[280px] glass-card p-5 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded text-[10px] font-bold uppercase tracking-wider">
                  CHỜ BẮT ĐẦU
                </div>
                <span className="text-gray-400 text-xs">0/40 HS</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Cấu tạo nguyên tử</h4>
                <p className="text-gray-400 text-xs mt-1">
                  Lớp 10A1 • Bắt đầu lúc 14:00
                </p>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gray-500 w-0" />
              </div>
              <button className="w-full py-2 bg-white/5 text-gray-300 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
                Cài đặt
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FAB for quick action */}
      <button className="fixed bottom-24 right-6 w-14 h-14 kinetic-gradient rounded-2xl shadow-lg shadow-indigo-500/40 flex items-center justify-center text-slate-900 z-50 active:scale-90 transition-transform hover:opacity-90">
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>

      {/* BottomNavBar using React Router Link */}
<TeacherNavbar />        <Link
          to="/teacher/dashboard"
          className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-indigo-300"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>dashboard</span>
          <span className="font-space-grotesk text-[10px] font-medium mt-1">Tổng quan</span>
        </Link>
        <Link
          to="/teacher/quiz"
          className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200"
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-space-grotesk text-[10px] font-medium mt-1">Tạo Quiz</span>
        </Link>
        <Link
          to="/teacher/question"
          className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200"
        >
          <span className="material-symbols-outlined">database</span>
          <span className="font-space-grotesk text-[10px] font-medium mt-1">Ngân hàng</span>
        </Link>
        <Link
          to="/teacher/result"
          className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200"
        >
          <span className="material-symbols-outlined">assignment_turned_in</span>
          <span className="font-space-grotesk text-[10px] font-medium mt-1">Kết quả</span>
        </Link>
        <Link
          to="/teacher/analytics"
          className="flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-transform active:scale-90 text-slate-500 hover:text-indigo-200"
        >
          <span className="material-symbols-outlined">insights</span>
          <span className="font-space-grotesk text-[10px] font-medium mt-1">Phân tích</span>
        </Link>
      <TeacherNavbar />
    </div>
  );
}