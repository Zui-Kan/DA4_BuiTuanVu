import { apiClient } from "../constant/api";

export const getList = async (data: any): Promise<any> => {
  const res = await apiClient?.post(`/auth/login`, data);
  return res?.data;
};
