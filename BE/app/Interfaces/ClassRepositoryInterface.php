<?php

namespace App\Interfaces;

interface ClassRepositoryInterface extends BaseRepositoryInterface
{
    public function getAllWithDetails();
    public function deleteWithStudents($id);
}
