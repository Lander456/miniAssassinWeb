<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Player;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,heic', 'max:5120'],
        ]);

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        do {
            $codice = strtoupper(Str::random(8));
        } while (Player::where('codice', $codice)->exists());

        $user->player()->create([
            'codice' => $codice,
            'points' => 100,
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $filename = Str::slug($request['name']) . '.webp';
            $path = 'players/' . $user->name . '/image/' . $filename;

            $manager = ImageManager::usingDriver(Driver::class);

            $image = $manager->decode($file->getRealPath());

            $encoded = $image->encodeUsingFileExtension('webp', 80);

            Storage::disk('public')->put($path, (string) $encoded);

            $publicUrl = Storage::url($path);
        }

        $user->player->update([
            'image_path' => $publicUrl ?? null,
        ]);

        Auth::login($user);

        return redirect('/leaderboard')->with('success');
    }
}
