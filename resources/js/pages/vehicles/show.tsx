import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Car, Edit, Calendar, User, Palette, Hash, Tag } from 'lucide-react';

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
    vehicle_type: string;
    color: string;
    owner_name: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    vehicle: Vehicle;
    vehicleTypes: Record<string, string>;
    [key: string]: unknown;
}

const vehicleTypeColors = {
    car: 'bg-blue-100 text-blue-800',
    motorcycle: 'bg-green-100 text-green-800',
    truck: 'bg-orange-100 text-orange-800',
    van: 'bg-purple-100 text-purple-800',
    bus: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800',
};

export default function ShowVehicle({ vehicle, vehicleTypes }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppShell>
            <Head title={`Detail Kendaraan - ${vehicle.brand} ${vehicle.model}`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
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
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {vehicle.brand} {vehicle.model}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Detail informasi kendaraan
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href={route('vehicles.edit', vehicle.id)}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Kendaraan
                        </Button>
                    </Link>
                </div>

                {/* Vehicle Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Car className="h-5 w-5" />
                                <span>Informasi Kendaraan</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Merek</span>
                                <span className="font-semibold">{vehicle.brand}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Model</span>
                                <span className="font-semibold">{vehicle.model}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Tahun</span>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="font-semibold">{vehicle.year}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Nomor Plat</span>
                                <div className="flex items-center space-x-2">
                                    <Hash className="h-4 w-4 text-gray-400" />
                                    <span className="font-mono bg-gray-100 px-3 py-1 rounded font-semibold">
                                        {vehicle.license_plate}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Jenis Kendaraan</span>
                                <div className="flex items-center space-x-2">
                                    <Tag className="h-4 w-4 text-gray-400" />
                                    <Badge className={vehicleTypeColors[vehicle.vehicle_type as keyof typeof vehicleTypeColors] || vehicleTypeColors.other}>
                                        {vehicleTypes[vehicle.vehicle_type]}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Warna</span>
                                <div className="flex items-center space-x-2">
                                    <Palette className="h-4 w-4 text-gray-400" />
                                    <span className="font-semibold">{vehicle.color}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Owner & System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>Informasi Pemilik & Sistem</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-gray-500">Nama Pemilik</span>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-blue-600" />
                                        <span className="font-semibold text-blue-900">{vehicle.owner_name}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <hr className="border-gray-200" />
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">ID Kendaraan</span>
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">#{vehicle.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Tanggal Dibuat</span>
                                    <span className="text-gray-700">{formatDate(vehicle.created_at)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Terakhir Diubah</span>
                                    <span className="text-gray-700">{formatDate(vehicle.updated_at)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Card */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                🚗 {vehicle.brand} {vehicle.model} ({vehicle.year})
                            </h3>
                            <p className="text-gray-600">
                                Kendaraan jenis <strong>{vehicleTypes[vehicle.vehicle_type]}</strong> berwarna{' '}
                                <strong>{vehicle.color}</strong> dengan nomor plat{' '}
                                <span className="font-mono bg-white px-2 py-1 rounded border">
                                    {vehicle.license_plate}
                                </span>{' '}
                                milik <strong>{vehicle.owner_name}</strong>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex items-center justify-center space-x-3 pt-6">
                    <Link href={route('vehicles.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali ke Daftar
                        </Button>
                    </Link>
                    <Link href={route('vehicles.edit', vehicle.id)}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Data Kendaraan
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}