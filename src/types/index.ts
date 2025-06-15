export interface Customer {
  id: string;
  name: string;
  service: string;
  joinedAt: Date;
  estimatedTime: number;
  position: number;
  status: 'waiting' | 'being-served' | 'completed';
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  business: string;
  image: string;
  distance: string;
}

export interface Analytics {
  totalCustomersToday: number;
  averageWaitTime: number;
  peakHours: { hour: number; customers: number }[];
  serviceStats: { service: string; count: number; avgTime: number }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'staff' | 'admin';
  preferences: {
    notifications: boolean;
    favoriteServices: string[];
    preferredSalon?: string;
  };
  stats: {
    totalVisits: number;
    totalSpent: number;
    averageWaitTime: number;
    favoriteService: string;
  };
  joinedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}