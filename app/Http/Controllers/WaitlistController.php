<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Waitlist;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WaitlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $waitlists = Waitlist::with(['user', 'book.category'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('admin/waitlists/index', [
            'waitlists' => $waitlists,
            'stats' => [
                'pending' => Waitlist::pending()->count(),
                'approved' => Waitlist::where('status', 'disetujui')->count(),
                'rejected' => Waitlist::where('status', 'ditolak')->count(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'notes' => 'nullable|string',
        ]);

        // Check if user already has a pending waitlist for this book
        $existingWaitlist = Waitlist::where('user_id', auth()->id())
            ->where('book_id', $request->book_id)
            ->where('status', 'menunggu')
            ->first();

        if ($existingWaitlist) {
            return redirect()->back()
                ->with('error', 'Anda sudah memiliki permintaan peminjaman yang sedang menunggu untuk buku ini.');
        }

        Waitlist::create([
            'user_id' => auth()->id(),
            'book_id' => $request->book_id,
            'notes' => $request->notes,
            'status' => 'menunggu',
        ]);

        return redirect()->back()
            ->with('success', 'Permintaan peminjaman berhasil diajukan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Waitlist $waitlist)
    {
        $waitlist->load(['user', 'book.category']);

        return Inertia::render('admin/waitlists/show', [
            'waitlist' => $waitlist
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Waitlist $waitlist)
    {
        $request->validate([
            'status' => 'required|in:menunggu,disetujui,ditolak',
            'notes' => 'nullable|string',
        ]);

        $waitlist->update([
            'status' => $request->status,
            'notes' => $request->notes,
            'approved_at' => $request->status === 'disetujui' ? now() : null,
        ]);

        $statusText = [
            'disetujui' => 'disetujui',
            'ditolak' => 'ditolak',
            'menunggu' => 'diubah ke status menunggu'
        ];

        return redirect()->route('waitlists.show', $waitlist)
            ->with('success', 'Permintaan peminjaman berhasil ' . $statusText[$request->status] . '.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Waitlist $waitlist)
    {
        $waitlist->delete();

        return redirect()->route('waitlists.index')
            ->with('success', 'Permintaan peminjaman berhasil dihapus.');
    }
}