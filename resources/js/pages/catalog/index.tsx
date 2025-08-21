import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Category {
    id: number;
    name: string;
    description?: string;
}

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    year: number;
    pages: number;
    available_stock: number;
    status: string;
    category: Category;
    waitlists?: Array<{ id: number }>;
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
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
        status?: string;
    };
    auth?: {
        user?: { name: string };
    };
    [key: string]: unknown;
}

export default function CatalogIndex({ books, categories, filters, auth }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(route('catalog.index'), {
            search: searchTerm,
            category: filters.category,
            status: filters.status
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(route('catalog.index'), {
            search: filters.search,
            category: key === 'category' ? value : filters.category,
            status: key === 'status' ? value : filters.status
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get(route('catalog.index'));
    };

    return (
        <>
            <Head title="Katalog Buku - Perpustakaan Desa" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Link href="/" className="flex items-center space-x-2">
                                    <span className="text-2xl">📚</span>
                                    <span className="text-xl font-bold text-blue-800">Perpustakaan Desa</span>
                                </Link>
                            </div>
                            <nav className="flex items-center space-x-4">
                                <Link href="/" className="text-gray-600 hover:text-gray-900">
                                    Beranda
                                </Link>
                                {auth?.user ? (
                                    <>
                                        <Link href={route('dashboard')} className="text-gray-600 hover:text-gray-900">
                                            Dashboard
                                        </Link>
                                        <span className="text-gray-800">Halo, {auth.user.name}!</span>
                                    </>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-gray-600 hover:text-gray-900">
                                            Masuk
                                        </Link>
                                        <Link 
                                            href={route('register')} 
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📖 Katalog Buku</h1>
                        <p className="text-gray-600">
                            Jelajahi koleksi lengkap perpustakaan desa kami
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Cari judul buku, penulis, atau penerbit..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                🔍 Cari
                            </button>
                        </form>

                        <div className="flex flex-wrap gap-4">
                            <div>
                                <select
                                    value={filters.category || ''}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Semua Kategori</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="tersedia">Tersedia</option>
                                    <option value="tidak_tersedia">Tidak Tersedia</option>
                                </select>
                            </div>

                            {(filters.search || filters.category || filters.status) && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Menampilkan {books.data.length} dari {books.total} buku
                        </p>
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {books.data.map(book => (
                            <Link
                                key={book.id}
                                href={route('catalog.show', book.id)}
                                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6"
                            >
                                <div className="mb-4">
                                    <div className="text-4xl mb-2 text-center">📖</div>
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
                                    <p className="text-sm text-gray-600 mb-1">📝 {book.author}</p>
                                    <p className="text-sm text-gray-600 mb-1">🏢 {book.publisher}</p>
                                    <p className="text-sm text-gray-600 mb-2">📅 {book.year}</p>
                                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                        {book.category.name}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {book.status === 'tersedia' && book.available_stock > 0 ? (
                                            <>
                                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                                <span className="text-sm text-green-600">
                                                    Tersedia ({book.available_stock})
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                                                <span className="text-sm text-red-600">Tidak Tersedia</span>
                                            </>
                                        )}
                                    </div>
                                    
                                    {auth?.user && book.waitlists && book.waitlists.length > 0 && (
                                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                            Dalam Antrian
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {books.last_page > 1 && (
                        <div className="flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {books.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                className="px-3 py-2 text-sm text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}