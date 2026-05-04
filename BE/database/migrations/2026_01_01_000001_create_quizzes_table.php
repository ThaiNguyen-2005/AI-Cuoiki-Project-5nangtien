<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('teacher_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('subject')->default('Hóa học');
            $table->string('grade')->default('10');
            $table->integer('time_limit')->default(30); // phút
            $table->integer('passing_score')->default(70); // %
            $table->enum('status', ['draft', 'published'])->default('published');
            $table->timestamps();

            $table->foreign('teacher_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('quiz_id');
            $table->text('content');
            $table->string('type')->default('multiple_choice');
            $table->json('options'); // ["A","B","C","D"]
            $table->integer('correct_index'); // 0,1,2,3
            $table->text('explanation')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->foreign('quiz_id')->references('id')->on('quizzes')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
        Schema::dropIfExists('quizzes');
    }
};