<template>
  <div class="document-search">
    <div class="search-container">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Поиск документов..."
        class="search-input"
        @input="handleSearch"
        @keyup.enter="performSearch"
      />
      <button 
        @click="performSearch" 
        class="search-button"
        :disabled="loading"
      >
        <span v-if="loading" class="spinner"></span>
        <span v-else>Поиск</span>
      </button>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useDocumentsStore } from "@/stores/documents";
import { debounce } from "@/utils/debounce";

const store = useDocumentsStore();
const searchInput = ref("");

const { loading, error } = store;

const handleSearch = debounce(() => {
  store.setSearchQuery(searchInput.value);
}, 300);

const performSearch = async () => {
  if (searchInput.value.trim()) {
    await store.searchDocuments({
      query: searchInput.value.trim(),
      page: 1,
      limit: 10
    });
  }
};

watch(searchInput, (newValue) => {
  if (!newValue.trim()) {
    store.resetState();
  }
});
</script>

<style scoped lang="scss">
.document-search {
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  gap: 1rem;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
}

.search-button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 100px;
  
  &:hover:not(:disabled) {
    background: #2563eb;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-family: "Montserrat", sans-serif;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .search-button {
    min-width: auto;
  }
}
</style>
