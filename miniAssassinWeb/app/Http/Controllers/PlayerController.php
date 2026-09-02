<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

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

        if ($user) {
            Storage::disk('public')->deleteDirectory('players/' . $user->name);
        }

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

        $pointsTaken = round(abs(($killer->points - $killedPlayer->points) / Player::sum('points')) * (1/6) * $killedPlayer->points);
        $pointsGiven = $pointsTaken + 200;

        $killedPlayer->update(['points' => $killedPlayer->points - $pointsTaken]);
        if ($killedPlayer->points < 0) {
            $killedPlayer->update(['points' => 0]);
        }

        $killedPlayer->update(['deadUntil' => now()->addMinutes((int) config('app.death_timer'))]);

        $killer->update(['points' => $killer->points + $pointsGiven]);

        DB::table('kill_log')->insert([
            'killer_id' => $killer->id,
            'victim_id' => $killedPlayer->id,
            'points_given' => $pointsGiven,
            'points_taken' => $pointsTaken,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
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

    public function updateImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,heic', 'max:5120'],
        ]);

        $file = $request->file('image');

        $filename = Str::slug($request->user()->name) . '.webp';
        $path = 'players/' . $request->user()->name . '/image/' . $filename;

        $manager = ImageManager::usingDriver(Driver::class);

        $image = $manager->decode($file->getRealPath());

        $encoded = $image->encodeUsingFileExtension('webp', 80);

        Storage::disk('public')->put($path, (string) $encoded);

        $publicUrl = Storage::url($path);

        $request->user()->player->update([
            'image_path' => $publicUrl
        ]);

        return back()->with('success', 'Image updated.');
    }

    public function forcedUpdateImage(Request $request, Player $player) {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,heic', 'max:5120'],
        ]);

        $file = $request->file('image');

        $filename = Str::slug($request->user()->name) . '.webp';
        $path = 'players/' . $player->user->id . '/image/' . $filename;

        $manager = ImageManager::usingDriver(Driver::class);

        $image = $manager->decode($file->getRealPath());

        $encoded = $image->encodeUsingFileExtension('webp', 80);

        Storage::disk('public')->put($path, (string) $encoded);

        $publicUrl = Storage::url($path);

        $player->update([
            'image_path' => $publicUrl
        ]);

        return back()->with('success', 'Image updated.');
    }
}
