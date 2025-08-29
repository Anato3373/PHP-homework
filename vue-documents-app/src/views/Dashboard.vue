<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1 class="dashboard-title">Dashboard</h1>
      <DocumentSearch />
    </header>
    
    <main class="dashboard-content">
      <DocumentsList />
      <DocumentPreview />
    </main>
  </div>
</template>

<script setup lang="ts">
import DocumentSearch from "@/components/DocumentSearch.vue";
import DocumentsList from "@/components/DocumentsList.vue";
import DocumentPreview from "@/components/DocumentPreview.vue";
</script>

<style scoped lang="scss">
.dashboard {
  min-height: 100vh;
  background: #f9fafb;
  font-family: "Montserrat", sans-serif;
}

.dashboard-header {
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  margin: 0 0 1.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
}

.dashboard-content {
  display: flex;
  padding: 2rem;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 1rem;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .dashboard-content {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
}
</style>
