<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Question extends Model
{
    use HasUuids;

    // Phải khớp y chang các cột trong Database
    protected $fillable = [
        'lesson_id', 
        'teacher_id', 
        'content', 
        'option_a', 
        'option_b', 
        'option_c', 
        'option_d', 
        'correct_answer', 
        'level'
    ];

    public function lesson() {
        return $this->belongsTo(Lesson::class);
    }

    public function teacher() {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}