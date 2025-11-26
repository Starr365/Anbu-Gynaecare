/**
 * User service - Handles user profile operations
 * Endpoint: GET /api/users/me
 */

import api from '../libs/api';
import { User, ApiResponse } from '../types/api';
import { getErrorMessage } from '../libs/error-handler';

/**
 * Fetch current authenticated user details
 * Requires valid Bearer token in Authorization header
 * @returns User object with profile information
 * @throws Error if user is not authenticated or request fails
 */
export const getUser = async (): Promise<User> => {
  try {
    const res = await api.get<ApiResponse<User>>('/users/me');
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to fetch user: ${message}`);
  }
};

/**
 * Cache for user data to avoid repeated API calls
 */
let cachedUser: User | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get user with caching
 * @param skipCache - Force fetch from API, bypassing cache
 * @returns User object
 */
export const getUserWithCache = async (skipCache = false): Promise<User> => {
  const now = Date.now();
  
  if (!skipCache && cachedUser && now - cacheTimestamp < CACHE_DURATION) {
    return cachedUser;
  }

  const user = await getUser();
  cachedUser = user;
  cacheTimestamp = now;
  
  return user;
};

/**
 * Clear user cache
 */
export const clearUserCache = (): void => {
  cachedUser = null;
  cacheTimestamp = 0;
};

