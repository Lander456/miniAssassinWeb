import { Head, Link } from '@inertiajs/react';
import { AppHeader } from '@/components/app-header';
import cifra from '../../images/gde.png'

export default function Standby() {

    return (
        <>
            <AppHeader />

            <div
                className="flex min-h-screen flex-col items-center justify-center bg-brand-primary text-brand-secondary"
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
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                        href="/pravidla"
                        className="rounded-lg bg-brand-secondary px-6 py-3 font-semibold text-brand-primary shadow-md transition-colors hover:bg-brand-secondary-sat"
                    >
                        Pravidla
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-lg bg-brand-secondary px-6 py-3 font-semibold text-brand-primary shadow-md transition-colors hover:bg-brand-secondary-sat"
                    >
                        Registrace
                    </Link>
                </div>
            </div>
        </>
    );
}
