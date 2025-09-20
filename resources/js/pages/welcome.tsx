import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Car, 
    Search, 
    Database, 
    Filter, 
    Plus, 
    Edit, 
    Eye, 
    BarChart3,
    CheckCircle,
    Smartphone,
    ArrowRight,
    Zap
} from 'lucide-react';

export default function Welcome() {
    const features = [
        {
            icon: <Database className="h-6 w-6 text-blue-600" />,
            title: "Database Lengkap",
            description: "Simpan dan kelola data kendaraan dengan informasi merek, model, tahun, plat, dan pemilik"
        },
        {
            icon: <Search className="h-6 w-6 text-green-600" />,
            title: "Pencarian Canggih",
            description: "Cari kendaraan berdasarkan berbagai kriteria dengan server-side search yang cepat"
        },
        {
            icon: <Filter className="h-6 w-6 text-purple-600" />,
            title: "Filter Multi-Kriteria",
            description: "Filter data berdasarkan merek dan jenis kendaraan untuk hasil yang lebih spesifik"
        },
        {
            icon: <Edit className="h-6 w-6 text-orange-600" />,
            title: "CRUD Lengkap",
            description: "Create, Read, Update, Delete - kelola data kendaraan dengan mudah dan aman"
        }
    ];

    const demoData = [
        { brand: "Toyota", model: "Avanza", year: "2020", plate: "B 1234 ABC", type: "Mobil", owner: "Ahmad Santoso" },
        { brand: "Honda", model: "Vario 150", year: "2021", plate: "B 5678 DEF", type: "Motor", owner: "Siti Rahayu" },
        { brand: "Mitsubishi", model: "Colt Diesel", year: "2019", plate: "B 9012 GHI", type: "Truk", owner: "PT. Logistik Jaya" },
    ];

    return (
        <AppShell>
            <Head title="🚗 Database Kendaraan - Sistem Manajemen Kendaraan Modern" />
            
            <div className="space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-6 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 -mx-6 px-6 rounded-2xl">
                    <div className="flex justify-center">
                        <div className="bg-blue-600 p-3 rounded-full">
                            <Car className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900">
                            🚗 Database Kendaraan
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Sistem manajemen database kendaraan modern dengan Progressive Web App (PWA), 
                            pencarian server-side, dan interface yang responsif
                        </p>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <Link href={route('home')}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Database className="h-5 w-5 mr-2" />
                                Lihat Database
                            </Button>
                        </Link>
                        <Link href={route('vehicles.create')}>
                            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                <Plus className="h-5 w-5 mr-2" />
                                Tambah Kendaraan
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">✨ Fitur Unggulan</h2>
                        <p className="text-gray-600 mt-2">Semua yang Anda butuhkan untuk mengelola data kendaraan</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-3">
                                        {feature.icon}
                                        <span>{feature.title}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Demo Table Preview */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">📊 Preview Database</h2>
                        <p className="text-gray-600 mt-2">Contoh tampilan data kendaraan dalam sistem</p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <BarChart3 className="h-5 w-5 text-blue-600" />
                                    <span>Data Kendaraan</span>
                                </div>
                                <Badge variant="secondary">{demoData.length} entries</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Merek</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Model</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Tahun</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Nomor Plat</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Jenis</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Pemilik</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {demoData.map((vehicle, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 font-medium">{vehicle.brand}</td>
                                                <td className="py-3 px-4">{vehicle.model}</td>
                                                <td className="py-3 px-4">{vehicle.year}</td>
                                                <td className="py-3 px-4">
                                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                                                        {vehicle.plate}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Badge variant="secondary">{vehicle.type}</Badge>
                                                </td>
                                                <td className="py-3 px-4">{vehicle.owner}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 text-center">
                                <Link href={route('home')}>
                                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                        <Eye className="h-4 w-4 mr-2" />
                                        Lihat Database Lengkap
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Technology Stack */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">⚡ Teknologi Modern</h2>
                        <p className="text-gray-600 mt-2">Dibangun dengan teknologi terdepan untuk performa optimal</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Smartphone className="h-8 w-8 mx-auto text-blue-600 mb-3" />
                                <h3 className="font-semibold">Progressive Web App</h3>
                                <p className="text-sm text-gray-600 mt-1">Responsif di semua device</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Zap className="h-8 w-8 mx-auto text-green-600 mb-3" />
                                <h3 className="font-semibold">Server-side Search</h3>
                                <p className="text-sm text-gray-600 mt-1">Pencarian super cepat</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <CheckCircle className="h-8 w-8 mx-auto text-purple-600 mb-3" />
                                <h3 className="font-semibold">Laravel + Inertia</h3>
                                <p className="text-sm text-gray-600 mt-1">Backend yang robust</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Filter className="h-8 w-8 mx-auto text-orange-600 mb-3" />
                                <h3 className="font-semibold">Advanced Filtering</h3>
                                <p className="text-sm text-gray-600 mt-1">Filter multi-kriteria</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Key Benefits */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 -mx-6 px-6 py-12 rounded-2xl">
                    <div className="text-center space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">🎯 Keunggulan Sistem</h2>
                            <p className="text-gray-600 mt-2">Mengapa memilih Database Kendaraan kami?</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center space-y-3">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                    <Search className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold">Pencarian Instan</h3>
                                <p className="text-gray-600 text-sm">
                                    Temukan kendaraan dalam hitungan detik dengan pencarian real-time
                                </p>
                            </div>
                            <div className="text-center space-y-3">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                    <Smartphone className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold">Mobile Friendly</h3>
                                <p className="text-gray-600 text-sm">
                                    Akses dari mana saja, kapan saja dengan desain responsif PWA
                                </p>
                            </div>
                            <div className="text-center space-y-3">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                    <Database className="h-8 w-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold">Data Terstruktur</h3>
                                <p className="text-gray-600 text-sm">
                                    Kelola data kendaraan dengan struktur database yang optimal
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center space-y-6 py-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">
                            🚀 Mulai Kelola Data Kendaraan Anda
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Sistem database kendaraan yang mudah, cepat, dan powerful. Siap digunakan untuk 
                            mengelola ratusan hingga ribuan data kendaraan.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={route('home')}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                                <Database className="h-5 w-5 mr-2" />
                                Jelajahi Database
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href={route('vehicles.create')}>
                            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                                <Plus className="h-5 w-5 mr-2" />
                                Tambah Data Pertama
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}