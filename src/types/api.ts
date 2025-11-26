/**
 * User-related types
 */
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Authentication types - based on OpenAPI spec
 */
export interface AuthResponse {
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

/** RegisterDto - OpenAPI schema for user registration */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  age?: number;
}

/** LoginDto - OpenAPI schema for user login */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Cycle-related types - based on OpenAPI spec
 */

/** SetUserCycleDto - Complete cycle settings from OpenAPI spec */
export interface SetUserCycleDto {
  // Core cycle information
  cycle_length: number; // 21-45 days
  period_length: number; // 3-8 days
  last_period_start: string; // ISO date format (YYYY-MM-DD)
  
  // Flow and symptoms
  flow_description: 'light' | 'medium' | 'heavy' | 'variable';
  symptoms: string[]; // e.g., ["cramps", "bloat", "fatigue"]
  irregularities: string[]; // e.g., ["missed", "spotting"]
  
  // Medical conditions
  conditions: string[]; // e.g., ["PCOS", "endometriosis"]
  
  // User goals
  goal: 'General Health Tracking' | 'Track Fertility Window' | 'Trying to conceive' | 'Avoid Pregnancy';
  
  // Lifestyle factors
  stress: 'low' | 'moderate' | 'high';
  sleep_quality: 'poor' | 'fair' | 'good';
  exercise: 'rarely' | 'sometimes' | 'regularly';
  diet: 'balance' | 'vegetarian' | 'vegan' | 'other';
}

/** CyclePrediction - Response from cycle predictions endpoint */
export interface CyclePrediction {
  id?: string;
  userId?: string;
  predictedDate?: string;
  confidence?: number;
  cycle_length?: number;
  period_length?: number;
  createdAt?: string;
}

/** LogDto - OpenAPI schema for logging period information */
export interface LogDto {
  period_flow: 'none' | 'light' | 'medium' | 'heavy';
  feeling: 'moody' | 'tired' | 'irritable' | 'stressed' | 'energetic';
  symptoms: string[]; // e.g., ["PCOS", "gastrointestinal"]
}

/** CycleLog - Response from cycle logs endpoints */
export interface CycleLog {
  id: string;
  userId: string;
  period_flow: 'none' | 'light' | 'medium' | 'heavy';
  feeling: 'moody' | 'tired' | 'irritable' | 'stressed' | 'energetic';
  symptoms: string[];
  date?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Product-related types - based on OpenAPI spec
 */

/** CreateProductDto - OpenAPI schema for creating products */
export interface CreateProductDto {
  title: string;
  price: number;
  number_of_pad: number;
  description: string;
  content: string[]; // Additional product info
  environmental_impact: string; // e.g., "1.2kg CO₂ saved per pack"
}

/** Product - Response from products endpoints */
export interface Product {
  id: string;
  title: string;
  price: number;
  number_of_pad: number;
  description: string;
  content?: string[];
  environmental_impact?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Generic response wrapper types
 */
export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

/**
 * Error handling types
 */
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}