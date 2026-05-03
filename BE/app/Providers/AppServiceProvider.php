<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Interfaces\UserRepositoryInterface::class,
            \App\Repositories\EloquentUserRepository::class
        );
        $this->app->bind(
            \App\Interfaces\ExamRepositoryInterface::class,
            \App\Repositories\EloquentExamRepository::class
        );
        $this->app->bind(
            \App\Interfaces\AttemptRepositoryInterface::class,
            \App\Repositories\EloquentAttemptRepository::class
        );
        $this->app->bind(
            \App\Interfaces\QuestionRepositoryInterface::class,
            \App\Repositories\EloquentQuestionRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
