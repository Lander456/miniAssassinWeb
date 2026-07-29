import { Link } from '@inertiajs/react';

export function BottomBar() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white py-4 mt-auto">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-gray-500 md:flex-row">
                <div>
                    miniAssassin
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <a href="https://discord.gg/6ARXdnVYx" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">
                        Discord
                    </a>
                    <a href="tel:+420777883866" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        +420 777 883 866
                    </a>
                    <Link href="/pravidla" className="hover:text-gray-900 transition-colors">
                        Pravidla
                    </Link>
                </div>
            </div>
        </footer>
    )
}
