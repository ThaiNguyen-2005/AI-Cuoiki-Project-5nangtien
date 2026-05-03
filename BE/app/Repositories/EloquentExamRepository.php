<?php

namespace App\Repositories;

use App\Interfaces\ExamRepositoryInterface;
use App\Models\Exam;

class EloquentExamRepository extends BaseRepository implements ExamRepositoryInterface
{
    public function __construct(Exam $model)
    {
        parent::__construct($model);
    }

    public function getExamsWithDetails()
    {
        return $this->model->with(['teacher'])->orderBy('created_at', 'desc')->get();
    }

    public function paginateExams(int $perPage = 15)
    {
        return $this->model->with(['teacher'])->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function getExamWithQuestions(string $id)
    {
        return $this->model->with(['questions.answers', 'teacher'])->findOrFail($id);
    }
}
