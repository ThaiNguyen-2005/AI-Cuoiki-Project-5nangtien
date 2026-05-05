<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Question extends Model
{
    use HasUuids;

    protected $fillable = [
        'lesson_id', 
        'teacher_id', 
        'content', 
        'option_a', 
        'option_b', 
        'option_c', 
        'option_d', 
        'correct_answer', 
        'level', 
        'knowledge_type', 
        'difficulty',
        'explanation'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
