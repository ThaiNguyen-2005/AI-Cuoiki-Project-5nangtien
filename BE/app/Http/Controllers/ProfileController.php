<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
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

    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name'             => 'sometimes|string|max:100',
            'current_password' => 'sometimes|string',
            'new_password'     => 'sometimes|string|min:6',
        ]);

        if (isset($data['name'])) {
            $user->name = $data['name'];
        }

        if (isset($data['new_password'])) {
            if (!isset($data['current_password']) || !Hash::check($data['current_password'], $user->password)) {
                return response()->json(['message' => 'Mật khẩu hiện tại không đúng.'], 422);
            }
            $user->password = Hash::make($data['new_password']);
        }

        $user->save();

        return response()->json([
            'message' => 'Cập nhật thành công.',
            'user'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
        ]);
    }
}