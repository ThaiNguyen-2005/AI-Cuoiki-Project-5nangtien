import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const KNOWLEDGE_TYPES = [
    { id: 'Khái niệm', label: 'Khái niệm' },
    { id: 'Lý thuyết', label: 'Lý thuyết' },
    { id: 'Định lý', label: 'Định lý' },
    { id: 'Tính chất', label: 'Tính chất' },
    { id: 'Dạng bài tập', label: 'Dạng bài tập' }
];

const GRADES = [
    { id: '10', label: 'Lớp 10' },
    { id: '11', label: 'Lớp 11' },
    { id: '12', label: 'Lớp 12' }
];

const AutoQuiz = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);
    
    const [formData, setFormData] = useState({
        title: '',
        grade: '10',
        subject_id: '',
        chapter_id: '',
        lesson_id: '',
        knowledge_type: '',
        difficulty: 'easy',
        count: 10,
        time_limit: 30,
        passing_score: 70
    });

    const [loading, setLoading] = useState(false);
    const [fetchingMetadata, setFetchingMetadata] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchSubjects();
    }, []);

    // Re-fetch chapters when grade changes
    useEffect(() => {
        if (formData.subject_id) {
            fetchChapters(formData.subject_id, formData.grade);
        }
    }, [formData.grade]);

    const fetchSubjects = async () => {
        try {
            const res = await axiosClient.get('/teacher/subjects');
            setSubjects(res.data);
            if (res.data.length > 0) {
                const subId = res.data[0].id;
                setFormData(prev => ({ ...prev, subject_id: subId }));
                fetchChapters(subId, formData.grade);
            }
        } catch (err) { console.error(err); }
    };

    const fetchChapters = async (subId, grade) => {
        setFetchingMetadata(true);
        try {
            const res = await axiosClient.get(`/teacher/chapters/${subId}?grade=${grade}`);
            setChapters(res.data);
            setLessons([]);
            setFormData(prev => ({ ...prev, chapter_id: '', lesson_id: '' }));
        } catch (err) { console.error(err); }
        finally { setFetchingMetadata(false); }
    };

    const fetchLessons = async (chapId) => {
        if (!chapId) {
            setLessons([]);
            setFormData(prev => ({ ...prev, lesson_id: '' }));
            return;
        }
        setFetchingMetadata(true);
        try {
            const res = await axiosClient.get(`/teacher/lessons/${chapId}`);
            setLessons(res.data);
            setFormData(prev => ({ ...prev, lesson_id: '' }));
        } catch (err) { console.error(err); }
        finally { setFetchingMetadata(false); }
    };

    const handleTypeSelect = (typeId) => {
        setFormData(prev => ({ ...prev, knowledge_type: typeId }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        
        // Clean data: convert empty strings to null for backend validation
        const payload = {
            ...formData,
            chapter_id: formData.chapter_id || null,
            lesson_id: formData.lesson_id || null
        };

        try {
            const res = await axiosClient.post('/teacher/quizzes/generate', payload);
            setMessage({ type: 'success', text: res.data.message });
            setTimeout(() => navigate('/teacher/quiz'), 2000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Có lỗi xảy ra khi tạo đề' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-2 min-h-full pb-32">
            <div className="mb-10">
                <h1 className="text-5xl font-black text-white tracking-tighter">Tạo Đề <span className="text-teal-500">Thông Minh</span></h1>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Tự động hóa quy trình soạn thảo đề thi từ ngân hàng theo Khối & Bài học</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Left: Scope Selection */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tiêu đề bài thi *</label>
                            <input 
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white text-xl font-bold focus:outline-none focus:border-teal-500/50 transition-all"
                                placeholder="VD: Kiểm tra Chương 1 - Nguyên tử"
                                required
                            />
                        </div>

                        {/* Grade Selector */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chọn Khối Lớp</label>
                            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                                {GRADES.map(g => (
                                    <button 
                                        key={g.id} type="button"
                                        onClick={() => setFormData({...formData, grade: g.id})}
                                        className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${formData.grade === g.id ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "text-slate-500 hover:text-white"}`}
                                    >
                                        {g.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Môn học</label>
                                <select 
                                    value={formData.subject_id}
                                    onChange={e => {
                                        setFormData({...formData, subject_id: e.target.value});
                                        fetchChapters(e.target.value, formData.grade);
                                    }}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50 appearance-none"
                                >
                                    <option value="" className="bg-[#0b1326]">Chọn môn...</option>
                                    {subjects.map(s => <option key={s.id} value={s.id} className="bg-[#0b1326]">{s.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chương ({formData.grade})</label>
                                <select 
                                    value={formData.chapter_id}
                                    disabled={!formData.subject_id || fetchingMetadata}
                                    onChange={e => {
                                        setFormData({...formData, chapter_id: e.target.value});
                                        fetchLessons(e.target.value);
                                    }}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50 appearance-none disabled:opacity-30"
                                >
                                    <option value="" className="bg-[#0b1326]">Tất cả chương</option>
                                    {chapters.map(c => <option key={c.id} value={c.id} className="bg-[#0b1326]">{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Bài học</label>
                                <select 
                                    value={formData.lesson_id}
                                    disabled={!formData.chapter_id || fetchingMetadata}
                                    onChange={e => setFormData({...formData, lesson_id: e.target.value})}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50 appearance-none disabled:opacity-30"
                                >
                                    <option value="" className="bg-[#0b1326]">Tất cả bài</option>
                                    {lessons.map(l => <option key={l.id} value={l.id} className="bg-[#0b1326]">{l.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-4 block">Phân loại kiến thức</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {KNOWLEDGE_TYPES.map(type => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => handleTypeSelect(type.id)}
                                    className={`py-3 rounded-2xl border text-xs font-bold transition-all ${formData.knowledge_type === type.id ? "bg-teal-500/10 border-teal-500/50 text-teal-400 shadow-lg shadow-teal-500/5" : "bg-white/2 border-white/5 text-slate-500 hover:border-white/10"}`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Params */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Số lượng câu hỏi</label>
                                <span className="text-2xl font-black text-teal-500">{formData.count}</span>
                            </div>
                            <input 
                                type="range" min="5" max="50" step="5"
                                value={formData.count}
                                onChange={e => setFormData({...formData, count: parseInt(e.target.value)})}
                                className="w-full accent-teal-500 h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Độ khó mục tiêu</label>
                            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                                {[
                                    {id: 'easy', label: 'Dễ'},
                                    {id: 'medium', label: 'Vừa'},
                                    {id: 'hard', label: 'Khó'},
                                    {id: 'mixed', label: 'Hỗn hợp'}
                                ].map(lv => (
                                    <button 
                                        key={lv.id} type="button"
                                        onClick={() => setFormData({...formData, difficulty: lv.id})}
                                        className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${formData.difficulty === lv.id ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "text-slate-500 hover:text-white"}`}
                                    >
                                        {lv.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Thời gian (phút)</label>
                                <input 
                                    type="number"
                                    value={formData.time_limit}
                                    onChange={e => setFormData({...formData, time_limit: e.target.value})}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-teal-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Điểm đạt (%)</label>
                                <input 
                                    type="number"
                                    value={formData.passing_score}
                                    onChange={e => setFormData({...formData, passing_score: e.target.value})}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-teal-500/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-2xl font-bold text-sm text-center animate-in zoom-in-95 duration-300 ${message.type === 'error' ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-teal-500/10 text-teal-400 border border-teal-500/20"}`}>
                            {message.text}
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={loading || fetchingMetadata}
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white py-5 rounded-4xl font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? 'Đang nhặt câu hỏi...' : 'Tạo đề ngay'}
                        <span className="material-symbols-outlined">bolt</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AutoQuiz;
