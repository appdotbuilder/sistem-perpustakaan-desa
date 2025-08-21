<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class BorrowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $borrowings = Borrowing::with(['user', 'book.category'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('admin/borrowings/index', [
            'borrowings' => $borrowings,
            'stats' => [
                'active' => Borrowing::active()->count(),
                'overdue' => Borrowing::overdue()->count(),
                'returned' => Borrowing::where('status', 'dikembalikan')->count(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::orderBy('name')->get();
        $books = Book::with('category')->available()->orderBy('title')->get();

        return Inertia::render('admin/borrowings/create', [
            'users' => $users,
            'books' => $books
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'borrowed_date' => 'required|date',
            'due_date' => 'required|date|after:borrowed_date',
            'notes' => 'nullable|string',
        ]);

        $book = Book::findOrFail($request->book_id);
        
        if ($book->available_stock <= 0) {
            return redirect()->back()
                ->with('error', 'Buku tidak tersedia untuk dipinjam.');
        }

        $borrowing = Borrowing::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'borrowed_date' => $request->borrowed_date,
            'due_date' => $request->due_date,
            'notes' => $request->notes,
            'status' => 'dipinjam',
        ]);

        // Update available stock
        $book->decrement('available_stock');

        return redirect()->route('borrowings.show', $borrowing)
            ->with('success', 'Peminjaman berhasil dicatat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Borrowing $borrowing)
    {
        $borrowing->load(['user', 'book.category']);

        return Inertia::render('admin/borrowings/show', [
            'borrowing' => $borrowing
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Borrowing $borrowing)
    {
        $borrowing->load(['user', 'book']);
        
        return Inertia::render('admin/borrowings/edit', [
            'borrowing' => $borrowing
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        $request->validate([
            'due_date' => 'required|date',
            'notes' => 'nullable|string',
            'status' => 'required|in:dipinjam,dikembalikan,terlambat',
            'returned_date' => 'nullable|date',
        ]);

        $oldStatus = $borrowing->status;
        
        $borrowing->update([
            'due_date' => $request->due_date,
            'notes' => $request->notes,
            'status' => $request->status,
            'returned_date' => $request->returned_date,
        ]);

        // Update available stock when book is returned
        if ($oldStatus === 'dipinjam' && $request->status === 'dikembalikan') {
            $borrowing->book->increment('available_stock');
        }

        return redirect()->route('borrowings.show', $borrowing)
            ->with('success', 'Peminjaman berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Borrowing $borrowing)
    {
        // Restore available stock if borrowing was active
        if ($borrowing->status === 'dipinjam') {
            $borrowing->book->increment('available_stock');
        }

        $borrowing->delete();

        return redirect()->route('borrowings.index')
            ->with('success', 'Peminjaman berhasil dihapus.');
    }
}