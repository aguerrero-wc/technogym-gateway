// types/firebase.ts

export interface FirebaseDevice {
  id: string;
  name?: string;
  serialNumber?: string;
  type?: string;
  status?: string;
  locationId?: string;
  createdAt?: any; // Firebase Timestamp
  updatedAt?: any; // Firebase Timestamp
  [key: string]: any; // Para campos adicionales
}

export interface FirebaseContainerType {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  createdAt?: any;
  updatedAt?: any;
  [key: string]: any;
}

export interface FirebaseDeviceCounter {
  id: string;
  deviceId: string;
  counterType?: string;
  value: number;
  lastUpdated?: any;
  [key: string]: any;
}

export interface FirebaseDeviceHistory {
  id: string;
  deviceId: string;
  action?: string;
  description?: string;
  timestamp: any; // Firebase Timestamp
  userId?: string;
  metadata?: Record<string, any>;
  [key: string]: any;
}

export interface FirebaseLocation {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  type?: string;
  active?: boolean;
  createdAt?: any;
  updatedAt?: any;
  [key: string]: any;
}

export interface FirebaseStock {
  id: string;
  locationId: string;
  containerTypeId?: string;
  quantity: number;
  minQuantity?: number;
  maxQuantity?: number;
  status?: string;
  lastChecked?: any;
  [key: string]: any;
}

export interface FirebaseStockHistory {
  id: string;
  stockId: string;
  action: string; // 'add', 'remove', 'transfer', 'adjust'
  quantity: number;
  previousQuantity?: number;
  newQuantity?: number;
  timestamp: any; // Firebase Timestamp
  userId?: string;
  notes?: string;
  metadata?: Record<string, any>;
  [key: string]: any;
}

// Tipos para respuestas de la API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
  message?: string;
}