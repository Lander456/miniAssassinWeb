<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Player;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'image' => 'required|image|max:5120',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $imageData = null;
        $imageMime = null;

        do {
            $codice = strtoupper(Str::random(8));
        } while (Player::where('codice', $codice)->exists());

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageData = base64_encode(file_get_contents($file->getRealPath()));
            $imageMime = $file->getClientMimeType();
        }

        $user->player()->create([
            'codice' => $codice,
            'image_data' => $imageData,
            'image_mime' => $imageMime,
            'points' => 100,
        ]);

        Auth::login($user);

        return redirect('/leaderboard')->with('success');
    }
}
