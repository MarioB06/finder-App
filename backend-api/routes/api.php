<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\NotificationSettingController;

use Stripe\Stripe;
use Stripe\PaymentIntent;

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
    Route::get('/getUserId', [AuthController::class, 'getUserID']);

    Route::get('/notification-settings', [NotificationSettingController::class, 'getNotificationSettings']);
    Route::post('/notification-settings', [NotificationSettingController::class, 'updateNotificationSettings']);

    Route::get('/payItem', [ItemController::class, 'payitem']);





});


Route::post('/create-payment-intent', function (Request $request) {
    // Stripe API-Schlüssel setzen
    Stripe::setApiKey(env('STRIPE_SECRET'));

    // Belohnung (Finderlohn) als Betrag übergeben und in Rappen/Cents umrechnen
    $amount = $request->input('amount') * 100;

    // PaymentIntent erstellen
    try {
        $paymentIntent = PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'chf',
            'payment_method_types' => ['card'],
        ]);

        return response()->json(['clientSecret' => $paymentIntent->client_secret]);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
