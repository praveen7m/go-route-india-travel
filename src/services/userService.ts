
import { api } from './api';

/**
 * Service to handle user-related API calls
 */
export const userService = {
  getSavedRoutes: () => 
    api.get<any[]>('/user/saved-routes'),

  saveRoute: (routeData: any) => 
    api.post<{ success: boolean }>('/user/saved-routes', routeData),

  deleteRoute: (routeId: string) => 
    api.delete<{ success: boolean }>(`/user/saved-routes/${routeId}`),

  getBookingHistory: () => 
    api.get<any[]>('/user/booking-history'),

  getUserProfile: () => 
    api.get<any>('/user/profile'),

  updateUserProfile: (profileData: any) => 
    api.put<any>('/user/profile', profileData),

  updateUserSettings: (settings: any) => 
    api.put<{ success: boolean }>('/user/settings', settings),
};
