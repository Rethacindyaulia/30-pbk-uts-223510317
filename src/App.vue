<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header">
      <q-toolbar>
        <div class="rout-nav">
          <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">
            <q-btn flat :outline="!isActive('/')" color="#ba68c8">Todos</q-btn>
          </router-link>
          <router-link to="/posts" class="nav-link" :class="{ active: isActive('/posts') }">
            <q-btn flat :outline="!isActive('/posts')" color="#ce93d8">Posts</q-btn>
          </router-link>
          <router-link to="/albums" class="nav-link" :class="{ active: isActive('/albums') }">
            <q-btn flat :outline="!isActive('/albums')" color="#e1bee7">Albums</q-btn>
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;
    return {
      isActive
    };
  }
};
</script>

<style scoped>

.header {
  background-color: #e5e5f7;
  padding: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
}

.rout-nav {
  display: flex;
  justify-content: center;
  color: #8a2be2;
}

.rout-nav .nav-link {
  text-decoration: none;
  margin: 0 10px;
}

.rout-nav q-btn {
  font-size: 16px;
}

.rout-nav q-btn[flat][outline] {
  border-color: #fff;
  color: #4b0082;
  font-size: 18px;
}

.active q-btn {
  color: #8a2be2;
}
</style>
