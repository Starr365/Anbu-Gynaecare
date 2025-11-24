import api from '../libs/api';
import { SetUserCycleDto } from '../types/api';

export const setUserCycle = async (payload: SetUserCycleDto) => {
  const res = await api.post('/user-cycles', payload);
  return res.data;
};

export default setUserCycle;
