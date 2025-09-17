export interface Document {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface SearchResponse {
  documents: Document[];
  total: number;
  page: number;
  limit: number;
}
