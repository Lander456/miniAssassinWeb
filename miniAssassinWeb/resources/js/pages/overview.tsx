import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { AppHeader } from '@/components/app-header';

export default function Standby({ startTime }: { startTime: string }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const targetDate = new Date(startTime).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                router.visit('/leaderboard');
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return clearInterval(interval);
    }, [startTime]);

    return (
        <>
            <AppHeader />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <Head title="Hra ještě není spuštěna"/>

                <h1 className="text-5xl font-bold mb-8">Hra ještě není spuštěna</h1>

                <div className="text-center">
                    <p className="text-xl mb-2 text-gray-400">Čas do spuštění hry:</p>
                    <div className="text-6xl font-mono text-red-500">
                        {timeLeft}
                    </div>
                </div>
            </div>
        </>
    );
}
