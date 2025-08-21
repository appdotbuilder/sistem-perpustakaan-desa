import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
}

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    year: number;
    stock: number;
    available_stock: number;
    status: string;
    shelf_position: string;
    category: Category;
}

interface PaginationData {
    data: Book[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url?: string; label: string; active: boolean }>;
}

interface Props {
    books: PaginationData;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kelola Buku', href: '/books' },
];

export default function BooksIndex({ books }: Props) {
    const handleDelete = (bookId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
            router.delete(route('books.destroy', bookId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Buku" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📚 Kelola Buku</h1>
                        <p className="text-gray-600">Manajemen koleksi buku perpustakaan</p>
                    </div>
                    <Link
                        href={route('books.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        ➕ Tambah Buku
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📖</div>
                            <div>
                                <p className="text-sm text-gray-600">Total Buku</p>
                                <p className="text-xl font-bold text-blue-600">{books.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">✅</div>
                            <div>
                                <p className="text-sm text-gray-600">Tersedia</p>
                                <p className="text-xl font-bold text-green-600">
                                    {books.data.filter(book => book.status === 'tersedia' && book.available_stock > 0).length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">❌</div>
                            <div>
                                <p className="text-sm text-gray-600">Tidak Tersedia</p>
                                <p className="text-xl font-bold text-red-600">
                                    {books.data.filter(book => book.available_stock === 0).length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">🔧</div>
                            <div>
                                <p className="text-sm text-gray-600">Rusak</p>
                                <p className="text-xl font-bold text-yellow-600">
                                    {books.data.filter(book => book.status === 'rusak').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Books Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Buku
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stok
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rak
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {books.data.map((book) => (
                                    <tr key={book.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    {book.author} • {book.publisher} ({book.year})
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {book.category.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {book.available_stock} / {book.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                book.status === 'tersedia' && book.available_stock > 0
                                                    ? 'bg-green-100 text-green-800'
                                                    : book.status === 'rusak'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {book.status === 'tersedia' && book.available_stock > 0
                                                    ? 'Tersedia'
                                                    : book.status === 'rusak'
                                                    ? 'Rusak'
                                                    : 'Tidak Tersedia'
                                                }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {book.shelf_position}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('books.show', book.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Lihat
                                                </Link>
                                                <Link
                                                    href={route('books.edit', book.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(book.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {books.last_page > 1 && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    {books.links.find(link => link.label.includes('Previous'))?.url ? (
                                        <Link
                                            href={books.links.find(link => link.label.includes('Previous'))!.url!}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    ) : (
                                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-white">
                                            Previous
                                        </span>
                                    )}
                                    {books.links.find(link => link.label.includes('Next'))?.url ? (
                                        <Link
                                            href={books.links.find(link => link.label.includes('Next'))!.url!}
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    ) : (
                                        <span className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-white">
                                            Next
                                        </span>
                                    )}
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing{' '}
                                            <span className="font-medium">{(books.current_page - 1) * books.per_page + 1}</span> to{' '}
                                            <span className="font-medium">
                                                {Math.min(books.current_page * books.per_page, books.total)}
                                            </span>{' '}
                                            of <span className="font-medium">{books.total}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            {books.links.map((link, index) => (
                                                <div key={index}>
                                                    {link.url ? (
                                                        <Link
                                                            href={link.url}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                link.active
                                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            } ${
                                                                index === 0 ? 'rounded-l-md' : ''
                                                            } ${
                                                                index === books.links.length - 1 ? 'rounded-r-md' : ''
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ) : (
                                                        <span
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-400 ${
                                                                index === 0 ? 'rounded-l-md' : ''
                                                            } ${
                                                                index === books.links.length - 1 ? 'rounded-r-md' : ''
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}