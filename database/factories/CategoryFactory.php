<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Fiksi' => 'Koleksi buku cerita fiksi dan novel',
            'Non-Fiksi' => 'Koleksi buku pengetahuan dan fakta',
            'Sejarah' => 'Buku-buku tentang peristiwa masa lalu',
            'Biografi' => 'Riwayat hidup tokoh-tokoh terkenal',
            'Sains' => 'Buku-buku ilmu pengetahuan',
            'Teknologi' => 'Buku tentang perkembangan teknologi',
            'Agama' => 'Buku-buku keagamaan dan spiritual',
            'Pendidikan' => 'Buku-buku edukatif dan pembelajaran',
            'Kesehatan' => 'Buku tentang kesehatan dan medis',
            'Ekonomi' => 'Buku ekonomi dan keuangan',
        ];

        $category = $this->faker->unique()->randomElement(array_keys($categories));
        
        return [
            'name' => $category,
            'description' => $categories[$category],
        ];
    }
}