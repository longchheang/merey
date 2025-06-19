import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, useForm, router } from "@inertiajs/react"; // Added router import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Movie Create",
        href: "/admin/movie",
    },
];

export interface Genre {
    id: number;
    name: string;
}

export interface Language {
    id: number;
    name: string;
}

interface CreateProps {
    genres: Genre[];
    languages: Language[];
}

export default function Create({ genres, languages }: CreateProps) {
    // Use `useForm` to manage form data and submission
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        genre_id: "",
        language_id: "",
        video: null as File | null,
        thumbnail: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id as 'video' | 'thumbnail';
        const file = e.target.files?.[0] || null;
        setData(key, file);
    };

    const handleGenreChange = (value: string) => {
        setData("genre_id", value);
    };

    const handleLanguageChange = (value: string) => {
        setData("language_id", value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('movie.store'));
    };

    const handleCancel = () => {
        router.visit(route('movie.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Movie Create" />
            <div className="p-3">
                <div className="flex justify-end mb-4">
                    <Button asChild>
                        <Link href={route("movie.index")}>Back</Link>
                    </Button>
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Content</CardTitle>
                        <CardDescription>
                            Upload your video, upload your thumbnail
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
                                        placeholder="Your Movie Name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                </div>

                                {/* Description */}
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="description">Description</Label>
                                    </div>
                                    <Textarea
                                        id="description"
                                        placeholder="Type your description here."
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                                </div>

                                <div className="flex gap-5">
                                    {/* Language Select */}
                                    <div>
                                        <Label htmlFor="language_id">Language</Label>
                                        <Select
                                            value={data.language_id}
                                            onValueChange={handleLanguageChange}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Language" />
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
                                        {errors.language_id && <span className="text-red-500 text-sm">{errors.language_id}</span>}
                                    </div>
                                    {/* Genre Select */}
                                    <div>
                                        <Label htmlFor="genre_id">Genre</Label>
                                        <Select value={data.genre_id} onValueChange={handleGenreChange}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Genre" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {genres.map((genre) => (
                                                    <SelectItem key={genre.id} value={genre.id.toString()}>
                                                        {genre.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.genre_id && <span className="text-red-500 text-sm">{errors.genre_id}</span>}
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    {/* Video */}
                                    <div className="grid w-full max-w-sm items-center gap-3">
                                        <Label htmlFor="video">Video</Label>
                                        <Input
                                            id="video"
                                            type="file"
                                            accept="video/*"
                                            onChange={handleFileChange}
                                        />
                                        {errors.video && <span className="text-red-500 text-sm">{errors.video}</span>}
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="grid w-full max-w-sm items-center gap-3">
                                        <Label htmlFor="thumbnail">Thumbnail</Label>
                                        <Input
                                            id="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        {errors.thumbnail && <span className="text-red-500 text-sm">{errors.thumbnail}</span>}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end mb-4 gap-5">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Adding...' : 'Add'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={processing}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
