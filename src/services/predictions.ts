import api from '../libs/api';
import { CyclePrediction } from '../types/api';

export const getCyclePredictions = async (): Promise<CyclePrediction[]> => {
  const res = await api.get<{ data: CyclePrediction[] }>('/cycle-predictions');
  return res.data.data;
};

export default getCyclePredictions;
