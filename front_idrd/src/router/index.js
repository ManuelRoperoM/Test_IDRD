import { createRouter, createWebHistory } from 'vue-router'
import Materials from '@/views/Materials.vue'
import Proyects from '@/views/Proyects.vue'
const routes = [
    // { path: '/', name: 'Home', component: Home },
    { path: '/materials', name: 'Materiales', component: Materials },
    { path: '/proyects', name: 'Proyectos', component: Proyects },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router