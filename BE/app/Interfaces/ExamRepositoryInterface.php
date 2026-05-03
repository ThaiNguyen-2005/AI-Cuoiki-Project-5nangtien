<?php

namespace App\Interfaces;

interface ExamRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Lấy danh sách đề thi kèm theo thông tin giáo viên và môn học (thông qua lesson/chapter)
     */
    public function getExamsWithDetails();

    /**
     * Phân trang danh sách đề thi
     */
    public function paginateExams(int $perPage = 15);

    /**
     * Lấy chi tiết đề thi kèm theo danh sách câu hỏi
     * @param string $id
     */
    public function getExamWithQuestions(string $id);
}
