import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Car, Plus, Search, Filter, Eye, Edit, Trash2, RefreshCw } from 'lucide-react';

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

interface PaginatedVehicles {
    data: Vehicle[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    vehicles: PaginatedVehicles;
    brands: string[];
    vehicleTypes: Record<string, string>;
    filters: {
        search: string;
        brand: string;
        vehicle_type: string;
    };
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

export default function VehicleIndex({ vehicles, brands, vehicleTypes, filters }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [brandFilter, setBrandFilter] = useState(filters.brand);
    const [typeFilter, setTypeFilter] = useState(filters.vehicle_type);
    const [deleteVehicle, setDeleteVehicle] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = useCallback(() => {
        setIsLoading(true);
        router.get('/', {
            search,
            brand: brandFilter,
            vehicle_type: typeFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(false),
        });
    }, [search, brandFilter, typeFilter]);

    const handleReset = () => {
        setSearch('');
        setBrandFilter('');
        setTypeFilter('');
        setIsLoading(true);
        router.get('/', {}, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const handleDelete = (vehicle: Vehicle) => {
        router.delete(route('vehicles.destroy', vehicle.id), {
            onSuccess: () => {
                setDeleteVehicle(null);
            },
        });
    };

    // Auto search when typing (debounced)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== filters.search) {
                handleSearch();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search, filters.search, handleSearch]);

    return (
        <AppShell>
            <Head title="🚗 Database Kendaraan" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Car className="h-8 w-8 text-blue-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Database Kendaraan</h1>
                            <p className="text-sm text-gray-500">
                                Kelola data kendaraan dengan mudah dan efisien
                            </p>
                        </div>
                    </div>
                    <Link href={route('vehicles.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Kendaraan
                        </Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Cari berdasarkan merek, model, plat, warna, atau pemilik..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <Select value={brandFilter} onValueChange={setBrandFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Merek" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Semua Merek</SelectItem>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand} value={brand}>
                                            {brand}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Jenis Kendaraan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Semua Jenis</SelectItem>
                                    {Object.entries(vehicleTypes).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4">
                        <Button 
                            onClick={handleSearch} 
                            disabled={isLoading}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isLoading ? (
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Filter className="h-4 w-4 mr-2" />
                            )}
                            Filter
                        </Button>
                        <Button onClick={handleReset} variant="outline" size="sm">
                            Reset
                        </Button>
                        <div className="text-sm text-gray-500">
                            Menampilkan {vehicles.data.length} dari {vehicles.total} kendaraan
                        </div>
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold">Merek</TableHead>
                                <TableHead className="font-semibold">Model</TableHead>
                                <TableHead className="font-semibold">Tahun</TableHead>
                                <TableHead className="font-semibold">Nomor Plat</TableHead>
                                <TableHead className="font-semibold">Jenis</TableHead>
                                <TableHead className="font-semibold">Warna</TableHead>
                                <TableHead className="font-semibold">Pemilik</TableHead>
                                <TableHead className="font-semibold text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles.data.length > 0 ? (
                                vehicles.data.map((vehicle) => (
                                    <TableRow key={vehicle.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{vehicle.brand}</TableCell>
                                        <TableCell>{vehicle.model}</TableCell>
                                        <TableCell>{vehicle.year}</TableCell>
                                        <TableCell>
                                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                                                {vehicle.license_plate}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={vehicleTypeColors[vehicle.vehicle_type as keyof typeof vehicleTypeColors] || vehicleTypeColors.other}>
                                                {vehicleTypes[vehicle.vehicle_type]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{vehicle.color}</TableCell>
                                        <TableCell>{vehicle.owner_name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link href={route('vehicles.show', vehicle.id)}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('vehicles.edit', vehicle.id)}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteVehicle(vehicle)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8">
                                        <div className="flex flex-col items-center space-y-3">
                                            <Car className="h-12 w-12 text-gray-300" />
                                            <div>
                                                <p className="text-lg font-medium text-gray-900">
                                                    Tidak ada kendaraan ditemukan
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Coba ubah filter pencarian atau tambah kendaraan baru
                                                </p>
                                            </div>
                                            <Link href={route('vehicles.create')}>
                                                <Button className="bg-blue-600 hover:bg-blue-700">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Tambah Kendaraan Pertama
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {vehicles.total > vehicles.per_page && (
                    <div className="flex items-center justify-between bg-white px-6 py-3 border rounded-lg">
                        <div className="text-sm text-gray-700">
                            Menampilkan{' '}
                            <span className="font-medium">
                                {((vehicles.current_page - 1) * vehicles.per_page) + 1}
                            </span>{' '}
                            sampai{' '}
                            <span className="font-medium">
                                {Math.min(vehicles.current_page * vehicles.per_page, vehicles.total)}
                            </span>{' '}
                            dari{' '}
                            <span className="font-medium">{vehicles.total}</span> hasil
                        </div>
                        <div className="flex items-center space-x-2">
                            {vehicles.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => {
                                        if (link.url) {
                                            router.get(link.url);
                                        }
                                    }}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteVehicle} onOpenChange={() => setDeleteVehicle(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Kendaraan</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus kendaraan{' '}
                            <strong>{deleteVehicle?.brand} {deleteVehicle?.model}</strong>{' '}
                            dengan nomor plat <strong>{deleteVehicle?.license_plate}</strong>?
                            <br />
                            <span className="text-red-600 font-medium">
                                Tindakan ini tidak dapat dibatalkan.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button variant="outline" onClick={() => setDeleteVehicle(null)}>
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteVehicle && handleDelete(deleteVehicle)}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppShell>
    );
}