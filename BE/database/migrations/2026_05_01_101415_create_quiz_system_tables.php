<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Subjects
        Schema::create('subjects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->timestamps();
        });

        // 2. Chapters
        Schema::create('chapters', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->string('name');
            $table->timestamps();
        });

        // 3. Lessons
        Schema::create('lessons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('chapter_id')->constrained('chapters')->onDelete('cascade');
            $table->string('name');
            $table->timestamps();
        });

        // 4. Exams
        Schema::create('exams', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('teacher_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->integer('duration'); // minutes
            $table->timestamps();
        });

        // 5. Questions
        Schema::create('questions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('lesson_id')->constrained('lessons')->onDelete('cascade');
            $table->foreignUuid('teacher_id')->constrained('users')->onDelete('cascade');
            $table->text('content');
            $table->text('option_a'); // THÊM CỘT NÀY
    $table->text('option_b'); // THÊM CỘT NÀY
    $table->text('option_c'); // THÊM CỘT NÀY
    $table->text('option_d'); // THÊM CỘT NÀY
    $table->string('correct_answer', 1); // THÊM CỘT NÀY
    $table->string('level');
            $table->string('knowledge_type'); // Concept, Theorem, Property, Exercise
            $table->integer('difficulty'); // 1-5
            $table->timestamps();
        });

        // 6. Answers
        Schema::create('answers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('question_id')->constrained('questions')->onDelete('cascade');
            $table->text('content');
            $table->boolean('is_correct');
            $table->timestamps();
        });

        // 7. ExamQuestions (n-n)
        Schema::create('exam_questions', function (Blueprint $table) {
            $table->foreignUuid('exam_id')->constrained('exams')->onDelete('cascade');
            $table->foreignUuid('question_id')->constrained('questions')->onDelete('cascade');
            $table->integer('order_index');
            $table->primary(['exam_id', 'question_id']);
            $table->timestamps();
        });

        // 8. Attempts
        Schema::create('attempts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('exam_id')->constrained('exams')->onDelete('cascade');
            $table->timestamp('start_time');
            $table->timestamp('end_time')->nullable();
            $table->float('score')->nullable();
            $table->timestamps();
        });

        // 9. AttemptAnswers
        Schema::create('attempt_answers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('question_id')->constrained('questions')->onDelete('cascade');
            $table->foreignUuid('attempt_id')->constrained('attempts')->onDelete('cascade');
            $table->uuid('selected_answer_id')->nullable(); // can be null if not answered
            $table->text('question_content'); // snapshot
            $table->text('selected_answer_content')->nullable(); // snapshot
            $table->json('answers_snapshot'); // snapshot of all options
            $table->boolean('is_correct');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attempt_answers');
        Schema::dropIfExists('attempts');
        Schema::dropIfExists('exam_questions');
        Schema::dropIfExists('answers');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('exams');
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('chapters');
        Schema::dropIfExists('subjects');
    }
};
