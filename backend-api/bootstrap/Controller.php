<?php

namespace App\Http\Controllers;
use Laravel\Sanctum\PersonalAccessToken;

abstract class Controller
{
    function getUserByToken($token)
    {
        $tokenString = $token;
        $token = PersonalAccessToken::findToken($tokenString);
        $user = $token->tokenable;

        return $user;
    }
}
