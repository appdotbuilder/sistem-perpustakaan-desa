<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Judul buku');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('author')->comment('Penulis buku');
            $table->string('publisher')->comment('Penerbit buku');
            $table->integer('year')->comment('Tahun terbit');
            $table->integer('pages')->comment('Jumlah halaman');
            $table->integer('stock')->default(0)->comment('Jumlah stok buku');
            $table->integer('available_stock')->default(0)->comment('Stok yang tersedia');
            $table->string('shelf_position')->comment('Posisi rak buku');
            $table->text('description')->nullable()->comment('Deskripsi buku');
            $table->string('isbn')->nullable()->comment('Nomor ISBN');
            $table->enum('status', ['tersedia', 'tidak_tersedia', 'rusak'])->default('tersedia')->comment('Status buku');
            $table->timestamps();
            
            $table->index('title');
            $table->index('author');
            $table->index('category_id');
            $table->index('status');
            $table->index(['status', 'available_stock']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};