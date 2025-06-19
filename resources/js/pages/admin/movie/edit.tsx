import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Movie edit",
        href: "/admin/movie",
    },
];

type Movie = {
    id: number;
    name: string;
    description?: string;
    language_id?: number;
    genre_id?: number;
};

type Language = {
    id: number;
    name: string;
};

type Genre = {
    id: number;
    name: string;
};

type EditProps = {
    movie: Movie;
    languages: Language[];
    genres: Genre[];
};

export default function Edit({ movie, languages, genres }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: movie.name || "",
        description: movie.description || "",
        language_id: movie.language_id?.toString() || "",
        genre_id: movie.genre_id?.toString() || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert to number before submitting (if needed)
        setData({
            ...data,
            language_id: Number(data.language_id).toString(),
            genre_id: Number(data.genre_id).toString(),
        });

        // Then submit
        put(route("movie.update", movie.id));
    };


    const handleLanguageChange = (value: string) => {
        setData("language_id", value);
    };

    const handleGenreChange = (value: string) => {
        setData("genre_id", value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Movie" />
            <div className="p-3">
                <div className="flex justify-end mb-4">
                    <Button asChild>
                        <Link href={route("movie.index")}>Back</Link>
                    </Button>
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Edit Movie</CardTitle>
                        <CardDescription>
                            Update your movie information
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                {/* Movie Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Movie Name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        required
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-sm">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter movie description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                    />
                                    {errors.description && (
                                        <span className="text-red-500 text-sm">
                                            {errors.description}
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-5">
                                    {/* Language Select */}
                                    <div className="w-full">
                                        <Label htmlFor="language_id">Language</Label>
                                        <Select
                                            value={data.language_id}
                                            onValueChange={handleLanguageChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {languages.map((language) => (
                                                    <SelectItem
                                                        key={language.id}
                                                        value={language.id.toString()}
                                                    >
                                                        {language.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.language_id && (
                                            <span className="text-red-500 text-sm">
                                                {errors.language_id}
                                            </span>
                                        )}
                                    </div>

                                    {/* Genre Select */}
                                    <div className="w-full">
                                        <Label htmlFor="genre_id">Genre</Label>
                                        <Select
                                            value={data.genre_id}
                                            onValueChange={handleGenreChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a genre" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {genres.map((genre) => (
                                                    <SelectItem
                                                        key={genre.id}
                                                        value={genre.id.toString()}
                                                    >
                                                        {genre.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.genre_id && (
                                            <span className="text-red-500 text-sm">
                                                {errors.genre_id}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 p-5">
                            <Button type="submit" disabled={processing}>
                                Update
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
