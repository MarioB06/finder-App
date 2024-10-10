<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class CheckApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $tokenString = $request->token;
        if (!$tokenString) {
            return response()->json(['error' => 'Token missing'], 401);
        }

        $token = PersonalAccessToken::findToken($tokenString);
        if (!$token || !$token->tokenable) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
