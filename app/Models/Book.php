<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Book
 *
 * @property int $id
 * @property string $title
 * @property int $category_id
 * @property string $author
 * @property string $publisher
 * @property int $year
 * @property int $pages
 * @property int $stock
 * @property int $available_stock
 * @property string $shelf_position
 * @property string|null $description
 * @property string|null $isbn
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Borrowing> $borrowings
 * @property-read int|null $borrowings_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Waitlist> $waitlists
 * @property-read int|null $waitlists_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Book newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Book newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Book query()
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereAvailableStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereIsbn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book wherePages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book wherePublisher($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereShelfPosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book available()
 * @method static \Database\Factories\BookFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Book extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'category_id',
        'author',
        'publisher',
        'year',
        'pages',
        'stock',
        'available_stock',
        'shelf_position',
        'description',
        'isbn',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'year' => 'integer',
        'pages' => 'integer',
        'stock' => 'integer',
        'available_stock' => 'integer',
        'category_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the category that owns the book.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the borrowings for the book.
     */
    public function borrowings(): HasMany
    {
        return $this->hasMany(Borrowing::class);
    }

    /**
     * Get the waitlists for the book.
     */
    public function waitlists(): HasMany
    {
        return $this->hasMany(Waitlist::class);
    }

    /**
     * Scope a query to only include available books.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'tersedia')->where('available_stock', '>', 0);
    }
}