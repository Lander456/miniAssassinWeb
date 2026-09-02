import {BottomBar} from "@/components/bottom-bar";
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="pb-16">
                <AppLayoutTemplate breadcrumbs={breadcrumbs}>
                    {children}
                </AppLayoutTemplate>
            </div>
            <div className="fixed bottom-0 left-0 z-50 w-full">
                <BottomBar />
            </div>
        </>
    );
}
