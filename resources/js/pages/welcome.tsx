import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC]">
                {/* Hero Section */}
                <main className="flex flex-1 flex-col items-center justify-center px-6 text-center lg:px-8 max-w-4xl mx-auto">
                    <h1 className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl font-instrument-sans drop-shadow-md">
                        Welcome to <span className="text-red-600 dark:text-red-500">MerEy</span>
                    </h1>

                    <p className="mb-10 max-w-xl text-lg sm:text-xl text-[#444] dark:text-[#ccc] drop-shadow-sm">
                        Discover and stream the latest movies anywhere.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        {auth.user ? (
                            auth.user.is_admin ? (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="rounded-lg bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                                >
                                    Admin Panel
                                </Link>
                            ) : (
                                <Link
                                    href={route('movie')}
                                    className="rounded-lg bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                                >
                                    Browse Movies
                                </Link>
                            )
                            ) : (
                                <>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                                >
                                    Log In
                                </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg border-2 border-red-600 px-8 py-3 text-lg font-semibold text-red-600 shadow-lg hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                                    >
                                        Register
                                    </Link>
                                </>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
