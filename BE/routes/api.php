<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;

// 1. KHU VỰC CÔNG KHAI (Không cần đăng nhập)
Route::post('/login', [AuthController::class, 'login']);

// 2. KHU VỰC BẢO MẬT (Bắt buộc phải có Token mới cho vào)
Route::middleware('auth:sanctum')->group(function () {
    
    // API lấy thông tin người dùng đang đăng nhập
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ==========================================
    // CHỨC NĂNG HỌC SINH (Student)
    // ==========================================
    Route::get('/student/history', [ExamController::class, 'getHistory']);
    Route::get('/student/analytics', [ExamController::class, 'getAnalytics']);
    Route::get('/exams/{id}', [ExamController::class, 'getExam']);
    Route::post('/exams/{id}/submit', [ExamController::class, 'submitExam']);

    // ==========================================
    // CHỨC NĂNG GIÁO VIÊN (Teacher)
    // ==========================================
    Route::get('/questions', [QuestionController::class, 'index']);
    Route::post('/questions', [QuestionController::class, 'store']);

    // ==========================================
    // QUẢN LÝ TÀI KHOẢN (Admin/System)
    // ==========================================
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{id}', [UserController::class, 'show']);
    });
});