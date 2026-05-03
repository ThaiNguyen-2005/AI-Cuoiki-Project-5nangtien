<?php

namespace App\Repositories;

use App\Interfaces\AttemptRepositoryInterface;
use App\Models\Attempt;

class EloquentAttemptRepository extends BaseRepository implements AttemptRepositoryInterface
{
    public function __construct(Attempt $model)
    {
        parent::__construct($model);
    }

    public function getStudentHistory(string $studentId)
    {
        return $this->model->where('student_id', $studentId)
                           ->with('exam')
                           ->orderBy('created_at', 'desc')
                           ->get();
    }

    public function getAttemptWithAnswers(string $attemptId)
    {
        return $this->model->with(['attemptAnswers', 'exam'])->findOrFail($attemptId);
    }
}
