<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Quiz;
use App\Models\QuizQuestion;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Users ──────────────────────────────────────────────
        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            ['name' => 'Admin', 'password' => Hash::make('123456'), 'role' => 'admin']
        );

        $teacher = User::firstOrCreate(
            ['email' => 'teacher@gmail.com'],
            ['name' => 'Giáo viên', 'password' => Hash::make('123456'), 'role' => 'teacher']
        );

        User::firstOrCreate(
            ['email' => 'student@gmail.com'],
            ['name' => 'Học sinh', 'password' => Hash::make('123456'), 'role' => 'student']
        );

        // ── Quiz 1 ─────────────────────────────────────────────
        $quiz1 = Quiz::firstOrCreate(
            ['title' => 'Hóa học cơ bản lớp 10'],
            [
                'teacher_id'    => $teacher->id,
                'description'   => 'Kiểm tra kiến thức hóa học cơ bản',
                'subject'       => 'Hóa học',
                'grade'         => '10',
                'time_limit'    => 20,
                'passing_score' => 70,
                'status'        => 'published',
            ]
        );

        if ($quiz1->questions()->count() === 0) {
            $questions1 = [
                ['Nguyên tố nào có ký hiệu hóa học là H?',   ['Hydro', 'Heli', 'Hafni', 'Holmi'],          0],
                ['Công thức hóa học của nước là gì?',         ['H2O', 'CO2', 'NaCl', 'HCl'],                 0],
                ['Nguyên tử số của Carbon là bao nhiêu?',     ['6', '8', '12', '14'],                        0],
                ['Phản ứng nào sau đây là phản ứng oxi hóa?', ['Fe + O2 → Fe2O3', 'NaOH + HCl → NaCl + H2O', 'CaCO3 → CaO + CO2', 'H2 + Cl2 → 2HCl'], 0],
                ['Kim loại nào dẫn điện tốt nhất?',           ['Bạc', 'Đồng', 'Vàng', 'Nhôm'],              0],
            ];
            foreach ($questions1 as $i => [$content, $options, $correct]) {
                QuizQuestion::create([
                    'quiz_id'       => $quiz1->id,
                    'content'       => $content,
                    'type'          => 'multiple_choice',
                    'options'       => $options,
                    'correct_index' => $correct,
                    'explanation'   => 'Đây là đáp án đúng.',
                    'order'         => $i + 1,
                ]);
            }
        }

        // ── Quiz 2 ─────────────────────────────────────────────
        $quiz2 = Quiz::firstOrCreate(
            ['title' => 'Lịch sử Việt Nam'],
            [
                'teacher_id'    => $teacher->id,
                'description'   => 'Kiểm tra lịch sử Việt Nam',
                'subject'       => 'Lịch sử',
                'grade'         => '10',
                'time_limit'    => 15,
                'passing_score' => 60,
                'status'        => 'published',
            ]
        );

        if ($quiz2->questions()->count() === 0) {
            $questions2 = [
                ['Năm nào Việt Nam giành độc lập từ thực dân Pháp?', ['1945', '1954', '1975', '1930'], 0],
                ['Ai là chủ tịch đầu tiên của nước Việt Nam?',       ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Trường Chinh', 'Phạm Văn Đồng'], 0],
                ['Chiến dịch Điện Biên Phủ diễn ra năm nào?',        ['1954', '1945', '1968', '1972'], 0],
                ['Thủ đô của Việt Nam là gì?',                        ['Hà Nội', 'TP.HCM', 'Huế', 'Đà Nẵng'], 0],
                ['Ngày Quốc khánh Việt Nam là ngày nào?',            ['2/9', '30/4', '19/8', '1/5'], 0],
            ];
            foreach ($questions2 as $i => [$content, $options, $correct]) {
                QuizQuestion::create([
                    'quiz_id'       => $quiz2->id,
                    'content'       => $content,
                    'type'          => 'multiple_choice',
                    'options'       => $options,
                    'correct_index' => $correct,
                    'explanation'   => 'Đây là đáp án đúng.',
                    'order'         => $i + 1,
                ]);
            }
        }

        echo "\n✅ Seed xong!\n";
        echo "   Admin:   admin@gmail.com / 123456\n";
        echo "   Teacher: teacher@gmail.com / 123456\n";
        echo "   Student: student@gmail.com / 123456\n\n";
    }
}