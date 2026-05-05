<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuizAttempt;

class StudentController extends Controller
{
    // Dashboard tổng quan học sinh
    public function getDashboard(Request $request)
    {
        $user     = Auth::user();
        $attempts = QuizAttempt::where('student_id', $user->id)
            ->with('quiz:id,title,subject')
            ->orderBy('created_at', 'desc')
            ->get();

        $total       = $attempts->count();
        $avgScore    = $total > 0 ? round($attempts->avg('score'), 1) : 0;
        $bestScore   = $total > 0 ? $attempts->max('score') : 0;
        $totalPassed = $attempts->where('passed', true)->count();

        // Streak: đếm số ngày liên tiếp có làm bài (đã fix lỗi reverse() + lệch ngày)
        $streakDays = 0;
        if ($total > 0) {
            $doneDays = $attempts
                ->map(fn($a) => $a->created_at->toDateString())
                ->unique()->sort()->values();

            $today = now()->startOfDay();
            foreach ($doneDays->reverse()->values() as $day) {
                $expected = $today->copy()->subDays($streakDays)->toDateString();
                if ($day === $expected) {
                    $streakDays++;
                } else {
                    break;
                }
            }
        }

        // Bài quiz chưa làm gần nhất
        $doneQuizIds  = $attempts->pluck('quiz_id')->unique();
        $upcomingQuiz = Quiz::where('status', 'published')
            ->whereNotIn('id', $doneQuizIds)
            ->select('id', 'title', 'subject', 'time_limit')
            ->first();

        // Mục tiêu hằng ngày
        $doneToday         = $attempts->filter(fn($a) => $a->created_at->isToday())->count();
        $dailyGoalProgress = $doneToday >= 1 ? 100 : 0;

        return response()->json([
            'name'                => $user->name,
            'total_attempts'      => $total,
            'average_score'       => $avgScore,
            'best_score'          => $bestScore,
            'total_passed'        => $totalPassed,
            'streak_days'         => $streakDays,
            'daily_goal_progress' => $dailyGoalProgress,
            'upcoming_quiz'       => $upcomingQuiz,
        ]);
    }

    // Danh sách quiz student có thể làm (đã fix N+1 query)
    public function getQuizList(Request $request)
    {
        $user = Auth::user();

        // Load trước toàn bộ attempts của user — tránh N+1 query
        $userAttempts = QuizAttempt::where('student_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('quiz_id');

        $quizzes = Quiz::with('teacher:id,name')
            ->where('status', 'published')
            ->get()
            ->map(function ($quiz) use ($userAttempts) {
                $attempt = $userAttempts->get($quiz->id)?->first();

                return [
                    'id'              => $quiz->id,
                    'title'           => $quiz->title,
                    'description'     => $quiz->description,
                    'time_limit'      => $quiz->time_limit,
                    'passing_score'   => $quiz->passing_score ?? 70,
                    'total_questions' => $quiz->questions()->count(),
                    'teacher_name'    => $quiz->teacher->name ?? 'Không rõ',
                    'attempted'       => $attempt ? true : false,
                    'last_score'      => $attempt ? $attempt->score : null,
                    'last_attempt'    => $attempt ? $attempt->created_at->format('d/m/Y H:i') : null,
                ];
            });

        return response()->json($quizzes);
    }

    // Lấy đề thi (không có đáp án đúng)
    public function getExam($quizId)
    {
        $quiz = Quiz::with(['questions' => function ($q) {
            $q->orderBy('order')->select('id', 'quiz_id', 'content', 'options');
        }])->findOrFail($quizId);

        $questions = $quiz->questions->map(fn($q) => [
            'id'      => $q->id,
            'content' => $q->content,
            'options' => is_string($q->options) ? json_decode($q->options, true) : $q->options,
        ]);

        return response()->json([
            'quiz' => [
                'id'         => $quiz->id,
                'title'      => $quiz->title,
                'time_limit' => $quiz->time_limit ?? 30,
            ],
            'questions' => $questions,
        ]);
    }

    // Nộp bài và tính điểm (đã thêm validate answers.*)
    public function submitExam(Request $request, $quizId)
    {
        $request->validate([
            'answers'   => 'required|array',
            'answers.*' => 'nullable|integer',
        ]);

        $user       = Auth::user();
        $quiz       = Quiz::findOrFail($quizId);
        $rawAnswers = $request->input('answers');

        // Chuẩn hoá 2 format answer từ frontend
        $answerMap = [];
        if (isset($rawAnswers[0]) && is_array($rawAnswers[0])) {
            foreach ($rawAnswers as $a) {
                $answerMap[$a['question_id']] = $a['selected_index'];
            }
        } else {
            $answerMap = $rawAnswers;
        }

        $questions = QuizQuestion::where('quiz_id', $quizId)->get();
        $total     = $questions->count();
        $correct   = 0;
        $details   = [];

        foreach ($questions as $q) {
            $studentAnswer = $answerMap[$q->id] ?? null;
            $isCorrect     = $studentAnswer !== null && (int)$studentAnswer === (int)$q->correct_index;
            if ($isCorrect) $correct++;

            $details[] = [
                'question_id'   => $q->id,
                'is_correct'    => $isCorrect,
                'correct_index' => $q->correct_index,
                'explanation'   => $q->explanation ?? '',
            ];
        }

        $percentage = $total > 0 ? round($correct / $total * 100) : 0;
        $passed     = $percentage >= ($quiz->passing_score ?? 70);

        QuizAttempt::create([
            'student_id' => $user->id,
            'quiz_id'    => $quizId,
            'score'      => $percentage,
            'correct'    => $correct,
            'total'      => $total,
            'passed'     => $passed,
            'time_spent' => $request->input('time_spent', 0),
            'answers'    => $answerMap,
        ]);

        return response()->json([
            'score'   => $percentage,
            'correct' => $correct,
            'total'   => $total,
            'passed'  => $passed,
            'details' => $details,
        ]);
    }

    // Lịch sử làm bài
    public function getHistory(Request $request)
    {
        $user = Auth::user();

        $attempts = QuizAttempt::with('quiz:id,title')
            ->where('student_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($a) => [
                'id'         => $a->id,
                'quiz_id'    => $a->quiz_id,
                'quiz_title' => $a->quiz->title ?? 'Không rõ',
                'score'      => $a->score,
                'correct'    => $a->correct,
                'total'      => $a->total,
                'passed'     => $a->passed,
                'date'       => $a->created_at->format('d/m/Y H:i'),
            ]);

        return response()->json($attempts);
    }

