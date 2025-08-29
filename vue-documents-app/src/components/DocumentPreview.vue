<template>
  <div class="document-preview">
    <div v-if="!selectedDocument" class="no-selection">
      <p>Выберите документ для просмотра</p>
    </div>
    
    <div v-else class="preview-content">
      <div class="preview-header">
        <h2 class="document-title">{{ selectedDocument.title }}</h2>
        <div class="document-actions">
          <button 
            @click="downloadCurrentDocument" 
            class="action-button download-button"
            :disabled="loading"
          >
            📥 Скачать
          </button>
          <button 
            @click="deleteCurrentDocument" 
            class="action-button delete-button"
            :disabled="!selectedDocumentHasImage || loading"
          >
            🗑️ Удалить
          </button>
        </div>
      </div>
      
      <div class="document-image" v-if="selectedDocument.imageUrl">
        <img :src="selectedDocument.imageUrl" :alt="selectedDocument.title" />
      </div>
      
      <div class="document-content">
        <h3>Содержание:</h3>
        <p>{{ selectedDocument.content }}</p>
      </div>
      
      <div class="document-meta">
        <p><strong>Создан:</strong> {{ formatDate(selectedDocument.createdAt) }}</p>
        <p><strong>Обновлен:</strong> {{ formatDate(selectedDocument.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDocumentsStore } from "@/stores/documents";
import { downloadDocument } from "@/utils/download";

const store = useDocumentsStore();
const { selectedDocument, loading, selectedDocumentHasImage } = store;

const downloadCurrentDocument = () => {
  if (selectedDocument.value) {
    downloadDocument(selectedDocument.value.title, selectedDocument.value.content);
  }
};

const deleteCurrentDocument = async () => {
  if (selectedDocument.value) {
    await store.deleteDocument(selectedDocument.value.id);
  }
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
</script>

<style scoped lang="scss">
.document-preview {
  flex: 1;
  padding-left: 1rem;
}

.no-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6b7280;
  font-family: "Montserrat", sans-serif;
}

.preview-content {
  height: 100%;
  overflow-y: auto;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.document-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  font-family: "Montserrat", sans-serif;
  flex: 1;
  margin-right: 1rem;
}

.document-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.download-button {
  background: #10b981;
  color: white;
  
  &:hover:not(:disabled) {
    background: #059669;
  }
}

.delete-button {
  background: #ef4444;
  color: white;
  
  &:hover:not(:disabled) {
    background: #dc2626;
  }
}

.document-image {
  margin-bottom: 1.5rem;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.document-content {
  margin-bottom: 1.5rem;
  
  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  color: #1f2937;
    font-family: "Montserrat", sans-serif;
  }
  
  p {
    margin: 0;
    line-height: 1.6;
    color: #374151;
    font-family: "Montserrat", sans-serif;
  }
}

.document-meta {
  p {
    margin: 0.5rem 0;
    font-size: 0.875rem;
    color: #6b7280;
    font-family: "Montserrat", sans-serif;
    
    strong {
      color: #374151;
    }
  }
}

@media (max-width: 768px) {
  .document-preview {
    padding-left: 0;
    padding-top: 1rem;
  }
  
  .preview-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .document-actions {
    width: 100%;
    justify-content: stretch;
  }
  
  .action-button {
    flex: 1;
  }
}
</style>
