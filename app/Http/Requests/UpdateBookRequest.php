<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'author' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'pages' => 'required|integer|min:1',
            'stock' => 'required|integer|min:0',
            'shelf_position' => 'required|string|max:255',
            'description' => 'nullable|string',
            'isbn' => 'nullable|string|max:255',
            'status' => 'required|in:tersedia,tidak_tersedia,rusak',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul buku harus diisi.',
            'category_id.required' => 'Kategori harus dipilih.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'author.required' => 'Penulis harus diisi.',
            'publisher.required' => 'Penerbit harus diisi.',
            'year.required' => 'Tahun terbit harus diisi.',
            'year.min' => 'Tahun terbit tidak valid.',
            'year.max' => 'Tahun terbit tidak valid.',
            'pages.required' => 'Jumlah halaman harus diisi.',
            'pages.min' => 'Jumlah halaman harus lebih dari 0.',
            'stock.required' => 'Jumlah stok harus diisi.',
            'stock.min' => 'Jumlah stok tidak boleh negatif.',
            'shelf_position.required' => 'Posisi rak harus diisi.',
            'status.required' => 'Status buku harus dipilih.',
            'status.in' => 'Status buku tidak valid.',
        ];
    }
}