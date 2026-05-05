<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\StudentService;
use App\Services\ExamService;

class StudentController extends Controller
{
    protected $studentService;
    protected $examService;

    public function __construct(StudentService $studentService, ExamService $examService)
    {
        $this->studentService = $studentService;
        $this->examService = $examService;
    }

    // Dashboard tổng quan học sinh
    public function getDashboard(Request $request)
    {
        return response()->json($this->studentService->getDashboardData(Auth::user()));
    }

    // Danh sách quiz student có thể làm
    public function getQuizList(Request $request)
    {
        return response()->json($this->studentService->getQuizList(Auth::id()));
    }

    // Lấy đề thi
    public function getExam($quizId)
    {
        try {
            return response()->json($this->examService->getExamData($quizId, Auth::id()));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    // Nộp bài và tính điểm
    public function submitExam(Request $request, $quizId)
    {
        $request->validate([
            'answers' => 'required|array',
        ]);

        $rawAnswers = $request->input('answers', []);
        $answerMap = [];
        foreach ($rawAnswers as $a) {
            if (is_array($a) && isset($a['question_id'])) {
                $answerMap[(string)$a['question_id']] = $a['selected_index'];
            } else {
                $answerMap = $rawAnswers;
                break;
            }
        }

        try {
            $result = $this->examService->submitExam(
                $quizId, 
                Auth::id(), 
                $answerMap, 
                $request->input('time_spent', 0)
            );
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    // Lịch sử làm bài
    public function getHistory(Request $request)
    {
        return response()->json($this->studentService->getHistory(Auth::id()));
    }

    // Chi tiết 1 lần thi
    public function getAttemptDetail($attemptId)
    {
        try {
            return response()->json($this->examService->getAttemptDetail($attemptId, Auth::id()));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    // Thống kê cá nhân
    public function getAnalytics(Request $request)
    {
        return response()->json($this->studentService->getAnalytics(Auth::id()));
    }
}