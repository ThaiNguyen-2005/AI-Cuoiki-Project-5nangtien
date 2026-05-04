<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            'name' => 'Quản trị viên',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin'
        ]);

        User::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            'name' => 'Giáo viên Hóa',
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('teacher123'),
            'role' => 'teacher'
        ]);

        User::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            'name' => 'Nguyễn Văn A',
            'email' => 'student@gmail.com',
            'password' => Hash::make('student123'),
            'role' => 'student'
        ]);
    }
}