import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, BookOpenCheck, Clock, Folder, LayoutGrid, Library, Tags } from 'lucide-react';
import AppLogo from './app-logo';

const getMainNavItems = (isAdmin: boolean): NavItem[] => {
    const baseItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Katalog Buku',
            href: '/katalog',
            icon: Library,
        },
    ];

    if (isAdmin) {
        return [
            ...baseItems,
            {
                title: 'Kelola Buku',
                href: '/books',
                icon: BookOpen,
            },
            {
                title: 'Kategori',
                href: '/categories',
                icon: Tags,
            },
            {
                title: 'Peminjaman',
                href: '/borrowings',
                icon: BookOpenCheck,
            },
            {
                title: 'Daftar Tunggu',
                href: '/waitlists',
                icon: Clock,
            },
        ];
    }

    return baseItems;
};

const footerNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: '/',
        icon: Folder,
    },
    {
        title: 'Katalog Publik',
        href: '/katalog',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user?: { email: string; is_admin?: boolean } } }>().props;
    const isAdmin = auth?.user?.email === 'admin@perpustakaan.desa' || (auth?.user?.is_admin ?? false);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getMainNavItems(isAdmin)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
