<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Exam extends Model
{
    use HasUuids;

    protected $fillable = ['teacher_id', 'title', 'duration'];

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'exam_questions')
                    ->withPivot('order_index')
                    ->withTimestamps();
    }

    public function attempts()
    {
        return $this->hasMany(Attempt::class);
    }
}
