<?php

namespace App\Http\Controllers;

use App\Models\Code;
use App\Models\Player;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        $players = Player::with('user')->orderBy('points', 'DESC')->get();

        $formattedPlayers = $players->map(function ($player) {
            return [
                'id' => $player->id,
                'name' => $player->user->name,
                'points' => $player->points,
                'isDead' => $player->deadUntil > now(),
                'image_data_uri' => $player->image_data_uri,
            ];
        });

        $codes = Code::all();

        return Inertia::render('leaderboard', [
            'players' => $formattedPlayers,
            'codes' => $codes,
        ]);
    }
}
