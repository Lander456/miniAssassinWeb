<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;

class EnsureGameHasStarted
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->is_admin) {
            return $next($request);
        }

        $startTime = Carbon::parse(config('app.game_start_time'));

        if (now()->isBefore($startTime)) {
            return redirect()->route('overview');
        }

        return $next($request);
    }
}
