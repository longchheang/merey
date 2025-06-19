import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Clapperboard ,ChartColumnStacked , BookType,Telescope} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const user = auth.user as unknown as{id:number; name:string; role:'admin'| 'user'} | null;
    const dashboardHref = user?.role === 'admin' ? '/admin/dashboard' : '/movie';
    const mainNavItems: NavItem[] = user?.role === 'admin'? [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Admin movie',
            href: '/admin/movie',
            icon: Clapperboard,
        },
        {
            title: 'Admin Genre',
            href: '/admin/genre',
            icon: ChartColumnStacked,
        },
        {
            title: 'Admin Language',
            href: '/admin/language',
            icon: BookType,
        },
    ]: user?.role === 'user'? [
        {
            title: 'Movie',
            href: '/movie',
            icon: Clapperboard,
        },
        {
            title: 'Movie Discovery',
            href: '/discovery',
            icon: Telescope,
        },
    ]:[];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {auth.user ? (
                        <NavUser />
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Register
                        </Link>
                    </>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
