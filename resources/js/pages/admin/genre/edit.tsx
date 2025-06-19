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
import React from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Movie edit",
        href: "/admin/movie",
    },
];

type Genre = {
    id: number;
    name: string;
};

type EditProps = {
    genres: Genre;
};

export default function Edit({ genres }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: genres.name || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("genre.update", genres.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Movie" />
            <div className="p-3">
                <div className="flex justify-end mb-4">
                    <Button asChild>
                        <Link href={route("genre.index")}>Back</Link>
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
                                        placeholder="Genre Name"
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
