<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AcademicController;

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
        Route::post('/quizzes/{id}/sync-questions',     [TeacherController::class, 'syncQuizQuestions']);
        Route::get('/quizzes/{id}/questions',           [TeacherController::class, 'getQuestions']);
        Route::post('/quizzes/{id}/questions',          [TeacherController::class, 'addQuestion']);
        Route::put('/quizzes/{id}/questions/{qid}',     [TeacherController::class, 'updateQuestion']);
        Route::delete('/quizzes/{id}/questions/{qid}',  [TeacherController::class, 'deleteQuestion']);
        Route::get('/results/{quizId}',                 [TeacherController::class, 'getResults']);
        Route::get('/analytics',                        [TeacherController::class, 'getAnalytics']);
        Route::get('/all-questions',                    [TeacherController::class, 'getAllQuestions']);

        // Academic Structure for Filters (Linked to new Academic Management)
        Route::get('/academic-structure', [AcademicController::class, 'getAcademicStructure']);
        Route::get('/subjects', [AcademicController::class, 'getSubjects']);
        Route::get('/chapters/{subjectId?}', [AcademicController::class, 'getChapters']);
        Route::get('/lessons/{chapterId?}',  [AcademicController::class, 'getLessons']);

        // Master Bank & Auto Gen
        Route::post('/questions', [TeacherController::class, 'addMasterQuestion']);
        Route::put('/questions/{id}', [TeacherController::class, 'updateMasterQuestion']);
        Route::delete('/questions/{id}', [TeacherController::class, 'deleteMasterQuestion']);
        Route::post('/quizzes/generate', [TeacherController::class, 'generateQuiz']);
    });

    Route::prefix('admin')->group(function () {
        Route::get('/stats',           [AdminController::class, 'getStats'])->middleware('role:admin');
        Route::get('/users',           [AdminController::class, 'getUsers'])->middleware('role:admin');
        Route::post('/users',          [AdminController::class, 'createUser'])->middleware('role:admin');
        Route::put('/users/{id}',      [AdminController::class, 'updateUser'])->middleware('role:admin');
        Route::delete('/users/{id}',   [AdminController::class, 'deleteUser'])->middleware('role:admin');
        Route::get('/quizzes',         [AdminController::class, 'getQuizzes'])->middleware('role:admin');
        Route::delete('/quizzes/{id}', [AdminController::class, 'deleteQuiz'])->middleware('role:admin');
        Route::get('/settings',        [AdminController::class, 'getSettings'])->middleware('role:admin');
        Route::put('/settings',        [AdminController::class, 'updateSettings'])->middleware('role:admin');

        // Academic Management
        Route::get('/subjects',      [AcademicController::class, 'getSubjects'])->middleware('role:admin');
        Route::post('/subjects',     [AcademicController::class, 'addSubject'])->middleware('role:admin');
        Route::put('/subjects/{id}', [AcademicController::class, 'updateSubject'])->middleware('role:admin');
        Route::delete('/subjects/{id}', [AcademicController::class, 'deleteSubject'])->middleware('role:admin');

        Route::get('/chapters',      [AcademicController::class, 'getChapters'])->middleware('role:admin');
        Route::post('/chapters',     [AcademicController::class, 'addChapter'])->middleware('role:admin');
        Route::put('/chapters/{id}', [AcademicController::class, 'updateChapter'])->middleware('role:admin');
        Route::delete('/chapters/{id}', [AcademicController::class, 'deleteChapter'])->middleware('role:admin');

        Route::get('/lessons',      [AcademicController::class, 'getLessons'])->middleware('role:admin');
        Route::post('/lessons',     [AcademicController::class, 'addLesson'])->middleware('role:admin');
        Route::put('/lessons/{id}', [AcademicController::class, 'updateLesson'])->middleware('role:admin');
        Route::delete('/lessons/{id}', [AcademicController::class, 'deleteLesson'])->middleware('role:admin');
    });
});