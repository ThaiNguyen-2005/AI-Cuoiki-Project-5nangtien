<?php

namespace App\Interfaces;

interface QuizRepositoryInterface extends BaseRepositoryInterface
{
    public function getQuizListByTeacher($teacherId);
    public function findWithQuestions($id);
    public function getAttempts($quizId);
}
