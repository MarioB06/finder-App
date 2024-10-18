<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NotificationSetting;
use Illuminate\Support\Facades\Validator;

class NotificationSettingController extends Controller
{
    public function getNotificationSettings(Request $request)
    {
        $token = $request->query('token');
        $user = Controller::getUserByToken($token);
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $settings = NotificationSetting::where('user_id', $user->id)->first();
        return response()->json($settings);
    }

    public function updateNotificationSettings(Request $request)
    {
        $token = $request->query('token');
        $user = Controller::getUserByToken($token);
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'push_notification' => 'required',
            'found_items' => 'required',
            'lost_items' => 'required',
            'chat_notifications' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        $settings = NotificationSetting::where('user_id', $user->id)->first();
        $settings->email = $request->email;
        $settings->push_notification = $request->push_notification;
        $settings->found_items = $request->found_items;
        $settings->lost_items = $request->lost_items;
        $settings->chat_notifications = $request->chat_notifications;
        
        $settings->update();

        return response()->json(['message' => 'Notification settings updated successfully']);
    }
}
