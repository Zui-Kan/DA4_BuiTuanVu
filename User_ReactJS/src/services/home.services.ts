import { apiClient } from "../constant/api";

  export const getItems = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/Item/search`, data);  
    return res?.data.data;
  };

  