<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\User;

class AdminService
{
    public function getSystemStats()
    {
        $totalUsers    = User::count();
        $totalTeachers = User::where('role', 'teacher')->count();
        $totalStudents = User::where('role', 'student')->count();
        $totalAdmins   = User::where('role', 'admin')->count();
        $totalQuizzes  = DB::table('quizzes')->count();
        $totalAttempts = DB::table('quiz_attempts')->count();
        $avgScore      = DB::table('quiz_attempts')->avg('score');

        $days = [];
        $attemptsData = [];
        $quizzesData = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $label = now()->subDays($i)->format('d/m');
            $days[] = $label;

            $attemptsData[] = DB::table('quiz_attempts')
                ->whereDate('created_at', $date)
                ->count();

            $quizzesData[] = DB::table('quizzes')
                ->whereDate('created_at', $date)
                ->count();
        }

        return [
            'total_users'    => $totalUsers,
            'total_teachers' => $totalTeachers,
            'total_students' => $totalStudents,
            'total_admins'   => $totalAdmins,
            'total_quizzes'  => $totalQuizzes,
            'total_attempts' => $totalAttempts,
            'avg_score'      => $avgScore ? round($avgScore, 1) : 0,
            'activity_trends' => [
                'labels'   => $days,
                'attempts' => $attemptsData,
                'quizzes'  => $quizzesData,
            ]
        ];
    }

    public function getSettings()
    {
        return DB::table('settings')->pluck('value', 'key');
    }

    public function updateSettings(array $data)
    {
        foreach ($data as $key => $value) {
            DB::table('settings')->updateOrInsert(
                ['key' => $key],
                ['value' => $value, 'updated_at' => now()]
            );
        }
        return true;
    }
}
