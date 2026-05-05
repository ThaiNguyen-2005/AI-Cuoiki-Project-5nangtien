<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminService;
use App\Services\UserService;
use App\Services\QuizService;
use App\Models\User;

class AdminController extends Controller
{
    protected $adminService;
    protected $userService;
    protected $quizService;

    public function __construct(
        AdminService $adminService,
        UserService $userService,
        QuizService $quizService
    ) {
        $this->adminService = $adminService;
        $this->userService = $userService;
        $this->quizService = $quizService;
    }

    // ==========================================
    // THỐNG KÊ TỔNG QUAN
    // ==========================================
    public function getStats()
    {
        return response()->json($this->adminService->getSystemStats());
    }

    // ==========================================
    // QUẢN LÝ NGƯỜI DÙNG
    // ==========================================
    public function getUsers(Request $request)
    {
        $role = $request->query('role');
        $users = User::when($role, fn($q) => $q->where('role', $role))
            ->orderBy('created_at', 'desc')
            ->get(['id', 'name', 'email', 'role', 'created_at']);

        return response()->json($users);
    }

    public function createUser(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:100',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role'     => 'required|in:admin,teacher,student',
        ]);

        $user = $this->userService->register($data);
        return response()->json($user, 201);
    }

    public function deleteUser(Request $request, $id)
    {
        if ($id === $request->user()->id) {
            return response()->json(['message' => 'Không thể tự xoá tài khoản của mình.'], 403);
        }

        $this->userService->delete($id);
        return response()->json(['message' => 'Đã xoá tài khoản.']);
    }

    // ==========================================
    // QUẢN LÝ QUIZ (ADMIN)
    // ==========================================
    public function getQuizzes()
    {
        // Admin lấy tất cả quiz qua repository của QuizService (nếu có method)
        // Hoặc tạm thời dùng Query Builder sạch ở Controller nếu chưa có hàm getAll chi tiết
        $quizzes = \App\Models\Quiz::with('teacher:id,name,email')
            ->withCount(['questions', 'attempts'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($q) => [
                'id'             => $q->id,
                'title'          => $q->title,
                'grade'          => $q->grade,
                'status'         => $q->status,
                'questions_count'=> $q->questions_count,
                'attempts_count' => $q->attempts_count,
                'teacher_name'   => $q->teacher->name ?? '—',
                'teacher_email'  => $q->teacher->email ?? '—',
                'created_at'     => $q->created_at,
            ]);

        return response()->json($quizzes);
    }

    public function deleteQuiz($id)
    {
        $this->quizService->delete($id);
        return response()->json(['message' => 'Đã xoá quiz.']);
    }

    // ==========================================
    // CÀI ĐẶT HỆ THỐNG
    // ==========================================
    public function getSettings()
    {
        return response()->json($this->adminService->getSettings());
    }

    public function updateSettings(Request $request)
    {
        $data = $request->only(['site_name', 'passing_score', 'allow_register', 'max_attempts']);
        $this->adminService->updateSettings($data);
        return response()->json(['message' => 'Đã lưu cài đặt']);
    }
}