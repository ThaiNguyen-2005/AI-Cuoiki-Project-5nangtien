<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChemistryQuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Tạo Giáo viên mẫu
        $teacher = \App\Models\User::create([
            'name' => 'Thầy Giáo Hóa',
            'email' => 'teacher@chemistry.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'teacher',
        ]);

        // 2. Tạo Môn học
        $subject = \App\Models\Subject::create(['name' => 'Hóa Học']);

        // 3. Tạo Chương
        $chapter = \App\Models\Chapter::create([
            'subject_id' => $subject->id,
            'name' => 'Chương 1: Các loại hợp chất vô cơ'
        ]);

        // 4. Tạo Bài học
        $lesson = \App\Models\Lesson::create([
            'chapter_id' => $chapter->id,
            'name' => 'Bài 1: Axit, Bazơ và Muối'
        ]);

        // 5. Tạo các câu hỏi mẫu với LaTeX
        $questions = [
            [
                'content' => 'Công thức hóa học của Axit Sunfuric là gì?',
                'difficulty' => 1,
                'answers' => [
                    ['content' => '$H_2SO_4$', 'is_correct' => true],
                    ['content' => '$HCl$', 'is_correct' => false],
                    ['content' => '$HNO_3$', 'is_correct' => false],
                    ['content' => '$H_3PO_4$', 'is_correct' => false],
                ]
            ],
            [
                'content' => 'Trong phản ứng: $2H_2 + O_2 \rightarrow 2H_2O$, tỉ lệ số mol giữa $H_2$ và $O_2$ là bao nhiêu?',
                'difficulty' => 2,
                'answers' => [
                    ['content' => '2:1', 'is_correct' => true],
                    ['content' => '1:1', 'is_correct' => false],
                    ['content' => '1:2', 'is_correct' => false],
                    ['content' => '2:2', 'is_correct' => false],
                ]
            ],
            [
                'content' => 'Chất nào sau đây làm quỳ tím hóa xanh?',
                'difficulty' => 1,
                'answers' => [
                    ['content' => '$NaOH$', 'is_correct' => true],
                    ['content' => '$H_2SO_4$', 'is_correct' => false],
                    ['content' => '$NaCl$', 'is_correct' => false],
                    ['content' => '$CO_2$', 'is_correct' => false],
                ]
            ],
            [
                'content' => 'Cho phương trình: $BaCl_2 + H_2SO_4 \rightarrow BaSO_4 \downarrow + 2HCl$. Kết tủa $BaSO_4$ có màu gì?',
                'difficulty' => 2,
                'answers' => [
                    ['content' => 'Trắng', 'is_correct' => true],
                    ['content' => 'Xanh', 'is_correct' => false],
                    ['content' => 'Vàng', 'is_correct' => false],
                    ['content' => 'Đen', 'is_correct' => false],
                ]
            ]
        ];

        foreach ($questions as $qData) {
            $question = \App\Models\Question::create([
                'lesson_id' => $lesson->id,
                'teacher_id' => $teacher->id,
                'content' => $qData['content'],
                'knowledge_type' => 'Concept',
                'difficulty' => $qData['difficulty'],
            ]);

            foreach ($qData['answers'] as $aData) {
                \App\Models\Answer::create([
                    'question_id' => $question->id,
                    'content' => $aData['content'],
                    'is_correct' => $aData['is_correct'],
                ]);
            }
        }
    }
}
