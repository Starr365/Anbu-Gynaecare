/**
 * Domain-specific hooks for cycle tracking features
 * Combines services with hooks for easy component integration
 */

'use client';

import { useState, useCallback } from 'react';
import {
  getCycleLogsWithCache,
  getMonthlyLogsWithCache,
  createCycleLog,
  clearLogsCache,
} from '@/services/logs';
import {
  getLatestPrediction,
  clearPredictionsCache,
  daysUntilPrediction,
} from '@/services/predictions';
import { useFetch, useAsyncSubmit } from './useApi';
import type { CycleLog, LogDto, CyclePrediction } from '@/types/api';

/**
 * Hook for managing cycle logs
 */
export function useCycleLogs() {
  const [logs, setLogs] = useState<CycleLog[]>([]);
  const [monthlyLogs, setMonthlyLogs] = useState<CycleLog[]>([]);

  const { loading: logsLoading, error: logsError, retry: retryLogs } = useFetch(
    async () => {
      const data = await getCycleLogsWithCache();
      setLogs(data);
      return data;
    },
    { immediate: false }
  );

  const {
    loading: monthlyLoading,
    error: monthlyError,
    retry: retryMonthly,
  } = useFetch(
    async () => {
      const data = await getMonthlyLogsWithCache();
      setMonthlyLogs(data);
      return data;
    },
    { immediate: false }
  );

  const { loading: creating, error: createError, submit: submitLog } =
    useAsyncSubmit({
      onSuccess: () => {
        clearLogsCache();
        retryLogs();
      },
    });

  const createLog = useCallback(
    async (logData: LogDto) => {
      await submitLog(async () => {
        return await createCycleLog(logData);
      });
    },
    [submitLog]
  );

  const refreshLogs = useCallback(async () => {
    clearLogsCache();
    await retryLogs();
    await retryMonthly();
  }, [retryLogs, retryMonthly]);

  return {
    logs,
    monthlyLogs,
    logsLoading,
    monthlyLoading,
    creating,
    error: logsError || monthlyError || createError,
    createLog,
    retryLogs,
    retryMonthly,
    refreshLogs,
  };
}

/**
 * Hook for managing cycle predictions
 */
export function useCyclePredictions() {
  const [prediction, setPrediction] = useState<CyclePrediction | null>(null);
  const [daysUntil, setDaysUntil] = useState<number>(-1);

  const { loading, error, retry } = useFetch(
    async () => {
      const latestPrediction = await getLatestPrediction();
      setPrediction(latestPrediction);

      if (latestPrediction?.predictedDate) {
        const days = daysUntilPrediction(latestPrediction.predictedDate);
        setDaysUntil(days);
      }

      return latestPrediction;
    },
    { immediate: true }
  );

  const refreshPrediction = useCallback(async () => {
    clearPredictionsCache();
    await retry();
  }, [retry]);

  return {
    prediction,
    daysUntil,
    loading,
    error,
    retry,
    refreshPrediction,
  };
}

/**
 * Hook for managing cycle onboarding setup
 */
import { setUserCycle } from '@/services/cycles';
import type { SetUserCycleDto } from '@/types/api';

export function useCycleSetup() {
  const { loading, error, submit } = useAsyncSubmit({
    onSuccess: () => {
      clearPredictionsCache();
    },
  });

  const setupCycle = useCallback(
    async (cycleData: SetUserCycleDto) => {
      return await submit(async () => {
        return await setUserCycle(cycleData);
      });
    },
    [submit]
  );

  return {
    loading,
    error,
    setupCycle,
  };
}
