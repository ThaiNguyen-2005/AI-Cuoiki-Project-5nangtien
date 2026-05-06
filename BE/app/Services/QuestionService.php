<?php

namespace App\Services;

use App\Interfaces\QuestionRepositoryInterface;
use App\Interfaces\QuizRepositoryInterface;
use App\Models\QuizQuestion;
use Illuminate\Support\Facades\DB;

class QuestionService extends BaseService
{
    protected $quizRepository;

    public function __construct(
        QuestionRepositoryInterface $repository,
        QuizRepositoryInterface $quizRepository
    ) {
        parent::__construct($repository);
        $this->quizRepository = $quizRepository;
    }

    public function getAllByTeacher($teacherId)
    {
        return $this->repository->getAllByTeacher($teacherId)->map(function($q) {
            $options = [$q->option_a, $q->option_b, $q->option_c, $q->option_d];
            $correctMap = ['A' => 0, 'B' => 1, 'C' => 2, 'D' => 3];
            $correctIndex = $correctMap[strtoupper($q->correct_answer)] ?? 0;

            return [
                'id'             => $q->id,
                'content'        => $q->content,
                'options'        => $options,
                'correct_index'  => $correctIndex,
                'explanation'    => $q->explanation ?? 'Chưa có giải thích.',
                'level'          => $q->level,
                'knowledge_type' => $q->knowledge_type,
                'lesson_name'    => $q->lesson->name ?? 'N/A',
                'chapter_name'   => $q->lesson->chapter->name ?? 'N/A',
                'grade'          => $q->lesson->chapter->grade ?? '10',
                'subject_name'   => $q->lesson->chapter->subject->name ?? 'Hóa học',
                'quiz_title'     => 'Ngân hàng tổng',
                'quiz_id'        => 'master',
            ];
        });
    }

    public function generateQuiz($teacherId, array $data)
    {
        return DB::transaction(function () use ($teacherId, $data) {
            $questions = $this->repository->getRandomQuestions($data, $data['count']);

            if ($questions->count() < $data['count']) {
                throw new \Exception("Không đủ câu hỏi trong ngân hàng (Chỉ tìm thấy {$questions->count()} câu).", 422);
            }

            // Lấy tên các chương để lưu vào đề thi (metadata)
            $chapterNames = [];
            if (!empty($data['chapter_ids'])) {
                $chapterNames = \App\Models\Chapter::whereIn('id', $data['chapter_ids'])->pluck('name')->toArray();
            }

            // Create Quiz
            $quiz = $this->quizRepository->create([
                'title'          => $data['title'],
                'description'    => $data['description'] ?? '',
                'teacher_id'     => $teacherId,
                'time_limit'     => $data['time_limit'],
                'passing_score'  => $data['passing_score'],
                'grade'          => $data['grade'] ?? '10',
                'subject_id'     => $data['subject_id'] ?? null,
                'knowledge_type' => $data['knowledge_type'] ?? null,
                'status'         => 'draft',
                'difficulty'     => $data['difficulty'] ?? 'mixed',
                'max_attempts'   => $data['max_attempts'] ?? 3,
                'chapters'       => $chapterNames,
            ]);

            // Create QuizQuestions
            foreach ($questions as $index => $q) {
                QuizQuestion::create([
                    'quiz_id'       => $quiz->id,
                    'content'       => $q->content,
                    'options'       => [$q->option_a, $q->option_b, $q->option_c, $q->option_d],
                    'correct_index' => ord(strtoupper($q->correct_answer)) - 65,
                    'explanation'   => $q->explanation ?? '',
                    'order'         => $index,
                    'type'          => 'multiple_choice',
                    'level'         => $q->level
                ]);
            }

            return $quiz;
        });
    }

    public function updateMasterQuestion($id, array $data)
    {
        $updateData = [];
        if (isset($data['content'])) $updateData['content'] = $data['content'];
        if (isset($data['explanation'])) $updateData['explanation'] = $data['explanation'];
        if (isset($data['grade'])) $updateData['grade'] = $data['grade'];
        if (isset($data['lesson_id'])) $updateData['lesson_id'] = $data['lesson_id'];
        if (isset($data['knowledge_type'])) $updateData['knowledge_type'] = $data['knowledge_type'];
        
        if (isset($data['level'])) {
            $updateData['level'] = $data['level'];
            $updateData['difficulty'] = $data['level'] === 'hard' ? 5 : ($data['level'] === 'medium' ? 3 : 1);
        }

        if (isset($data['options'])) {
            $updateData['option_a'] = $data['options'][0] ?? '';
            $updateData['option_b'] = $data['options'][1] ?? '';
            $updateData['option_c'] = $data['options'][2] ?? '';
            $updateData['option_d'] = $data['options'][3] ?? '';
        }

        if (isset($data['correct_index'])) {
            $updateData['correct_answer'] = ['A', 'B', 'C', 'D'][$data['correct_index']] ?? 'A';
        }

        return $this->repository->update($id, $updateData);
    }
}
