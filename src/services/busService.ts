
import { api } from './api';
import type { BusData, StopDetails } from '@/types/bus-route';

export interface CityBus {
  id: number;
  number: string;
  route: string;
  arrivalTime: string;
  nextBus: string;
  crowdLevel: string;
  cost: string;
  distance: string;
  estimatedTime: string;
}

/**
 * Service to handle all bus-related API calls
 */
export const busService = {
  // Route bus services
  getAvailableBuses: (from: string, to: string, date: string) => 
    api.get<BusData[]>(`/buses/search?from=${from}&to=${to}&date=${date}`),

  getBusDetails: (busId: number) => 
    api.get<BusData>(`/buses/${busId}`),

  getBusStops: (busId: number) => 
    api.get<StopDetails[]>(`/buses/${busId}/stops`),

  joinWaitlist: (busId: number, email: string, phone: string) => 
    api.post<{ success: boolean }>(`/buses/${busId}/waitlist`, { email, phone }),

  // City bus services
  getCityBuses: (from: string, to: string) => 
    api.get<CityBus[]>(`/city-buses?from=${from}&to=${to}`),

  trackCityBus: (busNumber: string) => 
    api.get<{
      location: { lat: number; lng: number };
      nextStop: string;
      estimatedArrival: string;
    }>(`/city-buses/${busNumber}/track`),

  setWakeMeUp: (busNumber: string, minutesBefore: number, notifyOptions: any) =>
    api.post<{ success: boolean }>(`/city-buses/${busNumber}/wake-me-up`, {
      minutesBefore,
      notifyOptions
    })
};
