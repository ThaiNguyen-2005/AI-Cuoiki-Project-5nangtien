import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import StudentNavbar from "../components/StudentNavbar";

const StudentAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axiosClient.get("/student/analytics");
        setStats(response.data);
      } catch (error) {
        console.error("Lỗi lấy thống kê:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-indigo-300">
      <span className="material-symbols-outlined animate-spin mr-2">autorenew</span>
      Đang phân tích dữ liệu...
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card { background: rgba(19, 27, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }
        .gradient-text { background: linear-gradient(135deg, #c0c1ff 0%, #585990 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}} />

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white font-['Space_Grotesk'] mb-2">Phân Tích Năng Lực</h1>
          <p className="text-indigo-300 italic opacity-80">Dữ liệu được cập nhật dựa trên kết quả các bài thi gần nhất</p>
        </div>

        {/* Lưới các chỉ số - Sửa icon 'average' thành 'monitoring' cho chuẩn bài */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon="monitoring" label="Điểm trung bình" value={stats?.average_score || 0} color="text-indigo-400" />
          <StatCard icon="history" label="Bài thi đã làm" value={stats?.total_exams || 0} color="text-teal-400" />
          <StatCard icon="military_tech" label="Điểm cao nhất" value={stats?.highest_score || 0} color="text-orange-400" />
          <StatCard icon="menu_book" label="Chương hoàn thành" value={stats?.completed_chapters || 0} color="text-blue-400" />
        </div>

        {/* Phần đánh giá AI */}
        <div className="glass-card rounded-3xl p-8 border-l-4 border-indigo-500 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl">psychology</span>
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
                <span className="material-symbols-outlined text-indigo-400 text-3xl">analytics</span>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Nhận xét chuyên môn</h2>
            </div>
            <p className="text-gray-300 leading-relaxed italic relative z-10">
                "Dựa trên dữ liệu, bạn đang có phong độ rất tốt ở chương **Hydrocarbon**. Tuy nhiên, các bài thi về **Phản ứng Oxy hóa khử** vẫn còn sai sót ở phần cân bằng. Tèo nên dành thêm 20 phút mỗi ngày để luyện tập thêm phần này nhé!"
            </p>
        </div>
      </main>

      <StudentNavbar />
    </>
  );
};

// Component con đã được fix layout tràn chữ
const StatCard = ({ icon, label, value, color }) => (
  <div className="glass-card rounded-2xl p-6 flex items-center gap-5 transition-transform hover:scale-105 group">
    {/* flex-shrink-0 để cái hộp icon không bị bóp méo khi chữ bên cạnh dài */}
    <div className={`w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10 ${color}`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    
    <div className="flex-1 min-w-0"> {/* min-w-0 để xử lý text-overflow nếu cần */}
      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider leading-none mb-1">{label}</p>
      <p className={`text-2xl font-black truncate ${color}`}>{value}</p>
    </div>
  </div>
);

export default StudentAnalytics;