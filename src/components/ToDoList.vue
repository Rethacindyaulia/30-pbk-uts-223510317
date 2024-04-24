<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="card-header bg-primary text-white">
           
            <h1 class="text-center">To Do List Wisata Tujuan</h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="addTodo" class="mb-3">
              <div class="row align-items-center">
                <div class="col-9">
                  <input v-model="newTodo" type="text" class="form-control form-control-sm" placeholder="Tambahkan item baru">
                </div>
                <div class="col-3">
                  <button class="btn btn-primary btn-sm btn-block" type="submit">
                    <i class="bi bi-plus"></i> Tambah
                  </button>
                </div>
              </div>
            </form>
            <div class="table-responsive">
              <table class="table table-bordered table-striped">
                <thead class="bg-secondary text-white">
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(todo, index) in filteredTodos" :key="todo.title">
                    <td>{{ index + 1 }}</td>
                    <td :class="{ 'text-decoration-line-through': todo.done, 'done-item': todo.done }">{{ todo.title }}</td>
                    <td>
                      <button class="btn btn-link btn-sm" @click="toggleDone(todo)">
                        <i v-if="todo.done" class="bi bi-check-square-fill"></i>
                        <i v-else class="bi bi-square"></i>
                      </button>
                    </td>
                    <td>
                      <button class="btn btn-danger btn-sm" @click="removeTodo(todo)">
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-end mt-3">
              <button class="btn btn-primary btn-sm me-1" @click="filterAll">
                Tampilkan Semua
              </button>
              <button class="btn btn-primary btn-sm me-1" @click="filterUndone">
                Tampilkan yang Belum Selesai
              </button>
              <button class="btn btn-primary btn-sm" @click="filterDone">
                Tampilkan yang Sudah Selesai
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoList',

  data() {
    return {
      newTodo: '',
      todos: [],
      filter: null
    };
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({
          title: this.newTodo.trim(),
          done: false
        });
        this.newTodo = '';
      }
    },
    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
    toggleDone(todo) {
      todo.done = !todo.done;
    },
    filterAll() {
      this.filter = null;
    },
    filterUndone() {
      this.filter = 'undone';
    },
    filterDone() {
      this.filter = 'done';
    }
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'undone') {
        return this.todos.filter(todo => !todo.done);
      } else if (this.filter === 'done') {
        return this.todos.filter(todo => todo.done);
      } else {
        return this.todos;
      }
    }
  }
};
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}

.done-item {
  color: #808080; /* Warna abu-abu */
}
</style>
