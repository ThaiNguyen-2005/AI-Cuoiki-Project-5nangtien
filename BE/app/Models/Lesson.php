<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Lesson extends Model
{
    use HasUuids;

    protected $fillable = ['chapter_id', 'name'];

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
