<?php

namespace App\Repositories;

use App\Interfaces\QuestionRepositoryInterface;
use App\Models\Question;

class EloquentQuestionRepository extends BaseRepository implements QuestionRepositoryInterface
{
    public function __construct(Question $model)
    {
        parent::__construct($model);
    }

    public function getQuestionsByLesson(string $lessonId)
    {
        return $this->model->where('lesson_id', $lessonId)->with('answers')->get();
    }

    public function getQuestionWithAnswers(string $id)
    {
        return $this->model->with('answers')->findOrFail($id);
    }
}
