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
                'chapters'      => $data['chapters'] ?? null,
                'knowledge_type'=> $data['knowledge_type'] ?? null,
                'difficulty'    => $data['difficulty'] ?? 'mixed',
                'max_attempts'  => $data['max_attempts'] ?? 3,
                'status'        => $data['status'] ?? 'draft',
            ]);

            foreach ($data['questions'] as $index => $qData) {
                QuizQuestion::create([
                    'quiz_id'       => $quiz->id,
                    'content'       => $qData['content'],
                    'options'       => $qData['options'],
                    'correct_index' => $qData['correct_index'],
                    'explanation'   => $qData['explanation'] ?? '',
                    'order'         => $index,
                    'type'          => 'multiple_choice',
                    'level'         => $qData['level'] ?? 'medium'
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

    public function syncQuestions($quizId, $teacherId, array $questions)
    {
        return DB::transaction(function () use ($quizId, $teacherId, $questions) {
            $quiz = $this->repository->find($quizId);
            if ($quiz->teacher_id != $teacherId) {
                throw new \Exception('Không có quyền thao tác.', 403);
            }
            if ($quiz->status !== 'draft') {
                throw new \Exception('Chỉ có thể sửa câu hỏi cho đề nháp.', 422);
            }

            // Tự động tính toán độ khó tổng quát của Quiz (Chuẩn hóa về chữ thường để so sánh)
            $levels = collect($questions)
                        ->pluck('level')
                        ->filter()
                        ->map(fn($l) => strtolower($l))
                        ->unique();
            
            $newDifficulty = $levels->count() === 1 ? $levels->first() : 'mixed';
            
            $quiz->update(['difficulty' => $newDifficulty]);

            return $this->repository->syncQuestions($quizId, $questions);
        });
    }
}
