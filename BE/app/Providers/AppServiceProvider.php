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
            \App\Interfaces\QuizRepositoryInterface::class,
            \App\Repositories\EloquentQuizRepository::class
        );
        $this->app->bind(
            \App\Interfaces\QuestionRepositoryInterface::class,
            \App\Repositories\EloquentQuestionRepository::class
        );
        $this->app->bind(
            \App\Interfaces\QuizAttemptRepositoryInterface::class,
            \App\Repositories\EloquentQuizAttemptRepository::class
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
