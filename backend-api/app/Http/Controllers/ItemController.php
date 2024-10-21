<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;
use App\Http\Controllers\Controller;


class ItemController extends Controller
{
    public function index()
    {
        return response()->json(Item::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'locationDescription' => 'nullable|string|max:255',
            'reward' => 'required|numeric',
        ]);

        $tokenString = $request->query('token');
        $token = PersonalAccessToken::findToken($tokenString);
        $user = $token->tokenable;
        $validated['user_id'] = $user->id;

        $validated['image'] = $request->has('image') ? $validated['image'] : "";

        $item = Item::create($validated);

        return response()->json($item, 201);
    }


    public function show($id)
    {
        $item = Item::find($id);
        if ($item) {
            return response()->json($item, 200);
        } else {
            return response()->json(['error' => 'Item not found'], 404);
        }
    }

    public function showMy(Request $request)
    {
        $user = Controller::getUserByToken($request['token']);

        if ($user) {
            $items = Item::where('user_id', $user->id)->get();
            return response()->json($items, 200);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }


    public function update(Request $request, $id)
    {
        $item = Item::find($id);
        if ($item) {
            $item->update($request->all());
            return response()->json($item, 200);
        } else {
            return response()->json(['error' => 'Item not found'], 404);
        }
    }

    public function destroy($id)
    {
        $item = Item::find($id);
        if ($item) {
            $item->delete();
            return response()->json(['message' => 'Item deleted'], 200);
        } else {
            return response()->json(['error' => 'Item not found'], 404);
        }
    }

}

