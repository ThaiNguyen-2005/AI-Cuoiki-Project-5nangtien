<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Tạo Users Hệ Thống ──────────────────────────────────
        User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            ['name' => 'Admin', 'password' => Hash::make('123456'), 'role' => 'admin']
        );

        User::firstOrCreate(
            ['email' => 'teacher@gmail.com'],
            ['name' => 'Giáo viên Hóa học', 'password' => Hash::make('123456'), 'role' => 'teacher']
        );

        User::firstOrCreate(
            ['email' => 'student@gmail.com'],
            ['name' => 'Học sinh', 'password' => Hash::make('123456'), 'role' => 'student']
        );

        // ── Gọi Seeder Chuyên Ngành ──────────────────────────────
        $this->call([
            ChemistrySeeder::class,
        ]);

        echo "\n✅ Hệ thống đã được làm sạch và nạp dữ liệu Hóa học thực tế!\n";
        echo "   Admin:   admin@gmail.com / 123456\n";
        echo "   Teacher: teacher@gmail.com / 123456\n";
        echo "   Student: student@gmail.com / 123456\n\n";
    }
}