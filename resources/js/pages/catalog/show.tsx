import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

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
    pages: number;
    stock: number;
    available_stock: number;
    shelf_position: string;
    description?: string;
    isbn?: string;
    status: string;
    category: Category;
    waitlists?: Array<{ id: number }>;
}

interface Props {
    book: Book;
    relatedBooks: Book[];
    hasWaitlistRequest: boolean;
    auth?: {
        user?: { name: string };
    };
    [key: string]: unknown;
}

export default function CatalogShow({ book, relatedBooks, hasWaitlistRequest, auth }: Props) {
    const [requestNote, setRequestNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleWaitlistRequest = () => {
        if (!auth?.user) {
            router.visit(route('login'));
            return;
        }

        setIsSubmitting(true);
        router.post(route('waitlist.store'), {
            book_id: book.id,
            notes: requestNote
        }, {
            onFinish: () => setIsSubmitting(false)
        });
    };

    const isAvailable = book.status === 'tersedia' && book.available_stock > 0;

    return (
        <>
            <Head title={`${book.title} - Katalog Buku`} />
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
                                <Link href={route('catalog.index')} className="text-gray-600 hover:text-gray-900">
                                    ← Kembali ke Katalog
                                </Link>
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="text-gray-600 hover:text-gray-900">
                                        Dashboard
                                    </Link>
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Book Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border p-8">
                                {/* Breadcrumb */}
                                <div className="mb-6">
                                    <nav className="text-sm text-gray-500">
                                        <Link href={route('catalog.index')} className="hover:text-gray-700">
                                            Katalog
                                        </Link>
                                        <span className="mx-2">&gt;</span>
                                        <span>{book.category.name}</span>
                                        <span className="mx-2">&gt;</span>
                                        <span className="text-gray-900 font-medium">{book.title}</span>
                                    </nav>
                                </div>

                                {/* Book Info */}
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/3">
                                        <div className="bg-blue-50 rounded-lg p-8 text-center">
                                            <div className="text-8xl mb-4">📖</div>
                                            <div className="flex items-center justify-center mb-2">
                                                {isAvailable ? (
                                                    <>
                                                        <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                                                        <span className="text-green-600 font-medium">
                                                            Tersedia ({book.available_stock} dari {book.stock})
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                                                        <span className="text-red-600 font-medium">
                                                            Tidak Tersedia
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">Posisi Rak: {book.shelf_position}</p>
                                        </div>
                                    </div>

                                    <div className="md:w-2/3">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
                                        
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center">
                                                <span className="w-4 h-4 mr-3">📝</span>
                                                <span className="font-medium text-gray-700">Penulis:</span>
                                                <span className="ml-2 text-gray-900">{book.author}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <span className="w-4 h-4 mr-3">🏢</span>
                                                <span className="font-medium text-gray-700">Penerbit:</span>
                                                <span className="ml-2 text-gray-900">{book.publisher}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <span className="w-4 h-4 mr-3">📅</span>
                                                <span className="font-medium text-gray-700">Tahun Terbit:</span>
                                                <span className="ml-2 text-gray-900">{book.year}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <span className="w-4 h-4 mr-3">📄</span>
                                                <span className="font-medium text-gray-700">Halaman:</span>
                                                <span className="ml-2 text-gray-900">{book.pages} halaman</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <span className="w-4 h-4 mr-3">📂</span>
                                                <span className="font-medium text-gray-700">Kategori:</span>
                                                <Link 
                                                    href={route('catalog.index', { category: book.category.id })}
                                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                                >
                                                    {book.category.name}
                                                </Link>
                                            </div>
                                            
                                            {book.isbn && (
                                                <div className="flex items-center">
                                                    <span className="w-4 h-4 mr-3">🏷️</span>
                                                    <span className="font-medium text-gray-700">ISBN:</span>
                                                    <span className="ml-2 text-gray-900">{book.isbn}</span>
                                                </div>
                                            )}
                                        </div>

                                        {book.description && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                                                <p className="text-gray-700 leading-relaxed">{book.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Request Action */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    {isAvailable ? '📚 Buku Tersedia' : '⏰ Daftar Tunggu'}
                                </h2>
                                
                                {auth?.user ? (
                                    <div>
                                        {isAvailable ? (
                                            <div className="text-center">
                                                <div className="text-green-600 mb-4">
                                                    ✅ Buku ini tersedia untuk dipinjam
                                                </div>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Silakan datang ke perpustakaan atau hubungi admin untuk meminjam buku ini.
                                                </p>
                                            </div>
                                        ) : hasWaitlistRequest ? (
                                            <div className="text-center">
                                                <div className="text-yellow-600 mb-4">
                                                    ⏰ Anda sudah mengajukan permintaan
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Permintaan Anda sedang dalam antrian. Admin akan menghubungi ketika buku tersedia.
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Buku sedang tidak tersedia. Ajukan permintaan untuk masuk daftar tunggu.
                                                </p>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Catatan (opsional)
                                                    </label>
                                                    <textarea
                                                        value={requestNote}
                                                        onChange={(e) => setRequestNote(e.target.value)}
                                                        rows={3}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Tambahkan catatan untuk admin..."
                                                    />
                                                </div>
                                                <button
                                                    onClick={handleWaitlistRequest}
                                                    disabled={isSubmitting}
                                                    className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 disabled:opacity-50"
                                                >
                                                    {isSubmitting ? 'Mengajukan...' : '📝 Ajukan Permintaan'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-gray-600 mb-4">
                                            {isAvailable 
                                                ? 'Masuk untuk melihat informasi peminjaman'
                                                : 'Masuk untuk mengajukan permintaan daftar tunggu'
                                            }
                                        </p>
                                        <Link
                                            href={route('login')}
                                            className="inline-block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center"
                                        >
                                            🔑 Masuk
                                        </Link>
                                        <p className="text-sm text-gray-500 mt-3">
                                            Belum punya akun?{' '}
                                            <Link href={route('register')} className="text-blue-600 hover:text-blue-800">
                                                Daftar di sini
                                            </Link>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Books */}
                    {relatedBooks.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Buku Sejenis</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedBooks.map(relatedBook => (
                                    <Link
                                        key={relatedBook.id}
                                        href={route('catalog.show', relatedBook.id)}
                                        className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6"
                                    >
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">📖</div>
                                            <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">
                                                {relatedBook.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 mb-2">{relatedBook.author}</p>
                                            <div className="flex items-center justify-center">
                                                {relatedBook.status === 'tersedia' && relatedBook.available_stock > 0 ? (
                                                    <>
                                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                                                        <span className="text-xs text-green-600">Tersedia</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-1"></span>
                                                        <span className="text-xs text-red-600">Tidak Tersedia</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}