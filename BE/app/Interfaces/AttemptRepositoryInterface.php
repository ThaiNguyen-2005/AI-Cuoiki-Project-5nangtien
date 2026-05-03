<?php

namespace App\Interfaces;

interface AttemptRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Lấy lịch sử làm bài của một sinh viên
     */
    public function getStudentHistory(string $studentId);

    /**
     * Lấy chi tiết một bài làm kèm theo các câu trả lời
     */
    public function getAttemptWithAnswers(string $attemptId);
}
