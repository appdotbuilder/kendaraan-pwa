<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Vehicle
 *
 * @property int $id
 * @property string $brand
 * @property string $model
 * @property int $year
 * @property string $license_plate
 * @property string $vehicle_type
 * @property string $color
 * @property string $owner_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle query()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereLicensePlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereVehicleType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereOwnerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereId($value)
 * @method static \Database\Factories\VehicleFactory factory($count = null, $state = [])
 * @method static Vehicle create(array $attributes = [])
 * @method static Vehicle firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Vehicle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'brand',
        'model',
        'year',
        'license_plate',
        'vehicle_type',
        'color',
        'owner_name',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'year' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'vehicles';

    /**
     * Get the available vehicle types.
     *
     * @return array<string, string>
     */
    public static function getVehicleTypes(): array
    {
        return [
            'car' => 'Mobil',
            'motorcycle' => 'Motor',
            'truck' => 'Truk',
            'van' => 'Van',
            'bus' => 'Bus',
            'other' => 'Lainnya',
        ];
    }

    /**
     * Get the formatted vehicle type.
     *
     * @return string
     */
    public function getFormattedVehicleTypeAttribute(): string
    {
        $types = self::getVehicleTypes();
        return $types[$this->vehicle_type] ?? $this->vehicle_type;
    }

    /**
     * Scope a query to filter by brand.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $brand
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByBrand($query, $brand)
    {
        return $query->where('brand', 'like', '%' . $brand . '%');
    }

    /**
     * Scope a query to filter by vehicle type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $vehicleType
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByVehicleType($query, $vehicleType)
    {
        return $query->where('vehicle_type', $vehicleType);
    }

    /**
     * Scope a query to search across multiple fields.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($query) use ($search) {
            $query->where('brand', 'like', '%' . $search . '%')
                ->orWhere('model', 'like', '%' . $search . '%')
                ->orWhere('license_plate', 'like', '%' . $search . '%')
                ->orWhere('color', 'like', '%' . $search . '%')
                ->orWhere('owner_name', 'like', '%' . $search . '%');
        });
    }
}