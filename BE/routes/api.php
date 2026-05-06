<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ProfileController;

// ─── Auth (public) ──────────────────────────────────────────────────────────
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// ─── Protected routes ────────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);
    Route::get('/user',    [AuthController::class, 'me']);

    // Profile
    Route::get('/profile',          [ProfileController::class, 'show']);
    Route::put('/profile',          [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'changePassword']);

    // ── Student ────────────────────────────────────────────────────────────
    Route::prefix('student')->middleware('role:student')->group(function () {
        Route::get('/dashboard',           [StudentController::class, 'getDashboard']);
        Route::get('/quizzes',             [StudentController::class, 'getQuizList']);
        Route::get('/exam/{quizId}',       [StudentController::class, 'getExam']);
        Route::post('/exam/{quizId}',      [StudentController::class, 'submitExam']);
        Route::get('/history',             [StudentController::class, 'getHistory']);
        Route::get('/attempt/{attemptId}', [StudentController::class, 'getAttemptDetail']);
        Route::get('/analytics',           [StudentController::class, 'getAnalytics']);
        Route::get('/ai-evaluate',         [StudentController::class, 'getAIEvaluation']);
    });

    // ── Teacher ────────────────────────────────────────────────────────────
    Route::prefix('teacher')->middleware('role:teacher,admin')->group(function () {
        Route::get('/quizzes',                          [TeacherController::class, 'getQuizList']);
        Route::post('/quizzes',                         [TeacherController::class, 'createQuiz']);
        Route::put('/quizzes/{id}',                     [TeacherController::class, 'updateQuiz']);
        Route::delete('/quizzes/{id}',                  [TeacherController::class, 'deleteQuiz']);
        Route::patch('/quizzes/{id}/toggle',            [TeacherController::class, 'toggleQuiz']);
        Route::get('/quizzes/{id}/questions',           [TeacherController::class, 'getQuestions']);
        Route::post('/quizzes/{id}/questions',          [TeacherController::class, 'addQuestion']);
        Route::put('/quizzes/{id}/questions/{qid}',     [TeacherController::class, 'updateQuestion']);
        Route::delete('/quizzes/{id}/questions/{qid}',  [TeacherController::class, 'deleteQuestion']);
        Route::get('/results/{quizId}',                 [TeacherController::class, 'getResults']);
        Route::get('/analytics',                        [TeacherController::class, 'getAnalytics']);
        Route::get('/all-questions', [TeacherController::class, 'getAllQuestions']);

        // Master Bank & Auto Gen
        Route::get('/subjects', [TeacherController::class, 'getSubjects']);
        Route::get('/chapters/all', [TeacherController::class, 'getChapters'])->defaults('subjectId', 'all');
        Route::get('/chapters/{subjectId}', [TeacherController::class, 'getChapters']);
        Route::get('/lessons/{chapterId}', [TeacherController::class, 'getLessons']);
        Route::post('/questions', [TeacherController::class, 'addMasterQuestion']);
        Route::put('/questions/{id}', [TeacherController::class, 'updateMasterQuestion']);
        Route::delete('/questions/{id}', [TeacherController::class, 'deleteMasterQuestion']);
        Route::post('/quizzes/generate', [TeacherController::class, 'generateQuiz']);
    });

    // ── Admin ──────────────────────────────────────────────────────────────
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/stats',           [AdminController::class, 'getStats']);
        Route::get('/users',           [AdminController::class, 'getUsers']);
        Route::post('/users',          [AdminController::class, 'createUser']);
        Route::delete('/users/{id}',   [AdminController::class, 'deleteUser']);
        Route::get('/quizzes',         [AdminController::class, 'getQuizzes']);
        Route::delete('/quizzes/{id}', [AdminController::class, 'deleteQuiz']);
        Route::get('/settings',        [AdminController::class, 'getSettings']);
        Route::put('/settings',        [AdminController::class, 'updateSettings']);
    });
});