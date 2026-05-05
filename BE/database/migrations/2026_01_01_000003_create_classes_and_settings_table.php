<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Bảng lớp học
        if (!Schema::hasTable('classes')) {
            Schema::create('classes', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('name');
                $table->integer('grade')->default(10); // 10, 11, 12
                $table->uuid('teacher_id')->nullable();
                $table->foreign('teacher_id')->references('id')->on('users')->nullOnDelete();
                $table->timestamps();
            });
        }

        // Bảng liên kết học sinh - lớp
        if (!Schema::hasTable('class_students')) {
            Schema::create('class_students', function (Blueprint $table) {
                $table->uuid('class_id');
                $table->uuid('student_id');
                $table->primary(['class_id', 'student_id']);
                $table->foreign('class_id')->references('id')->on('classes')->cascadeOnDelete();
                $table->foreign('student_id')->references('id')->on('users')->cascadeOnDelete();
                $table->timestamps();
            });
        }

        // Bảng cài đặt hệ thống
        if (!Schema::hasTable('settings')) {
            Schema::create('settings', function (Blueprint $table) {
                $table->string('key')->primary();
                $table->text('value')->nullable();
                $table->timestamps();
            });

            // Seed các cài đặt mặc định
            DB::table('settings')->insert([
                ['key' => 'site_name',       'value' => 'Kinetic Chemistry', 'created_at' => now(), 'updated_at' => now()],
                ['key' => 'passing_score',   'value' => '50',               'created_at' => now(), 'updated_at' => now()],
                ['key' => 'allow_register',  'value' => '1',                'created_at' => now(), 'updated_at' => now()],
                ['key' => 'max_attempts',    'value' => '3',                'created_at' => now(), 'updated_at' => now()],
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('class_students');
        Schema::dropIfExists('classes');
        Schema::dropIfExists('settings');
    }
};