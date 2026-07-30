import { Head, Link } from '@inertiajs/react';
import { AppHeader } from '@/components/app-header';

export default function Standby() {

    return (
        <>
            <AppHeader />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <Head title="Hra ještě není spuštěna"/>

                <h1 className="text-5xl font-bold mb-8">Hra ještě není spuštěna</h1>
                <Link
                    href="/pravidla"
                    className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors"
                >
                    Pravidla
                </Link>
            </div>
        </>
    );
}
