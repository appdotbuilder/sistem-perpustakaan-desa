import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Perpustakaan Desa">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 text-gray-900 lg:justify-center lg:p-8">
                <header className="mb-8 w-full max-w-6xl text-sm">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">📚</span>
                            <span className="font-semibold text-lg text-blue-800">Perpustakaan Desa</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('catalog.index')}
                                className="inline-block rounded-md px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                            >
                                📖 Katalog Buku
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-md border border-blue-600 bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-md px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-md border border-blue-600 bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full max-w-6xl items-center justify-center">
                    <main className="flex w-full flex-col lg:flex-row gap-12 items-center">
                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-6">
                                <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
                                    📚 Sistem Perpustakaan Desa
                                </h1>
                                <p className="text-xl text-gray-600 mb-8">
                                    Kelola dan akses koleksi buku perpustakaan desa dengan mudah dan efisien
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                                    <div className="text-2xl mb-3">🔍</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Katalog Buku</h3>
                                    <p className="text-sm text-gray-600">
                                        Jelajahi koleksi buku dengan sistem pencarian dan filter kategori
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                                    <div className="text-2xl mb-3">📋</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Manajemen Peminjaman</h3>
                                    <p className="text-sm text-gray-600">
                                        Sistem pencatatan dan pelacakan peminjaman buku yang terintegrasi
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                                    <div className="text-2xl mb-3">⏰</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Daftar Tunggu</h3>
                                    <p className="text-sm text-gray-600">
                                        Ajukan permintaan peminjaman untuk buku yang sedang tidak tersedia
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                                    <div className="text-2xl mb-3">🎯</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Dashboard Admin</h3>
                                    <p className="text-sm text-gray-600">
                                        Panel kontrol lengkap untuk mengelola buku, kategori, dan sirkulasi
                                    </p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href={route('catalog.index')}
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-blue-700 transition-colors"
                                >
                                    📖 Lihat Katalog Buku
                                </Link>
                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                                    >
                                        👤 Daftar Sebagai Anggota
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Hero Image/Visual */}
                        <div className="flex-1 max-w-lg">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                                <div className="text-center">
                                    <div className="text-8xl mb-6">📚</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        Koleksi Lengkap
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="font-semibold text-blue-600">📖 Fiksi</div>
                                            <div>Novel & Cerita</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="font-semibold text-green-600">🔬 Sains</div>
                                            <div>Pengetahuan</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="font-semibold text-purple-600">📜 Sejarah</div>
                                            <div>Masa Lalu</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="font-semibold text-orange-600">🏛️ Biografi</div>
                                            <div>Tokoh</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-12 text-center text-sm text-gray-500">
                    <p>
                        Sistem Perpustakaan Desa - Membangun literasi untuk kemajuan desa
                    </p>
                </footer>
            </div>
        </>
    );
}