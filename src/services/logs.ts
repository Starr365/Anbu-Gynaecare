import api from '../libs/api';
import { LogDto, LogPayload } from '../types/api';

export const createCycleLog = async (payload: LogDto) => {
  const res = await api.post('/cycle-logs', payload);
  return res.data;
};

export const getCycleLogs = async (): Promise<LogPayload[]> => {
  const res = await api.get<{ data: LogPayload[] }>('/cycle-logs');
  return res.data.data;
};

export const getMonthlyLogs = async (): Promise<LogPayload[]> => {
  const res = await api.get<{ data: LogPayload[] }>('/cycle-logs/month');
  return res.data.data;
};

export default {
  createCycleLog,
  getCycleLogs,
  getMonthlyLogs,
};
