import { Link, router, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { login, register } from '@/routes';

export function AppHeader() {
    const page = usePage();
    const { auth } = page.props;

    const handleDeleteAccount = () => {
        if (confirm('Opravdu chceš svůj účet smazat a tím se odhlásit ze hry? Tato akce je nvratná!')) {
            router.delete('/account', {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="border-b border-sidebar-border/80 bg-white">
            <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">
                <div className="font-bold text-gray-800">
                    <Link href="/">miniAssassin</Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    {auth.user ? (
                        <>
                            <div className="flex items-center gap-2 font-medium text-gray-700">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="underline-offset-4 transition-colors hover:text-blue-600 hover:underline">
                                            {auth.user.name}
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-sm bg-gray-900 border-gray-700 text-white">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl text-center">Tvůj profil</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-col items-center gap-5 p-4">
                                            {auth.user?.player?.image_data_uri ? (
                                                <img
                                                    src={auth.user.player.image_data_uri}
                                                    alt={'uhhhhh.................'}
                                                    className="max-h-48 w-auto rounded-md object-contain shadow-lg"
                                                />
                                            ) : (
                                                <div className="flex h-32 w-32 items-center justify-center rounded-md bg-gray-800 text-gray-400">
                                                    Bez fotky
                                                </div>
                                            )}
                                            <div className="text-center">
                                                <h3 className="text-lg font-bold">{auth.user.name}</h3>
                                            </div>
                                            <div className="w-full rounded-md bg-gray-800 p-4 text-center border border-gray-700 shadow-inner">
                                                <p className="mb-1 text-sm text-gray-400">Codice:</p>
                                                <p className="text-2xl font-mono font-bold tracking-widest text-red-400 select-all">
                                                    {auth.user?.player?.codice || 'huh? Ty nemas codice???'}
                                                </p>
                                            </div>
                                            <div className="w-full border-t border-gray-700 pt-4 mt-2">
                                                <button
                                                    onClick={handleDeleteAccount}
                                                    className="w-full rounded-md bg-red-950 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 text-sm font-semibold transition-colors border border-red-900 hover:border-red-600"
                                                >
                                                    Smazat účet (Opustit hru)
                                                </button>
                                            </div>
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
                                Log out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="font-medium text-gray-700 hover:text-gray-900"
                            >
                                Log in
                            </Link>
                            <Link
                                href={register()}
                                className="rounded-md bg-gray-900 px-4 py-1.5 text-white transition hover:bg-gray-800"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
