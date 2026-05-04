import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import StudentNavbar from "../components/StudentNavbar";

const StudentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosClient.get("/student/history");
        setHistory(response.data);
      } catch (error) {
        console.error("Lỗi lấy lịch sử:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card { background: rgba(19, 27, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }
        body { background-color: #0b1326; color: #dbe2fd; }
      `}} />

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-['Space_Grotesk']">Lịch sử bài thi</h1>
          <p className="text-gray-400">Xem lại hành trình chinh phục Hóa học của bạn</p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-10 text-center text-indigo-300">Đang tải lịch sử...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-indigo-200 uppercase text-xs tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4">Tên bài thi</th>
                  <th className="px-6 py-4 text-center">Kết quả</th>
                  <th className="px-6 py-4 text-center">Điểm số</th>
                  <th className="px-6 py-4">Ngày làm bài</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{item.exam_title}</td>
                    <td className="px-6 py-4 text-center text-gray-300">
                      {item.correct_count}/{item.total_questions} câu
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold px-3 py-1 rounded-full text-sm ${item.score >= 8 ? 'bg-teal-500/20 text-teal-400' : 'bg-indigo-500/20 text-indigo-300'}`}>
                        {item.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-400 hover:text-indigo-300 text-sm font-bold flex items-center gap-1">
                        Chi tiết <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <StudentNavbar />
    </>
  );
};

export default StudentHistory;