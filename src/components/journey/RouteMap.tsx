
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface RouteMapProps {
  from: string;
  to: string;
  segments: Array<{
    mode: string;
    description: string;
  }>;
}

const RouteMap: React.FC<RouteMapProps> = ({ from, to, segments }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, using a temporary token
    // In production, this should be managed via environment variables
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // User needs to provide their Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [80.2785, 13.0827], // Chennai coordinates
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      {!mapboxgl.accessToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-sm text-muted-foreground">
            Please provide your Mapbox token to view the map
          </p>
        </div>
      )}
    </div>
  );
};

export default RouteMap;
