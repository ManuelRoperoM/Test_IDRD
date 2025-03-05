<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn color="primary" @click="handleClick">
          ¡Hola Vuetify!
        </v-btn>
        <v-alert type="success" class="mt-4">
          Vuetify está funcionando correctamente 🎯
        </v-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { VApp, VMain, VContainer } from 'vuetify/components'
function handleClick() {
  console.log('¡Botón de Vuetify funcionando!')
}
</script>

<style scoped>

</style>
