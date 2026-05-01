<?php

namespace App\Interfaces;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    // Thêm các phương thức riêng cho User nếu cần
    public function findByEmail(string $email);
}
