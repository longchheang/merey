import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];
type Props = {
    totalMovies: number;
    totalUsers: number;
    newUsersToday: number;
    newMoviesToday: number;
};

export default function Dashboard({ totalMovies, totalUsers, newUsersToday, newMoviesToday }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card title="Total Movies" value={totalMovies} color="bg-blue-100 text-blue-800" />
                <Card title="Total Users" value={totalUsers} color="bg-green-100 text-green-800" />
                <Card title="New Users Today" value={newUsersToday} color="bg-yellow-100 text-yellow-800" />
                <Card title="New Movies Today" value={newMoviesToday} color="bg-red-100 text-red-800" />
            </div>
        </AppLayout>
    );
}
function Card({
                  title,
                  value,
                  color = 'bg-blue-100 text-blue-700'
}: {
    title: string;
    value: number;
    color?: string;
}){
    return (
        <div className={`rounded-2xl shadow border-l-4 p-4 ${color}`}>
        <div className="text-xl font-bold">{value}</div>
            <div className="text-gray-500">{title}</div>
        </div>
    );
}
