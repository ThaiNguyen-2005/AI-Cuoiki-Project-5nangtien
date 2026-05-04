import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

const CreateQuestion = () => {
    const [formData, setFormData] = useState({
        content: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'A',
        level: 'easy'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axiosClient.post('/teacher/questions', formData);
            setMessage('Đã thêm câu hỏi vào ngân hàng thành công!');
            // Reset form nếu muốn
            setFormData({
                content: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: 'A', level: 'easy'
            });
        } catch (error) {
            console.error("Lỗi tạo câu hỏi:", error);
            setMessage('Lỗi: ' + (error.response?.data?.message || 'Không thể tạo câu hỏi'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Thêm Câu Hỏi Mới</h2>
            
            {message && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Nội dung câu hỏi:</label>
                    <textarea 
                        name="content" 
                        value={formData.content} 
                        onChange={handleChange} 
                        required 
                        className="w-full border p-2 rounded" 
                        rows="3"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Đáp án A:</label>
                        <input type="text" name="option_a" value={formData.option_a} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block font-medium">Đáp án B:</label>
                        <input type="text" name="option_b" value={formData.option_b} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block font-medium">Đáp án C:</label>
                        <input type="text" name="option_c" value={formData.option_c} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block font-medium">Đáp án D:</label>
                        <input type="text" name="option_d" value={formData.option_d} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Đáp án đúng:</label>
                        <select name="correct_answer" value={formData.correct_answer} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Độ khó:</label>
                        <select name="level" value={formData.level} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value="easy">Dễ</option>
                            <option value="medium">Trung bình</option>
                            <option value="hard">Khó</option>
                        </select>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    {loading ? 'Đang lưu...' : 'Lưu Câu Hỏi'}
                </button>
            </form>
        </div>
    );
};

export default CreateQuestion;