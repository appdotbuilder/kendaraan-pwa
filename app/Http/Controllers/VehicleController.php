<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Vehicle::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by brand
        if ($request->has('brand') && $request->brand) {
            $query->byBrand($request->brand);
        }

        // Filter by vehicle type
        if ($request->has('vehicle_type') && $request->vehicle_type) {
            $query->byVehicleType($request->vehicle_type);
        }

        // Get unique brands for filter
        $brands = Vehicle::select('brand')
            ->distinct()
            ->orderBy('brand')
            ->pluck('brand');

        // Pagination with query parameters
        $vehicles = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('vehicles/index', [
            'vehicles' => $vehicles,
            'brands' => $brands,
            'vehicleTypes' => Vehicle::getVehicleTypes(),
            'filters' => [
                'search' => $request->search ?? '',
                'brand' => $request->brand ?? '',
                'vehicle_type' => $request->vehicle_type ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('vehicles/create', [
            'vehicleTypes' => Vehicle::getVehicleTypes(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        $vehicle = Vehicle::create($request->validated());

        return redirect()->route('vehicles.index')
            ->with('success', 'Data kendaraan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        return Inertia::render('vehicles/show', [
            'vehicle' => $vehicle,
            'vehicleTypes' => Vehicle::getVehicleTypes(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('vehicles/edit', [
            'vehicle' => $vehicle,
            'vehicleTypes' => Vehicle::getVehicleTypes(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $vehicle->update($request->validated());

        return redirect()->route('vehicles.index')
            ->with('success', 'Data kendaraan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return redirect()->route('vehicles.index')
            ->with('success', 'Data kendaraan berhasil dihapus.');
    }


}