import api from "../libs/api";
import { User } from "../types/api";

export const getUser = async (): Promise<User> => {
  const res = await api.get<{ data: User }>("/users/me");
  return res.data.data;
};
