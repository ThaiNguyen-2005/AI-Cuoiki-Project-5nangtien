<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AIService
{
    protected $apiKey;
    protected $models = [
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash',
        'gemini-2.0-flash-lite',
        'gemini-2.0-flash',
    ];

    public function __construct()
    {
        $this->apiKey = trim(env('GEMINI_API_KEY'));
    }

    public function generateEvaluation($studentData)
    {
        if (!$this->apiKey) {
            return $this->generateFallback($studentData);
        }

        $quizList = implode("\n        ", $studentData['quiz_details'] ?? []);
        $typeList = implode("\n        ", $studentData['type_details'] ?? []);
        $weakQuizList = implode(', ', $studentData['weakest_quizzes'] ?? []);

        $prompt = "Bạn là một trợ lý giáo dục AI thông minh, thân thiện. Hãy phân tích dữ liệu học tập sau đây và đưa ra lời nhận xét bằng tiếng Việt.

        QUY TẮC BẮT BUỘC:
        1. Phải bắt đầu bằng lời chào chính xác: \"Chào bạn,\" (TUYỆT ĐỐI KHÔNG ĐƯỢC VIẾT SAI THÀNH \"Cào bạn\").
        2. Phân biệt rõ giữa lời chào và tên bài thi (ví dụ nếu có bài thi tên là 'Xin chào').
        3. Tất cả phần trăm (%) là TỶ LỆ TRẢ LỜI ĐÚNG, không phải điểm số trên thang 10.
        4. KHÔNG nhắc đến điểm trung bình lớp hay xếp hạng.

        DỮ LIỆU HỌC TẬP:
        - Tỷ lệ đúng trung bình: {$studentData['average_score']}%
        - Tổng số lượt làm bài: {$studentData['total_attempts']}

        KẾT QUẢ TỪNG BÀI KIỂM TRA:
        {$quizList}

        KẾT QUẢ THEO PHÂN LOẠI KIẾN THỨC:
        {$typeList}

        MẢNG YẾU NHẤT: {$studentData['weakest_type']} (Tỷ lệ đúng TB: {$studentData['weakest_score']}%)
        CÁC BÀI CẦN CẢI THIỆN (dưới 50%): {$weakQuizList}

        Yêu cầu nội dung:
        - Nhận xét về sự cố gắng dựa trên dữ liệu trên.
        - Chỉ ra cụ thể bài thi nào yếu và tại sao (dựa trên phân loại kiến thức).
        - Đưa ra 3 bước hành động cụ thể để tiến bộ.
        - Kết thúc bằng một câu truyền cảm hứng ngắn.
        Định dạng bằng Markdown, viết ngắn gọn, súc tích.";



        // Thử lần lượt từng model
        foreach ($this->models as $model) {
            $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";

            for ($attempt = 0; $attempt < 2; $attempt++) {
                try {
                    $response = Http::withoutVerifying()
                        ->timeout(60)
                        ->withHeaders([
                            'x-goog-api-key' => $this->apiKey,
                            'Content-Type' => 'application/json'
                        ])
                        ->post($endpoint, [
                            'contents' => [
                                [
                                    'parts' => [
                                        ['text' => $prompt]
                                    ]
                                ]
                            ]
                        ]);

                    if ($response->successful()) {
                        $result = $response->json();
                        return $result['candidates'][0]['content']['parts'][0]['text'] ?? $this->generateFallback($studentData);
                    }

                    if (in_array($response->status(), [429, 503])) {
                        if ($attempt === 0) {
                            sleep(3);
                            continue;
                        }
                        break;
                    }

                    break;
                } catch (\Exception $e) {
                    break;
                }
            }
        }

        // Nếu tất cả model đều lỗi, dùng nhận xét dự phòng thông minh
        return $this->generateFallback($studentData);
    }

    /**
     * Tạo nhận xét dự phòng thông minh dựa trên dữ liệu thật của sinh viên.
     * Được sử dụng khi API Gemini không khả dụng.
     */
    protected function generateFallback($studentData)
    {
        $score = $studentData['average_score'] ?? 0;
        $attempts = $studentData['total_attempts'] ?? 0;
        $weakType = $studentData['weakest_type'] ?? 'Chưa xác định';
        $weakScore = $studentData['weakest_score'] ?? 0;
        $weakQuizzes = $studentData['weakest_quizzes'] ?? [];

        // Đánh giá tổng quan
        if ($score >= 85) {
            $overview = "**Xuất sắc!** Với điểm trung bình **{$score}%** qua **{$attempts} bài kiểm tra**, bạn đang thể hiện năng lực học tập rất ấn tượng. Sự kiên trì và nỗ lực của bạn đã mang lại kết quả xứng đáng.";
            $analysis = "Dù kết quả rất tốt, bạn vẫn có thể hoàn thiện hơn ở mảng **{$weakType}** (hiện đạt {$weakScore}%). Điều này hoàn toàn bình thường — ngay cả những học sinh giỏi nhất cũng có mảng cần cải thiện.";
        } elseif ($score >= 70) {
            $overview = "**Khá tốt!** Điểm trung bình **{$score}%** cho thấy bạn đã nắm vững phần lớn kiến thức. Qua **{$attempts} bài thi**, bạn đã chứng minh được sự cố gắng đáng ghi nhận.";
            $analysis = "Mảng **{$weakType}** với điểm số **{$weakScore}%** đang là \"nút thắt\" trong quá trình học của bạn. Có thể bạn chưa dành đủ thời gian cho phần lý thuyết nền tảng của mảng này, hoặc cần thêm bài tập thực hành để củng cố.";
        } elseif ($score >= 50) {
            $overview = "Với điểm trung bình **{$score}%** qua **{$attempts} bài kiểm tra**, bạn đã nắm được những kiến thức cơ bản. Tuy nhiên, còn nhiều dư địa để bạn phát triển thêm.";
            $analysis = "Mảng **{$weakType}** chỉ đạt **{$weakScore}%** — đây là khu vực cần tập trung cải thiện. Nguyên nhân có thể do bạn chưa hiểu sâu các khái niệm gốc, hoặc bỏ qua bước ôn tập trước khi làm bài.";
        } else {
            $overview = "Qua **{$attempts} bài kiểm tra** với điểm trung bình **{$score}%**, bạn đang ở giai đoạn cần xây dựng lại nền tảng. **Đừng nản lòng** — mọi chuyên gia đều từng là người mới bắt đầu!";
            $analysis = "Mảng **{$weakType}** ({$weakScore}%) cho thấy bạn cần quay lại ôn tập từ những kiến thức cơ bản nhất. Hãy bắt đầu từ lý thuyết, đọc kỹ từng khái niệm trước khi làm bài tập.";
        }

        // Danh sách bài yếu
        $weakList = "";
        if (!empty($weakQuizzes)) {
            $weakList = "\n\n📋 **Các bài cần ôn lại:** " . implode(', ', $weakQuizzes);
        }

        // Lời khuyên cụ thể
        $steps = "

### 🎯 Kế hoạch cải thiện tuần này:

1. **Ôn lại lý thuyết {$weakType}**: Dành 20-30 phút mỗi ngày đọc lại bài giảng và ghi chú trọng tâm. Tập trung vào các công thức và định nghĩa cốt lõi.
2. **Làm lại các bài thi điểm thấp**: Mỗi câu sai, hãy tìm hiểu *tại sao sai* thay vì chỉ xem đáp án đúng. Ghi lại lỗi sai vào sổ tay riêng.
3. **Luyện tập có chủ đích**: Tập trung làm thêm 2-3 bài thi thuộc mảng **{$weakType}** để tạo phản xạ và quen với dạng câu hỏi.";

        // Câu truyền cảm hứng
        $inspiration = "\n\n---\n> 💪 *\"Thành công không đến từ việc không bao giờ sai, mà đến từ việc không bao giờ bỏ cuộc. Mỗi bài thi là một bước tiến — hãy tiếp tục bước!\"*";

        return $overview . "\n\n" . $analysis . $weakList . $steps . $inspiration;
    }
}
