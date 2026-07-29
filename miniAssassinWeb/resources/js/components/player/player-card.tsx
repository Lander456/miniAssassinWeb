import { router, useForm, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export interface Player {
    id: number;
    name: string;
    points: number;
    isDead: boolean;
    image_data_uri: string | null
}

interface PlayerCardProps {
    player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
    const { auth } = usePage().props;

    const isAdmin = auth.user?.is_admin ?? false;

    const { data, setData, post, processing, reset } = useForm({
        points: '',
    })

    const submitPoints = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/admin/players/${player.id}/points`, {
            preserveScroll: true,
            onSuccess: () => reset('points'),
        });
    };

    const handleDelete = () => {
        if (confirm(`Urcite chces smazat hrace ${player.name} a jeho profil?`)) {
            router.delete(`/admin/players/${player.id}`, {
                preserveScroll: true
            });
        }
    };

    console.log(player);

    return (
        <div
            className={`flex w-full max-w-sm items-center justify-between rounded-full border-gray-200 px-4 py-2 shadow-sm transition-colors ${player.isDead ? 'bg-gray-300 opacity-75' : 'bg-white'} `}
        >
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className={`flex items-center gap-2 font-medium tracking-wide ${player.isDead ? 'text-gray-500 line-through' : 'text-gray-800'} `}
                    >
                        {player.name}
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-md border-gray-700 bg-gray-900">
                    <DialogHeader>
                        <DialogTitle className="text-xl text-white">
                            {player.name}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center p-4">
                        {player.image_data_uri ? (
                            <img
                                src={player.image_data_uri}
                                alt={`Fotka hráče ${player.name}`}
                                className="max-h-[50vh] w-auto rounded-md object-contain shadow-lg"
                            />
                        ) : (
                            <p className="text-gray-400">Uhhhh... :(((</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            <span
                className={`tracking-wide ${player.isDead ? 'text-gray-500' : 'text-gray-800'} `}
            >
                {player.points}
            </span>
            {isAdmin && (
                <div className="flex items-center gap-2">
                    <form
                        onSubmit={submitPoints}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="number"
                            value={data.points}
                            onChange={(e) => setData('points', e.target.value)}
                            placeholder="+/-"
                            className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm text-black"
                            required
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                            Přidat body
                        </button>
                    </form>
                    <button
                        onClick={handleDelete}
                        className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-600 hover:text-white"
                        title="smazat hrace"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
