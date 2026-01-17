import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MapComponent from '@/Components/MapComponent';

export default function MapPage({ auth }) {
    const markers = [
        { position: [-23.5505, -46.6333], popupContent: "São Paulo Center" }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Location Map</h2>}
        >
            <Head title="Map" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-4">Interactive Map</h3>
                            <div className="h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden relative" style={{ isolation: 'isolate' }}>
                                <MapComponent markers={markers} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
