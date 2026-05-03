<?php

namespace App\Services;

use App\Interfaces\QuestionRepositoryInterface;
use App\Models\Answer;
use Illuminate\Support\Facades\DB;

class QuestionService extends BaseService
{
    public function __construct(QuestionRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Tạo câu hỏi kèm danh sách đáp án
     * @param array $data 
     * [
     *   'lesson_id' => '...',
     *   'teacher_id' => '...',
     *   'content' => '...',
     *   'knowledge_type' => '...',
     *   'difficulty' => 1-5,
     *   'answers' => [
     *      ['content' => '...', 'is_correct' => true],
     *      ['content' => '...', 'is_correct' => false],
     *      ...
     *   ]
     * ]
     * @return \App\Models\Question
     */
    public function createQuestionWithAnswers(array $data)
    {
        return DB::transaction(function () use ($data) {
            // 1. Tạo câu hỏi
            $question = $this->repository->create([
                'lesson_id' => $data['lesson_id'],
                'teacher_id' => $data['teacher_id'],
                'content' => $data['content'],
                'knowledge_type' => $data['knowledge_type'],
                'difficulty' => $data['difficulty'],
            ]);

            // 2. Tạo danh sách đáp án
            if (isset($data['answers']) && is_array($data['answers'])) {
                foreach ($data['answers'] as $answerData) {
                    Answer::create([
                        'question_id' => $question->id,
                        'content' => $answerData['content'],
                        'is_correct' => $answerData['is_correct'] ?? false,
                    ]);
                }
            }

            return $question->load('answers');
        });
    }

    public function getQuestionDetails(string $id)
    {
        return $this->repository->getQuestionWithAnswers($id);
    }
}
