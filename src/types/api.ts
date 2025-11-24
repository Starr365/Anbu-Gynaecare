export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Cycle Log
export interface LogPayload {
  id: string;
  userId: string;
  date: string;
  symptoms: string[];
  mood: string;
  createdAt: string;
  updatedAt: string;
}

// Additional API types inferred from OpenAPI docs
export interface CyclePrediction {
  id?: string;
  userId?: string;
  predictedDate?: string;
  confidence?: number;
  createdAt?: string;
}

export interface SetUserCycleDto {
  lastPeriodDate?: string; // ISO date
  cycleLength: number;
  periodDuration: number;
}

export interface LogDto {
  userId?: string;
  date: string; // ISO date
  symptoms?: string[];
  mood?: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price?: number;
  sku?: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  sku?: string;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PagedResponse<T> {
  message: string;
  data: T;
}