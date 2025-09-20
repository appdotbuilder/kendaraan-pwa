<?php

namespace Tests\Feature;

use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_view_vehicle_index(): void
    {
        $response = $this->get('/');
        
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vehicles/index')
        );
    }

    public function test_can_view_vehicle_create_form(): void
    {
        $response = $this->get('/vehicles/create');
        
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vehicles/create')
                 ->has('vehicleTypes')
        );
    }

    public function test_can_create_vehicle(): void
    {
        $vehicleData = [
            'brand' => 'Toyota',
            'model' => 'Avanza',
            'year' => 2020,
            'license_plate' => 'B 1234 ABC',
            'vehicle_type' => 'car',
            'color' => 'Putih',
            'owner_name' => 'John Doe',
        ];

        $response = $this->post('/vehicles', $vehicleData);

        $response->assertRedirect('/vehicles');
        $this->assertDatabaseHas('vehicles', $vehicleData);
    }

    public function test_can_view_vehicle_details(): void
    {
        $vehicle = Vehicle::factory()->create();

        $response = $this->get("/vehicles/{$vehicle->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vehicles/show')
                 ->where('vehicle.id', $vehicle->id)
                 ->where('vehicle.brand', $vehicle->brand)
        );
    }

    public function test_can_edit_vehicle(): void
    {
        $vehicle = Vehicle::factory()->create();

        $response = $this->get("/vehicles/{$vehicle->id}/edit");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vehicles/edit')
                 ->where('vehicle.id', $vehicle->id)
        );
    }

    public function test_can_update_vehicle(): void
    {
        $vehicle = Vehicle::factory()->create();
        
        $updateData = [
            'brand' => 'Honda',
            'model' => 'Jazz',
            'year' => 2021,
            'license_plate' => $vehicle->license_plate, // Keep same plate
            'vehicle_type' => 'car',
            'color' => 'Merah',
            'owner_name' => 'Jane Doe',
        ];

        $response = $this->put("/vehicles/{$vehicle->id}", $updateData);

        $response->assertRedirect('/vehicles');
        $this->assertDatabaseHas('vehicles', array_merge(['id' => $vehicle->id], $updateData));
    }

    public function test_can_delete_vehicle(): void
    {
        $vehicle = Vehicle::factory()->create();

        $response = $this->delete("/vehicles/{$vehicle->id}");

        $response->assertRedirect('/vehicles');
        $this->assertDatabaseMissing('vehicles', ['id' => $vehicle->id]);
    }

    public function test_can_search_vehicles(): void
    {
        Vehicle::factory()->create(['brand' => 'Toyota', 'model' => 'Avanza']);
        Vehicle::factory()->create(['brand' => 'Honda', 'model' => 'Jazz']);

        $response = $this->get('/?search=Toyota');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vehicles/index')
                 ->where('vehicles.data.0.brand', 'Toyota')
        );
    }

    public function test_can_filter_by_brand(): void
    {
        Vehicle::factory()->create(['brand' => 'Toyota']);
        Vehicle::factory()->create(['brand' => 'Honda']);

        $response = $this->get('/?brand=Toyota');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vehicles/index')
                 ->where('vehicles.data.0.brand', 'Toyota')
        );
    }

    public function test_can_filter_by_vehicle_type(): void
    {
        Vehicle::factory()->create(['vehicle_type' => 'car']);
        Vehicle::factory()->motorcycle()->create();

        $response = $this->get('/?vehicle_type=car');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vehicles/index')
                 ->where('vehicles.data.0.vehicle_type', 'car')
        );
    }

    public function test_validation_fails_with_duplicate_license_plate(): void
    {
        $existingVehicle = Vehicle::factory()->create(['license_plate' => 'B 1234 ABC']);

        $vehicleData = [
            'brand' => 'Honda',
            'model' => 'Jazz',
            'year' => 2021,
            'license_plate' => 'B 1234 ABC', // Duplicate
            'vehicle_type' => 'car',
            'color' => 'Merah',
            'owner_name' => 'Jane Doe',
        ];

        $response = $this->post('/vehicles', $vehicleData);

        $response->assertSessionHasErrors('license_plate');
    }

    public function test_validation_fails_with_invalid_vehicle_type(): void
    {
        $vehicleData = [
            'brand' => 'Toyota',
            'model' => 'Avanza',
            'year' => 2020,
            'license_plate' => 'B 1234 ABC',
            'vehicle_type' => 'invalid_type',
            'color' => 'Putih',
            'owner_name' => 'John Doe',
        ];

        $response = $this->post('/vehicles', $vehicleData);

        $response->assertSessionHasErrors('vehicle_type');
    }

    public function test_welcome_page_shows_vehicle_app_info(): void
    {
        $response = $this->get('/welcome');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
        );
    }
}