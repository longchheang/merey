import React, { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Movie', href: '/admin/movie' },
];

type Movie = {
    id: number;
    name: string;
    language?: { name: string };
    genre?: { name: string };
};

type IndexProps = {
    movies: Movie[];
};

type SortKey = 'id' | 'name' | 'language' | 'genre';

export default function Index({ movies }: IndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to remove it?")) {
            router.delete(route('movie.destroy', id), {
                onSuccess: () => console.log('Deleted successfully'),
                onError: (errors) => console.error(errors)
            });
        }
    };

    const sortedAndFilteredMovies = useMemo(() => {
        const filtered = movies.filter((movie) =>
            movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.sort((a, b) => {
            let aValue = a[sortKey];
            let bValue = b[sortKey];

            if (sortKey === 'language') {
                aValue = a.language?.name || '';
                bValue = b.language?.name || '';
            } else if (sortKey === 'genre') {
                aValue = a.genre?.name || '';
                bValue = b.genre?.name || '';
            }

            const aStr = aValue?.toString().toLowerCase() || '';
            const bStr = bValue?.toString().toLowerCase() || '';

            return sortOrder === 'asc'
                ? aStr.localeCompare(bStr)
                : bStr.localeCompare(aStr);
        });
    }, [movies, searchTerm, sortKey, sortOrder]);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const getSortIndicator = (key: SortKey) =>
        sortKey === key ? (sortOrder === 'asc' ? '↑' : '↓') : '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Movie" />
            <div className="p-3 space-y-4">
                {/* Top Bar */}
                <div className="flex justify-between items-center">
                    <Input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button asChild>
                        <Link href={route('movie.create')}>Create</Link>
                    </Button>
                </div>

                {/* Table */}
                <Table>
                    <TableCaption>A list of your Movies</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort('id')}>
                                ID {getSortIndicator('id')}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort('name')}>
                                Name {getSortIndicator('name')}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort('language')}>
                                Language {getSortIndicator('language')}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort('genre')}>
                                Genre {getSortIndicator('genre')}
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedAndFilteredMovies.map((movie) => (
                            <TableRow key={movie.id}>
                                <TableCell className="font-medium">{movie.id}</TableCell>
                                <TableCell>{movie.name}</TableCell>
                                <TableCell>{movie.language?.name}</TableCell>
                                <TableCell>{movie.genre?.name}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button asChild variant="outline">
                                        <Link href={route('movie.show', movie.id)}>View</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={route('movie.edit', movie.id)}>Edit</Link>
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(movie.id)}
                                        variant="destructive"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
