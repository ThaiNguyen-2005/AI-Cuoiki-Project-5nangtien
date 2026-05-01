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
}
