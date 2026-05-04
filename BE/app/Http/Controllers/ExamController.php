<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExamController extends Controller
{
    // API 1: Trả về cái đề thi
    public function getExam($id)
    {
        $exam = [
            "id" => (int)$id,
            "title" => "Kiểm tra 15p - Chương Hydrocarbon",
            "duration" => 15,
            "questions" => [
                [
                    "id" => 101,
                    "content" => "Công thức tổng quát của Ankan là gì?",
                    "options" => [
                        ["id" => 1, "text" => "CnH2n"],
                        ["id" => 2, "text" => "CnH2n+2"],
                        ["id" => 3, "text" => "CnH2n-2"],
                        ["id" => 4, "text" => "CnH2n-6"]
                    ]
                ],
                [
                    "id" => 102,
                    "content" => "Chất nào sau đây làm mất màu dung dịch Brom?",
                    "options" => [
                        ["id" => 5, "text" => "Metan (CH4)"],
                        ["id" => 6, "text" => "Etan (C2H6)"],
                        ["id" => 7, "text" => "Etilen (C2H4)"],
                        ["id" => 8, "text" => "Propan (C3H8)"]
                    ]
                ]
            ]
        ];

        return response()->json($exam, 200);
    }

    // API 2: Chấm điểm
    public function submitExam(Request $request, $id)
    {
        $answers = $request->input('answers'); 

        return response()->json([
            "score" => 8.5,
            "correct_count" => 8,
            "total_questions" => 10,
            "message" => "Nộp bài thành công!"
        ], 200);
    }
    // Trong ExamController.php
public function getAnalytics()
{
    // Giả lập dữ liệu thống kê từ database
    $analytics = [
        "total_exams" => 15,          // Tổng số bài đã làm
        "average_score" => 7.8,       // Điểm trung bình
        "completed_chapters" => 4,    // Số chương đã hoàn thành
        "highest_score" => 10.0,      // Điểm cao nhất
        "study_hours" => 12,          // Số giờ học tập
        "recent_performance" => [     // Dữ liệu cho biểu đồ (nếu muốn làm thêm)
            ["label" => "Tuần 1", "score" => 6.5],
            ["label" => "Tuần 2", "score" => 7.0],
            ["label" => "Tuần 3", "score" => 8.5],
            ["label" => "Tuần 4", "score" => 7.8]
        ]
    ];

    return response()->json($analytics, 200);
}

    // API 3: Lấy lịch sử (Dùng để fix lỗi trang Lịch sử trống trơn)
    public function getHistory()
    {
        $history = [
            [
                "id" => 1,
                "exam_title" => "Kiểm tra 15p - Chương Hydrocarbon",
                "score" => 8.5,
                "correct_count" => 8,
                "total_questions" => 10,
                "date" => "2026-05-03 09:30" // Ngày giờ thực tế hiện tại
            ]
        ];
        return response()->json($history, 200);
    }
}