<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\QuizService;
use App\Services\QuestionService;
use App\Models\Subject;
use App\Models\Chapter;
use App\Models\Lesson;

class TeacherController extends Controller
{
    protected $quizService;
    protected $questionService;

    public function __construct(QuizService $quizService, QuestionService $questionService)
    {
        $this->quizService = $quizService;
        $this->questionService = $questionService;
    }

    // GET /api/teacher/quizzes
    public function getQuizList(Request $request)
    {
        return response()->json($this->quizService->getQuizList($request->user()->id));
    }

    // POST /api/teacher/quizzes
    public function createQuiz(Request $request)
    {
        $data = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'grade'         => 'required|string',
            'time_limit'    => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'subject'       => 'nullable|string|max:100',
            'chapters'      => 'nullable|array',
            'knowledge_type'=> 'nullable|string|max:100',
            'difficulty'    => 'nullable|string|max:50',
            'status'        => 'sometimes|in:draft,published',
            'max_attempts'  => 'sometimes|integer|min:1',
            'questions'     => 'required|array|min:1',
            'questions.*.content'       => 'required|string',
            'questions.*.options'       => 'required|array|min:2',
            'questions.*.correct_index' => 'required|integer',
            'questions.*.explanation'   => 'nullable|string',
        ]);

        $quiz = $this->quizService->createQuizWithQuestions($request->user()->id, $data);
        return response()->json(['message' => 'Tạo Quiz thành công!', 'quiz' => $quiz], 201);
    }

    // PUT /api/teacher/quizzes/{id}
    public function updateQuiz(Request $request, $id)
    {
        $data = $request->validate([
            'title'         => 'sometimes|string|max:255',
            'description'   => 'nullable|string',
            'grade'         => 'sometimes|string',
            'time_limit'    => 'sometimes|integer|min:1',
            'passing_score' => 'sometimes|integer|min:0|max:100',
            'subject'        => 'nullable|string|max:100',
            'status'        => 'sometimes|in:draft,published',
        ]);
        
        $quiz = $this->quizService->update($id, $data);
        return response()->json(['message' => 'Cập nhật thành công!', 'quiz' => $quiz]);
    }

    // DELETE /api/teacher/quizzes/{id}
    public function deleteQuiz($id)
    {
        $this->quizService->delete($id);
        return response()->json(['message' => 'Đã xoá quiz!']);
    }

    // PATCH /api/teacher/quizzes/{id}/toggle
    public function toggleQuiz(Request $request, $id)
    {
        try {
            $quiz = $this->quizService->toggleStatus($id, $request->user()->id);
            return response()->json(['status' => $quiz->status]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    // GET /api/teacher/all-questions
    public function getAllQuestions(Request $request)
    {
        return response()->json($this->questionService->getAllByTeacher($request->user()->id));
    }

    // GET /api/teacher/quizzes/{id}/questions
    public function getQuestions($id)
    {
        $quiz = $this->quizService->findById($id);
        return response()->json($quiz->questions()->orderBy('order')->get());
    }

    // GET /api/teacher/results/{quizId}
    public function getResults(Request $request, $quizId)
    {
        return response()->json($this->quizService->getResults($quizId));
    }

    // GET /api/teacher/analytics
    public function getAnalytics(Request $request)
    {
        // Tạm thời giữ logic này ở đây hoặc có thể chuyển sang QuizService nếu muốn triệt để hơn
        $teacherId = $request->user()->id;
        $quizzes = $this->quizService->getQuizList($teacherId);
        $quizIds = $quizzes->pluck('id');
        
        // Đây là ví dụ về việc gọi trực tiếp Model khi cần thống kê nhanh, 
        // nhưng lý tưởng nhất vẫn nên qua Repository.
        $attempts = \App\Models\QuizAttempt::whereIn('quiz_id', $quizIds)->get();
        $totalQuestions = \App\Models\Question::where('teacher_id', $teacherId)->count();

        return response()->json([
            'total_quizzes'  => $quizIds->count(),
            'total_questions'=> $totalQuestions,
            'total_attempts' => $attempts->count(),
            'total_students' => \App\Models\QuizAttempt::whereIn('quiz_id', $quizIds)->distinct('student_id')->count(),
            'pass_rate'      => $attempts->count() ? round($attempts->where('passed', true)->count() / $attempts->count() * 100) : 0,
            'avg_score'      => $attempts->count() ? round($attempts->avg('score')) : 0,
        ]);
    }

    // ─── MASTER BANK ────────────────────────────────────

    public function getSubjects() { return response()->json(Subject::all()); }

    public function getChapters(Request $request, $subjectId) 
    { 
        $query = Chapter::query();
        if ($subjectId !== 'all') $query->where('subject_id', $subjectId);
        if ($request->grade) $query->where('grade', $request->grade);
        return response()->json($query->get()); 
    }

    public function getLessons($chapterId) 
    { 
        return response()->json(Lesson::where('chapter_id', $chapterId)->get()); 
    }

    public function addMasterQuestion(Request $request)
    {
        $data = $request->validate([
            'content'        => 'required|string',
            'option_a'       => 'required|string',
            'option_b'       => 'required|string',
            'option_c'       => 'required|string',
            'option_d'       => 'required|string',
            'correct_answer' => 'required|string|max:1',
            'level'          => 'required|string',
            'lesson_id'      => 'required|exists:lessons,id',
            'knowledge_type' => 'sometimes|string',
            'explanation'    => 'nullable|string',
        ]);

        $data['teacher_id'] = $request->user()->id;
        $q = $this->questionService->create($data);
        return response()->json($q, 201);
    }

    public function generateQuiz(Request $request)
    {
        $data = $request->validate([
            'title'           => 'required|string|max:255',
            'count'           => 'required|integer|min:1',
            'grade'           => 'sometimes|string',
            'subject_id'      => 'nullable|exists:subjects,id',
            'chapter_ids'     => 'nullable|array',
            'chapter_ids.*'   => 'exists:chapters,id',
            'lesson_id'       => 'nullable|exists:lessons,id',
            'knowledge_type'  => 'sometimes|string',
            'difficulty'      => 'sometimes|string',
            'time_limit'      => 'required|integer|min:1',
            'passing_score'   => 'required|integer|min:0|max:100',
            'max_attempts'    => 'sometimes|integer|min:1',
        ]);

        try {
            $quiz = $this->questionService->generateQuiz($request->user()->id, $data);
            return response()->json(['message' => 'Đã tạo đề tự động thành công!', 'quiz' => $quiz], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode() ?: 422);
        }
    }

    public function updateMasterQuestion(Request $request, $id)
    {
        $data = $request->validate([
            'content'       => 'sometimes|string',
            'options'       => 'sometimes|array|min:4',
            'correct_index' => 'sometimes|integer',
            'explanation'   => 'nullable|string',
            'lesson_id'     => 'sometimes|exists:lessons,id',
            'knowledge_type'=> 'sometimes|string',
            'level'         => 'sometimes|string',
        ]);

        try {
            $q = $this->questionService->updateMasterQuestion($id, $data);
            return response()->json(['message' => 'Cập nhật thành công', 'question' => $q]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function deleteMasterQuestion($id)
    {
        $this->questionService->delete($id);
        return response()->json(['message' => 'Xoá thành công']);
    }

    public function syncQuizQuestions(Request $request, $id)
    {
        $data = $request->validate([
            'questions' => 'required|array|min:1',
            'questions.*.content' => 'required|string',
            'questions.*.options' => 'required|array|min:4',
            'questions.*.correct_index' => 'required|integer',
            'questions.*.explanation' => 'nullable|string',
        ]);

        try {
            $quiz = $this->quizService->syncQuestions($id, $request->user()->id, $data['questions']);
            return response()->json(['message' => 'Cập nhật câu hỏi thành công!', 'quiz' => $quiz]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }
}