
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Bus, Navigation, Train } from 'lucide-react';

// You'll need to replace this with your own Mapbox access token
// For security reasons, this should ideally be stored in an environment variable
const MAPBOX_ACCESS_TOKEN = 'your_mapbox_access_token_here';

interface RouteMapProps {
  from: string;
  to: string;
  segments: Array<{
    id: number;
    mode: string;
    description: string;
    fare: number;
    time: number;
    color: string;
  }>;
}

const RouteMap: React.FC<RouteMapProps> = ({ from, to, segments }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (mapContainer.current && !mapInitialized.current) {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
      
      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.5946, 12.9716], // Default to Bangalore coordinates
        zoom: 12
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Disable scroll zoom for better mobile experience
      map.current.scrollZoom.disable();
      
      // When map is loaded, perform geocoding and add markers
      map.current.on('load', () => {
        // This is where you would fetch coordinates for 'from' and 'to' locations
        // For now, we'll use dummy coordinates for Bangalore
        const fromCoordinates = [77.5946, 12.9716];
        const toCoordinates = [77.6088, 12.9784];
        
        // Add markers for from and to locations
        addMarker(fromCoordinates, 'from', from);
        addMarker(toCoordinates, 'to', to);
        
        // Draw a line between the points
        if (map.current) {
          map.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [fromCoordinates, toCoordinates]
              }
            }
          });
          
          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#0080ff',
              'line-width': 4,
              'line-opacity': 0.7
            }
          });
        }
      });
      
      mapInitialized.current = true;
    }
    
    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        mapInitialized.current = false;
      }
    };
  }, [from, to, segments]);
  
  const addMarker = (coordinates: [number, number], type: 'from' | 'to', locationName: string) => {
    if (!map.current) return;
    
    // Create custom marker element
    const markerElement = document.createElement('div');
    markerElement.className = `marker-${type}`;
    markerElement.style.backgroundColor = type === 'from' ? '#3b82f6' : '#10b981';
    markerElement.style.width = '25px';
    markerElement.style.height = '25px';
    markerElement.style.borderRadius = '50%';
    markerElement.style.display = 'flex';
    markerElement.style.justifyContent = 'center';
    markerElement.style.alignItems = 'center';
    markerElement.style.color = 'white';
    markerElement.innerHTML = type === 'from' ? 'A' : 'B';
    
    // Add the marker to the map
    new mapboxgl.Marker(markerElement)
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(locationName))
      .addTo(map.current);
  };
  
  const getSegmentIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'bus':
        return <Bus size={16} className="text-green-600" />;
      case 'train':
      case 'metro':
        return <Train size={16} className="text-purple-600" />;
      default:
        return <Navigation size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="h-full w-full relative">
      {!MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'your_mapbox_access_token_here' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20 text-center p-4">
          <p className="text-muted-foreground mb-2">
            Map preview requires a Mapbox access token
          </p>
          <p className="text-xs text-muted-foreground">
            Please provide a valid Mapbox token to enable map functionality
          </p>
        </div>
      ) : null}
      <div ref={mapContainer} className="h-full w-full" />
      <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-md border border-border">
        <div className="text-sm font-medium mb-1 flex items-center justify-between">
          <span>{from} → {to}</span>
          <span className="text-xs text-muted-foreground">{segments.reduce((total, segment) => total + segment.time, 0)} mins</span>
        </div>
        <div className="flex gap-1 items-center text-xs">
          {segments.map((segment, idx) => (
            <React.Fragment key={segment.id}>
              <span className="flex items-center gap-1">
                {getSegmentIcon(segment.mode)}
                <span>{segment.mode}</span>
              </span>
              {idx < segments.length - 1 && (
                <span className="mx-1">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
