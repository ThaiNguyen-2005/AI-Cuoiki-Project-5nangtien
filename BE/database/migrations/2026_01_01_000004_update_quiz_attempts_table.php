<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // File này chỉ thêm cột nếu bảng đã tồn tại
    // Bảng quiz_attempts được tạo bởi 2026_01_01_000002
    public function up(): void
    {
        if (Schema::hasTable('quiz_attempts')) {
            Schema::table('quiz_attempts', function (Blueprint $table) {
                // Không cần thêm gì vì 000002 đã có đủ cột
            });
        }
    }

    public function down(): void
    {
        // Không làm gì
    }
};