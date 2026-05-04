import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

const CreateQuestion = () => {
    const [formData, setFormData] = useState({
        content: '', option_a: '', option_b: '', option_c: '', option_d: '',
        correct_answer: 'A', level: 'easy', lesson_id: '' // Thêm lesson_id
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosClient.post('/teacher/questions', formData);
            setMessage('Thêm thành công!');
            setFormData({ content: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: 'A', level: 'easy', lesson_id: '' });
        } catch (error) {
            setMessage('Lỗi: ' + (error.response?.data?.message || 'Lỗi server'));
        } finally { setLoading(false); }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow-md mt-10">
            <h2 className="text-xl font-bold mb-4">Thêm Câu Hỏi</h2>
            {message && <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="lesson_id" value={formData.lesson_id} onChange={handleChange} placeholder="Mã bài học (Lesson ID)" className="w-full border p-2 rounded bg-gray-50" required />
                <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Nội dung câu hỏi" className="w-full border p-2 rounded" required />
                <div className="grid grid-cols-2 gap-2">
                    <input name="option_a" value={formData.option_a} onChange={handleChange} placeholder="Đáp án A" className="border p-2 rounded" required />
                    <input name="option_b" value={formData.option_b} onChange={handleChange} placeholder="Đáp án B" className="border p-2 rounded" required />
                    <input name="option_c" value={formData.option_c} onChange={handleChange} placeholder="Đáp án C" className="border p-2 rounded" required />
                    <input name="option_d" value={formData.option_d} onChange={handleChange} placeholder="Đáp án D" className="border p-2 rounded" required />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">{loading ? 'Đang lưu...' : 'LƯU CÂU HỎI'}</button>
            </form>
        </div>
    );
};
export default CreateQuestion;