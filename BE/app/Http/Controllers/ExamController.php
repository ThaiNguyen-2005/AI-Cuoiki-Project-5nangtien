<?php

namespace App\Http\Controllers;

use App\Services\ExamService;
use App\Http\Requests\StoreExamRequest;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    protected $examService;

    public function __construct(ExamService $examService)
    {
        $this->examService = $examService;
    }

    /**
     * Lấy danh sách đề thi
     */
    public function index()
    {
        return response()->json($this->examService->getListExams());
    }

    /**
     * Tạo đề thi mới
     */
    public function store(StoreExamRequest $request)
    {
        $exam = $this->examService->createExam($request->validated());
        return response()->json($exam, 201);
    }

    /**
     * Lấy chi tiết đề thi (bao gồm câu hỏi)
     */
    public function show($id)
    {
        return response()->json($this->examService->getExamDetail($id));
    }
}
