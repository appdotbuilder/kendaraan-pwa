<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = ['Toyota', 'Honda', 'Suzuki', 'Daihatsu', 'Mitsubishi', 'Nissan', 'Mazda', 'Hyundai', 'BMW', 'Mercedes'];
        $colors = ['Putih', 'Hitam', 'Silver', 'Merah', 'Biru', 'Abu-abu', 'Hijau', 'Kuning', 'Coklat', 'Ungu'];
        $vehicleTypes = ['car', 'motorcycle', 'truck', 'van', 'bus'];
        
        $brand = fake()->randomElement($brands);
        
        return [
            'brand' => $brand,
            'model' => $this->getModelByBrand($brand),
            'year' => fake()->numberBetween(2000, 2024),
            'license_plate' => $this->generateLicensePlate(),
            'vehicle_type' => fake()->randomElement($vehicleTypes),
            'color' => fake()->randomElement($colors),
            'owner_name' => fake()->name(),
        ];
    }

    /**
     * Generate a realistic Indonesian license plate.
     *
     * @return string
     */
    protected function generateLicensePlate(): string
    {
        $areas = ['B', 'D', 'F', 'A', 'AD', 'AA', 'AB', 'AG', 'K', 'L'];
        $area = fake()->randomElement($areas);
        $number = fake()->numberBetween(1000, 9999);
        $letters = fake()->randomLetter() . fake()->randomLetter() . fake()->randomLetter();
        
        return strtoupper($area . ' ' . $number . ' ' . $letters);
    }

    /**
     * Get realistic model based on brand.
     *
     * @param string $brand
     * @return string
     */
    protected function getModelByBrand(string $brand): string
    {
        $models = [
            'Toyota' => ['Avanza', 'Innova', 'Camry', 'Corolla', 'Vios', 'Yaris', 'Fortuner'],
            'Honda' => ['Jazz', 'City', 'Civic', 'Accord', 'CR-V', 'HR-V', 'Brio'],
            'Suzuki' => ['Swift', 'Baleno', 'Ertiga', 'APV', 'Jimny', 'SX4', 'Ignis'],
            'Daihatsu' => ['Xenia', 'Terios', 'Ayla', 'Sigra', 'Gran Max', 'Luxio'],
            'Mitsubishi' => ['Pajero', 'Outlander', 'Xpander', 'Mirage', 'Lancer'],
            'Nissan' => ['Grand Livina', 'X-Trail', 'Serena', 'March', 'Juke'],
            'Mazda' => ['CX-5', 'Mazda2', 'Mazda3', 'CX-3', 'Biante'],
            'Hyundai' => ['Tucson', 'Santa Fe', 'i20', 'Accent', 'H-1'],
            'BMW' => ['X3', 'X5', '320i', '520i', 'X1', '118i'],
            'Mercedes' => ['C-Class', 'E-Class', 'GLA', 'GLC', 'A-Class'],
        ];

        return fake()->randomElement($models[$brand] ?? ['Unknown Model']);
    }

    /**
     * Indicate that the vehicle is a motorcycle.
     */
    public function motorcycle(): static
    {
        return $this->state(fn (array $attributes) => [
            'vehicle_type' => 'motorcycle',
            'brand' => fake()->randomElement(['Honda', 'Yamaha', 'Suzuki', 'Kawasaki']),
            'model' => fake()->randomElement(['Vario', 'Beat', 'PCX', 'Scoopy', 'CBR', 'Ninja']),
        ]);
    }

    /**
     * Indicate that the vehicle is a truck.
     */
    public function truck(): static
    {
        return $this->state(fn (array $attributes) => [
            'vehicle_type' => 'truck',
            'brand' => fake()->randomElement(['Hino', 'Mitsubishi', 'Isuzu', 'UD Trucks']),
            'model' => fake()->randomElement(['Dutro', 'Colt Diesel', 'Elf', 'Ranger']),
        ]);
    }
}