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
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin genre',
        href: '/admin/genre',
    },
];

type Genre = {
    id: number;
    name: string;
};

type IndexProps = {
    genres: Genre[];
};

export default function Index( { genres }: IndexProps ) {

    function handleDelete(id: number) {
        if (confirm("Are you sure you want to remove it?")) {
            router.delete(route('genre.destroy', id), {
                onSuccess: () => {
                    // Optional: Do something after successful deletion, like show toast or refresh page
                    console.log('Deleted successfully');
                },
                onError: (errors) => {
                    console.error(errors);
                }
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Movie" />
            <div className="p-10">
                <div className="flex justify-end mb-4">
                    <Button asChild>
                        <Link href={route('genre.create')}>Create</Link>
                    </Button>
                </div>
                <Table>
                    <TableCaption>A list of your Movies</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {genres.map((genre) => (
                            <TableRow key={genre.id}>
                                <TableCell className="font-medium">{genre.id}</TableCell>
                                <TableCell>{genre.name}</TableCell>
                                <TableCell className="text-right space-x-4">
                                    <Button asChild >
                                        <Link href={route('genre.edit', genre.id)}>Edit</Link>
                                    </Button>

                                    <Button onClick={()=> handleDelete(genre.id)}
                                            variant="destructive">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
