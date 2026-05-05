import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const KNOWLEDGE_TYPES = [
    { id: 'Khái niệm', label: 'Khái niệm' },
    { id: 'Định lý', label: 'Định lý' },
    { id: 'Tính chất', label: 'Tính chất' },
    { id: 'Dạng bài tập', label: 'Dạng bài tập' }
];

const GRADES = [
    { id: '10', label: 'Khối 10' },
    { id: '11', label: 'Khối 11' },
    { id: '12', label: 'Khối 12' }
];

const CreateQuestion = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);
    
    const [formData, setFormData] = useState({
        content: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'A',
        level: 'easy',
        knowledge_type: 'Khái niệm',
        difficulty: 3,
        grade: '10',
        subject_id: '',
        chapter_id: '',
        lesson_id: ''
    });

    const [loading, setLoading] = useState(false);
    const [fetchingMetadata, setFetchingMetadata] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchSubjects();
    }, []);

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
                setFormData(prev => ({ ...prev, subject_id: res.data[0].id }));
                fetchChapters(res.data[0].id, formData.grade);
            }
        } catch (err) { console.error(err); }
    };

    const fetchChapters = async (subId, grade) => {
        setFetchingMetadata(true);
        try {
            // Cập nhật đường dẫn khớp với Backend: /teacher/chapters/{subjectId}?grade={grade}
            const res = await axiosClient.get(`/teacher/chapters/${subId}?grade=${grade}`);
            setChapters(res.data);
            setLessons([]);
            setFormData(prev => ({ ...prev, chapter_id: '', lesson_id: '' }));
        } catch (err) { console.error(err); }
        finally { setFetchingMetadata(false); }
    };

    const fetchLessons = async (chapId) => {
        if (!chapId) return;
        setFetchingMetadata(true);
        try {
            // Cập nhật đường dẫn khớp với Backend: /teacher/lessons/{chapterId}
            const res = await axiosClient.get(`/teacher/lessons/${chapId}`);
            setLessons(res.data);
            setFormData(prev => ({ ...prev, lesson_id: '' }));
        } catch (err) { console.error(err); }
        finally { setFetchingMetadata(false); }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsError(false);
        setMessage('');

        if (!formData.lesson_id) {
            setIsError(true);
            setMessage('Vui lòng chọn bài học cho câu hỏi này!');
            setLoading(false);
            return;
        }

        try {
            await axiosClient.post('/teacher/questions', formData);
            setMessage('Câu hỏi đã được lưu vào ngân hàng thành công!');
            setFormData(prev => ({ 
                ...prev, 
                content: '', option_a: '', option_b: '', option_c: '', option_d: '', 
                correct_answer: 'A' 
            }));
            setTimeout(() => navigate('/teacher/question'), 2000);
        } catch (error) {
            setIsError(true);
            setMessage('Lỗi: ' + (error.response?.data?.message || 'Có lỗi xảy ra khi lưu câu hỏi'));
        } finally { setLoading(false); }
    };

    return (
        <div className="py-2 min-h-full pb-32">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter">Tạo <span className="text-teal-500">Câu Hỏi</span></h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Bổ sung học liệu vào kho lưu trữ giảng dạy (Khối 10, 11, 12)</p>
                </div>
                <button onClick={() => navigate('/teacher/question')} className="p-4 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/5">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Left Column: Content & Metadata */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nội dung câu hỏi *</label>
                            <textarea 
                                name="content" 
                                value={formData.content} 
                                onChange={handleChange} 
                                className="w-full bg-white/5 border border-white/5 rounded-3xl px-6 py-6 text-white text-lg font-medium focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all resize-none"
                                rows={6} 
                                placeholder="VD: Nguyên tử khối của Oxi là bao nhiêu?" 
                                required 
                            />
                        </div>

                        {/* Hierarchy Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Khối lớp</label>
                                <select 
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none"
                                >
                                    {GRADES.map(g => <option key={g.id} value={g.id} className="bg-[#0b1326]">{g.label}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chương học ({formData.grade})</label>
                                <select 
                                    name="chapter_id"
                                    value={formData.chapter_id}
                                    onChange={e => {
                                        handleChange(e);
                                        fetchLessons(e.target.value);
                                    }}
                                    disabled={fetchingMetadata}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none disabled:opacity-30"
                                    required
                                >
                                    <option value="" className="bg-[#0b1326]">Chọn chương...</option>
                                    {chapters.map(c => <option key={c.id} value={c.id} className="bg-[#0b1326]">{c.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Bài học *</label>
                                <select 
                                    name="lesson_id"
                                    value={formData.lesson_id}
                                    onChange={handleChange}
                                    disabled={!formData.chapter_id || fetchingMetadata}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none disabled:opacity-30"
                                    required
                                >
                                    <option value="" className="bg-[#0b1326]">Chọn bài học...</option>
                                    {lessons.map(l => <option key={l.id} value={l.id} className="bg-[#0b1326]">{l.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Loại kiến thức</label>
                                <select 
                                    name="knowledge_type"
                                    value={formData.knowledge_type}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none"
                                >
                                    {KNOWLEDGE_TYPES.map(t => <option key={t.id} value={t.id} className="bg-[#0b1326]">{t.label}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Options & Level */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl space-y-6">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Tham số & Đáp án</h3>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mức độ</label>
                            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                                {[
                                    {id: 'easy', label: 'Dễ'},
                                    {id: 'medium', label: 'Vừa'},
                                    {id: 'hard', label: 'Khó'}
                                ].map(lv => (
                                    <button 
                                        key={lv.id} type="button"
                                        onClick={() => setFormData({...formData, level: lv.id})}
                                        className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${formData.level === lv.id ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "text-slate-500 hover:text-white"}`}
                                    >
                                        {lv.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {['a', 'b', 'c', 'd'].map((key) => (
                            <div key={key} className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-teal-500 group-focus-within:scale-110 transition-transform uppercase">{key}</span>
                                <input 
                                    name={`option_${key}`} 
                                    value={formData[`option_${key}`]} 
                                    onChange={handleChange} 
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all"
                                    placeholder={`Đáp án ${key.toUpperCase()}...`} 
                                    required 
                                />
                            </div>
                        ))}

                        <div className="pt-4 space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Đáp án chính xác</label>
                            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                                {['A', 'B', 'C', 'D'].map((ans) => (
                                    <button 
                                        key={ans}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, correct_answer: ans })}
                                        className={`flex-1 py-3 rounded-xl font-black transition-all ${formData.correct_answer === ans ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" : "text-slate-500 hover:text-white"}`}
                                    >
                                        {ans}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-2xl font-bold text-sm text-center animate-in zoom-in-95 duration-300 ${isError ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-teal-500/10 text-teal-400 border border-teal-500/20"}`}>
                            {message}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading || fetchingMetadata} 
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white py-5 rounded-4xl font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? 'Đang xử lý...' : 'Lưu vào ngân hàng'}
                        <span className="material-symbols-outlined">database</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuestion;