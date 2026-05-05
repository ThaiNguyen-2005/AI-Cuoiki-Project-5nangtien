<?php

namespace App\Repositories;

use App\Interfaces\QuestionRepositoryInterface;
use App\Models\Question;
use App\Models\Lesson;
use App\Models\Chapter;

class EloquentQuestionRepository extends BaseRepository implements QuestionRepositoryInterface
{
    public function __construct(Question $model)
    {
        parent::__construct($model);
    }

    public function getAllByTeacher($teacherId)
    {
        return $this->model->where('teacher_id', $teacherId)
            ->with(['lesson.chapter.subject'])
            ->latest()
            ->get();
    }

    public function getRandomQuestions($filters, $count)
    {
        $query = $this->model->query();

        if (isset($filters['lesson_id'])) {
            $query->where('lesson_id', $filters['lesson_id']);
        } elseif (isset($filters['chapter_id'])) {
            $lessonIds = Lesson::where('chapter_id', $filters['chapter_id'])->pluck('id');
            $query->whereIn('lesson_id', $lessonIds);
        } elseif (isset($filters['subject_id'])) {
            $chapterIds = Chapter::where('subject_id', $filters['subject_id'])->pluck('id');
            $lessonIds = Lesson::whereIn('chapter_id', $chapterIds)->pluck('id');
            $query->whereIn('lesson_id', $lessonIds);
        }

        if (!empty($filters['knowledge_type'])) {
            $query->where('knowledge_type', $filters['knowledge_type']);
        }

        if (!empty($filters['difficulty']) && $filters['difficulty'] !== 'mixed') {
            $query->where('level', $filters['difficulty']);
        }

        return $query->inRandomOrder()->limit($count)->get();
    }
}
