<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Borrowing
 *
 * @property int $id
 * @property int $user_id
 * @property int $book_id
 * @property \Illuminate\Support\Carbon $borrowed_date
 * @property \Illuminate\Support\Carbon $due_date
 * @property \Illuminate\Support\Carbon|null $returned_date
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Book $book
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing query()
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereBookId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereBorrowedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereReturnedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing active()
 * @method static \Illuminate\Database\Eloquent\Builder|Borrowing overdue()
 * @method static \Database\Factories\BorrowingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Borrowing extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'book_id',
        'borrowed_date',
        'due_date',
        'returned_date',
        'status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'user_id' => 'integer',
        'book_id' => 'integer',
        'borrowed_date' => 'date',
        'due_date' => 'date',
        'returned_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the borrowing.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the book that owns the borrowing.
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Scope a query to only include active borrowings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'dipinjam');
    }

    /**
     * Scope a query to only include overdue borrowings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOverdue($query)
    {
        return $query->where('status', 'dipinjam')
            ->where('due_date', '<', now()->toDateString());
    }
}