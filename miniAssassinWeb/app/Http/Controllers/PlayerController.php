<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Player $player)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        $user = $player->user;

        $player->delete();

        if ($user) {
            $user->delete();
        }

        return redirect()->back()->with('success', 'Hrac spolecne s profilem uspesne smazan! :)');
    }

    public function kill(Request $request)
    {
        $validated = $request->validate([
            'kill' => ['required', 'string', 'max:255', 'exists:players,codice'],
        ]);
        if ($request->user()->player->codice === $validated['kill']) {
            abort(403, 'You cannot kill yourself.');
        }
        if ($request->user()->isDead()) {
            abort(403, 'You cannot kill while dead.');
        }

        $killedPlayer = Player::where('codice', $request->kill)->first();

        if ($killedPlayer->deadUntil > now()) {
            abort(403, 'You cannot kill a dead player.');
        }

        $killer = $request->user()->player;

        $killedPlayer->update(['points' => $killedPlayer->points - 100]);
        if ($killedPlayer->points < 0) {
            $killedPlayer->update(['points' => 0]);
        }

        $killedPlayer->update(['deadUntil' => now()->addMinutes(15)]);

        $killer->update(['points' => $killer->points + 200]);
    }

    public function updatePoints(Request $request, Player $player)
    {
        if (!$request->user()->isAdmin()) {
            abort(403, 'You cannot update player\'s points.');
        }

        $validated = $request->validate([
            'points' => ['required', 'integer'],
        ]);

        $player->update(['points' => $player->points + $validated['points']]);

        return back()->with('success', 'Points updated.');
    }
}
