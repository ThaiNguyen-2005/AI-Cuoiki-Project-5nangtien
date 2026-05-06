import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Chart from "react-apexcharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const STAT_CARDS = [
    { key: "total_users", label: "Tổng người dùng", icon: "group", color: "text-blue-400" },
    { key: "total_teachers", label: "Giáo viên", icon: "school", color: "text-indigo-400" },
    { key: "total_students", label: "Học sinh", icon: "person", color: "text-teal-400" },
    { key: "total_quizzes", label: "Quiz đã tạo", icon: "description", color: "text-yellow-400" },
    { key: "total_attempts", label: "Lượt làm bài", icon: "check_circle", color: "text-green-400" },
    { key: "avg_score", label: "Điểm trung bình", icon: "analytics", color: "text-pink-400" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/admin/stats");
      setStats(res.data);
    } catch (e) {
      console.error("Lỗi tải dashboard:", e);
    } finally {
      setLoading(false);
    }
  };

  const d = stats || {};

  // Cấu hình ApexCharts
  const chartOptions = {
    chart: {
      id: "activity-chart",
      toolbar: { show: false },
      background: "transparent",
      foreColor: "#94a3b8",
      fontFamily: "inherit",
    },
    colors: ["#3b82f6", "#10b981"],
    stroke: { curve: "smooth", width: 3 },
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
      categories: d.activity_trends?.labels || ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
    tooltip: {
      theme: "dark",
      x: { show: true },
      y: { title: { formatter: (s) => s + ":" } },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontWeight: 700,
    },
    dataLabels: { enabled: false },
  };

  const chartSeries = [
    {
      name: "Lượt làm bài",
      data: d.activity_trends?.attempts || [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Quiz mới",
      data: d.activity_trends?.quizzes || [0, 0, 0, 0, 0, 0, 0],
    },
  ];

  return (
    <div className="py-2 min-h-full text-white">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">Dashboard <span className="text-blue-500">Hệ Thống</span></h1>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Báo cáo hoạt động và phân tích xu hướng</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {STAT_CARDS.map((s) => (
          <div key={s.key} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-xl hover:bg-white/10 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-colors" />
            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{s.label}</span>
            </div>
            <p className={`text-3xl sm:text-4xl font-black relative z-10 ${s.color}`}>
              {loading ? "..." : (
                s.key === "avg_score"
                  ? (typeof d[s.key] === "number" ? d[s.key].toFixed(1) : (d[s.key] ?? "—"))
                  : (d[s.key] ?? "—")
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Large Activity Chart */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl sm:rounded-4xl border border-white/5 p-6 sm:p-8 shadow-2xl relative overflow-hidden group mb-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/5 blur-[120px] group-hover:bg-blue-600/10 transition-all duration-1000"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">insights</span>
              Xu hướng hoạt động
            </h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Dữ liệu thống kê trong 7 ngày gần nhất</p>
          </div>

          <div className="flex gap-2">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[10px] font-black uppercase text-slate-400">Hoạt động cao</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full min-h-[350px]">
          {loading ? (
            <div className="h-[350px] flex items-center justify-center text-slate-500 italic">Đang tải biểu đồ...</div>
          ) : (
            <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
          )}
        </div>
      </div>
    </div>
  );
}