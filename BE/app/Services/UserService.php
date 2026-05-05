<?php

namespace App\Services;

use App\Interfaces\UserRepositoryInterface;

class UserService extends BaseService
{
    public function __construct(UserRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    // Logic nghiệp vụ phức tạp liên quan đến User sẽ viết ở đây
    public function register(array $data)
    {
        // Ví dụ: mã hóa mật khẩu trước khi lưu
        $data['password'] = bcrypt($data['password']);
        return $this->repository->create($data);
    }

    /**
     * Cập nhật thông tin hồ sơ và mật khẩu
     */
    public function updateProfile($userId, array $data)
    {
        $user = $this->repository->find($userId);

        $updateData = [];
        if (isset($data['name'])) {
            $updateData['name'] = $data['name'];
        }

        if (isset($data['new_password'])) {
            if (!\Illuminate\Support\Facades\Hash::check($data['current_password'], $user->password)) {
                throw new \Exception('Mật khẩu hiện tại không đúng.', 422);
            }
            $updateData['password'] = \Illuminate\Support\Facades\Hash::make($data['new_password']);
        }

        return $this->repository->update($userId, $updateData);
    }
}
