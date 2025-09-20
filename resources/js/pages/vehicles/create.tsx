import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Car, Save } from 'lucide-react';

interface VehicleFormData {
    brand: string;
    model: string;
    year: string;
    license_plate: string;
    vehicle_type: string;
    color: string;
    owner_name: string;
    [key: string]: string;
}

interface Props {
    vehicleTypes: Record<string, string>;
    [key: string]: unknown;
}

export default function CreateVehicle({ vehicleTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm<VehicleFormData>({
        brand: '',
        model: '',
        year: '',
        license_plate: '',
        vehicle_type: '',
        color: '',
        owner_name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('vehicles.store'));
    };

    return (
        <AppShell>
            <Head title="Tambah Kendaraan Baru" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                    <Link href={route('vehicles.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <div className="flex items-center space-x-3">
                        <Car className="h-8 w-8 text-blue-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tambah Kendaraan Baru</h1>
                            <p className="text-sm text-gray-500">
                                Masukkan informasi kendaraan yang akan didaftarkan
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Kendaraan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Brand */}
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Merek Kendaraan *</Label>
                                    <Input
                                        id="brand"
                                        type="text"
                                        value={data.brand}
                                        onChange={(e) => setData('brand', e.target.value)}
                                        placeholder="Contoh: Toyota, Honda, Yamaha"
                                        className={errors.brand ? 'border-red-500' : ''}
                                    />
                                    {errors.brand && (
                                        <p className="text-sm text-red-600">{errors.brand}</p>
                                    )}
                                </div>

                                {/* Model */}
                                <div className="space-y-2">
                                    <Label htmlFor="model">Model Kendaraan *</Label>
                                    <Input
                                        id="model"
                                        type="text"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        placeholder="Contoh: Avanza, Jazz, Vario"
                                        className={errors.model ? 'border-red-500' : ''}
                                    />
                                    {errors.model && (
                                        <p className="text-sm text-red-600">{errors.model}</p>
                                    )}
                                </div>

                                {/* Year */}
                                <div className="space-y-2">
                                    <Label htmlFor="year">Tahun Pembuatan *</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        min="1900"
                                        max={new Date().getFullYear() + 1}
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        placeholder="Contoh: 2020"
                                        className={errors.year ? 'border-red-500' : ''}
                                    />
                                    {errors.year && (
                                        <p className="text-sm text-red-600">{errors.year}</p>
                                    )}
                                </div>

                                {/* License Plate */}
                                <div className="space-y-2">
                                    <Label htmlFor="license_plate">Nomor Plat *</Label>
                                    <Input
                                        id="license_plate"
                                        type="text"
                                        value={data.license_plate}
                                        onChange={(e) => setData('license_plate', e.target.value.toUpperCase())}
                                        placeholder="Contoh: B 1234 ABC"
                                        className={`font-mono ${errors.license_plate ? 'border-red-500' : ''}`}
                                    />
                                    {errors.license_plate && (
                                        <p className="text-sm text-red-600">{errors.license_plate}</p>
                                    )}
                                </div>

                                {/* Vehicle Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="vehicle_type">Jenis Kendaraan *</Label>
                                    <Select 
                                        value={data.vehicle_type} 
                                        onValueChange={(value) => setData('vehicle_type', value)}
                                    >
                                        <SelectTrigger className={errors.vehicle_type ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih jenis kendaraan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(vehicleTypes).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.vehicle_type && (
                                        <p className="text-sm text-red-600">{errors.vehicle_type}</p>
                                    )}
                                </div>

                                {/* Color */}
                                <div className="space-y-2">
                                    <Label htmlFor="color">Warna Kendaraan *</Label>
                                    <Input
                                        id="color"
                                        type="text"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        placeholder="Contoh: Putih, Hitam, Silver"
                                        className={errors.color ? 'border-red-500' : ''}
                                    />
                                    {errors.color && (
                                        <p className="text-sm text-red-600">{errors.color}</p>
                                    )}
                                </div>
                            </div>

                            {/* Owner Name - Full Width */}
                            <div className="space-y-2">
                                <Label htmlFor="owner_name">Nama Pemilik *</Label>
                                <Input
                                    id="owner_name"
                                    type="text"
                                    value={data.owner_name}
                                    onChange={(e) => setData('owner_name', e.target.value)}
                                    placeholder="Nama lengkap pemilik kendaraan"
                                    className={errors.owner_name ? 'border-red-500' : ''}
                                />
                                {errors.owner_name && (
                                    <p className="text-sm text-red-600">{errors.owner_name}</p>
                                )}
                            </div>

                            {/* Required Fields Notice */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <span className="font-medium">Catatan:</span> Semua field yang ditandai dengan (*) wajib diisi.
                                </p>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                                <Link href={route('vehicles.index')}>
                                    <Button variant="outline" type="button">
                                        Batal
                                    </Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Simpan Kendaraan
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}