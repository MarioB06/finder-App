<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

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
