<?php

namespace App\Services;

use App\Interfaces\QuizAttemptRepositoryInterface;
use App\Interfaces\QuizRepositoryInterface;
use Illuminate\Support\Facades\DB;

class StudentService extends BaseService
{
    protected $quizRepository;

    public function __construct(
        QuizAttemptRepositoryInterface $repository,
        QuizRepositoryInterface $quizRepository
    ) {
        parent::__construct($repository);
        $this->quizRepository = $quizRepository;
    }

    public function getDashboardData($user)
    {
        $attempts = $this->repository->getUserAttempts($user->id);
        
        $total       = $attempts->count();
        $avgScore    = $total > 0 ? round($attempts->avg('score'), 1) : 0;
        $bestScore   = $total > 0 ? $attempts->max('score') : 0;
        $totalPassed = $attempts->where('passed', true)->count();
        $streakDays  = $this->repository->getStreakDays($user->id);

        // Bài quiz chưa làm gần nhất
        $doneQuizIds  = $attempts->pluck('quiz_id')->unique();
        $upcomingQuiz = \App\Models\Quiz::where('status', 'published')
            ->whereNotIn('id', $doneQuizIds)
            ->select('id', 'title', 'subject', 'time_limit')
            ->first();

        $doneToday = $attempts->filter(fn($a) => $a->created_at->isToday())->count();

        return [
            'name'                => $user->name,
            'total_attempts'      => $total,
            'average_score'       => $avgScore,
            'best_score'          => $bestScore,
            'total_passed'        => $totalPassed,
            'streak_days'         => $streakDays,
            'daily_goal_progress' => $doneToday >= 1 ? 100 : 0,
            'upcoming_quiz'       => $upcomingQuiz,
        ];
    }

    public function getQuizList($userId)
    {
        $settings = DB::table('settings')->pluck('value', 'key');
        $globalPassingScore = (int)($settings['passing_score'] ?? 50);
        $globalMaxAttempts = (int)($settings['max_attempts'] ?? 3);

        $userAttempts = $this->repository->getUserAttempts($userId)->groupBy('quiz_id');

        return $this->quizRepository->all()
            ->where('status', 'published')
            ->map(function ($quiz) use ($userAttempts, $globalPassingScore, $globalMaxAttempts) {
                $attempts = $userAttempts->get($quiz->id) ?: collect([]);
                $attempt = $attempts->first();

                return [
                    'id'              => $quiz->id,
                    'title'           => $quiz->title,
                    'description'     => $quiz->description,
                    'time_limit'      => $quiz->time_limit,
                    'passing_score'   => $quiz->passing_score ?? $globalPassingScore,
                    'total_questions' => $quiz->questions()->count(),
                    'teacher_name'    => $quiz->teacher->name ?? 'Không rõ',
                    'grade'           => (string)($quiz->grade ?? '10'),
                    'knowledge_type'  => $quiz->knowledge_type ?: 'Tổng hợp',
                    'difficulty'      => $quiz->difficulty ?: 'mixed',
                    'attempted'       => $attempt ? true : false,
                    'attempts_count'  => $attempts->count(),
                    'max_attempts'    => $globalMaxAttempts,
                    'is_blocked'      => $attempts->count() >= $globalMaxAttempts,
                    'last_score'      => $attempt ? $attempt->score : null,
                    'last_attempt'    => $attempt ? $attempt->created_at->format('d/m/Y H:i') : null,
                ];
            })->values();
    }

    public function getHistory($userId)
    {
        return $this->repository->getUserAttempts($userId)->map(fn($a) => [
            'id'         => $a->id,
            'quiz_id'    => $a->quiz_id,
            'quiz_title' => $a->quiz->title ?? 'Không rõ',
            'score'      => $a->score,
            'correct'    => $a->correct,
            'total'      => $a->total,
            'passed'     => $a->passed,
            'date'       => $a->created_at->setTimezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i'),
        ]);
    }

    public function getAnalytics($userId)
    {
        $attempts = $this->repository->getAnalytics($userId);

        if ($attempts->isEmpty()) {
            return [
                'total_attempts'  => 0,
                'average_score'   => 0,
                'best_score'      => 0,
                'total_correct'   => 0,
                'total_questions' => 0,
                'by_quiz'         => [],
                'recent_scores'   => [],
            ];
        }

        $byQuiz = $attempts->groupBy('quiz_id')->map(fn($g) => [
            'quiz_title' => $g->first()->quiz->title ?? '',
            'attempts'   => $g->count(),
            'best_score' => $g->max('score'),
            'avg_score'  => round($g->avg('score'), 1),
        ])->values();

        $recent = $attempts->sortByDesc('created_at')->take(10)->map(fn($a) => [
            'date'  => $a->created_at->setTimezone('Asia/Ho_Chi_Minh')->format('d/m'),
            'score' => $a->score,
            'quiz'  => $a->quiz->title ?? '',
        ])->values();

        return [
            'total_attempts'  => $attempts->count(),
            'average_score'   => round($attempts->avg('score'), 1),
            'best_score'      => $attempts->max('score'),
            'total_correct'   => $attempts->sum('correct'),
            'total_questions' => $attempts->sum('total'),
            'by_quiz'         => $byQuiz,
            'recent_scores'   => $recent,
        ];
    }
}
