<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Kiểm tra dữ liệu FE gửi lên
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Thử đăng nhập
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            
            // Tạo token (chìa khóa) cho Frontend
            $token = $user->createToken('auth_token')->plainTextToken;

            // Trả về data cho Frontend. 
            // Đảm bảo Model User trong DB của Vinh có cột 'role' nhé!
            return response()->json([
                'access_token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role, // Trường này rất quan trọng cho FE
                ]
            ]);
        }

        // Nếu sai mật khẩu thì báo lỗi 401
        return response()->json([
            'message' => 'Sai tài khoản hoặc mật khẩu'
        ], 401);
    }
}