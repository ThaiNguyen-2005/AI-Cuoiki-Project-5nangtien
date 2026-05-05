<?php

namespace App\Repositories;

use App\Interfaces\QuizRepositoryInterface;
use App\Models\Quiz;
use App\Models\QuizAttempt;

class EloquentQuizRepository extends BaseRepository implements QuizRepositoryInterface
{
    public function __construct(Quiz $model)
    {
        parent::__construct($model);
    }

    public function getQuizListByTeacher($teacherId)
    {
        return $this->model->where('teacher_id', $teacherId)
            ->withCount(['questions', 'attempts'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function findWithQuestions($id)
    {
        return $this->model->withTrashed()->with('questions')->findOrFail($id);
    }

    public function getAttempts($quizId)
    {
        return QuizAttempt::where('quiz_id', $quizId)
            ->with('quiz:id,title', 'student:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
