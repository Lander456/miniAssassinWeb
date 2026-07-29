import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function DeathTimer({ deadUntil }: { deadUntil: string }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(deadUntil).getTime();
            const distance = target - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft('00:00');
                router.reload();
            } else {
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [deadUntil]);

    return (
        <div className="p-4 bg-red-100 text-red-800 rounded-md text-center">
            <h3 className="font-bold">You are dead</h3>
            <p className="text-sm mt-1">{timeLeft}</p>
        </div>
    );
}
