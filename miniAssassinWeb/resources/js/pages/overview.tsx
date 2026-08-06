import { Head, Link } from '@inertiajs/react';
import { AppHeader } from '@/components/app-header';
import cifra from '../../images/gde.png'

export default function Standby() {

    return (
        <>
            <AppHeader />

            <div
                className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white"
            >
                <Head title="Registrace je spuštěna" />

                <h1 className="mb-8 text-5xl font-bold">
                    Registrace je spuštěna
                </h1>
                <p className="mb-8 max-w-2xl text-center text-lg">
                    Brněnské podsvětí nikdy nespí, to ví i jeho nejmenší aktéři.
                    Proto nová společnost Aeronautica Fenomenale také nespí a
                    pod vedením exDonů Venerdi a Brutale zamířila vstříc
                    spojenectví s bájnou Geologicou Sicilianou. První prácička
                    zní jednoduše, získat informace o schodech, taková běžná
                    rutina. Člověk by si skoro ani nebral kartáček...
                </p>
                <p className="mb-8 max-w-2xl text-center text-lg">
                    Orientace a proškolení nových zaměstnanců proběhne 7.8. v 16:30 na <a
                        href={cifra}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline cursor-pointer"
                    >
                        tomto místě.
                    </a>
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                        href="/pravidla"
                        className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 shadow-md transition-colors hover:bg-gray-200"
                    >
                        Pravidla
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 shadow-md transition-colors hover:bg-gray-200"
                    >
                        Registrace
                    </Link>
                </div>
            </div>
        </>
    );
}
