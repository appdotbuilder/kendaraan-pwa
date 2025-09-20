<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
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
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'license_plate' => 'required|string|max:15|unique:vehicles,license_plate',
            'vehicle_type' => 'required|in:car,motorcycle,truck,van,bus,other',
            'color' => 'required|string|max:50',
            'owner_name' => 'required|string|max:255',
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
            'brand.required' => 'Merek kendaraan wajib diisi.',
            'model.required' => 'Model kendaraan wajib diisi.',
            'year.required' => 'Tahun kendaraan wajib diisi.',
            'year.integer' => 'Tahun harus berupa angka.',
            'year.min' => 'Tahun tidak valid.',
            'year.max' => 'Tahun tidak boleh lebih dari tahun depan.',
            'license_plate.required' => 'Nomor plat wajib diisi.',
            'license_plate.unique' => 'Nomor plat sudah terdaftar.',
            'vehicle_type.required' => 'Jenis kendaraan wajib dipilih.',
            'vehicle_type.in' => 'Jenis kendaraan tidak valid.',
            'color.required' => 'Warna kendaraan wajib diisi.',
            'owner_name.required' => 'Nama pemilik wajib diisi.',
        ];
    }
}