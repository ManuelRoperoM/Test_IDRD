<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script setup>
import { VApp, VMain, VContainer } from 'vuetify/components'
import Layout from '@/components/Layout.vue'
function handleClick() {
  console.log('¡Botón de Vuetify funcionando!')
}
</script>
