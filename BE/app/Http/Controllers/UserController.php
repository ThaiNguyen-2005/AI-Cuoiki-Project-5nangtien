<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use App\Services\QuizService;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UpdatePasswordRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;
    protected $quizService;

    public function __construct(UserService $userService, QuizService $quizService)
    {
        $this->userService = $userService;
        $this->quizService = $quizService;
    }

    /**
     * Lấy thông tin cá nhân của người đang đăng nhập
     */
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Cập nhật thông tin cá nhân
     */
    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());
        
        return response()->json([
            'message' => 'Cập nhật thông tin thành công',
            'user' => $user
        ]);
    }

    /**
     * Thay đổi mật khẩu
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Mật khẩu hiện tại không đúng.'],
            ]);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'message' => 'Đổi mật khẩu thành công'
        ]);
    }

    /**
     * Lấy thống kê cá nhân của học sinh
     */
    public function myStats(Request $request)
    {
        $stats = $this->quizService->getUserStats($request->user()->id);
        return response()->json($stats);
    }

    public function index()
    {
        $users = $this->userService->getAll();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $user = $this->userService->register($request->all());
        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = $this->userService->findById($id);
        return response()->json($user);
    }
}
