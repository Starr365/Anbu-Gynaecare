/**
 * Cycle management service - Handles user cycle settings
 * Endpoint: POST /api/user-cycles
 */

import api from '../libs/api';
import { SetUserCycleDto, ApiResponse } from '../types/api';
import { getErrorMessage } from '../libs/error-handler';

/**
 * Set or update user's cycle settings
 * This endpoint requires all fields as per OpenAPI spec
 * Requires valid Bearer token
 * 
 * @param payload - Complete cycle settings including:
 *   - cycle_length: 21-45 days
 *   - period_length: 3-8 days
 *   - last_period_start: ISO date (YYYY-MM-DD)
 *   - flow_description: 'light' | 'medium' | 'heavy' | 'variable'
 *   - symptoms: Array of symptom strings
 *   - irregularities: Array of irregularity descriptions
 *   - conditions: Array of medical conditions
 *   - goal: Fertility/health tracking goal
 *   - stress, sleep_quality, exercise, diet: Lifestyle factors
 * 
 * @returns Success response from server
 * @throws Error with descriptive message
 */
export const setUserCycle = async (
  payload: SetUserCycleDto
): Promise<ApiResponse<string>> => {
  try {
    // Validate required fields
    const requiredFields = [
      'cycle_length',
      'period_length',
      'last_period_start',
      'flow_description',
      'symptoms',
      'irregularities',
      'conditions',
      'goal',
      'stress',
      'sleep_quality',
      'exercise',
      'diet',
    ];

    for (const field of requiredFields) {
      if (!(field in payload)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const res = await api.post<ApiResponse<string>>('/user-cycles', payload);
    return res.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to set cycle settings: ${message}`);
  }
};

/**
 * Validate cycle length (21-45 days)
 */
export const isValidCycleLength = (length: number): boolean => {
  return length >= 21 && length <= 45;
};

/**
 * Validate period length (3-8 days)
 */
export const isValidPeriodLength = (length: number): boolean => {
  return length >= 3 && length <= 8;
};

/**
 * Validate date is not in the future
 */
export const isValidPastDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date <= new Date();
};

