import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardStats {
    total_books?: number;
    total_categories?: number;
    active_borrowings?: number;
    pending_waitlists?: number;
    overdue_borrowings?: number;
    total_users?: number;
    pending_requests?: number;
    total_borrowed?: number;
}

interface Borrowing {
    id: number;
    borrowed_date: string;
    due_date: string;
    returned_date?: string;
    status: string;
    user: {
        name: string;
    };
    book: {
        title: string;
        category: {
            name: string;
        };
    };
}

interface Waitlist {
    id: number;
    status: string;
    created_at: string;
    user: {
        name: string;
    };
    book: {
        title: string;
        category: {
            name: string;
        };
    };
}

interface Book {
    id: number;
    title: string;
    available_stock: number;
    category: {
        name: string;
    };
}

interface Props {
    isAdmin: boolean;
    stats: DashboardStats;
    recentBorrowings?: Borrowing[];
    pendingWaitlists?: Waitlist[];
    lowStockBooks?: Book[];
    activeBorrowings?: Borrowing[];
    borrowingHistory?: Borrowing[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ 
    isAdmin, 
    stats, 
    recentBorrowings = [], 
    pendingWaitlists = [], 
    lowStockBooks = [], // eslint-disable-line @typescript-eslint/no-unused-vars
    activeBorrowings = [],
    borrowingHistory = []
}: Props) {
    if (isAdmin) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard Admin" />
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                            <p className="text-gray-600">Sistem Perpustakaan Desa</p>
                        </div>
                        <div className="text-4xl">📚</div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">📖</div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Buku</p>
                                    <p className="text-2xl font-bold text-blue-600">{stats.total_books}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">📂</div>
                                <div>
                                    <p className="text-sm text-gray-600">Kategori</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.total_categories}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">📋</div>
                                <div>
                                    <p className="text-sm text-gray-600">Sedang Dipinjam</p>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.active_borrowings}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">⏰</div>
                                <div>
                                    <p className="text-sm text-gray-600">Daftar Tunggu</p>
                                    <p className="text-2xl font-bold text-purple-600">{stats.pending_waitlists}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">🚨</div>
                                <div>
                                    <p className="text-sm text-gray-600">Terlambat</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.overdue_borrowings}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">👥</div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Anggota</p>
                                    <p className="text-2xl font-bold text-indigo-600">{stats.total_users}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-lg font-semibold mb-4">Aksi Cepat</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link 
                                href={route('books.create')} 
                                className="flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-4 transition-colors"
                            >
                                <span className="text-xl mr-2">➕</span>
                                Tambah Buku
                            </Link>
                            <Link 
                                href={route('categories.index')} 
                                className="flex items-center justify-center bg-green-50 hover:bg-green-100 text-green-700 rounded-lg p-4 transition-colors"
                            >
                                <span className="text-xl mr-2">📂</span>
                                Kategori
                            </Link>
                            <Link 
                                href={route('borrowings.create')} 
                                className="flex items-center justify-center bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg p-4 transition-colors"
                            >
                                <span className="text-xl mr-2">📋</span>
                                Peminjaman
                            </Link>
                            <Link 
                                href={route('waitlists.index')} 
                                className="flex items-center justify-center bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg p-4 transition-colors"
                            >
                                <span className="text-xl mr-2">⏰</span>
                                Daftar Tunggu
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Borrowings */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Peminjaman Terbaru</h2>
                                <Link href={route('borrowings.index')} className="text-blue-600 hover:text-blue-800 text-sm">
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentBorrowings.slice(0, 5).map((borrowing) => (
                                    <div key={borrowing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-sm">{borrowing.book.title}</p>
                                            <p className="text-xs text-gray-600">{borrowing.user.name}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            borrowing.status === 'dipinjam' ? 'bg-yellow-100 text-yellow-800' :
                                            borrowing.status === 'dikembalikan' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {borrowing.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending Waitlists */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Permintaan Menunggu</h2>
                                <Link href={route('waitlists.index')} className="text-blue-600 hover:text-blue-800 text-sm">
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {pendingWaitlists.slice(0, 5).map((waitlist) => (
                                    <div key={waitlist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-sm">{waitlist.book.title}</p>
                                            <p className="text-xs text-gray-600">{waitlist.user.name}</p>
                                        </div>
                                        <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
                                            menunggu
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    // User Dashboard
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Anggota" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Anggota</h1>
                        <p className="text-gray-600">Selamat datang di Perpustakaan Desa</p>
                    </div>
                    <div className="text-4xl">👤</div>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📚</div>
                            <div>
                                <p className="text-sm text-gray-600">Sedang Dipinjam</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.active_borrowings}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⏰</div>
                            <div>
                                <p className="text-sm text-gray-600">Permintaan Tunggu</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pending_requests}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📖</div>
                            <div>
                                <p className="text-sm text-gray-600">Total Dipinjam</p>
                                <p className="text-2xl font-bold text-green-600">{stats.total_borrowed}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions for User */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-lg font-semibold mb-4">Aksi Cepat</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link 
                            href={route('catalog.index')} 
                            className="flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-4 transition-colors"
                        >
                            <span className="text-xl mr-2">🔍</span>
                            Cari Buku
                        </Link>
                        <Link 
                            href={route('catalog.index')} 
                            className="flex items-center justify-center bg-green-50 hover:bg-green-100 text-green-700 rounded-lg p-4 transition-colors"
                        >
                            <span className="text-xl mr-2">📖</span>
                            Lihat Katalog
                        </Link>
                    </div>
                </div>

                {/* User Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Borrowings */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-lg font-semibold mb-4">Buku Sedang Dipinjam</h2>
                        <div className="space-y-3">
                            {activeBorrowings.length > 0 ? activeBorrowings.map((borrowing) => (
                                <div key={borrowing.id} className="p-3 bg-blue-50 rounded-lg">
                                    <p className="font-medium text-sm">{borrowing.book.title}</p>
                                    <p className="text-xs text-gray-600 mb-1">{borrowing.book.category.name}</p>
                                    <p className="text-xs text-red-600">Jatuh tempo: {borrowing.due_date}</p>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-sm">Tidak ada buku yang sedang dipinjam</p>
                            )}
                        </div>
                    </div>

                    {/* Recent History */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-lg font-semibold mb-4">Riwayat Peminjaman</h2>
                        <div className="space-y-3">
                            {borrowingHistory.length > 0 ? borrowingHistory.map((borrowing) => (
                                <div key={borrowing.id} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-sm">{borrowing.book.title}</p>
                                    <p className="text-xs text-gray-600 mb-1">{borrowing.book.category.name}</p>
                                    <p className="text-xs text-green-600">Dikembalikan: {borrowing.returned_date}</p>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-sm">Belum ada riwayat peminjaman</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}