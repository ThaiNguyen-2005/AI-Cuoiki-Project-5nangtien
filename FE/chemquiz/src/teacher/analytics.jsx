import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import Chart from 'react-apexcharts';

export default function TeacherAnalytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axiosClient.get('/teacher/analytics')
            .then(res => setData(res.data))
            .catch(() => setError('Không tải được dữ liệu phân tích'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500 italic">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
                <span>Đang xử lý thuật toán phân tích...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-[60vh] flex items-center justify-center text-red-400 font-bold bg-red-500/5 rounded-[3rem] border border-red-500/10">
            {error}
        </div>
    );

    const { total_quizzes = 0, total_attempts = 0, avg_score = 0, quiz_stats = [] } = data || {};

    // Chart Data
    const chartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            background: 'transparent',
            foreColor: '#64748b'
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '40%',
                distributed: true,
            }
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: quiz_stats.slice(0, 10).map(q => q.title.length > 15 ? q.title.substring(0, 15) + '...' : q.title),
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.05)',
            strokeDashArray: 4,
        },
        colors: ['#0d9488', '#059669', '#2dd4bf', '#34d399', '#10b981'],
        legend: { show: false },
        tooltip: { theme: 'dark' }
    };

    const chartSeries = [{
        name: 'Lượt tham gia',
        data: quiz_stats.slice(0, 10).map(q => q.attempts_count)
    }];

    return (
        <div className="py-2 min-h-full pb-32">
            <div className="mb-10">
                <h1 className="text-5xl font-black text-white tracking-tighter">Báo Cáo <span className="text-teal-500">Phân Tích</span></h1>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Đo lường mức độ tương tác và chất lượng học tập của học sinh</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                    { label: "Tổng số bài thi", value: total_quizzes, icon: "quiz", color: "text-blue-400", bg: "bg-blue-500/5" },
                    { label: "Tổng lượt làm bài", value: total_attempts, icon: "groups", color: "text-teal-400", bg: "bg-teal-500/5" },
                    { label: "Điểm trung bình", value: `${avg_score}%`, icon: "insights", color: "text-emerald-400", bg: "bg-emerald-500/5" },
                ].map(s => (
                    <div key={s.label} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${s.bg} blur-3xl group-hover:scale-150 transition-transform duration-700`} />
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                                <span className="material-symbols-outlined text-xl">{s.icon}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{s.label}</span>
                        </div>
                        <p className={`text-4xl font-black relative z-10 ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-8">
                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl h-full">
                        <h3 className="text-xl font-black text-white flex items-center gap-2 mb-8">
                            <span className="material-symbols-outlined text-teal-500">bar_chart</span>
                            Xu hướng tương tác
                        </h3>
                        <div className="w-full h-[350px]">
                            <Chart options={chartOptions} series={chartSeries} type="bar" height="100%" />
                        </div>
                    </div>
                </div>

                {/* Top Quizzes Section */}
                <div className="lg:col-span-4">
                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl h-full">
                        <h3 className="text-xl font-black text-white flex items-center gap-2 mb-8">
                            <span className="material-symbols-outlined text-teal-500">star</span>
                            Top bài thi
                        </h3>
                        <div className="space-y-4">
                            {quiz_stats.length === 0 ? (
                                <p className="text-slate-500 text-sm italic text-center py-10">Chưa có dữ liệu thống kê.</p>
                            ) : quiz_stats.slice(0, 5).map((q, idx) => (
                                <div key={q.id} className="flex items-center gap-4 p-4 bg-white/2 rounded-2xl border border-white/5 group hover:bg-white/5 transition-all">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${idx === 0 ? "bg-teal-500 text-white" : "bg-white/5 text-slate-500"}`}>
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-bold text-sm truncate group-hover:text-teal-400 transition-colors">{q.title}</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">{q.attempts_count} lượt làm bài</p>
                                    </div>
                                    <span className="text-teal-400 font-black">{q.attempts_count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5">
                    <h3 className="text-xl font-black text-white">Bảng thống kê chi tiết</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="text-left px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Tên bài thi</th>
                                <th className="text-center px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Số câu hỏi</th>
                                <th className="text-center px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Lượt làm bài</th>
                                <th className="text-right px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {quiz_stats.map((q) => (
                                <tr key={q.id} className="hover:bg-white/2 transition-colors">
                                    <td className="px-8 py-5">
                                        <p className="text-white font-bold">{q.title}</p>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="text-slate-400 font-black">{q.questions_count}</span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="text-teal-400 font-black">{q.attempts_count}</span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${q.status === 'published' ? 'bg-teal-500/10 text-teal-400' : 'bg-slate-500/10 text-slate-500'}`}>
                                            {q.status === 'published' ? 'Hoạt động' : 'Bản nháp'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}