<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stock = $this->faker->numberBetween(1, 10);
        $availableStock = random_int(0, $stock);
        
        return [
            'title' => $this->faker->sentence(3),
            'category_id' => Category::factory(),
            'author' => $this->faker->name(),
            'publisher' => $this->faker->company(),
            'year' => $this->faker->numberBetween(1990, 2024),
            'pages' => $this->faker->numberBetween(100, 500),
            'stock' => $stock,
            'available_stock' => $availableStock,
            'shelf_position' => $this->faker->bothify('??-##'),
            'description' => $this->faker->paragraph(3),
            'isbn' => $this->faker->isbn13(),
            'status' => $this->faker->randomElement(['tersedia', 'tidak_tersedia', 'rusak']),
        ];
    }

    /**
     * Indicate that the book is available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'tersedia',
            'available_stock' => random_int(1, $attributes['stock']),
        ]);
    }

    /**
     * Indicate that the book is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'tersedia',
            'available_stock' => 0,
        ]);
    }
}