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
        Schema::create('waitlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['menunggu', 'disetujui', 'ditolak'])->default('menunggu')->comment('Status pengajuan');
            $table->text('notes')->nullable()->comment('Catatan pengajuan');
            $table->timestamp('approved_at')->nullable()->comment('Waktu persetujuan');
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('book_id');
            $table->index('status');
            $table->index(['status', 'created_at']);
            $table->unique(['user_id', 'book_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('waitlists');
    }
};