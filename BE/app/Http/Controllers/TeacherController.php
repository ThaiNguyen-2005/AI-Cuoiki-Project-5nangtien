<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuizAttempt;

class TeacherController extends Controller
{
    // GET /api/teacher/quizzes
    public function getQuizList(Request $request)
    {
        $quizzes = Quiz::where('teacher_id', $request->user()->id)
            ->withCount(['questions', 'attempts'])
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($quizzes);
    }

    // POST /api/teacher/quizzes
    public function createQuiz(Request $request)
    {
        $data = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'grade'         => 'required|string',
            'time_limit'    => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'subject'        => 'nullable|string|max:100',
            'status'        => 'sometimes|in:draft,published',
        ]);
        $quiz = Quiz::create(array_merge($data, [
            'teacher_id' => $request->user()->id,
            'subject'    => $data['subject'] ?? 'Hóa học',
            'status'     => $data['status'] ?? 'published',
        ]));
        return response()->json($quiz, 201);
    }

    // PUT /api/teacher/quizzes/{id}
    public function updateQuiz(Request $request, $id)
    {
        $quiz = Quiz::where('id', $id)->where('teacher_id', $request->user()->id)->firstOrFail();
        $data = $request->validate([
            'title'         => 'sometimes|string|max:255',
            'description'   => 'nullable|string',
            'grade'         => 'sometimes|string',
            'time_limit'    => 'sometimes|integer|min:1',
            'passing_score' => 'sometimes|integer|min:0|max:100',
            'subject'        => 'nullable|string|max:100',
            'status'        => 'sometimes|in:draft,published',
        ]);
        $quiz->update($data);
        return response()->json(['message' => 'Cập nhật thành công!', 'quiz' => $quiz->fresh()]);
    }

    // DELETE /api/teacher/quizzes/{id}
    public function deleteQuiz(Request $request, $id)
    {
        $quiz = Quiz::where('id', $id)->where('teacher_id', $request->user()->id)->firstOrFail();
        $quiz->delete();
        return response()->json(['message' => 'Đã xoá quiz!']);
    }

    // PATCH /api/teacher/quizzes/{id}/toggle
    public function toggleQuiz(Request $request, $id)
    {
        $quiz = Quiz::where('id', $id)->where('teacher_id', $request->user()->id)->firstOrFail();
        $quiz->update(['status' => $quiz->status === 'published' ? 'draft' : 'published']);
        return response()->json(['status' => $quiz->status]);
    }

    // GET /api/teacher/all-questions — Tất cả câu hỏi từ tất cả quiz của giáo viên
    public function getAllQuestions(Request $request)
    {
        $quizIds = Quiz::where('teacher_id', $request->user()->id)->pluck('id');

        $questions = QuizQuestion::whereIn('quiz_id', $quizIds)
            ->with('quiz:id,title,grade')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($q) => [
                'id'            => $q->id,
                'content'       => $q->content,
                'type'          => $q->type,
                'options'       => $q->options,
                'correct_index' => $q->correct_index,
                'explanation'   => $q->explanation,
                'quiz_title'    => $q->quiz->title ?? '—',
                'quiz_grade'    => $q->quiz->grade ?? '—',
            ]);

        return response()->json($questions);
    }

    // GET /api/teacher/quizzes/{id}/questions
    public function getQuestions(Request $request, $id)
    {
        $quiz = Quiz::where('id', $id)->where('teacher_id', $request->user()->id)->firstOrFail();
        return response()->json($quiz->questions()->orderBy('order')->get());
    }

    // POST /api/teacher/quizzes/{id}/questions
    public function addQuestion(Request $request, $id)
    {
        $quiz = Quiz::where('id', $id)->where('teacher_id', $request->user()->id)->firstOrFail();
        $data = $request->validate([
            'content'       => 'required|string',
            'options'       => 'required|array|min:2',
            'correct_index' => 'required|integer|min:0',
            'explanation'   => 'nullable|string',
        ]);
        $order = $quiz->questions()->count();
        $q = QuizQuestion::create(array_merge($data, ['quiz_id' => $quiz->id, 'order' => $order, 'type' => 'multiple_choice']));
        return response()->json($q, 201);
    }

    // PUT /api/teacher/quizzes/{id}/questions/{qid}
    public function updateQuestion(Request $request, $id, $qid)
    {
        $quiz = Quiz::where('id', $id)->where('teacher_id', $request->user()->id)->firstOrFail();
        $q = QuizQuestion::where('id', $qid)->where('quiz_id', $quiz->id)->firstOrFail();
        $data = $request->validate([
            'content'       => 'sometimes|string',
            'options'       => 'sometimes|array|min:2',
            'correct_index' => 'sometimes|integer|min:0',
            'explanation'   => 'nullable|string',
        ]);
        $q->update($data);
        return response()->json(['message' => 'Cập nhật câu hỏi thành công!', 'question' => $q->fresh()]);
    }

    // DELETE /api/teacher/quizzes/{id}/questions/{qid}
    public function deleteQuestion(Request $request, $id, $qid)
    {
        $quiz = Quiz::where('id', $id)->where('teacher_id', $request->user()->id)->firstOrFail();
        $q = QuizQuestion::where('id', $qid)->where('quiz_id', $quiz->id)->firstOrFail();
        $q->delete();
        $quiz->questions()->orderBy('order')->get()->each(function ($q, $i) { $q->update(['order' => $i]); });
        return response()->json(['message' => 'Đã xoá câu hỏi!']);
    }

    // GET /api/teacher/results/{quizId} — Kết quả theo quiz cụ thể
    public function getResults(Request $request, $quizId)
    {
        $teacherId = $request->user()->id;

        // Xác nhận quiz thuộc về giáo viên này
        Quiz::where('id', $quizId)->where('teacher_id', $teacherId)->firstOrFail();

        $attempts = QuizAttempt::where('quiz_id', $quizId)
            ->with('quiz:id,title', 'student:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($a) => [
                'id'           => $a->id,
                'student_name' => $a->student->name ?? '—',
                'quiz_title'   => $a->quiz->title ?? '—',
                'score'        => $a->score,
                'correct'      => $a->correct,
                'total'        => $a->total,
                'passed'       => $a->passed,
                'time_spent'   => $a->time_spent,
                'submitted_at' => $a->created_at,
            ]);
        return response()->json($attempts);
    }

    // GET /api/teacher/analytics
    public function getAnalytics(Request $request)
    {
        $teacherId = $request->user()->id;
        $quizIds   = Quiz::where('teacher_id', $teacherId)->pluck('id');
        $attempts  = QuizAttempt::whereIn('quiz_id', $quizIds)->get();

        return response()->json([
            'total_quizzes'  => $quizIds->count(),
            'total_attempts' => $attempts->count(),
            'total_students' => QuizAttempt::whereIn('quiz_id', $quizIds)->distinct('student_id')->count(),
            'pass_rate'      => $attempts->count() ? round($attempts->where('passed', true)->count() / $attempts->count() * 100) : 0,
            'avg_score'      => $attempts->count() ? round($attempts->avg('score')) : 0,
        ]);
    }
}