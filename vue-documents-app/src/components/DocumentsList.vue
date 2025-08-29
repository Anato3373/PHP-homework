<template>
  <div class="documents-list">
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка документов...</p>
    </div>
    
    <div v-else-if="!hasDocuments" class="no-documents">
      <p>Документы не найдены</p>
    </div>
    
    <div v-else class="list-container">
      <div
        v-for="document in documents"
        :key="document.id"
        class="document-item"
        :class="{ active: selectedDocument?.id === document.id }"
        @click="selectDocument(document)"
      >
        <div class="document-info">
          <h3 class="document-title">{{ document.title }}</h3>
          <p class="document-content">{{ truncateContent(document.content) }}</p>
          <div class="document-meta">
            <span class="date">{{ formatDate(document.createdAt) }}</span>
            <span v-if="document.imageUrl" class="has-image">📷</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDocumentsStore } from "@/stores/documents";
import type { Document } from "@/types";

const store = useDocumentsStore();
const { documents, selectedDocument, loading, hasDocuments } = store;

const selectDocument = (document: Document) => {
  store.selectDocument(document);
};

const truncateContent = (content: string): string => {
  return content.length > 100 ? content.substring(0, 100) + "..." : content;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("ru-RU");
};
</script>

<style scoped lang="scss">
.documents-list {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  border-right: 1px solid #e5e7eb;
  padding-right: 1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-documents {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.list-container {
  max-height: 70vh;
  overflow-y: auto;
}

.document-item {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  }
  
  &.active {
    border-color: #3b82f6;
    background: #eff6ff;
  }
}

.document-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  font-family: "Montserrat", sans-serif;
}

.document-content {
  margin: 0 0 0.75rem 0;
  color: #6b7280;
  line-height: 1.5;
  font-family: "Montserrat", sans-serif;
}

.document-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #9ca3af;
}

.date {
  font-family: "Montserrat", sans-serif;
}

.has-image {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .documents-list {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding-right: 0;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    max-width: none;
  }
  
  .list-container {
    max-height: 40vh;
  }
}
</style>
