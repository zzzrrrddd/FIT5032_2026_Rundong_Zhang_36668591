<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">📚 GetAllBook API</h1>

        <div v-if="loading" class="text-center">
          <p>Loading...</p>
        </div>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <div v-if="apiResponse" class="api-response">
          <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const getAllBooks = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('src/assets/json/authors.json')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    authors.value = data

    // Flatten all books from all authors
    const allBooks = authors.value.flatMap((author) =>
      author.famousWorks.map((book) => ({
        author: author.name,
        book: book
      }))
    )

    apiResponse.value = {
      success: true,
      data: allBooks,
      totalBooks: allBooks.length,
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = `Error loading books data: ${err.message}`
    console.error('Error loading books data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getAllBooks()
})

defineExpose({
  getAllBooks
})
</script>

<style scoped>
.api-response {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  font-size: 14px;
}
</style>
