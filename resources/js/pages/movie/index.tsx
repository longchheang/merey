import * as React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types'
import { Play } from 'lucide-react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Movie',
        href: '/movie',
    },
];

type Movie = {
    id: number;
    name: string;
    thumbnail: string;
    language?: { name: string };
    genre?: { name: string };
};

type MovieArray = Movie[] | { data: Movie[] };

type Props = {
    movies?: MovieArray; // <- optional now
};

// Type guard to safely detect if movies has a .data property
function isPaginatedMovies(movies: MovieArray): movies is { data: Movie[] } {
    return typeof movies === 'object' && movies !== null && 'data' in movies && Array.isArray(movies.data);
}

export default function Index({ movies }: Props) {
    const movieList: Movie[] = React.useMemo(() => {
        if (!movies) return [];
        return isPaginatedMovies(movies) ? movies.data : movies;
    }, [movies]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Movie" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {/* Featured Movies */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">Featured Movies</h1>
                    {movieList.length > 0 ? (
                        <Carousel className="w-full max-w-6xl mx-auto">
                            <CarouselContent>
                                {movieList.map((movie: Movie) => (
                                    <CarouselItem key={movie.id}>
                                        <div className="p-2">
                                            <Card className="overflow-hidden">
                                                <CardContent
                                                    className="relative flex items-end justify-start aspect-video bg-cover bg-center p-6 text-white"
                                                    style={{
                                                        backgroundImage: `url(${movie.thumbnail})`,
                                                    }}
                                                >
                                                    <div className="bg-black/60 p-3 rounded-lg w-full">
                                                        <h3 className="text-xl font-bold">{movie.name}</h3>
                                                        <p className="text-sm">
                                                            {movie.genre?.name} • {movie.language?.name}
                                                        </p>
                                                        <Link
                                                            href={`/movie/${movie.id}`}
                                                            className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
                                                        >
                                                            <Play className="w-4 h-4" />
                                                            Watch Now
                                                        </Link>

                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    ) : (
                        <p className="text-gray-500">No featured movies available.</p>
                    )}
                </div>

                {/* All Movies Grid */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <h1 className="text-2xl font-bold mb-4 p-5">All Movies</h1>
                    <div className="flex justify-end px-5 mb-4">
                    <Button asChild variant="outline">
                        <Link href="/discovery">More Movies</Link>
                    </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3">
                        {movieList.map((movie: Movie) => (
                            <Link
                                key={movie.id}
                                href={`/movie/${movie.id}`}
                                className="rounded-xl overflow-hidden shadow hover:shadow-md transition"
                            >
                                <img
                                    src={movie.thumbnail}
                                    alt={movie.name}
                                    className="w-full h-60 object-cover"
                                />
                                <div className="p-2">
                                    <div className="font-semibold">{movie.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {movie.genre?.name} - {movie.language?.name}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
