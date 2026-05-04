<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\QuizQuestion;

class QuizController extends Controller
{
    // GET /api/teacher/quizzes — Lấy danh sách quiz của giáo viên
    public function index(Request $request)
    {
        $quizzes = Quiz::where('teacher_id', $request->user()->id)
            ->withCount('questions')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($quizzes);
    }

    // POST /api/teacher/quizzes — Tạo quiz mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'subject'       => 'required|string',
            'grade'         => 'required|string',
            'time_limit'    => 'required|integer|min:1|max:300',
            'passing_score' => 'required|integer|min:0|max:100',
            'questions'     => 'required|array|min:1',
            'questions.*.content'       => 'required|string',
            'questions.*.options'       => 'required|array|size:4',
            'questions.*.correct_index' => 'required|integer|min:0|max:3',
            'questions.*.explanation'   => 'nullable|string',
        ]);

        // Tạo quiz
        $quiz = Quiz::create([
            'teacher_id'    => $request->user()->id,
            'title'         => $validated['title'],
            'description'   => $validated['description'] ?? null,
            'subject'       => $validated['subject'],
            'grade'         => $validated['grade'],
            'time_limit'    => $validated['time_limit'],
            'passing_score' => $validated['passing_score'],
            'status'        => 'published',
        ]);

        // Tạo câu hỏi
        foreach ($validated['questions'] as $index => $q) {
            QuizQuestion::create([
                'quiz_id'       => $quiz->id,
                'content'       => $q['content'],
                'type'          => $q['type'] ?? 'multiple_choice',
                'options'       => $q['options'],
                'correct_index' => $q['correct_index'],
                'explanation'   => $q['explanation'] ?? null,
                'order'         => $index,
            ]);
        }

        return response()->json([
            'message' => 'Quiz đã được tạo thành công!',
            'quiz'    => $quiz->load('questions'),
        ], 201);
    }

    // GET /api/teacher/quizzes/{id} — Xem chi tiết quiz
    public function show(Request $request, $id)
    {
        $quiz = Quiz::where('id', $id)
            ->where('teacher_id', $request->user()->id)
            ->with('questions')
            ->firstOrFail();

        return response()->json($quiz);
    }

    // DELETE /api/teacher/quizzes/{id} — Xoá quiz
    public function destroy(Request $request, $id)
    {
        $quiz = Quiz::where('id', $id)
            ->where('teacher_id', $request->user()->id)
            ->firstOrFail();

        $quiz->delete();

        return response()->json(['message' => 'Đã xoá quiz!']);
    }
}