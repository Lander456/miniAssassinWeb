import { Link, router, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { login, register } from '@/routes';
import logoImage from '../../images/logo2.png'

export function AppHeader() {
    const page = usePage();
    const { auth, playerCount, gameStarted } = page.props;
    const [isEditingName, setIsEditingName] = useState(false);
    const [editNameValue, setEditNameValue] = useState(auth.user?.name || '');
    const [isSavingName, setIsSavingName] = useState(false);


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

    const handleNameSave = () => {
        if (!editNameValue.trim() || editNameValue === auth.user?.name) {
            setIsEditingName(false);

            return;
        }

        setIsSavingName(true);

        router.patch('/profile/name', {
            name: editNameValue
        }, {
            preserveScroll: true,
            onSuccess: () => setIsEditingName(false),
            onFinish: () => setIsSavingName(false),
        });
    };

    return (
        <div className="border-b border-brand-secondary bg-brand-primary">
            <div className="mx-auto flex h-16 items-center justify-between px-2 sm:px-4 md:max-w-7xl">
                <div className="text-md font-bold text-brand-secondary md:text-base">
                    <Link
                        href="/"
                        className="flex flex-row items-center gap-2 transition-opacity hover:opacity-80"
                    >
                        <img
                            src={logoImage}
                            alt="Logo společnosti"
                            className="h-20 w-20 object-contain"
                        />
                        miniAssassin
                    </Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    {!gameStarted && playerCount !== undefined && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-semibold text-blue-800 sm:text-xs">
                            Počet hráčů: {playerCount}
                        </span>
                    )}

                    <div className="flex items-center gap-2 font-medium text-gray-700 sm:gap-4">
                        {auth.user ? (
                            <>
                                <div className="flex items-center gap-1 font-medium text-gray-700 sm:gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="max-w-[80px] truncate text-left underline-offset-4 transition-colors text-brand-secondary hover:text-brand-secondary-sat hover:underline sm:max-w-[150px]">
                                                {auth.user.name}
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="max-h-[90vh] w-[95vw] max-w-sm overflow-y-auto rounded-lg border-brand-secondary bg-brand-primary text-brand-secondary">
                                            <DialogHeader>
                                                <DialogTitle className="text-center text-xl">
                                                    Tvůj profil
                                                </DialogTitle>
                                            </DialogHeader>

                                            <div className="flex flex-col items-center gap-4 p-2 sm:p-4">
                                                <div
                                                    className="group relative flex cursor-pointer justify-center overflow-hidden rounded-md"
                                                    onClick={handleImageClick}
                                                >
                                                    {auth.user?.player
                                                        ?.image_path ? (
                                                        <img
                                                            src={
                                                                `${auth.user.player.image_path.startsWith('http')
                                                                    ? auth.user.player.image_path
                                                                    : `storage/${auth.user.player.image_path}`
                                                                }`
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
                                                        <span className="rounded bg-black/80 px-3 py-1.5 text-sm font-semibold text-brand-secondary shadow-md">
                                                            Změnit fotku
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex min-h-[40px] w-full items-center justify-center text-center">
                                                    {isEditingName ? (
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <input
                                                                type="text"
                                                                value={
                                                                    editNameValue
                                                                }
                                                                onChange={(e) =>
                                                                    setEditNameValue(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                onKeyDown={(
                                                                    e,
                                                                ) => {
                                                                    if (
                                                                        e.key ===
                                                                        'Enter'
                                                                    ) {
                                                                        handleNameSave();
                                                                    }

                                                                    if (
                                                                        e.key ===
                                                                        'Escape'
                                                                    ) {
                                                                        setIsEditingName(
                                                                            false,
                                                                        );
                                                                    }
                                                                }}
                                                                disabled={
                                                                    isSavingName
                                                                }
                                                                className="w-40 rounded border bg-gray-800 px-3 py-1.5 text-center font-bold text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                                                                autoFocus
                                                            />
                                                            <button
                                                                onClick={
                                                                    handleNameSave
                                                                }
                                                                disabled={
                                                                    isSavingName
                                                                }
                                                                className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                                                            >
                                                                Uložit
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    setIsEditingName(
                                                                        false,
                                                                    )
                                                                }
                                                                disabled={
                                                                    isSavingName
                                                                }
                                                                className="rounded bg-gray-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-600 disabled:opacity-50"
                                                            >
                                                                Zrušit
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="group flex cursor-pointer items-center gap-2 rounded px-3 py-1 transition-colors hover:bg-gray-800"
                                                            onClick={() => {
                                                                setEditNameValue(
                                                                    auth.user
                                                                        .name,
                                                                );
                                                                setIsEditingName(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            <h3>
                                                                {auth.user.name}
                                                            </h3>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="text-gray-400 opacity-60 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
                                                            >
                                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full rounded-md border border-brand-secondary bg-brand-primary p-4 text-center shadow-inner">
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
                                                        Smazat účet (Opustit
                                                        hru)
                                                    </button>
                                                    <DialogClose asChild>
                                                        <button className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-700 hover:text-white sm:hidden">
                                                            Zavřít
                                                        </button>
                                                    </DialogClose>
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
                                    <span className="text-brand-secondary">|</span>
                                    <span className={"text-brand-secondary"}>
                                        {auth.user?.player?.points} bodů
                                    </span>
                                </div>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="rounded-md bg-[#e4d5ac] px-3 py-1 text-brand-primary transition hover:bg-brand-secondary-sat sm:px-4 sm:py-1.5"
                                >
                                    Odhlášení
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="font-medium text-brand-secondary hover:text-brand-secondary-sat"
                                >
                                    Přihlášení
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-md bg-brand-secondary px-3 py-1 text-brand-primary transition hover:bg-brand-secondary-sat sm:px-4 sm:py-1.5"
                                >
                                    Registrace
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
