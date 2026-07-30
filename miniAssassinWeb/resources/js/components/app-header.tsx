import { Link, router, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { login, register } from '@/routes';

export function AppHeader() {
    const page = usePage();
    const { auth, playerCount, gameStarted } = page.props;

    const handleDeleteAccount = () => {
        if (confirm('Opravdu chceš svůj účet smazat a tím se odhlásit ze hry? Tato akce je nvratná!')) {
            router.delete('/account', {
                preserveScroll: true,
            });
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.log("No file chosen");

            return;
        }

        const file = e.target.files[0];

        if (file) {
            router.post('/profile/image', {
                image: file,
            }, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }
            })
        }
    }

    return (
        <div className="border-b border-sidebar-border/80 bg-white">
            <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">
                <div className="font-bold text-gray-800">
                    <Link href="/">miniAssassin</Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    {!gameStarted && playerCount !== undefined && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                            Počet registrovaných hráčů: {playerCount}
                        </span>
                    )}

                    {auth.user ? (
                        <>
                            <div className="flex items-center gap-2 font-medium text-gray-700">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="underline-offset-4 transition-colors hover:text-blue-600 hover:underline">
                                            {auth.user.name}
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-sm border-gray-700 bg-gray-900 text-white">
                                        <DialogHeader>
                                            <DialogTitle className="text-center text-xl">
                                                Tvůj profil
                                            </DialogTitle>
                                        </DialogHeader>

                                        <div className="flex flex-col items-center gap-5 p-4">
                                            <div
                                                className="group relative flex cursor-pointer justify-center overflow-hidden rounded-md"
                                                onClick={handleImageClick}
                                            >
                                                {auth.user?.player
                                                    ?.image_data_uri ? (
                                                    <img
                                                        src={
                                                            auth.user.player
                                                                .image_data_uri
                                                        }
                                                        alt={
                                                            'uhhhhh.................'
                                                        }
                                                        className="max-h-48 w-auto rounded-md object-contain shadow-lg"
                                                    />
                                                ) : (
                                                    <div className="flex h-32 w-32 items-center justify-center rounded-md bg-gray-800 text-gray-400">
                                                        Bez fotky
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                                    <span className="rounded bg-black/80 px-3 py-1.5 text-sm font-semibold text-white shadow-md">
                                                        Změnit fotku
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <h3 className="text-lg font-bold">
                                                    {auth.user.name}
                                                </h3>
                                            </div>
                                            <div className="w-full rounded-md border border-gray-700 bg-gray-800 p-4 text-center shadow-inner">
                                                <p className="mb-1 text-sm text-gray-400">
                                                    Codice:
                                                </p>
                                                <p className="font-mono text-2xl font-bold tracking-widest text-red-400 select-all">
                                                    {auth.user?.player
                                                        ?.codice ||
                                                        'huh? Ty nemas codice???'}
                                                </p>
                                            </div>
                                            <div className="mt-2 w-full border-t border-gray-700 pt-4">
                                                <button
                                                    onClick={
                                                        handleDeleteAccount
                                                    }
                                                    className="w-full rounded-md border border-red-900 bg-red-950 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
                                                >
                                                    Smazat účet (Opustit hru)
                                                </button>
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <span className="text-gray-300">|</span>
                                <span>{auth.user?.player?.points} bodů</span>
                            </div>

                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="rounded-md bg-gray-900 px-4 py-1.5 text-white transition hover:bg-gray-800"
                            >
                                Odhlášení
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="font-medium text-gray-700 hover:text-gray-900"
                            >
                                Přihlášení
                            </Link>
                            <Link
                                href={register()}
                                className="rounded-md bg-gray-900 px-4 py-1.5 text-white transition hover:bg-gray-800"
                            >
                                Registrace
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
