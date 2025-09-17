import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Document, SearchParams } from "@/types";
import { mockApi } from "@/mocks/api";

export const useDocumentsStore = defineStore("documents", () => {
  const documents = ref<Document[]>([]);
  const selectedDocument = ref<Document | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref("");
  const totalDocuments = ref(0);
  const currentPage = ref(1);
  const documentsPerPage = ref(10);

  const hasDocuments = computed(() => documents.value.length > 0);
  const selectedDocumentHasImage = computed(() => 
    selectedDocument.value?.imageUrl && selectedDocument.value.imageUrl.length > 0
  );

  const searchDocuments = async (params: SearchParams) => {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await mockApi.search(params.query);
      
      documents.value = response.documents;
      totalDocuments.value = response.total;
      currentPage.value = response.page;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Произошла ошибка при поиске документов";
    } finally {
      loading.value = false;
    }
  };

  const selectDocument = (document: Document) => {
    selectedDocument.value = document;
  };

  const clearSelection = () => {
    selectedDocument.value = null;
  };

  const deleteDocument = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;
      
      const success = await mockApi.delete(id);
      
      if (success) {
        documents.value = documents.value.filter(doc => doc.id !== id);
        if (selectedDocument.value?.id === id) {
          selectedDocument.value = null;
        }
      } else {
        error.value = "Не удалось удалить документ";
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Произошла ошибка при удалении документа";
    } finally {
      loading.value = false;
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const resetState = () => {
    documents.value = [];
    selectedDocument.value = null;
    error.value = null;
    searchQuery.value = "";
    totalDocuments.value = 0;
    currentPage.value = 1;
  };

  return {
    documents,
    selectedDocument,
    loading,
    error,
    searchQuery,
    totalDocuments,
    currentPage,
    documentsPerPage,
    hasDocuments,
    selectedDocumentHasImage,
    searchDocuments,
    selectDocument,
    clearSelection,
    deleteDocument,
    setSearchQuery,
    resetState,
  };
});
