import type { Document, SearchResponse } from "@/types";

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Документ 1",
    content: "Это первый тестовый документ с длинным содержимым для проверки отображения в интерфейсе. Здесь может быть любой текст, который пользователь хочет просмотреть.",
    imageUrl: "https://picsum.photos/400/300?random=1",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Документ 2",
    content: "Второй документ без изображения. Этот документ демонстрирует, как выглядит документ без прикрепленного изображения.",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z"
  },
  {
    id: "3",
    title: "Документ 3",
    content: "Третий документ с изображением. Этот документ имеет прикрепленное изображение и может быть удален пользователем.",
    imageUrl: "https://picsum.photos/400/300?random=3",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z"
  }
];

export const mockApi = {
  search: async (query: string): Promise<SearchResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filteredDocs = mockDocuments.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.content.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      documents: filteredDocs,
      total: filteredDocs.length,
      page: 1,
      limit: 10
    };
  },
  
  getById: async (id: string): Promise<Document | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockDocuments.find(doc => doc.id === id) || null;
  },
  
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockDocuments.findIndex(doc => doc.id === id);
    if (index !== -1) {
      mockDocuments.splice(index, 1);
      return true;
    }
    return false;
  }
};
