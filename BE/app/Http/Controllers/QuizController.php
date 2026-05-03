<?php

namespace App\Http\Controllers;

use App\Services\QuizService;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    protected $quizService;

    public function __construct(QuizService $quizService)
    {
        $this->quizService = $quizService;
    }

    /**
     * Bắt đầu lượt làm bài mới
     */
    public function start(Request $request)
    {
        $studentId = $request->input('student_id');
        $examId = $request->input('exam_id');
        
        $attempt = $this->quizService->startAttempt($studentId, $examId);
        return response()->json($attempt, 201);
    }

    /**
     * Nộp bài làm
     */
    public function submit(Request $request, $attemptId)
    {
        $answers = $request->input('answers'); // Format: { "q_uuid": "a_uuid", ... }
        
        $result = $this->quizService->submitAttempt($attemptId, $answers);
        return response()->json($result);
    }

    /**
     * Xem lại kết quả bài làm chi tiết
     */
    public function showReview($attemptId)
    {
        $review = $this->quizService->getAttemptReview($attemptId);
        return response()->json($review);
    }

    /**
     * Xem lịch sử làm bài của một học sinh
     */
    public function history($studentId)
    {
        $history = $this->quizService->getUserHistory($studentId);
        return response()->json($history);
    }
}
