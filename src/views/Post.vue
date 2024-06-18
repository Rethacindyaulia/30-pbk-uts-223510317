<template>
  <div class="post-container">
    <h1>Data Postingan</h1>
    <div class="select-container">
      <select id="user-select" v-model="selectedUser" @change="fetchPosts">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>Judul</th>
          <th>Isi</th>
          <th>Pengaturan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td class="action-buttons">
            <button @click="editPost(post.id)">Edit</button>
            <button @click="deletePost(post.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PostView',
  data() {
    return {
      users: [],
      selectedUser: null,
      posts: []
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    async fetchPosts() {
      if (this.selectedUser) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
          this.posts = await response.json();
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        }
      }
    },
    async editPost(postId) {
      const newTitle = prompt("Enter new title:");
      const newBody = prompt("Enter new body:");
      if (newTitle && newBody) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: postId,
              title: newTitle,
              body: newBody,
              userId: this.selectedUser
            })
          });
          const updatedPost = await response.json();
          this.posts = this.posts.map(post => post.id === postId ? updatedPost : post);
        } catch (error) {
          console.error('Failed to edit post:', error);
        }
      }
    },
    async deletePost(postId) {
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE'
          });
          this.posts = this.posts.filter(post => post.id !== postId);
        } catch (error) {
          console.error('Failed to delete post:', error);
        }
      }
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.post-container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e5e5f7;
  border: 2px solid #8a2be2;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  margin-bottom: 20px;
}

h1 {
  color: #4b0082;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  justify-content: center;
  align-items: center;
}

.select-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  color: #4b0082;
  margin-right: 5px;
}

select {
  padding: 8px;
  border: 1px solid #8a2be2;
  border-radius: 5px;
  background-color: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 5px;
}

th, td {
  border: 1px solid #8a2be2; 
  padding: 12px;
  text-align: center;
}

th {
  background-color: #4b0082;
  color: white;
}

td {
  background-color: #ffffff;
  color: #4b0082;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  height: 130px;
}

button {
  padding: 8px 12px;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  background-color: #8a2be2;
  color: #e5e5f7;
}

button:hover {
  background-color: #4b0082;
  color: #ffffff;
}
</style>
