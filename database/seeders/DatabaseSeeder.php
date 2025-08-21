<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Category;
use App\Models\User;
use App\Models\Waitlist;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin Perpustakaan',
            'email' => 'admin@perpustakaan.desa',
            'password' => Hash::make('password'),
        ]);

        // Create regular users
        $users = User::factory(10)->create();

        // Create categories with specific Indonesian categories
        $categories = [
            ['name' => 'Fiksi', 'description' => 'Koleksi buku cerita fiksi dan novel'],
            ['name' => 'Non-Fiksi', 'description' => 'Koleksi buku pengetahuan dan fakta'],
            ['name' => 'Sejarah', 'description' => 'Buku-buku tentang peristiwa masa lalu'],
            ['name' => 'Biografi', 'description' => 'Riwayat hidup tokoh-tokoh terkenal'],
            ['name' => 'Sains', 'description' => 'Buku-buku ilmu pengetahuan'],
            ['name' => 'Teknologi', 'description' => 'Buku tentang perkembangan teknologi'],
            ['name' => 'Agama', 'description' => 'Buku-buku keagamaan dan spiritual'],
            ['name' => 'Pendidikan', 'description' => 'Buku-buku edukatif dan pembelajaran'],
            ['name' => 'Kesehatan', 'description' => 'Buku tentang kesehatan dan medis'],
            ['name' => 'Ekonomi', 'description' => 'Buku ekonomi dan keuangan'],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        // Create books with Indonesian titles and authors
        $indonesianBooks = [
            ['title' => 'Laskar Pelangi', 'author' => 'Andrea Hirata', 'publisher' => 'Bentang Pustaka'],
            ['title' => 'Ayat-Ayat Cinta', 'author' => 'Habiburrahman El Shirazy', 'publisher' => 'Republika'],
            ['title' => 'Negeri 5 Menara', 'author' => 'Ahmad Fuadi', 'publisher' => 'Gramedia'],
            ['title' => 'Perahu Kertas', 'author' => 'Dewi Lestari', 'publisher' => 'Bentang Pustaka'],
            ['title' => 'Tenggelamnya Kapal Van Der Wijck', 'author' => 'Hamka', 'publisher' => 'Balai Pustaka'],
            ['title' => 'Bumi Manusia', 'author' => 'Pramoedya Ananta Toer', 'publisher' => 'Hasta Mitra'],
            ['title' => 'Ronggeng Dukuh Paruk', 'author' => 'Ahmad Tohari', 'publisher' => 'Gramedia'],
            ['title' => 'Cantik Itu Luka', 'author' => 'Eka Kurniawan', 'publisher' => 'Gramedia'],
            ['title' => 'Pulang', 'author' => 'Leila S. Chudori', 'publisher' => 'KPG'],
            ['title' => 'Supernova', 'author' => 'Dewi Lestari', 'publisher' => 'Bentang Pustaka'],
        ];

        $allCategories = Category::all();

        foreach ($indonesianBooks as $bookData) {
            $stock = random_int(2, 8);
            Book::create([
                'title' => $bookData['title'],
                'category_id' => $allCategories->random()->id,
                'author' => $bookData['author'],
                'publisher' => $bookData['publisher'],
                'year' => random_int(1990, 2024),
                'pages' => random_int(200, 600),
                'stock' => $stock,
                'available_stock' => random_int(0, $stock),
                'shelf_position' => fake()->bothify('??-##'),
                'description' => fake()->paragraph(3),
                'isbn' => fake()->isbn13(),
                'status' => fake()->randomElement(['tersedia', 'tidak_tersedia', 'rusak']),
            ]);
        }

        // Create additional random books
        Book::factory(40)->create([
            'category_id' => fn() => $allCategories->random()->id,
        ]);

        // Create some borrowings
        $books = Book::available()->get();
        if ($books->count() > 0) {
            Borrowing::factory(15)->create([
                'user_id' => fn() => $users->random()->id,
                'book_id' => fn() => $books->random()->id,
            ]);

            // Create some returned borrowings
            Borrowing::factory(10)->returned()->create([
                'user_id' => fn() => $users->random()->id,
                'book_id' => fn() => $books->random()->id,
            ]);

            // Create some overdue borrowings
            Borrowing::factory(3)->overdue()->create([
                'user_id' => fn() => $users->random()->id,
                'book_id' => fn() => $books->random()->id,
            ]);
        }

        // Create waitlists
        $allBooks = Book::all();
        if ($allBooks->count() > 0) {
            Waitlist::factory(8)->create([
                'user_id' => fn() => $users->random()->id,
                'book_id' => fn() => $allBooks->random()->id,
            ]);

            Waitlist::factory(3)->approved()->create([
                'user_id' => fn() => $users->random()->id,
                'book_id' => fn() => $allBooks->random()->id,
            ]);

            Waitlist::factory(2)->rejected()->create([
                'user_id' => fn() => $users->random()->id,
                'book_id' => fn() => $allBooks->random()->id,
            ]);
        }
    }
}
