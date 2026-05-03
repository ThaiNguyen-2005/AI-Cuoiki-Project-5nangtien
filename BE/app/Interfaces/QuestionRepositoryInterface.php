<?php

namespace App\Interfaces;

interface QuestionRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Lấy danh sách câu hỏi theo bài học (Lesson)
     */
    public function getQuestionsByLesson(string $lessonId);

    /**
     * Lấy chi tiết câu hỏi kèm danh sách đáp án
     */
    public function getQuestionWithAnswers(string $id);
}
