<?php

namespace Database\Seeders;

use App\Models\Player;
use App\Models\User;
use Illuminate\Database\Seeder;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $UserIDs = User::all()->pluck('id')->toArray();

        foreach ($UserIDs as $UserID) {
            $player = Player::factory()->create([
                'user_id' => $UserID
            ]);

            $player->user()->associate($UserID);
        }
    }
}
