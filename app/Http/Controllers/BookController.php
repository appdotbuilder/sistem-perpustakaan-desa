<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;
use App\Models\Category;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with('category')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('admin/books/index', [
            'books' => $books
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('admin/books/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        $data = $request->validated();
        $data['available_stock'] = $data['stock'];
        
        $book = Book::create($data);

        return redirect()->route('books.show', $book)
            ->with('success', 'Buku berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        $book->load(['category', 'borrowings.user', 'waitlists.user']);

        return Inertia::render('admin/books/show', [
            'book' => $book,
            'borrowings' => $book->borrowings()->with('user')->latest()->get(),
            'waitlists' => $book->waitlists()->with('user')->where('status', 'menunggu')->latest()->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('admin/books/edit', [
            'book' => $book,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $data = $request->validated();
        
        // Update available stock based on the difference in total stock
        $stockDifference = $data['stock'] - $book->stock;
        $data['available_stock'] = max(0, $book->available_stock + $stockDifference);
        
        $book->update($data);

        return redirect()->route('books.show', $book)
            ->with('success', 'Buku berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        if ($book->borrowings()->where('status', 'dipinjam')->count() > 0) {
            return redirect()->route('books.index')
                ->with('error', 'Buku tidak dapat dihapus karena sedang dipinjam.');
        }

        $book->delete();

        return redirect()->route('books.index')
            ->with('success', 'Buku berhasil dihapus.');
    }
}