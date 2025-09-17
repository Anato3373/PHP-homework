import axios from "axios";
import type { ApiResponse, SearchResponse, SearchParams, Document } from "@/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const documentsApi = {
  search: async (params: SearchParams): Promise<ApiResponse<SearchResponse>> => {
    const response = await api.get("/documents/search", { params });
    return response.data;
  },
  
  getById: async (id: string): Promise<ApiResponse<Document>> => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },
  
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },
};

export default api;
