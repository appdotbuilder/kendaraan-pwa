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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('brand')->comment('Vehicle brand/manufacturer');
            $table->string('model')->comment('Vehicle model');
            $table->year('year')->comment('Manufacturing year');
            $table->string('license_plate')->unique()->comment('License plate number');
            $table->enum('vehicle_type', ['car', 'motorcycle', 'truck', 'van', 'bus', 'other'])->comment('Type of vehicle');
            $table->string('color')->comment('Vehicle color');
            $table->string('owner_name')->comment('Name of the vehicle owner');
            $table->timestamps();
            
            // Indexes for performance and filtering
            $table->index('brand');
            $table->index('vehicle_type');
            $table->index('license_plate');
            $table->index(['brand', 'vehicle_type']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};