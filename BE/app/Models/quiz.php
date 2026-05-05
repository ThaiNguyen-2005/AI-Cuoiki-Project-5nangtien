<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Quiz extends Model
{
    use HasFactory, SoftDeletes;

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
        'title', 'description', 'grade', 'teacher_id', 'time_limit', 'passing_score', 'subject', 'knowledge_type', 'status', 'difficulty'
    ];

    protected $casts = [
        'time_limit'    => 'integer',
        'passing_score' => 'integer',
    ];

    public function teacher()  { return $this->belongsTo(User::class, 'teacher_id'); }
    public function user()     { return $this->belongsTo(User::class, 'teacher_id'); }
    public function questions(){ return $this->hasMany(QuizQuestion::class); }
    public function attempts() { return $this->hasMany(QuizAttempt::class); }
}