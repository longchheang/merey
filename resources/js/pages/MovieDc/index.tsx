import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Play, Search } from 'lucide-react';

type Genre = { id: number; name: string };
type Language = { id: number; name: string };
type Movie = {
    id: number;
    name: string;
    thumbnail?: string;
    genre: Genre;
    language: Language;
};

type Props = {
    movies: {
        data: Movie[];
    };
    genres: Genre[];
    languages: Language[];
    filters: {
        genre?: string;
        language?: string;
        search?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Movie Discovery',
        href: '/discovery',
    },
];

export default function Index({ movies, genres, languages, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [selectedGenre, setSelectedGenre] = useState(filters?.genre || '');
    const [selectedLanguage, setSelectedLanguage] = useState(filters?.language || '');

    const filteredMovies = useMemo(() => {
        let filtered = movies.data;

        if (searchTerm) {
            filtered = filtered.filter(movie =>
                movie.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedGenre) {
            filtered = filtered.filter(movie =>
                movie.genre.id.toString() === selectedGenre
            );
        }

        if (selectedLanguage) {
            filtered = filtered.filter(movie =>
                movie.language.id.toString() === selectedLanguage
            );
        }

        return filtered;
    }, [movies.data, searchTerm, selectedGenre, selectedLanguage]);

    const handleServerSideFilter = () => {
        const params: Record<string, string> = {};
        if (searchTerm) params.search = searchTerm;
        if (selectedGenre) params.genre = selectedGenre;
        if (selectedLanguage) params.language = selectedLanguage;

        router.get('/discovery', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('');
        setSelectedLanguage('');

        router.get('/discovery', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Movie Discovery" />

            <div className="p-4 max-w-6xl mx-auto">
                {/* Filter Section */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleServerSideFilter()}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                            />
                        </div>

                        {/* Genre */}
                        <div className="min-w-[200px]">
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                            >
                                <option value="">All Genres</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id.toString()}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Language */}
                        <div className="min-w-[200px]">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                            >
                                <option value="">All Languages</option>
                                {languages.map((language) => (
                                    <option key={language.id} value={language.id.toString()}>
                                        {language.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Apply */}
                        <button
                            onClick={handleServerSideFilter}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Apply Filters
                        </button>

                        {/* Clear */}
                        {(searchTerm || selectedGenre || selectedLanguage) && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>

                    {/* Count */}
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredMovies.length} of {movies.data.length} movies
                    </div>
                </div>

                {/* Movie Grid */}
                {filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredMovies.map((movie) => (
                            <div key={movie.id} className="border border-gray-200 dark:border-gray-700 rounded shadow-sm overflow-hidden hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                                <img
                                    src={movie.thumbnail || '/placeholder-movie.jpg'}
                                    alt={movie.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-3">
                                    <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                        {movie.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        {movie.genre.name} | {movie.language.name}
                                    </p>
                                    <Link
                                        href={`/movie/${movie.id}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
                                    >
                                        <Play className="w-4 h-4" />
                                        Watch Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dark:text-gray-400 mb-2">No movies found</div>
                        <div className="text-sm text-gray-400 dark:text-gray-500">
                            Try adjusting your search terms or filters
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
