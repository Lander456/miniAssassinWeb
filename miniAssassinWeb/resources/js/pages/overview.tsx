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
                    Aeronautica Fenomenale se po zajištění zakázky pro pana Morettiho Geologice Sicilianě prokázala jako
                    užitečný partner. Proto se rozhodla na Aeronauticu opět obrátit s novou zakázkou. Nikdo v podsvětí
                    neminul náhlý zájem Geologicy Siciliany o veřejnou infrastrukturu v Brně a jistá Scoiattola Nera se
                    rozhodla její chvilkové nepozornosti využít a do města začala pašovat smrtící kartáčky atypických
                    velikostí. Aeronautica Fenomenale dostala jednoduchý úkol. Celou zásilku zničit. Dle dostupných
                    informací k tomu nastane příležitost 20.9. mezi 17:00 a 22:00. Nějaká ostraha je očekávána. Ten
                    kartáček by se mohl hodit...
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
