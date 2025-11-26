/**
 * Cycle logs service - Handles period logging and retrieval
 * Endpoints: POST /api/cycle-logs, GET /api/cycle-logs, GET /api/cycle-logs/month
 */

import api from '../libs/api';
import { LogDto, CycleLog, PaginatedResponse } from '../types/api';
import { getErrorMessage } from '../libs/error-handler';

/**
 * Create a new cycle log entry
 * Requires valid Bearer token
 * 
 * @param payload - LogDto containing:
 *   - period_flow: 'none' | 'light' | 'medium' | 'heavy'
 *   - feeling: User's mood/feeling
 *   - symptoms: Array of experienced symptoms
 * 
 * @returns Created log entry
 * @throws Error if validation fails or request fails
 */
export const createCycleLog = async (
  payload: LogDto
): Promise<CycleLog> => {
  try {
    // Validate required fields
    if (!payload.period_flow) {
      throw new Error('Period flow is required');
    }
    if (!payload.feeling) {
      throw new Error('Feeling/mood is required');
    }
    if (!Array.isArray(payload.symptoms)) {
      throw new Error('Symptoms must be an array');
    }

    const res = await api.post<{ data: CycleLog }>('/cycle-logs', payload);
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to create cycle log: ${message}`);
  }
};

/**
 * Fetch all cycle logs for the authenticated user
 * Requires valid Bearer token
 * 
 * @returns Array of all cycle logs
 * @throws Error if request fails
 */
export const getCycleLogs = async (): Promise<CycleLog[]> => {
  try {
    const res = await api.get<PaginatedResponse<CycleLog>>('/cycle-logs');
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to fetch cycle logs: ${message}`);
  }
};

/**
 * Fetch cycle logs for the current month
 * Requires valid Bearer token
 * 
 * @returns Array of logs for current month
 * @throws Error if request fails
 */
export const getMonthlyLogs = async (): Promise<CycleLog[]> => {
  try {
    const res = await api.get<PaginatedResponse<CycleLog>>('/cycle-logs/month');
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to fetch monthly logs: ${message}`);
  }
};

/**
 * Cache for logs to reduce API calls
 */
let logsCache: CycleLog[] = [];
let monthlyLogsCache: CycleLog[] = [];
let cacheTimestamp: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Get all logs with caching
 */
export const getCycleLogsWithCache = async (
  skipCache = false
): Promise<CycleLog[]> => {
  const now = Date.now();

  if (!skipCache && logsCache.length > 0 && now - cacheTimestamp < CACHE_DURATION) {
    return logsCache;
  }

  const logs = await getCycleLogs();
  logsCache = logs;
  cacheTimestamp = now;

  return logs;
};

/**
 * Get monthly logs with caching
 */
export const getMonthlyLogsWithCache = async (
  skipCache = false
): Promise<CycleLog[]> => {
  const now = Date.now();

  if (!skipCache && monthlyLogsCache.length > 0 && now - cacheTimestamp < CACHE_DURATION) {
    return monthlyLogsCache;
  }

  const logs = await getMonthlyLogs();
  monthlyLogsCache = logs;
  cacheTimestamp = now;

  return logs;
};

/**
 * Clear logs cache
 */
export const clearLogsCache = (): void => {
  logsCache = [];
  monthlyLogsCache = [];
  cacheTimestamp = 0;
};

/**
 * Validate period flow enum
 */
export const isValidPeriodFlow = (
  flow: string
): flow is 'none' | 'light' | 'medium' | 'heavy' => {
  return ['none', 'light', 'medium', 'heavy'].includes(flow);
};

/**
 * Validate feeling enum
 */
export const isValidFeeling = (
  feeling: string
): feeling is 'moody' | 'tired' | 'irritable' | 'stressed' | 'energetic' => {
  return ['moody', 'tired', 'irritable', 'stressed', 'energetic'].includes(
    feeling
  );
};

