<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Borrowing>
 */
class BorrowingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $borrowedDate = $this->faker->dateTimeBetween('-30 days', 'now');
        $dueDate = (clone $borrowedDate)->modify('+14 days');
        
        return [
            'user_id' => User::factory(),
            'book_id' => Book::factory(),
            'borrowed_date' => $borrowedDate,
            'due_date' => $dueDate,
            'returned_date' => null,
            'status' => 'dipinjam',
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the borrowing is returned.
     */
    public function returned(): static
    {
        return $this->state(fn (array $attributes) => [
            'returned_date' => $this->faker->dateTimeBetween($attributes['borrowed_date'], 'now'),
            'status' => 'dikembalikan',
        ]);
    }

    /**
     * Indicate that the borrowing is overdue.
     */
    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'due_date' => $this->faker->dateTimeBetween('-7 days', '-1 day'),
            'status' => 'terlambat',
        ]);
    }
}