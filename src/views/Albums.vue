<template>
  <div class="albums">
    <div class="album-table">
      <div class="album-header">
        <span>Judul Album</span>
      </div>
      <div v-for="album in albums" :key="album.id" class="album-row">
        <router-link :to="'/albums/' + album.id">{{ album.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useAlbumsStore } from '../store/album';

export default defineComponent({
  name: 'AlbumsView',
  setup() {
    const albums = ref([]);
    const albumsStore = useAlbumsStore();

    onMounted(async () => {
      await albumsStore.fetchAlbums();
      albums.value = albumsStore.albums;
    });

    return {
      albums,
    };
  },
});
</script>

<style scoped>
.albums {
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #e5e5f7;
  border: 2px solid #8a2be2;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  margin-bottom: 20px;
}

.album-table {
  width: 100%;
  border-collapse: collapse;
}

.album-header {
  background-color: #4b0082;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-bottom: 2px solid #8a2be2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.album-row {
  background-color: #ffffff;
  color: #4b0082;
  padding: 10px;
  border-bottom: 1px solid #8a2be2;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.album-row a {
  text-decoration: none;
  color: #4b0082;
  font-size: 1.1rem;
}

.album-row:hover {
  background-color: #8a2be2;
  transform: translateY(-2px);
}

</style>
