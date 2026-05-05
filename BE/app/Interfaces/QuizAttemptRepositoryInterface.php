<?php

namespace App\Interfaces;

interface QuizAttemptRepositoryInterface extends BaseRepositoryInterface
{
    public function getUserAttempts($userId);
    public function getAttemptsByQuiz($quizId, $userId = null);
    public function getStreakDays($userId);
    public function getAnalytics($userId);
}
