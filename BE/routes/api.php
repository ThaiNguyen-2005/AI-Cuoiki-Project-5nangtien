<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AuthController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Profile & Stats
    Route::get('/me', [UserController::class, 'profile']);
    Route::put('/me', [UserController::class, 'updateProfile']);
    Route::put('/me/password', [UserController::class, 'updatePassword']);
    Route::get('/my-stats', [UserController::class, 'myStats']);

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
    });

    Route::prefix('exams')->group(function () {
        Route::get('/', [ExamController::class, 'index']);
        Route::post('/', [ExamController::class, 'store']);
        Route::get('/{id}', [ExamController::class, 'show']);
    });

    Route::prefix('questions')->group(function () {
        Route::post('/', [QuestionController::class, 'store']);
        Route::get('/{id}', [QuestionController::class, 'show']);
    });

    Route::prefix('quiz')->group(function () {
        Route::post('/start', [QuizController::class, 'start']);
        Route::post('/submit/{attemptId}', [QuizController::class, 'submit']);
        Route::get('/review/{attemptId}', [QuizController::class, 'showReview']);
        Route::get('/history/{studentId}', [QuizController::class, 'history']);
    });
});
