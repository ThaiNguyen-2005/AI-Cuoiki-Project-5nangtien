import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function TeacherAnalytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axiosClient.get('/teacher/analytics')
            .then(res => setData(res.data))
            .catch(() => setError('Không tải được dữ liệu'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-white">
            Đang tải...
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-red-400">
            {error}
        </div>
    );

    const { total_quizzes = 0, total_attempts = 0, avg_score = 0, quiz_stats = [] } = data || {};

    return (
        <div className="min-h-screen bg-[#0b1326] text-white p-6 pb-24">
            <h1 className="text-2xl font-bold mb-6 text-[#c0c1ff]">Phân tích</h1>

            {/* Tổng quan */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Quiz đã tạo',    value: total_quizzes,  color: 'text-indigo-400' },
                    { label: 'Lượt làm bài',   value: total_attempts, color: 'text-teal-400'   },
                    { label: 'Điểm TB',        value: avg_score,      color: 'text-yellow-400' },
                ].map(({ label, value, color }) => (
                    <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                        <p className={`text-3xl font-black ${color}`}>{value}</p>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
                    </div>
                ))}
            </div>

            {/* Danh sách quiz */}
            <div className="space-y-3">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Chi tiết từng Quiz</h2>
                {quiz_stats.length === 0 ? (
                    <div className="bg-white/5 rounded-2xl p-8 text-center text-gray-500">
                        Chưa có quiz nào. Tạo quiz trước nhé!
                    </div>
                ) : (
                    quiz_stats.map(q => (
                        <div key={q.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-white">{q.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {q.questions_count} câu · {q.attempts_count} lượt làm ·&nbsp;
                                    <span className={q.status === 'published' ? 'text-teal-400' : 'text-gray-500'}>
                                        {q.status === 'published' ? 'Đang mở' : 'Nháp'}
                                    </span>
                                </p>
                            </div>
                            <span className="text-2xl font-black text-indigo-400">{q.attempts_count}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}