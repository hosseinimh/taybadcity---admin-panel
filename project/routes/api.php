<?php

use App\Http\Controllers\AdCategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// not auth users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('users/logout', [UserController::class, 'logout']);
});

// auth users
Route::middleware(['auth:sanctum', 'auth.higher_manager'])->group(function () {
    Route::post('dashboard/review', [DashboardController::class, 'review']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{user}', [UserController::class, 'show']);
    Route::post('users/update/{user}', [UserController::class, 'update']);
    Route::post('users/change_password/{user}', [UserController::class, 'changePassword']);

    Route::post('districts/show/{model?}', [DistrictController::class, 'show']);
    Route::post('districts/store/{parent?}', [DistrictController::class, 'store']);
    Route::post('districts/update/{model}', [DistrictController::class, 'update']);
    Route::post('districts/{parent?}', [DistrictController::class, 'index']);

    Route::post('ad_categories/show/{model?}', [AdCategoryController::class, 'show']);
    Route::post('ad_categories/store/{parent?}', [AdCategoryController::class, 'store']);
    Route::post('ad_categories/update/{model}', [AdCategoryController::class, 'update']);
    Route::post('ad_categories/{parent?}', [AdCategoryController::class, 'index']);
});
