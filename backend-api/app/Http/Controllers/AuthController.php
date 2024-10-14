<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\RateLimiter\RequestRateLimiterInterface;
use function Psy\debug;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'password_confirmation' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->password != $request->password_confirmation) {
            return response()->json(['error' => 'Passwords do not match'], 422);
        }


        $user = User::create([
            'name' => strstr($request->email, '@', true),
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'userID' => $user->id], 200);
    }

    public function check(Request $request)
    {
        $tokenString = $request->bearerToken();

        if (!$tokenString) {
            return response()->json(['error' => 'Token missing'], 401);
        }

        $token = PersonalAccessToken::findToken($tokenString);

        if (!$token || !$token->tokenable) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['message' => 'Token is valid'], 200);
    }

    public function getUserInfo(Request $request)
    {
        $tokenString = $request->query('token');
        $token = PersonalAccessToken::findToken($tokenString);
        $user = $token->tokenable;

        return response()->json(['email' => $user->email, 'username' => $user->name], 200);
    }

    public function changeUserInfo(Request $request)
    {
        $tokenString = $request->query('token');
        $token = PersonalAccessToken::findToken($tokenString);
        $user = $token->tokenable;

        // Validierung der Anfrage
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|email,',
            'password' => 'required|min:6',
            'newPassword' => 'min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Falsches Passwort.'], 422);
        }

        // Benutzerinformationen aktualisieren
        $user->name = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->newPassword);

        $user->save();

        return response()->json(['message' => 'Profil erfolgreich aktualisiert'], 200);
    }





}