    // Chi tiết 1 lần thi — bao gồm câu hỏi + đáp án để hiển thị review
    public function getAttemptDetail($attemptId)
    {
        $user    = Auth::user();
        $attempt = QuizAttempt::with('quiz:id,title')
            ->where('id', $attemptId)
            ->where('student_id', $user->id)
            ->firstOrFail();

        $questions = QuizQuestion::where('quiz_id', $attempt->quiz_id)
            ->orderBy('order')
            ->get();
        $answerMap = $attempt->answers ?? [];

        $details = $questions->map(function ($q) use ($answerMap) {
            $studentAns = $answerMap[$q->id] ?? null;
            $isCorrect  = $studentAns !== null && (int)$studentAns === (int)$q->correct_index;
            return [
                'question_id'    => $q->id,
                'question_text'  => $q->content,
                'options'        => is_string($q->options) ? json_decode($q->options, true) : $q->options,
                'student_answer' => $studentAns,
                'correct_answer' => $q->correct_index,
                'is_correct'     => $isCorrect,
                'explanation'    => $q->explanation ?? '',
            ];
        });

        return response()->json([
            'id'         => $attempt->id,
            'quiz_title' => $attempt->quiz->title ?? '',
            'score'      => $attempt->score,
            'correct'    => $attempt->correct,
            'total'      => $attempt->total,
            'passed'     => $attempt->passed,
            'date'       => $attempt->created_at->format('d/m/Y H:i'),
            'details'    => $details,
        ]);
    }

    // Thống kê cá nhân
    public function getAnalytics(Request $request)
    {
        $user     = Auth::user();
        $attempts = QuizAttempt::with('quiz:id,title')
            ->where('student_id', $user->id)
            ->get();

        if ($attempts->isEmpty()) {
            return response()->json([
                'total_attempts'  => 0,
                'average_score'   => 0,
                'best_score'      => 0,
                'total_correct'   => 0,
                'total_questions' => 0,
                'by_quiz'         => [],
                'recent_scores'   => [],
            ]);
        }

        $byQuiz = $attempts->groupBy('quiz_id')->map(fn($g) => [
            'quiz_title' => $g->first()->quiz->title ?? '',
            'attempts'   => $g->count(),
            'best_score' => $g->max('score'),
            'avg_score'  => round($g->avg('score'), 1),
        ])->values();

        $recent = $attempts->sortByDesc('created_at')->take(10)->map(fn($a) => [
            'date'  => $a->created_at->format('d/m'),
            'score' => $a->score,
            'quiz'  => $a->quiz->title ?? '',
        ])->values();

        return response()->json([
            'total_attempts'  => $attempts->count(),
            'average_score'   => round($attempts->avg('score'), 1),
            'best_score'      => $attempts->max('score'),
            'total_correct'   => $attempts->sum('correct'),
            'total_questions' => $attempts->sum('total'),
            'by_quiz'         => $byQuiz,
            'recent_scores'   => $recent,
        ]);
    }
}