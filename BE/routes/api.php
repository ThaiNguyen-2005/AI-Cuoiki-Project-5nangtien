<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;

// 1. KHU VỰC CÔNG KHAI
Route::post('/login', [AuthController::class, 'login']);

// 2. KHU VỰC BẢO MẬT
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ==========================================
    // CHỨC NĂNG HỌC SINH
    // ==========================================
    Route::get('/student/history', [ExamController::class, 'getHistory']);
    Route::get('/student/analytics', [ExamController::class, 'getAnalytics']);
    Route::get('/exams/{id}', [ExamController::class, 'getExam']);
    Route::post('/exams/{id}/submit', [ExamController::class, 'submitExam']);

    // ==========================================
    // CHỨC NĂNG GIÁO VIÊN
    // ==========================================
    Route::get('/teacher/questions', [QuestionController::class, 'index']);
    Route::post('/teacher/questions', [QuestionController::class, 'store']);

    // Quiz
    Route::get('/teacher/quizzes', [QuizController::class, 'index']);
    Route::post('/teacher/quizzes', [QuizController::class, 'store']);
    Route::get('/teacher/quizzes/{id}', [QuizController::class, 'show']);
    Route::delete('/teacher/quizzes/{id}', [QuizController::class, 'destroy']);

    // ==========================================
    // QUẢN LÝ TÀI KHOẢN (Admin)
    // ==========================================
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{id}', [UserController::class, 'show']);
    });
});