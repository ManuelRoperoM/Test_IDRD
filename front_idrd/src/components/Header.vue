<template>
  <v-app-bar color="primary" dark>
    <v-app-bar-nav-icon @click="toggleSideBar" />
    <v-toolbar-title>Proyects Manager</v-toolbar-title>
    <v-spacer />
  </v-app-bar>
</template>

<script setup>
const emit = defineEmits(['toggle-sideBar'])
function toggleSideBar() {
    console.log('CLick en el boton sidebar');
    emit('toggle-sideBar')
}
</script>