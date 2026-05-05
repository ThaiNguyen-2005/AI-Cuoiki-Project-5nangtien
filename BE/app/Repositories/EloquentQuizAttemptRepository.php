<?php

namespace App\Repositories;

use App\Interfaces\QuizAttemptRepositoryInterface;
use App\Models\QuizAttempt;

class EloquentQuizAttemptRepository extends BaseRepository implements QuizAttemptRepositoryInterface
{
    public function __construct(QuizAttempt $model)
    {
        parent::__construct($model);
    }

    public function getUserAttempts($userId)
    {
        return $this->model->where('student_id', $userId)
            ->with(['quiz' => function($q) { $q->withTrashed()->select('id', 'title', 'subject'); }])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getAttemptsByQuiz($quizId, $userId = null)
    {
        $query = $this->model->where('quiz_id', $quizId);
        if ($userId) {
            $query->where('student_id', $userId);
        }
        return $query->get();
    }

    public function getStreakDays($userId)
    {
        $doneDays = $this->model->where('student_id', $userId)
            ->get()
            ->map(fn($a) => $a->created_at->toDateString())
            ->unique()->sort()->values();

        $streakDays = 0;
        if ($doneDays->count() > 0) {
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
        return $streakDays;
    }

    public function getAnalytics($userId)
    {
        return $this->model->where('student_id', $userId)
            ->with(['quiz' => function($q) { $q->withTrashed()->select('id', 'title'); }])
            ->get();
    }
}
