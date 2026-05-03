<?php

namespace App\Services;

use App\Interfaces\AttemptRepositoryInterface;
use App\Interfaces\ExamRepositoryInterface;
use App\Models\AttemptAnswer;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class QuizService extends BaseService
{
    protected $examRepository;

    public function __construct(
        AttemptRepositoryInterface $repository,
        ExamRepositoryInterface $examRepository
    ) {
        parent::__construct($repository);
        $this->examRepository = $examRepository;
    }

    /**
     * Bắt đầu một lượt làm bài mới
     * @param string $studentId
     * @param string $examId
     * @return \App\Models\Attempt
     */
    public function startAttempt(string $studentId, string $examId)
    {
        return $this->repository->create([
            'student_id' => $studentId,
            'exam_id' => $examId,
            'start_time' => Carbon::now(),
        ]);
    }

    /**
     * Nộp bài và tính điểm
     * @param string $attemptId
     * @param array $submittedAnswers Mảng chứa [question_id => selected_answer_id]
     * @return \App\Models\Attempt
     */
    public function submitAttempt(string $attemptId, array $submittedAnswers)
    {
        return DB::transaction(function () use ($attemptId, $submittedAnswers) {
            $attempt = $this->repository->find($attemptId);
            $exam = $this->examRepository->getExamWithQuestions($attempt->exam_id);
            
            $correctCount = 0;
            $totalQuestions = $exam->questions->count();

            foreach ($exam->questions as $question) {
                $selectedAnswerId = $submittedAnswers[$question->id] ?? null;
                
                // Lấy đáp án đúng từ database
                $correctAnswer = $question->answers->where('is_correct', true)->first();
                $isCorrect = ($selectedAnswerId === $correctAnswer?->id);
                
                if ($isCorrect) {
                    $correctCount++;
                }

                // Lưu Snapshot (Quan trọng để bảo toàn dữ liệu khi đề bài bị sửa sau này)
                AttemptAnswer::create([
                    'attempt_id' => $attemptId,
                    'question_id' => $question->id,
                    'selected_answer_id' => $selectedAnswerId,
                    'question_content' => $question->content,
                    'selected_answer_content' => $question->answers->where('id', $selectedAnswerId)->first()?->content,
                    'answers_snapshot' => $question->answers->toArray(),
                    'is_correct' => $isCorrect,
                ]);
            }

            // Tính điểm (Thang điểm 10)
            $score = ($totalQuestions > 0) ? ($correctCount / $totalQuestions) * 10 : 0;

            // Cập nhật kết quả bài làm
            $attempt->update([
                'end_time' => Carbon::now(),
                'score' => $score,
            ]);

            return $attempt->load('attemptAnswers');
        });
    }

    /**
     * Xem lại chi tiết một bài làm
     */
    public function getAttemptReview(string $attemptId)
    {
        return $this->repository->getAttemptWithAnswers($attemptId);
    }

    /**
     * Lấy lịch sử làm bài của học sinh
     */
    public function getUserHistory(string $studentId)
    {
        return $this->repository->getStudentHistory($studentId);
    }

    /**
     * Lấy thống kê làm bài của học sinh
     */
    public function getUserStats(string $studentId)
    {
        $attempts = $this->repository->model->where('student_id', $studentId)
                                            ->whereNotNull('score')
                                            ->get();

        return [
            'total_attempts' => $attempts->count(),
            'average_score' => round($attempts->avg('score'), 2),
            'highest_score' => $attempts->max('score'),
            'lowest_score' => $attempts->min('score'),
        ];
    }
}
