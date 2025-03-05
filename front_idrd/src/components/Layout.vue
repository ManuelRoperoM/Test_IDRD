<template>
    <v-app>
        <Header @toggle-sideBar="toggleSidebar" />
        <Sidebar :isOpen="isSidebarOpen" @update:isOpen="toggleSidebar" />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
    console.log('Evento recibido en el layout');
    isSidebarOpen.value = !isSidebarOpen.value
}
</script>
