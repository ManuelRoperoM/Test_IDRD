<template>
    <v-navigation-drawer
      :model-value="isOpen"
      @update:model-value="updateIsOpen"
      app
      temporary
    >
      <v-list>
          <v-list-item to="/materials" title="Gestion Materiales" prepend-icon="mdi-tools" />
          <v-list-item to="/proyects" title="Gestion Proyectos" prepend-icon="mdi-lightbulb" />
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'

  const props = defineProps({
    isOpen: Boolean
  })
  
  const emit = defineEmits(['update:isOpen'])
  
  function updateIsOpen(value) {
    emit('update:isOpen', value)
  }
  </script>
  