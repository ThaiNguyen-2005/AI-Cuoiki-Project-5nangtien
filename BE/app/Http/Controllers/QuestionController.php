<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
    // HÀM LẤY DANH SÁCH CÂU HỎI (Thiếu hàm này nên lúc nãy nó ngơ ngác đó)
    public function index(Request $request)
    {
        try {
            // Lấy câu hỏi của giáo viên đang đăng nhập, xếp mới nhất lên đầu
            $questions = Question::where('user_id', $request->user()->id)
                            ->orderBy('created_at', 'desc')
                            ->get();

            return response()->json([
                'success' => true,
                'data'    => $questions
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy dữ liệu: ' . $e->getMessage()
            ], 500);
        }
    }

    // HÀM TẠO CÂU HỎI (Đã đúng, giữ nguyên)
    public function store(Request $request)
    {
        // 1. Validate dữ liệu từ Frontend gửi lên
        $validated = $request->validate([
            'content'        => 'required|string',
            'option_a'       => 'required|string',
            'option_b'       => 'required|string',
            'option_c'       => 'required|string',
            'option_d'       => 'required|string',
            'correct_answer' => 'required|in:A,B,C,D',
            'level'          => 'nullable|string', // VD: easy, medium, hard
        ]);

        // 2. Tự động gán ID của giáo viên đang đăng nhập vào câu hỏi
        $validated['user_id'] = $request->user()->id;

        try {
            // 3. Lưu vào DB
            $question = Question::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Tạo câu hỏi thành công!',
                'data'    => $question
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi server: ' . $e->getMessage()
            ], 500);
        }
    }
}