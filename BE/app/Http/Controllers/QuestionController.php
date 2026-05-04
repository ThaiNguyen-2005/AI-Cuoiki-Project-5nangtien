<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Option;

class QuestionController extends Controller
{
    // API Lấy danh sách câu hỏi để hiện lên bảng
    public function index()
    {
        // Lấy tất cả câu hỏi, kèm theo các đáp án của nó
        $questions = Question::with('options')->orderBy('id', 'desc')->get();
        return response()->json($questions, 200);
    }

    // API Lưu câu hỏi mới từ Form
    public function store(Request $request)
    {
        // 1. Lưu câu hỏi vào bảng questions trước để lấy cái ID
        $question = Question::create([
            'content' => $request->content,
            'chapter' => $request->chapter,
            'level'   => $request->level,
        ]);

        // 2. Lặp qua mảng 4 đáp án (options) từ React gửi lên
        foreach ($request->options as $opt) {
            Option::create([
                'question_id' => $question->id, // Gắn ID câu hỏi vừa tạo vào đây
                'text'        => $opt['text'],
                'is_correct'  => $opt['is_correct'],
            ]);
        }

        return response()->json(['message' => 'Lưu câu hỏi thành công!'], 201);
    }
}