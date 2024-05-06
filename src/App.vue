<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <v-container>
    <Header/>

    <RouterView />
  </v-container>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}

body {
  background: #161A1E;
}
</style>
