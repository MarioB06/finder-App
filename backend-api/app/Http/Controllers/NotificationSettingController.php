<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NotificationSetting;

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

        $validated = $request->validate([
            'email' => 'boolean',
            'push_notification' => 'boolean',
            'found_items' => 'boolean',
            'lost_items' => 'boolean',
            'chat_notifications' => 'boolean',
            'from' => 'date_format:H:i',
            'to' => 'date_format:H:i'
        ]);

        $settings = NotificationSetting::where('user_id', $user->id)->first();
        $settings->update($validated);

        return response()->json(['message' => 'Notification settings updated successfully']);
    }
}
