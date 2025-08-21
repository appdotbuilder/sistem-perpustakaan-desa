<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Waitlist
 *
 * @property int $id
 * @property int $user_id
 * @property int $book_id
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Book $book
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist query()
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist whereBookId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waitlist pending()
 * @method static \Database\Factories\WaitlistFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Waitlist extends Model
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
        'status',
        'notes',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'user_id' => 'integer',
        'book_id' => 'integer',
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the waitlist.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the book that owns the waitlist.
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Scope a query to only include pending waitlists.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'menunggu');
    }
}