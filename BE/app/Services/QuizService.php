<?php

namespace App\Services;

use App\Interfaces\QuizRepositoryInterface;
use App\Models\QuizQuestion;
use Illuminate\Support\Facades\DB;

class QuizService extends BaseService
{
    public function __construct(QuizRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function getQuizList($teacherId)
    {
        return $this->repository->getQuizListByTeacher($teacherId);
    }

    public function createQuizWithQuestions($teacherId, array $data)
    {
        return DB::transaction(function () use ($teacherId, $data) {
            $quiz = $this->repository->create([
                'title'         => $data['title'],
                'description'   => $data['description'] ?? null,
                'grade'         => $data['grade'],
                'time_limit'    => $data['time_limit'],
                'passing_score' => $data['passing_score'],
                'teacher_id'    => $teacherId,
                'subject'       => $data['subject'] ?? 'Hóa học',
                'status'        => $data['status'] ?? 'published',
            ]);

            foreach ($data['questions'] as $index => $qData) {
                QuizQuestion::create([
                    'quiz_id'       => $quiz->id,
                    'content'       => $qData['content'],
                    'options'       => $qData['options'],
                    'correct_index' => $qData['correct_index'],
                    'explanation'   => $qData['explanation'] ?? '',
                    'order'         => $index,
                    'type'          => 'multiple_choice'
                ]);
            }

            return $quiz;
        });
    }

    public function toggleStatus($quizId, $teacherId)
    {
        $quiz = $this->repository->find($quizId);
        if ($quiz->teacher_id != $teacherId) {
            throw new \Exception('Không có quyền thao tác.', 403);
        }
        
        $newStatus = $quiz->status === 'published' ? 'draft' : 'published';
        return $this->repository->update($quizId, ['status' => $newStatus]);
    }

    public function getResults($quizId)
    {
        return $this->repository->getAttempts($quizId)->map(fn($a) => [
            'id'           => $a->id,
            'student_name' => $a->student->name ?? '—',
            'quiz_title'   => $a->quiz->title ?? '—',
            'score'        => $a->score,
            'correct'      => $a->correct,
            'total'        => $a->total,
            'passed'       => $a->passed,
            'time_spent'   => $a->time_spent,
            'submitted_at' => $a->created_at->setTimezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i'),
        ]);
    }
}
