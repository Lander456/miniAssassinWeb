import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import logoImage from '../../../images/logo2.png'

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onSuccess: () => reset('password'),
        });
    };

    return (
        <div className="text-brand-secondary bg-brand-primary">
            <Head title="Přihlášení" />

            <img
                src={logoImage}
                alt="Logo společnosti"
            />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Emailová adresa</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoFocus
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Heslo</Label>
                        </div>
                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full bg-brand-primary text-brand-secondary hover:opacity-80 hover:bg-brand-primary border-brand-secondary border"
                        disabled={processing}
                    >
                        {processing && <Spinner />}
                        Přihlásit
                    </Button>
                </div>

                <div className="mt-4 text-center text-sm text-brand-secondary">
                    Ještě jsi se neupsal do služeb Aeronauticy Fenomenale?{' '}
                    <Link href="/register" className="underline hover:text-brand-secondary-sat">
                        Zápis
                    </Link>
                </div>
            </form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </div>
    );
}
