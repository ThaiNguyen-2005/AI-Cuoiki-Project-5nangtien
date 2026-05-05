<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quiz_attempts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('student_id');
            $table->uuid('quiz_id');
            $table->integer('score');           // 0-100 (%)
            $table->integer('correct');         // số câu đúng
            $table->integer('total');           // tổng số câu
            $table->boolean('passed');
            $table->integer('time_spent');      // phút
            $table->json('answers');            // {"0":2,"1":0,...} index câu -> index đáp án chọn
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('quiz_id')->references('id')->on('quizzes')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_attempts');
    }
};