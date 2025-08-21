<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowingController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WaitlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - Library welcome page
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public catalog routes (accessible without authentication)
Route::get('/katalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/katalog/{book}', [CatalogController::class, 'show'])->name('catalog.show');

// Dashboard route
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Authenticated routes
Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // User waitlist routes
    Route::post('/waitlist', [WaitlistController::class, 'store'])->name('waitlist.store');
    
    // Admin resource routes
    Route::resource('categories', CategoryController::class);
    Route::resource('books', BookController::class);
    Route::resource('borrowings', BorrowingController::class);
    Route::resource('waitlists', WaitlistController::class)->except(['store']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';