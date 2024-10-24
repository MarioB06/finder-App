<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\NotificationSettingController;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working correctly!']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/auth/check', [AuthController::class, 'check']);

Route::middleware('check.api.token')->group(function () {
    Route::get('/items', [ItemController::class, 'index']);
    Route::post('/items', [ItemController::class, 'store']);
    Route::get('/items/{id}', [ItemController::class, 'show']);
    Route::get('/MyItems', [ItemController::class, 'showMy']);
    Route::put('/items/{id}', [ItemController::class, 'update']);
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);

    Route::get('/getUserInfo', [AuthController::class, 'getUserInfo']);
    Route::post('/changeUserInfo', [AuthController::class, 'changeUserInfo']);

    Route::get('/notification-settings', [NotificationSettingController::class, 'getNotificationSettings']);
    Route::post('/notification-settings', [NotificationSettingController::class, 'updateNotificationSettings']);

});

