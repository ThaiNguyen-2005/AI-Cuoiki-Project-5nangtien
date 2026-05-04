<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content'        => 'required|string',
            'option_a'       => 'required|string',
            'option_b'       => 'required|string',
            'option_c'       => 'required|string',
            'option_d'       => 'required|string',
            'correct_answer' => 'required|in:A,B,C,D',
            'level'          => 'required|string',
            'lesson_id'      => 'required', // Bắt buộc phải có
        ]);

        $validated['teacher_id'] = $request->user()->id;

        try {
            $question = Question::create($validated);
            return response()->json(['success' => true, 'data' => $question], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}