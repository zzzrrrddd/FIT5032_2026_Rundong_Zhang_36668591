<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div>
    <header>
      <BHeader />
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
/* Global styles for consistent look across all pages */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
}

.container {
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>
