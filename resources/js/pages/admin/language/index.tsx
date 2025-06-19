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
        title: 'Admin Language',
        href: '/admin/language',
    },
];

type Language = {
    id: number;
    name: string;
};

type IndexProps = {
    languages: Language[];
};

export default function Index( { languages }: IndexProps ) {

    function handleDelete(id: number) {
        if (confirm("Are you sure you want to remove it?")) {
            router.delete(route('language.destroy', id), {
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
                        <Link href={route('language.create')}>Create</Link>
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
                        {languages.map((language) => (
                            <TableRow key={language.id}>
                                <TableCell className="font-medium">{language.id}</TableCell>
                                <TableCell>{language.name}</TableCell>
                                <TableCell className="text-right space-x-4">
                                    <Button asChild >
                                        <Link href={route('language.edit', language.id)}>Edit</Link>
                                    </Button>

                                    <Button onClick={()=> handleDelete(language.id)}
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
