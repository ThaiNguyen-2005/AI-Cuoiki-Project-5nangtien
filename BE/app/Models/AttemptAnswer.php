<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class AttemptAnswer extends Model
{
    use HasUuids;

    protected $fillable = [
        'question_id', 
        'attempt_id', 
        'selected_answer_id', 
        'question_content', 
        'selected_answer_content', 
        'answers_snapshot', 
        'is_correct'
    ];

    protected $casts = [
        'answers_snapshot' => 'array',
        'is_correct' => 'boolean'
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function attempt()
    {
        return $this->belongsTo(Attempt::class);
    }
}
