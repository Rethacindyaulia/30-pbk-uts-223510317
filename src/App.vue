<template>
  <ToDoList />
</template>

<script>
import ToDoList from "@/components/ToDoList";

export default {
  name: 'App',

  components: {
    ToDoList
  }
}

</script>

<style>
body{
  background-image:url(./assets/ci.jpeg);
background: cover;
background-size: cover;
background-repeat: no-repeat;
}
</style>