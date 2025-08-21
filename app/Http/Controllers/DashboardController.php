<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Category;
use App\Models\User;
use App\Models\Waitlist;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        if (auth()->user()->isAdmin()) {
            return $this->adminDashboard();
        }

        return $this->userDashboard();
    }

    /**
     * Display admin dashboard.
     */
    protected function adminDashboard()
    {
        $stats = [
            'total_books' => Book::count(),
            'total_categories' => Category::count(),
            'active_borrowings' => Borrowing::active()->count(),
            'pending_waitlists' => Waitlist::pending()->count(),
            'overdue_borrowings' => Borrowing::overdue()->count(),
            'total_users' => User::count(),
        ];

        $recentBorrowings = Borrowing::with(['user', 'book'])
            ->latest()
            ->limit(5)
            ->get();

        $pendingWaitlists = Waitlist::with(['user', 'book'])
            ->pending()
            ->latest()
            ->limit(5)
            ->get();

        $lowStockBooks = Book::where('available_stock', '<=', 2)
            ->where('available_stock', '>', 0)
            ->with('category')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'isAdmin' => true,
            'stats' => $stats,
            'recentBorrowings' => $recentBorrowings,
            'pendingWaitlists' => $pendingWaitlists,
            'lowStockBooks' => $lowStockBooks,
        ]);
    }

    /**
     * Display user dashboard.
     */
    protected function userDashboard()
    {
        $user = auth()->user();
        
        $activeBorrowings = Borrowing::where('user_id', $user->id)
            ->active()
            ->with(['book.category'])
            ->get();

        $pendingWaitlists = Waitlist::where('user_id', $user->id)
            ->pending()
            ->with(['book.category'])
            ->get();

        $borrowingHistory = Borrowing::where('user_id', $user->id)
            ->where('status', 'dikembalikan')
            ->with(['book.category'])
            ->latest()
            ->limit(5)
            ->get();

        $stats = [
            'active_borrowings' => $activeBorrowings->count(),
            'pending_requests' => $pendingWaitlists->count(),
            'total_borrowed' => Borrowing::where('user_id', $user->id)->count(),
        ];

        return Inertia::render('dashboard', [
            'isAdmin' => false,
            'stats' => $stats,
            'activeBorrowings' => $activeBorrowings,
            'pendingWaitlists' => $pendingWaitlists,
            'borrowingHistory' => $borrowingHistory,
        ]);
    }
}