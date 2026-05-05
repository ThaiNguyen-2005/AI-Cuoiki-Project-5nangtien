<?php

namespace App\Interfaces;

interface QuestionRepositoryInterface extends BaseRepositoryInterface
{
    public function getAllByTeacher($teacherId);
    public function getRandomQuestions($filters, $count);
}
