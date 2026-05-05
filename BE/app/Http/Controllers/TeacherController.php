<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuizAttempt;

class TeacherController extends Controller
{
    // GET /api/teacher/quizzes
    public function getQuizList()
    {
        $quizzes = Quiz::where('teacher_id', Auth::id())
            ->withCount('questions')
            ->withCount('attempts')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($quizzes);
    }

    // POST /api/teacher/quizzes
    public function createQuiz(Request $request)
    {
        $request->validate([
            'title'     => 'required|string|max:255',
            'questions' => 'nullable|array',
        ]);

        $quiz = Quiz::create([
            'teacher_id'    => Auth::id(),
            'title'         => $request->title,
            'description'   => $request->description ?? '',
            'subject'       => $request->subject ?? 'Hóa học',
            'grade'         => $request->grade ?? '10',
            'time_limit'    => $request->time_limit ?? 30,
            'passing_score' => $request->passing_score ?? 70,
            'status'        => 'published',
        ]);

        if ($request->has('questions') && is_array($request->questions)) {
            foreach ($request->questions as $i => $q) {
                QuizQuestion::create([
                    'quiz_id'       => $quiz->id,
                    'content'       => $q['content'] ?? '',
                    'type'          => $q['type'] ?? 'multiple_choice',
                    'options'       => $q['options'] ?? [],
                    'correct_index' => $q['correct_index'] ?? 0,
                    'explanation'   => $q['explanation'] ?? '',
                    'order'         => $i + 1,
                ]);
            }
        }

        return response()->json([
            'message' => 'Quiz đã được tạo thành công!',
            'quiz'    => $quiz->load('questions'),
        ], 201);
    }

    // DELETE /api/teacher/quizzes/{id}
    public function deleteQuiz($id)
    {
        $quiz = Quiz::where('id', $id)
            ->where('teacher_id', Auth::id())
            ->firstOrFail();

        $quiz->delete();

        return response()->json(['message' => 'Đã xoá quiz!']);
    }

    // PATCH /api/teacher/quizzes/{id}/toggle
    public function toggleQuiz($id)
    {
        $quiz = Quiz::where('id', $id)
            ->where('teacher_id', Auth::id())
            ->firstOrFail();

        $newStatus = $quiz->status === 'published' ? 'draft' : 'published';
        $quiz->update(['status' => $newStatus]);

        return response()->json([
            'message' => 'Đã cập nhật trạng thái!',
            'status'  => $quiz->status,
        ]);
    }

    // POST /api/teacher/quizzes/{id}/questions
    public function addQuestion(Request $request, $id)
    {
        $quiz = Quiz::where('id', $id)
            ->where('teacher_id', Auth::id())
            ->firstOrFail();

        $request->validate([
            'content'       => 'required|string',
            'options'       => 'required|array|min:2',
            'correct_index' => 'required|integer|min:0',
        ]);

        $order = $quiz->questions()->count() + 1;

        $question = QuizQuestion::create([
            'quiz_id'       => $quiz->id,
            'content'       => $request->content,
            'type'          => $request->type ?? 'multiple_choice',
            'options'       => $request->options,
            'correct_index' => $request->correct_index,
            'explanation'   => $request->explanation ?? '',
            'order'         => $order,
        ]);

        return response()->json($question, 201);
    }

    // GET /api/teacher/results/{quizId}
    public function getResults($quizId)
    {
        $quiz = Quiz::where('id', $quizId)
            ->where('teacher_id', Auth::id())
            ->firstOrFail();

        $total    = $quiz->questions()->count();
        $attempts = QuizAttempt::where('quiz_id', $quizId)
            ->with('user:id,name,email')
            ->orderBy('score', 'desc')
            ->get()
            ->map(fn($a) => [
                'student_name'  => $a->user->name ?? 'N/A',
                'student_email' => $a->user->email ?? '',
                'score'         => $a->score ?? 0,
                'total'         => $total,
                'percentage'    => $total > 0 ? round(($a->score / $total) * 100, 1) : 0,
                'submitted_at'  => $a->created_at,
            ]);

        return response()->json([
            'quiz'     => $quiz->only(['id', 'title']),
            'attempts' => $attempts,
        ]);
    }

    // GET /api/teacher/analytics
    public function getAnalytics()
    {
        $teacherId = Auth::id();
        $quizIds   = Quiz::where('teacher_id', $teacherId)->pluck('id');

        return response()->json([
            'total_quizzes'  => $quizIds->count(),
            'total_attempts' => QuizAttempt::whereIn('quiz_id', $quizIds)->count(),
            'avg_score'      => round(QuizAttempt::whereIn('quiz_id', $quizIds)->avg('score') ?? 0, 1),
            'quiz_stats'     => Quiz::where('teacher_id', $teacherId)
                ->withCount('attempts')
                ->withCount('questions')
                ->orderBy('attempts_count', 'desc')
                ->get(['id', 'title', 'status', 'created_at']),
        ]);
    }
}