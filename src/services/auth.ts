import api from "../libs/api";
import { AuthResponse, RegisterPayload, LoginPayload } from "../types/api";

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/register", payload);
  const token = res.data.data.accessToken;
  localStorage.setItem("accessToken", token);
  return res.data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", payload);
  const token = res.data.data.accessToken;
  localStorage.setItem("accessToken", token);
  return res.data;
};
