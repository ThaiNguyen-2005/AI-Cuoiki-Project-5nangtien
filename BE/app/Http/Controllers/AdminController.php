<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Quiz;

class AdminController extends Controller
{
    // ==========================================
    // THỐNG KÊ TỔNG QUAN
    // ==========================================
    public function getStats()
    {
        $totalUsers    = User::count();
        $totalTeachers = User::where('role', 'teacher')->count();
        $totalStudents = User::where('role', 'student')->count();
        $totalAdmins   = User::where('role', 'admin')->count();
        $totalQuizzes  = DB::table('quizzes')->count();
        $totalAttempts = DB::table('quiz_attempts')->count();

        $avgScore = DB::table('quiz_attempts')->avg('score');

        return response()->json([
            'total_users'    => $totalUsers,
            'total_teachers' => $totalTeachers,
            'total_students' => $totalStudents,
            'total_admins'   => $totalAdmins,
            'total_quizzes'  => $totalQuizzes,
            'total_attempts' => $totalAttempts,
            'avg_score'      => $avgScore ? round($avgScore, 1) : 0,
        ]);
    }

    // Top quiz có nhiều lượt làm nhất
    public function topQuizzes()
    {
        $top = DB::table('quizzes')
            ->leftJoin('quiz_attempts', 'quizzes.id', '=', 'quiz_attempts.quiz_id')
            ->select('quizzes.id', 'quizzes.title', DB::raw('COUNT(quiz_attempts.id) as attempts_count'))
            ->groupBy('quizzes.id', 'quizzes.title')
            ->orderByDesc('attempts_count')
            ->limit(8)
            ->get();

        return response()->json($top);
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

        $user = User::create([
            'id'       => Str::uuid()->toString(),
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => $data['role'],
        ]);

        return response()->json($user, 201);
    }

    // ==========================================
    // QUẢN LÝ LỚP HỌC
    // ==========================================
    public function getClasses()
    {
        $classes = DB::table('classes')
            ->leftJoin('users', 'classes.teacher_id', '=', 'users.id')
            ->select(
                'classes.*',
                'users.name as teacher_name',
                DB::raw('(SELECT COUNT(*) FROM class_students WHERE class_students.class_id = classes.id) as student_count')
            )
            ->get();

        return response()->json($classes);
    }

    public function createClass(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:100',
            'grade'      => 'required|integer|in:10,11,12',
            'teacher_id' => 'nullable|exists:users,id',
        ]);

        $id = Str::uuid()->toString();
        DB::table('classes')->insert([
            'id'         => $id,
            'name'       => $data['name'],
            'grade'      => $data['grade'],
            'teacher_id' => $data['teacher_id'] ?? null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['id' => $id, 'message' => 'Tạo lớp thành công'], 201);
    }

    public function deleteClass($id)
    {
        DB::table('class_students')->where('class_id', $id)->delete();
        DB::table('classes')->where('id', $id)->delete();
        return response()->json(['message' => 'Đã xoá lớp']);
    }

    // ==========================================
    // CÀI ĐẶT HỆ THỐNG
    // ==========================================
    public function getSettings()
    {
        $settings = DB::table('settings')->pluck('value', 'key');
        return response()->json($settings);
    }

    public function updateSettings(Request $request)
    {
        $data = $request->only(['site_name', 'passing_score', 'allow_register', 'max_attempts']);

        foreach ($data as $key => $value) {
            DB::table('settings')->updateOrInsert(
                ['key' => $key],
                ['value' => $value, 'updated_at' => now()]
            );
        }

        return response()->json(['message' => 'Đã lưu cài đặt']);
    }

    // ==========================================
    // ĐỔI MẬT KHẨU ADMIN
    // ==========================================
    public function changePassword(Request $request)
    {
        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng.'], 422);
        }

        $user->update(['password' => Hash::make($request->new_password)]);
        return response()->json(['message' => 'Đổi mật khẩu thành công.']);
    }

    // ==========================================
    // XOÁ USER
    // ==========================================
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        // Không cho xoá chính mình
        if ($user->id === request()->user()->id) {
            return response()->json(['message' => 'Không thể tự xoá tài khoản của mình.'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Đã xoá tài khoản.']);
    }
}