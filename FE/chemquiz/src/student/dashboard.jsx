import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import StudentNavbar from "../components/StudentNavbar";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  // 1. Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  // 2. Tự động gọi API khi vào trang
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        console.log("Sẵn sàng gọi API Học sinh!");
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchStudentData();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .glass-card { background: rgba(19, 27, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #585990 100%); }
        .glow-accent { box-shadow: 0 0 20px rgba(192, 193, 255, 0.15); }
        body { background-color: #0b1326; color: #dbe2fd; }
      `}} />

      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 z-50 bg-[#2d3449]/70 backdrop-blur-lg border-b border-indigo-500/20 shadow-lg shadow-indigo-500/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center overflow-hidden border border-indigo-500/30">
            <img alt="Student Profile" className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Minh" />
          </div>
          <span className="font-['Space_Grotesk'] font-black uppercase tracking-widest text-indigo-200 text-lg hidden sm:block">
            Kinetic Chemistry
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-indigo-500/10 transition-all duration-300 text-indigo-200 active:scale-95">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button onClick={handleLogout} className="p-2 rounded-full hover:bg-red-500/10 transition-all duration-300 text-red-400 active:scale-95" title="Đăng xuất">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white mb-2">Chào buổi sáng, Minh!</h1>
          <p className="text-gray-400 font-['Inter'] italic opacity-80">Sẵn sàng để chinh phục các liên kết hóa học hôm nay?</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Streak & Daily Goals */}
          <div className="md:col-span-4 space-y-6">
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
              <span className="material-symbols-outlined absolute -top-2 -right-2 text-white/5 text-8xl">local_fire_department</span>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-orange-400" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span>
                  <span className="text-lg font-bold text-white">Chuỗi 12 ngày</span>
                </div>
                <div className="flex gap-1">
                  <div className="h-1.5 flex-1 rounded-full bg-indigo-400" />
                  <div className="h-1.5 flex-1 rounded-full bg-indigo-400" />
                  <div className="h-1.5 flex-1 rounded-full bg-indigo-400" />
                  <div className="h-1.5 flex-1 rounded-full bg-indigo-400/20" />
                  <div className="h-1.5 flex-1 rounded-full bg-indigo-400/20" />
                </div>
                <p className="mt-4 text-sm text-gray-400">Còn 2 ngày nữa để đạt mục tiêu tuần!</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white text-lg">Mục tiêu hằng ngày</h3>
                <span className="text-xs font-bold text-teal-400 bg-teal-400/10 px-2 py-1 rounded">75%</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-teal-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-teal-400" style={{ fontVariationSettings: '"FILL" 1' }}>check</span>
                  </div>
                  <span className="text-sm text-white">Hoàn thành 1 bài Quiz</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-teal-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-teal-400" style={{ fontVariationSettings: '"FILL" 1' }}>check</span>
                  </div>
                  <span className="text-sm text-white">Xem lại Phản ứng Oxy hóa khử</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Progress */}
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 glass-card rounded-2xl p-8 bg-gradient-to-br from-[#1c2438] to-[#0f172a] border-l-4 border-indigo-400 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full tracking-wider">SẮP DIỄN RA</span>
                  <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white mt-4">Chương 4: Hydrocarbon</h2>
                  <p className="text-gray-400 text-sm mt-1">Lớp: Hóa học Hữu cơ nâng cao</p>
                </div>
                <span className="material-symbols-outlined text-indigo-200 text-4xl">science</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                <button className="w-full sm:w-auto bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold font-['Space_Grotesk'] uppercase tracking-wider hover:bg-indigo-400 transition-all active:scale-95 glow-accent">
                  Bắt đầu ôn tập
                </button>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="md:col-span-12">
            <div className="glass-card rounded-2xl p-6 border-t-2 border-teal-500/50 bg-gradient-to-r from-[#1c2438] to-[#0f172a]">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex shrink-0 items-center justify-center">
                  <span className="material-symbols-outlined text-teal-400 text-3xl">psychology</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-teal-400 mb-2">Gợi ý từ AI: Ôn tập Phản ứng Redox</h3>
                  <p className="text-sm text-gray-300">Dựa trên lịch sử làm bài, bạn thường gặp khó khăn trong việc cân bằng số oxi hóa.</p>
                </div>
                <button className="w-full md:w-auto px-6 py-3 border border-teal-400 text-teal-400 rounded-xl font-bold hover:bg-teal-400/10 transition-colors">
                  Xem bài giảng nhanh
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- SIDEBAR/NAVBAR GỌI Ở ĐÂY --- */}
      <StudentNavbar />
    </>
  );
};

export default StudentDashboard;