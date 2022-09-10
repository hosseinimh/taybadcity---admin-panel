<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\AdCategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\UserController;
use App\Http\Resources\AdCategoryResource;
use App\Http\Resources\DistrictResource;
use App\Http\Resources\UserResource;
use App\Repositories\AdCategoryRepository;
use App\Repositories\DistrictRepository;
use App\Repositories\UserRepository;
use App\Services\JsonResponse;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(DistrictController::class, function ($app) {
            return new DistrictController(new JsonResponse(DistrictResource::class), $app->make(DistrictRepository::class));
        });

        $this->app->bind(AdCategoryController::class, function ($app) {
            return new AdCategoryController(new JsonResponse(AdCategoryResource::class), $app->make(AdCategoryRepository::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserRepository::class));
        });
    }
}
