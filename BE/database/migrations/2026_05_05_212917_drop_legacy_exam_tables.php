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
        // Xóa các bảng cũ không còn sử dụng trong hệ thống mới
        Schema::dropIfExists('attempt_answers');
        Schema::dropIfExists('attempts');
        Schema::dropIfExists('exam_questions');
        Schema::dropIfExists('answers');
        Schema::dropIfExists('exams');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Không thể rollback vì dữ liệu đã mất, 
        // nhưng nếu cần có thể định nghĩa lại cấu trúc ở đây.
    }
};
