<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
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
