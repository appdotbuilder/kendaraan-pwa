<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create 50 regular vehicles
        Vehicle::factory(30)->create();
        
        // Create 10 motorcycles
        Vehicle::factory(10)->motorcycle()->create();
        
        // Create 10 trucks
        Vehicle::factory(10)->truck()->create();
    }
}