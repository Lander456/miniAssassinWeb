import { router, useForm, usePage } from '@inertiajs/react';

import { useEffect, useState } from 'react';
import { DeathTimer } from '@/components/death-timer'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sidebar,
    SidebarContent, useSidebar,
} from '@/components/ui/sidebar';
import type { User } from '@/types';

interface CodeItem {
    id: number;
    name: string;
    image_data_uri: string | null;
    active: boolean;
}

export function AppSidebar() {
    const { auth, codes = [] } = usePage().props as unknown as {
        auth: { user: User },
        codes: CodeItem[]
    };
    const user: User = auth.user
    const { setOpen } = useSidebar();

    const isPlayer = !!user?.player;
    const deadUntil = user?.player?.deadUntil;
    const isDead = isPlayer && deadUntil && new Date(deadUntil) > new Date();
    const isAdmin = user?.is_admin ?? false;

    useEffect(() => {
        if (!user) {
            setOpen(false);
        }
    }, [user, setOpen])

    useEffect(() => {
        if (!isDead) {
            return;
        }

        const timeRemaining =
            new Date(deadUntil).getTime() - new Date().getTime();

        if (timeRemaining > 0) {
            const timeoutId = setTimeout(() => {
                router.reload();
            }, timeRemaining);

            return () => clearTimeout(timeoutId);
        }
    }, [isDead, deadUntil]);

    const { data: killData,
        setData: setKillData,
        post: postKill,
        processing: processingKill,
        errors: errorsKill,
        reset: resetKill
    } = useForm({
        kill: '',
    });

    const {
        data: codeData,
        setData: setCodeData,
        post: postCode,
        processing: processingCode,
        errors: errorsCode,
        reset: resetCode,
    } = useForm({
        code: '',
    });

    const {
        data: uploadData,
        setData: setUploadData,
        post: postUpload,
        processing: processingUpload,
        errors: uploadErrors,
        reset: resetUpload
    } = useForm({
        name: '',
        points: '',
        image: null
    });

    const handleKillSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        postKill('/kill', {
            onSuccess: () => resetKill('kill'),
            onError: () => resetKill('kill'),
        });
    };

    const handleCodeSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        postCode('/code', {
            onSuccess: () => resetCode('code'),
            onError: () => resetCode('code'),
        });
    };

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postUpload('/admin/codes', {
            onSuccess: () => {
                resetUpload();
                setIsUploadOpen(false);
            },
        });
    };

    const handleDeleteCode = (id: number) => {
        if (confirm('Urůčitě chceš kódík smazat?')) {
            router.delete(`/admin/codes/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const [isUploadOpen, setIsUploadOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            setOpen(false);
        }
    }, [user, setOpen]);

    return (
        <Sidebar collapsible="offcanvas" variant="sidebar">
            <SidebarContent>
                {isDead ? (
                    <DeathTimer deadUntil={deadUntil} />
                    ) : (
                    <>
                        <form
                            onSubmit={handleKillSubmit}
                        >
                            <Label htmlFor="kill">Kill:</Label>
                            <Input
                                id="kill"
                                type="text"
                                value={killData.kill}
                                onChange={(e) => setKillData('kill', e.target.value)}
                            />
                            {errorsKill.kill && <span className={"text-red-500 text-sm"}>{errorsKill.kill}</span>}
                            <Button
                                type="submit"
                                disabled={processingKill}
                            >
                                {processingKill ? 'Sending=...' : 'Zadat Kill'}
                            </Button>
                        </form>
                        <form onSubmit={handleCodeSubmit} className="flex flex-col gap-2">
                            <Label htmlFor="code">Code:</Label>
                            <Input
                                id="code"
                                type="text"
                                value={codeData.code}
                                onChange={(e) => setCodeData('code', e.target.value)}
                            />
                            {errorsCode.code && <span className="text-red-500 text-sm">{errorsCode.code}</span>}

                            <Button type="submit" disabled={processingCode}>
                                {processingCode ? 'Sending...' : 'Zadat Kodik'}
                            </Button>
                        </form>
                    </>
                    )}
                <div className="mt-4 border-t border-sidebar-border pt-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Kodicky :)
                    </h3>

                    {codes.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {codes.map((item) => (
                                <li key={item.id} className="flex items-center gap-1">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="w-full text-left rounded-md bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-between">
                                                <span className={!item.active ? 'line-through text-gray-500' : ''}>{item.name}</span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl bg-gray-900 border-gray-700">
                                            <DialogHeader>
                                                <DialogTitle className="text-white text-xl">{item.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex justify-center p-4">
                                                {item.image_data_uri ? (
                                                    <img
                                                        src={item.image_data_uri}
                                                        alt={`Cifra pro ${item.name}`}
                                                        className="max-h-[70vh] w-auto rounded-md object-contain"
                                                    />
                                                ) : (
                                                    <p className="text-gray-400">Cifra ztracena :(</p>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDeleteCode(item.id)}
                                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                                            title="Smazat cifru"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18"/>
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                            </svg>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">Keine cifry :(</p>
                    )}
                </div>
                {isAdmin && (
                    <div className="mt-4 pt-4 border-t border-sidebar-border">
                        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md">
                                    Nahrát cifru
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md bg-gray-900 border-gray-700 text-white">
                                <DialogHeader>
                                    <DialogTitle>
                                        Vytvořit novou cifru
                                    </DialogTitle>
                                    <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4 mt-2">
                                        <div>
                                            <Label>Název cifry</Label>
                                            <Input
                                                value={uploadData.name}
                                                onChange={e => setUploadData('name', e.target.value)}
                                                required
                                                className="bg-gray-800 border-gray-700"
                                            />
                                            {uploadErrors.name && <span className="text-red-500 text-sm">{uploadErrors.name}</span>}
                                        </div>
                                        <div>
                                            <Label>Bodová hodnota</Label>
                                            <Input
                                                type="number"
                                                value={uploadData.points}
                                                onChange={e => setUploadData('points', e.target.value)}
                                                required
                                                className="bg-gray-800 border-gray-700"
                                            />
                                            {uploadErrors.points && <span className="text-red-500 text-sm">{uploadErrors.points}</span>}
                                        </div>
                                        <div>
                                            <Label>Obsah cifry (PNG/JPG)</Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setUploadData('image', e.target.files ? e.target.files[0] : null)
                                                }
                                                required
                                                className="bg-gray-800 border-gray-700 cursor-pointer file:text-white"
                                            />
                                            {uploadErrors.image && <span className="text-red-500 text-sm">{uploadErrors.image}</span>}
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={processingUpload}
                                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            {processingUpload ? 'Nahrávání...' : 'Nahrát cifru'}
                                        </Button>
                                    </form>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </SidebarContent>
        </Sidebar>
    );
}
