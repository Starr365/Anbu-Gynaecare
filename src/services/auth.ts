/**
 * Authentication service - Handles user login and registration
 * Endpoints: POST /auth/login, POST /auth/register
 */

import api from '../libs/api';
import { AuthResponse, RegisterPayload, LoginPayload } from '../types/api';
import { getErrorMessage } from '../libs/error-handler';

/**
 * Register a new user
 * @param payload - RegisterDto from OpenAPI spec
 * @returns AuthResponse with user data and access token
 * @throws Error with descriptive message
 */
export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  try {
    const res = await api.post<AuthResponse>('/auth/register', payload);
    
    // Extract and store token
    const token = res.data.data.accessToken;
    if (token) {
      localStorage.setItem('accessToken', token);
      
      // Optional: Set token in axios default headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return res.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Registration failed: ${message}`);
  }
};

/**
 * Login user with email and password
 * @param payload - LoginDto from OpenAPI spec
 * @returns AuthResponse with user data and access token
 * @throws Error with descriptive message
 */
export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  try {
    const res = await api.post<AuthResponse>('/auth/login', payload);
    
    // Extract and store token
    const token = res.data.data.accessToken;
    if (token) {
      localStorage.setItem('accessToken', token);
      
      // Optional: Set token in axios default headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return res.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Login failed: ${message}`);
  }
};

/**
 * Logout user - Clears stored token
 */
export const logoutUser = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  delete api.defaults.headers.common['Authorization'];
};

/**
 * Check if user is authenticated
 * @returns True if access token exists
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('accessToken');
};

/**
 * Get stored access token
 * @returns Access token or null
 */
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

