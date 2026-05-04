<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
{
    // Xóa dòng tạo user mẫu cũ (nếu có) và dán đống này vào
    \App\Models\User::create([
        'id' => 1,
        'name' => 'Quản trị viên',
        'email' => 'admin@gmail.com',
        'password' => bcrypt('admin123'),
        'role' => 'admin'
    ]);

    \App\Models\User::create([
        'id' => 2,
        'name' => 'Giáo viên Hóa',
        'email' => 'teacher@gmail.com',
        'password' => bcrypt('teacher123'),
        'role' => 'teacher'
    ]);

    \App\Models\User::create([
        'id' => 3,
        'name' => 'Nguyễn Văn A',
        'email' => 'student@gmail.com',
        'password' => bcrypt('student123'),
        'role' => 'student'
    ]);
}
}
