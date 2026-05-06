import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import Chart from "react-apexcharts";
import ReactMarkdown from "react-markdown";

const Typewriter = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
};

export default function StudentAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    axiosClient.get("/student/analytics")
      .then(res => setData(res.data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const fetchAI = async () => {
    setAiLoading(true);
    try {
      const res = await axiosClient.get("/student/ai-evaluate");
      setAiResult(res.data.evaluation);
    } catch (err) {
      setAiResult("Xin lỗi, Trợ lý AI đang bận một chút. Bạn hãy thử lại sau nhé!");
    } finally {
      setAiLoading(false);
    }
  };

  const getGrade = (score) => {
    if (score >= 85) return { label: "Xuất sắc", color: "text-teal-400", bg: "bg-teal-500/10", icon: "military_tech" };
    if (score >= 70) return { label: "Giỏi", color: "text-blue-400", bg: "bg-blue-500/10", icon: "workspace_premium" };
    if (score >= 50) return { label: "Trung bình", color: "text-yellow-400", bg: "bg-yellow-500/10", icon: "grade" };
    return { label: "Cần cố gắng", color: "text-red-400", bg: "bg-red-500/10", icon: "trending_up" };
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <span>Đang tổng hợp dữ liệu học tập...</span>
      </div>
    </div>
  );

  if (!data || data.total_attempts === 0) return (
    <div className="py-2 min-h-full">
      <div className="bg-white/5 rounded-[3rem] border border-white/5 p-20 text-center shadow-2xl relative overflow-hidden group">
        <span className="material-symbols-outlined text-7xl text-slate-700 mb-6 block animate-pulse">analytics</span>
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Chưa có dữ liệu thống kê</h3>
        <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed">Bạn cần hoàn thành ít nhất một bài kiểm tra để hệ thống có thể phân tích kết quả học tập.</p>
      </div>
    </div>
  );

  const grade = getGrade(data.average_score ?? 0);
  const accuracy = data.total_questions > 0
    ? Math.round((data.total_correct / data.total_questions) * 100) : 0;

  // Cấu hình biểu đồ xu hướng
  const chartOptions = {
    chart: {
      id: "student-trend",
      toolbar: { show: false },
      background: "transparent",
      foreColor: "#94a3b8",
      fontFamily: "inherit",
    },
    colors: ["#3b82f6"],
    stroke: { curve: "smooth", width: 4 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100],
      },
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.05)",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: data.recent_scores?.slice().reverse().map(r => r.date) || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      max: 100,
      labels: {
        formatter: (val) => val + "%",
      },
    },
    tooltip: { theme: "dark" },
    dataLabels: { enabled: false },
  };

  const chartSeries = [{
    name: "Điểm số",
    data: data.recent_scores?.slice().reverse().map(r => r.score) || [],
  }];


  return (
    <div className="py-2 min-h-full pb-20">
      <div className="mb-10">
        <h1 className="text-5xl font-black text-white tracking-tighter">Phân Tích <span className="text-blue-500">Năng Lực</span></h1>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Đánh giá chi tiết hiệu suất học tập của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Summary & Grade */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`rounded-[2.5rem] border p-8 shadow-2xl relative overflow-hidden bg-white/5 ${grade.bg} border-white/5`}>
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${grade.bg} ${grade.color} border border-white/5`}>
                <span className="material-symbols-outlined text-3xl">{grade.icon}</span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Xếp loại hiện tại</p>
                <h3 className={`text-2xl font-black ${grade.color}`}>{grade.label}</h3>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-slate-500">Điểm trung bình</span>
                <span className="text-white">{data.average_score ?? 0}%</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className={`h-full transition-all duration-1000 ${grade.color === 'text-teal-400' ? 'bg-teal-500' : 'bg-blue-600'}`}
                  style={{ width: `${data.average_score ?? 0}%` }} />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6 leading-relaxed italic">
              Bạn đã trả lời đúng <strong className="text-white">{data.total_correct}</strong> câu hỏi trong tổng số <strong className="text-white">{data.total_questions}</strong> câu đã làm.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Độ chính xác", value: `${accuracy}%`, icon: "target", color: "text-purple-400" },
              { label: "Bài tốt nhất", value: `${data.best_score ?? 0}%`, icon: "trending_up", color: "text-teal-400" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/5 rounded-3xl p-6 shadow-xl group">
                <div className={`w-8 h-8 rounded-lg mb-4 flex items-center justify-center bg-white/5 ${s.color}`}>
                  <span className="material-symbols-outlined text-xl">{s.icon === 'target' ? 'ads_click' : 'trending_up'}</span>
                </div>
                <p className="text-2xl font-black text-white mb-1 tracking-tight">{s.value}</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI & Chart & Quiz List */}
        <div className="lg:col-span-8 space-y-8">
          {/* AI Assistant Section */}
          <div className="bg-linear-to-br from-indigo-600/20 to-blue-600/10 backdrop-blur-xl rounded-[2.5rem] border border-blue-500/20 p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all duration-1000" />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span className="material-symbols-outlined text-white text-3xl animate-pulse">smart_toy</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Trợ lý Học tập AI</h3>
                    <p className="text-xs text-blue-300 font-bold uppercase tracking-widest mt-1">Phân tích chuyên sâu bởi Gemini AI</p>
                  </div>
                </div>
                <button
                  onClick={fetchAI}
                  disabled={aiLoading}
                  className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {aiLoading ? "Đang tư duy..." : "Phân tích ngay"}
                  {!aiLoading && <span className="material-symbols-outlined text-sm">bolt</span>}
                </button>
              </div>

              {aiResult ? (
                <div className="bg-[#0b1326]/50 rounded-4xl p-8 border border-white/5 animate-in fade-in zoom-in duration-500">
                  <Typewriter text={aiResult} />
                </div>
              ) : (
                <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-4xl">
                  <p className="text-slate-500 text-sm italic">Hãy nhấn nút "Phân tích ngay" để AI giúp bạn lập kế hoạch học tập cá nhân hóa!</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">insights</span>
              Xu hướng điểm số
            </h3>
            <div className="h-[300px] w-full">
              <Chart options={chartOptions} series={chartSeries} type="area" height={300} />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}