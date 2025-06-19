import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Globe, Tag, FileText } from "lucide-react";
import HlsVideoPlayer from '@/components/HlsVideoPlayer';

type Movie = {
    id: number;
    name: string;
    description?: string;
    thumbnail?: string;
    video_path?: string;
    language?: { name: string };
    genre?: { name: string };
};

type ShowProps = {
    movie: Movie;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Movie Detail",
        href: "/admin/movie",
    },
];

export default function Show({ movie }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={movie.name} />

            <div className="min-h-screen from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                {/* Header Section */}
                <div className="bg-white dark:bg-slate-900 shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={route("movie.index")} className="flex items-center space-x-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        <span>Back to Movies</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Video Player Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="overflow-hidden shadow-lg">
                                <CardContent className="p-0">
                                    {movie.video_path ? (
                                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                                            <HlsVideoPlayer
                                                src={movie.video_path}
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center rounded-lg">
                                            <div className="text-center">
                                                <Play className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                                                <p className="text-slate-600 dark:text-slate-300 text-lg">No video available</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Movie Title and Description */}
                            <div className="space-y-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                        {movie.name}
                                    </h1>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {movie.language && (
                                            <Badge variant="secondary" className="flex items-center space-x-1">
                                                <Globe className="h-3 w-3" />
                                                <span>{movie.language.name}</span>
                                            </Badge>
                                        )}
                                        {movie.genre && (
                                            <Badge variant="outline" className="flex items-center space-x-1">
                                                <Tag className="h-3 w-3" />
                                                <span>{movie.genre.name}</span>
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {movie.description && (
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-3">
                                                <FileText className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                                                        Description
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                        {movie.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Thumbnail */}
                            {movie.thumbnail && (
                                <Card className="overflow-hidden shadow-lg">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <img
                                                src={movie.thumbnail}
                                                alt={`${movie.name} poster`}
                                                className="w-full h-auto object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Movie Info Card */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                                        Movie Information
                                    </h3>
                                    <div className="space-y-4">
                                        {movie.language && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                                                    <Globe className="h-4 w-4" />
                                                    <span>Language</span>
                                                </span>
                                                <span className="font-medium text-slate-900 dark:text-white">
                                                    {movie.language.name}
                                                </span>
                                            </div>
                                        )}
                                        {movie.genre && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                                                    <Tag className="h-4 w-4" />
                                                    <span>Genre</span>
                                                </span>
                                                <span className="font-medium text-slate-900 dark:text-white">
                                                    {movie.genre.name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
