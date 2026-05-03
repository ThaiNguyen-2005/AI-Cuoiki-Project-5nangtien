<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController; // Khai báo thêm AuthController

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ĐÂY, API ĐĂNG NHẬP MÀ ÔNG ĐANG TÌM ĐÂY
Route::post('/login', [AuthController::class, 'login']);

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::get('/{id}', [UserController::class, 'show']);
});