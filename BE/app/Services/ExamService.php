<?php

namespace App\Services;

use App\Interfaces\ExamRepositoryInterface;

class ExamService extends BaseService
{
    public function __construct(ExamRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function getListExams()
    {
        return $this->repository->getExamsWithDetails();
    }

    public function getExamDetail(string $id)
    {
        return $this->repository->getExamWithQuestions($id);
    }

    /**
     * Logic để tạo đề thi mới và gán câu hỏi
     * @param array $data
     * @return \App\Models\Exam
     */
    public function createExam(array $data)
    {
        $exam = $this->repository->create([
            'teacher_id' => $data['teacher_id'],
            'title' => $data['title'],
            'duration' => $data['duration'],
        ]);

        if (isset($data['question_ids']) && is_array($data['question_ids'])) {
            $questions = [];
            foreach ($data['question_ids'] as $index => $qId) {
                $questions[$qId] = ['order_index' => $index + 1];
            }
            $exam->questions()->sync($questions);
        }

        return $exam;
    }
}
