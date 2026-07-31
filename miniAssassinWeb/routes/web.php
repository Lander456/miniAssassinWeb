<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Middleware\EnsureGameHasStarted;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/overview', function () {
    return Inertia::render('overview', [
        'startTime' => config('app.game_start_time'),
    ]);
})->name('overview');

Route::middleware([EnsureGameHasStarted::class])->group(function () {

    Route::get('/', [LeaderboardController::class, 'index'])->name('welcome');
    Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');

    Route::middleware(['auth', 'verified'])->group(function () {

        Route::post('/kill', [PlayerController::class, 'kill']);
        Route::post('/code', [CodeController::class, 'submitCode']);
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('/account', [ProfileController::class, 'destroy']);
    Route::post('/logout', LogoutController::class)->name('logout');
});

require __DIR__.'/settings.php';

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->middleware('guest')->name('login');

Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register');

Route::post('/admin/players/{player}/points', [PlayerController::class, 'updatePoints']);

Route::post('/login', LoginController::class);
Route::post('/register', RegisterController::class);

Route::post('/admin/codes', [CodeController::class, 'uploadCode']);

Route::delete('/admin/codes/{code}', [CodeController::class, 'destroy'])->middleware('admin');
Route::delete('/admin/players/{player}', [PlayerController::class, 'destroy'])->middleware('admin');

Route::get('/pravidla', function () {
    return Inertia::render('rules');
});

Route::post('/profile/image', [PlayerController::class, 'updateImage']);
Route::post('/admin/players/{player}/image', [PlayerController::class, 'forcedUpdateImage'])->middleware('admin');

Route::patch('/profile/name', [ProfileController::class, 'updateName'])->name('profile.name.update');
