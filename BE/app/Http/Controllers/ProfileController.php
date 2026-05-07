<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class ProfileController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function show(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'id'     => $user->id,
            'name'   => $user->name,
            'email'  => $user->email,
            'role'   => $user->role,
            'avatar' => $user->avatar ?? null,
        ]);
    }

    /**
     * Cập nhật tên và/hoặc mật khẩu qua Service
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'name'             => 'sometimes|string|max:100',
            'current_password' => 'required_with:new_password|string',
            'new_password'     => 'sometimes|string|min:6',
        ]);

        try {
            $passwordChanged = isset($data['new_password']);
            $user = $this->userService->updateProfile($request->user()->id, $data);
            
            if ($passwordChanged) {
                // Đăng xuất khỏi tất cả thiết bị khi đổi mật khẩu
                $request->user()->tokens()->delete();
            }

            return response()->json([
                'message' => $passwordChanged 
                    ? 'Mật khẩu đã được đổi thành công. Vui lòng đăng nhập lại.' 
                    : 'Hồ sơ đã được cập nhật thành công.',
                'password_changed' => $passwordChanged,
                'user'    => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                    'role'  => $user->role,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }
}