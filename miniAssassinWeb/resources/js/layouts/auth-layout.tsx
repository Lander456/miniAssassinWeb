import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { BottomBar } from '@/components/bottom-bar';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthLayoutTemplate title={title} description={description}>
                {children}
            </AuthLayoutTemplate>
            <BottomBar />
        </>
    );
}
