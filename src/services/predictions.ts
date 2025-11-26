/**
 * Cycle predictions service - Handles cycle prediction data
 * Endpoint: GET /api/cycle-predictions
 */

import api from '../libs/api';
import { CyclePrediction, PaginatedResponse } from '../types/api';
import { getErrorMessage } from '../libs/error-handler';

/**
 * Fetch the most recent cycle prediction for authenticated user
 * Requires valid Bearer token
 * 
 * @returns Recent cycle prediction with predicted date and confidence
 * @throws Error if request fails or user not authenticated
 */
export const getCyclePredictions = async (): Promise<CyclePrediction[]> => {
  try {
    const res = await api.get<PaginatedResponse<CyclePrediction>>(
      '/cycle-predictions'
    );
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to fetch cycle predictions: ${message}`);
  }
};

/**
 * Get the latest prediction (convenience wrapper)
 */
export const getLatestPrediction = async (): Promise<CyclePrediction | null> => {
  try {
    const predictions = await getCyclePredictions();
    return predictions.length > 0 ? predictions[0] : null;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to fetch latest prediction: ${message}`);
  }
};

/**
 * Cache for predictions
 */
let predictionsCache: CyclePrediction[] = [];
let cacheTimestamp: number = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get predictions with caching
 * Predictions don't change frequently, so longer cache is appropriate
 */
export const getCyclePredictionsWithCache = async (
  skipCache = false
): Promise<CyclePrediction[]> => {
  const now = Date.now();

  if (
    !skipCache &&
    predictionsCache.length > 0 &&
    now - cacheTimestamp < CACHE_DURATION
  ) {
    return predictionsCache;
  }

  const predictions = await getCyclePredictions();
  predictionsCache = predictions;
  cacheTimestamp = now;

  return predictions;
};

/**
 * Clear predictions cache (useful after updating cycle settings)
 */
export const clearPredictionsCache = (): void => {
  predictionsCache = [];
  cacheTimestamp = 0;
};

/**
 * Format prediction date for display
 */
export const formatPredictionDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

/**
 * Calculate days until predicted date
 */
export const daysUntilPrediction = (dateString: string): number => {
  try {
    const predictedDate = new Date(dateString);
    const today = new Date();
    const diffTime = predictedDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return -1;
  }
};

