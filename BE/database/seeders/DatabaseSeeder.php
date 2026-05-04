<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->whereIn('email', [
            'admin@gmail.com', 'teacher@gmail.com', 'student@gmail.com'
        ])->delete();

        DB::table('users')->insert([
            ['id' => Str::uuid(), 'name' => 'Admin',   'email' => 'admin@gmail.com',   'password' => bcrypt('123456'), 'role' => 'admin',   'created_at' => now(), 'updated_at' => now()],
            ['id' => Str::uuid(), 'name' => 'Teacher', 'email' => 'teacher@gmail.com', 'password' => bcrypt('123456'), 'role' => 'teacher', 'created_at' => now(), 'updated_at' => now()],
            ['id' => Str::uuid(), 'name' => 'Student', 'email' => 'student@gmail.com', 'password' => bcrypt('123456'), 'role' => 'student', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}