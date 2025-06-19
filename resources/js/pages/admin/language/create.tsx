import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, useForm, router } from "@inertiajs/react"; // Added router import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Language Create",
        href: "/admin/language",
    },
];

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('language.store'));
    };

    const handleCancel = () => {
        router.visit(route('language.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Language Create" />
            <div className="p-3">
                <div className="flex justify-end mb-4">
                    <Button asChild>
                        <Link href={route("language.index")}>Back</Link>
                    </Button>
                </div>
                <div className="flex items-center justify-center p-4">
                    <Card className="w-full max-w-sm">
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
                                            placeholder="Input the Languages"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end mb-6 gap-5 p-4">
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
            </div>
        </AppLayout>
    );
}
