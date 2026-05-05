<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class QuizAttempt extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Str::uuid()->toString();
            }
        });
    }

    protected $fillable = [
        'student_id',
        'quiz_id',
        'score',
        'correct',
        'total',
        'passed',
        'time_spent',
        'answers',
        'questions_snapshot',
    ];

    protected $casts = [
        'answers'    => 'array',
        'score'      => 'integer',
        'correct'    => 'integer',
        'total'      => 'integer',
        'passed'     => 'boolean',
        'time_spent' => 'integer',
        'questions_snapshot' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}