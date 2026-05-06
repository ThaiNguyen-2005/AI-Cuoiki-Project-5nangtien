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

  // Phân tích điểm yếu
  const weakestType = [...(data.by_type || [])].sort((a, b) => a.avg_score - b.avg_score)[0];
  const weakestQuizzes = [...(data.by_quiz || [])]
    .filter(q => q.best_score < 50)
    .sort((a, b) => a.best_score - b.best_score)
    .slice(0, 2);

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
                     <div className="bg-[#0b1326]/50 rounded-[2rem] p-8 border border-white/5 animate-in fade-in zoom-in duration-500">
                        <Typewriter text={aiResult} />
                     </div>
                  ) : (
                     <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
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

           {/* Evaluation by Knowledge Type */}
           <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
              <h3 className="text-xl font-black text-white mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-400">psychology</span>
                Đánh giá theo Mảng kiến thức
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {data.by_type?.map(t => (
                    <div key={t.type} className="p-6 bg-white/2 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <h4 className="font-black text-white text-lg">{t.type}</h4>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.attempts} Bài thi đã làm</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${t.avg_score >= 80 ? 'bg-teal-500/10 text-teal-400' : t.avg_score >= 50 ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'}`}>
                             {t.avg_score}%
                          </div>
                       </div>
                       
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mb-2">
                          <p className="text-xs text-slate-400 leading-relaxed italic">
                             <span className="text-blue-400 font-bold mr-1">Nhận xét:</span>
                             {t.avg_score >= 85 ? `Bạn có tư duy cực tốt về ${t.type.toLowerCase()}. Hãy tiếp tục phát huy để trở thành chuyên gia nhé!` :
                              t.avg_score >= 70 ? `Phong độ về ${t.type.toLowerCase()} khá ổn định. Bạn chỉ cần cẩn thận hơn ở những chi tiết nhỏ.` :
                              t.avg_score >= 50 ? `Bạn đã nắm được nền tảng ${t.type.toLowerCase()}, nhưng cần luyện tập thêm các bài nâng cao.` :
                              `Phần ${t.type.toLowerCase()} đang là thử thách với bạn. Đừng lo, hãy dành thêm thời gian ôn tập lý thuyết nhé.`}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
              <h3 className="text-xl font-black text-white mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-400">warning</span>
                Phân tích điểm yếu & Lời khuyên
              </h3>
              <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-8">
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                       <span className="material-symbols-outlined text-red-400">priority_high</span>
                    </div>
                    <div className="space-y-4">
                       <p className="text-white font-bold text-lg">Cần chú ý cải thiện kiến thức!</p>
                       <div className="space-y-3">
                          {weakestType && (
                             <p className="text-sm text-slate-400 leading-relaxed">
                                Dựa trên lịch sử làm bài, bạn đang gặp khó khăn nhất ở mảng <span className="text-red-400 font-black uppercase">"{weakestType.type}"</span> với điểm trung bình chỉ <span className="text-white font-bold">{weakestType.avg_score}%</span>.
                             </p>
                          )}
                          {weakestQuizzes.length > 0 ? (
                             <div className="text-sm text-slate-400 leading-relaxed">
                                Đặc biệt, kết quả ở các nội dung sau chưa được tốt:
                                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300">
                                   {weakestQuizzes.map(q => (
                                      <li key={q.quiz_id} className="font-medium">
                                         {q.quiz_title} <span className="text-red-400">({q.best_score}%)</span>
                                      </li>
                                   ))}
                                </ul>
                                <p className="mt-4 text-blue-400 font-bold flex items-center gap-2">
                                   <span className="material-symbols-outlined text-sm">lightbulb</span>
                                   Lời khuyên: Bạn nên xem lại các chương liên quan đến các bài thi này và làm lại các câu hỏi sai để ghi nhớ tốt hơn.
                                </p>
                             </div>
                          ) : (
                             <p className="text-sm text-teal-400 font-bold italic">
                                Chúc mừng! Bạn chưa có bài thi nào dưới điểm trung bình. Hãy tiếp tục duy trì phong độ nhé!
                             </p>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
              <h3 className="text-xl font-black text-white mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">list_alt</span>
                Chi tiết theo bài thi
              </h3>
              <div className="space-y-4">
                {data.by_quiz?.map(q => (
                  <div key={q.quiz_id} className="p-6 bg-white/2 rounded-3xl border border-white/5 hover:bg-white/5 transition-colors group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                       <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors text-lg truncate flex-1">{q.quiz_title}</h4>
                       <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right">
                             <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Tốt nhất</p>
                             <p className={`font-black ${getGrade(q.best_score).color}`}>{q.best_score}%</p>
                          </div>
                          <div className="w-px h-8 bg-white/5" />
                          <div className="text-right">
                             <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Lượt làm</p>
                             <p className="font-black text-white">{q.attempts}</p>
                          </div>
                       </div>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600" style={{ width: `${q.best_score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}