<?php

namespace App\Http\Controllers;

use App\Services\QuestionService;
use App\Http\Requests\StoreQuestionRequest;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    protected $questionService;

    public function __construct(QuestionService $questionService)
    {
        $this->questionService = $questionService;
    }

    /**
     * Tạo câu hỏi mới trong ngân hàng
     */
    public function store(StoreQuestionRequest $request)
    {
        $question = $this->questionService->createQuestionWithAnswers($request->validated());
        return response()->json($question, 201);
    }

    /**
     * Lấy chi tiết câu hỏi
     */
    public function show($id)
    {
        return response()->json($this->questionService->getQuestionDetails($id));
    }
}
