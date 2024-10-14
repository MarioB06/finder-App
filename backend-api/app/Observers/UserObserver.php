<?php

namespace App\Observers;

use App\Models\User;
use App\Models\NotificationSetting;
class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        NotificationSetting::create([
            'user_id' => $user->id,
            'email' => true,
            'push_notification' => true,
            'found_items' => true,
            'lost_items' => true,
            'chat_notifications' => true,
            'from' => null,
            'to' => null
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
