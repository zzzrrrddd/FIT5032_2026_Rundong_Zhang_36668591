<template>
  <div class="mt-4">
    <!-- Query 1: ISBN > 1000 -->
    <h3>Books with ISBN > 1000</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.isbn }}</td>
          <td>
            <input
              v-if="editingId === book.id"
              v-model="editName"
              class="form-control form-control-sm"
            />
            <span v-else>{{ book.name }}</span>
          </td>
          <td>
            <template v-if="editingId === book.id">
              <button class="btn btn-success btn-sm me-1" @click="updateBook(book.id)">Save</button>
              <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
            </template>
            <template v-else>
              <button class="btn btn-warning btn-sm me-1" @click="startEdit(book)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteBook(book.id)">Delete</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Query 2: orderBy isbn ascending, limit 3 -->
    <h3>Top 3 Books (Ordered by ISBN Ascending)</h3>
    <ul class="list-group">
      <li v-for="book in topBooks" :key="book.id" class="list-group-item">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>

    <!-- Query 3: where isbn > 5000, orderBy desc, limit 2 -->
    <h3>Latest 2 Expensive Books (ISBN > 5000, Descending)</h3>
    <ul class="list-group">
      <li v-for="book in expensiveBooks" :key="book.id" class="list-group-item">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const topBooks = ref([])
    const expensiveBooks = ref([])
    const editingId = ref(null)
    const editName = ref('')

    // Query 1: ISBN > 1000
    const fetchBooks = async () => {
      const q = query(collection(db, 'books'), where('isbn', '>', 1000))
      const snapshot = await getDocs(q)
      books.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    }

    // Query 2: orderBy isbn asc, limit 3
    const fetchTopBooks = async () => {
      const q = query(collection(db, 'books'), orderBy('isbn', 'asc'), limit(3))
      const snapshot = await getDocs(q)
      topBooks.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    }

    // Query 3: where isbn > 5000, orderBy desc, limit 2
    const fetchExpensiveBooks = async () => {
      const q = query(
        collection(db, 'books'),
        where('isbn', '>', 5000),
        orderBy('isbn', 'desc'),
        limit(2)
      )
      const snapshot = await getDocs(q)
      expensiveBooks.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    }

    // Update
    const startEdit = (book) => {
      editingId.value = book.id
      editName.value = book.name
    }

    const cancelEdit = () => {
      editingId.value = null
      editName.value = ''
    }

    const updateBook = async (id) => {
      const bookRef = doc(db, 'books', id)
      await updateDoc(bookRef, { name: editName.value })
      editingId.value = null
      editName.value = ''
      fetchBooks()
    }

    // Delete
    const deleteBook = async (id) => {
      const bookRef = doc(db, 'books', id)
      await deleteDoc(bookRef)
      fetchBooks()
    }

    onMounted(() => {
      fetchBooks()
      fetchTopBooks()
      fetchExpensiveBooks()
    })

    return {
      books,
      topBooks,
      expensiveBooks,
      editingId,
      editName,
      startEdit,
      cancelEdit,
      updateBook,
      deleteBook
    }
  }
}
</script>
