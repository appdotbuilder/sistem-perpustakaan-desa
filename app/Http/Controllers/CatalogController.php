<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Book::with(['category', 'waitlists' => function($q) {
            $q->where('user_id', auth()->id())->pending();
        }]);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%")
                  ->orWhere('publisher', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Status filter
        if ($request->filled('status')) {
            if ($request->status === 'tersedia') {
                $query->available();
            } else {
                $query->where('status', $request->status);
            }
        }

        $books = $query->latest()->paginate(12);
        $categories = Category::orderBy('name')->get();

        return Inertia::render('catalog/index', [
            'books' => $books,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        $book->load(['category', 'waitlists' => function($q) {
            $q->where('user_id', auth()->id())->pending();
        }]);

        $relatedBooks = Book::where('category_id', $book->category_id)
            ->where('id', '!=', $book->id)
            ->available()
            ->with('category')
            ->limit(4)
            ->get();

        return Inertia::render('catalog/show', [
            'book' => $book,
            'relatedBooks' => $relatedBooks,
            'hasWaitlistRequest' => $book->waitlists->isNotEmpty()
        ]);
    }
}