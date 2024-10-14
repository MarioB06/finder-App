<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email',
        'push_notification',
        'found_items',
        'lost_items',
        'chat_notifications',
        'from',
        'to'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}