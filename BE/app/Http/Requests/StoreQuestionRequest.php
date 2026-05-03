<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'content' => 'required|string',
            'lesson_id' => 'required|exists:lessons,id',
            'teacher_id' => 'required|exists:users,id',
            'knowledge_type' => 'required|string',
            'difficulty' => 'required|integer|min:1|max:5',
            'answers' => 'required|array|min:2',
            'answers.*.content' => 'required|string',
            'answers.*.is_correct' => 'required|boolean',
        ];
    }
}
