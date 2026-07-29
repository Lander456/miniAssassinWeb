import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { AppHeader } from '@/components/app-header';
import type { Player } from '@/components/player/player-card';
import PlayerCard from '@/components/player/player-card';

interface LeaderboardProps {
    players: Player[];
}

export default function Leaderboard({ players }: LeaderboardProps) {
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['players'],
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title={'Leaderboard'} />
            <AppHeader />
            <div className="flex min-h-screen flex-col items-center bg-[#5A5A5A] p-6 text-[#FFFFFF] lg:justify-center">
                <div className="mb-4 rounded-xl bg-white px-10 py-2 shadow-sm">
                    <h2 className="text-lg font-medium tracking-wide text-gray-800">
                        Leaderboard
                    </h2>
                </div>
                <div className="flex w-full flex-col gap-2 items-center-safe">
                    {players.map((player) => (
                        <PlayerCard player={player} />
                    ))}
                </div>
            </div>
        </>
    );
}
