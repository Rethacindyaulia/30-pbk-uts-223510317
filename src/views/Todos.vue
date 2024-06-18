<template>
  <div class="activity-container">
    <h1>ToDo List Tujuan Wisata</h1>
    <input type="text" v-model="newActivity.name" placeholder="Tambahkan kegiatan baru">
    <button @click="addActivity">Tambah</button>

    <table>
      <thead>
        <tr>
          <th>Tujuan</th>
          <th>Status</th>
          <th>Pengaturan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, index) in filteredActivities" :key="index">
          <td>{{ activity.name }}</td>
          <td>
            <input type="checkbox" v-model="activity.done">
          </td>
          <td>
            <button @click="toggleEditMode(activity)">{{ activity.editMode ? 'Batal' : 'Edit' }}</button>
            <button v-if="activity.editMode" @click="updateActivity(activity)">Simpan</button>
            <button @click="removeActivity(index)">Hapus</button>
          </td>
        </tr>
      </tbody>
      <div class="text-start mt-3">
        <button
          class="btn btn-soft-purple btn-sm me-1"
          :class="{ 'btn-primary': filter === null }"
          @click="filterAll"
        >
          Semua
        </button>
        <button
          class="btn btn-soft-purple btn-sm me-1"
          :class="{ 'btn-primary': filter === 'undone' }"
          @click="filterUndone"
        >
          Belum Selesai
        </button>
        <button
          class="btn btn-soft-purple btn-sm"
          :class="{ 'btn-primary': filter === 'done' }"
          @click="filterDone"
        >
          Sudah Selesai
        </button>
      </div>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TodosView',
  data() {
    return {
      newActivity: {
        name: '',
        done: false
      },
      activities: [],
      filter: null
    };
  },
  methods: {
    addActivity() {
      if (this.newActivity.name.trim() !== '') {
        this.activities.push({
          name: this.newActivity.name,
          done: false,
          editMode: false
        });
        this.newActivity.name = '';
      }
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleEditMode(activity) {
      activity.editMode = !activity.editMode;
    },
    updateActivity(activity) {
      activity.editMode = false;
    },
    toggleDone(activity) {
      activity.done = !activity.done;
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
  filteredActivities() {
    if (this.filter === null) {
      return this.activities;
    } else if (this.filter === 'undone') {
      return this.activities.filter(activity => !activity.done);
    } else if (this.filter === 'done') {
      return this.activities.filter(activity => activity.done);
    }
    return this.activities;
  }
}
};
</script>

<style scoped>
.activity-container {
  background-color: #e5e5f7;
  border: 2px solid #8a2be2;
  border-radius: 10px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
}

h1 {
  color: #4b0082;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
}

input[type="text"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #8a2be2;
  border-radius: 5px;
}

button {
  background-color: #8a2be2;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 5px;
}

button:hover {
  background-color: #4b0082;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #8a2be2; 
  padding: 10px;
  text-align: center;
}

th {
  background-color: #4b0082;
  color: white;
}

.completed {
  text-decoration: line-through;
  color: #ff4500;
}

.btn {
  background-color: #8a2be2;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.btn:hover {
  background-color: #4b0082;
}

.btn-primary {
  background-color: #4b0082;
}
</style>
