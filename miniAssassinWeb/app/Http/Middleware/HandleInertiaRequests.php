<?php

namespace App\Http\Middleware;

use App\Models\Code;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user) {
            $user->loadMissing('player');
        }
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? $request->user()->load('player') : null,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'global' => [
                'startTime' => config('app.game_start_time'),
            ],
            'playerCount' => Player::count(),
            'gameStarted' => config('app.game_started', false),
            'codes' => $request->user() ? Code::select('id', 'name', 'active')->get()->map(function ($code) {
                return [
                    'id' => $code->id,
                    'name' => $code->name,
                    'image_url' => $code->image_mime ? url("/ciphers/{$code->id}/image") : null,
                    'active' => $code->active,
                ];
            }) : [],
        ];
    }
}
