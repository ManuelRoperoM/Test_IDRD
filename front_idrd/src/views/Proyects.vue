<template>
    <v-container class="container-proyects">
      <h2>Gestión de Proyectos</h2>
      <div class="addProyects">
        <v-btn color="success" @click="showModal = true" size="x-large" variant="outlined">
          <v-icon>mdi-link-plus</v-icon> Add Proyecto
        </v-btn>
      </div>
      <AddProyectForm
      :showModal="showModal"
      @close="showModal = false"
      @save="handleSaveProyect"
     />
     <UpdateProyectForm 
     :showModal="showUpdateModal"
     :proyect="proyectToEdit"
     @close="closeUpdateModal(proyectToEdit)"
     @update="handleUpdateProyect"
     />
        <v-row class="gap-5">
            <v-col
              v-for="proyect in proyects"
              :key="proyect.id"
              cols="12"
              sm="6"
              md="4"
              >
              <v-card
                class="mx-auto"
                width="200"
                hover
              >
              <v-card-item>
                  <v-card-title>
                    {{proyect.nombre}}
                  </v-card-title>
                  <v-card-subtitle>
                    <v-icon>mdi-map-marker</v-icon> {{ proyect.ciudad.nombre }} , {{ proyect.ciudad.departamento.nombre }}
                  </v-card-subtitle>
              </v-card-item>
              <v-card-text>
                total: $ {{ calcularCostoTotal(proyect.materiales) }}
              </v-card-text>
              <v-card-actions class="mx-auto">
                <v-btn :loading="loadingView[proyect.id] || false" color="primary" @click="verDetalle(proyect.id)" icon>
                    <v-icon>mdi-file-eye-outline</v-icon>
                </v-btn>
                <v-btn :loading="loadingUpdate[proyect.id] || false" color="warning" @click="editarProyect(proyect)" icon>
                    <v-icon>mdi-tag-edit-outline</v-icon>
                </v-btn>
                <v-btn :loading="loadingDelete[proyect.id] || false" color="error" @click="eliminarMaterial(proyect.id)" icon>
                    <v-icon>mdi-delete-empty-outline</v-icon>
                </v-btn>
              </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddProyectForm from '@/components/AddProyectForm.vue'
import UpdateProyectForm from '@/components/UpdateProyectForm.vue'
const proyects = ref([])
const loadingDelete = ref({})
const loadingUpdate = ref({})
const loadingView = ref({})

const showModal = ref(false)
const showUpdateModal = ref(false)
const proyectToEdit = ref(null)

const BACKEND_ENDPOINT = 'http://localhost:3000/'

async function fetchProyects() {
    try {      
        const response = await fetch(BACKEND_ENDPOINT+'proyectos')
        if(!response.ok) throw new Error('Error al obtener los materiales')
        const { data } = await response.json()
        proyects.value = Array.isArray(data) ? data : []
        console.log("Los proyectos son", proyects);
    } catch (error) {
        console.error(error.message)
    }
}
onMounted(fetchProyects)

async function editarProyect(proyect) {
    proyectToEdit.value = proyect
    console.log("Proyect to edit: ", proyect);
    
    loadingUpdate.value = { ...loadingUpdate.value, [proyect.id]: true }
    showUpdateModal.value = true
    console.log(proyect,showUpdateModal.value );
    
}

async function verDetalle(id) {
    loadingView.value = { ...loadingView.value, [id]: true }
  setTimeout(() => {
    console.log('Material eliminado con ID:', id)
    loadingView.value = { ...loadingView.value, [id]: false }
  }, 1000)
}

async function eliminarMaterial(id) {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este material?')
    if (!confirmar) return
    loadingDelete.value = { ...loadingDelete.value, [id]: true }
    try {
        const response = await fetch(BACKEND_ENDPOINT+`materiales/${id}`, {
            method: 'DELETE',
        })
        if (!response.ok) throw new Error('Error al eliminar el material')
        await fetchProyects()
    } catch (error) {
        console.error('Error al eliminar el material:', error.message)
    } finally {
        loadingDelete.value = { ...loadingDelete.value, [id]: false }
    }
}

async function handleSaveProyect(proyect) {
  try {
    console.log(proyect);
    const response = await fetch(BACKEND_ENDPOINT+'proyectos/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(proyect)
  })
  if (!response.ok) throw new Error('Error al guardar el material')
  const savedProyect = await response.json()
    await fetchProyects()
  } catch (error) {
    console.error(error.message)
  } finally {
    showModal.value = false
  }
}

function closeUpdateModal(material) {
    showUpdateModal.value = false
    // @close="showUpdateModal = false"
    loadingUpdate.value = { ...loadingUpdate.value, [material.id]: false }
}

async function handleUpdateProyect(proyect) {
    try {
        console.log(proyect);
        const response = await fetch(BACKEND_ENDPOINT+`proyectos/${proyect.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proyect)
        })
        
        if (!response.ok) throw new Error('Error al guardar el material')
        const updateMaterial = await response.json()
        await fetchProyects()
    } catch (error) {
        console.error(error.message)
    } finally {
        showUpdateModal.value = false
        loadingUpdate.value = { ...loadingUpdate.value, [proyect.id]: false }
    }
}

function calcularCostoTotal(materials) {
    let costo = 0
    materials.forEach(material => {
        costo += material.precio
    });
    return costo
}
</script>

<style scoped>
 .container-proyects{
    width: 90%;
 }
 .container-proyects h2{
    font-size: 3rem;
    margin-bottom: 15px;
 }
 .container-proyects .addProyects{
    margin-bottom: 35px!important;
 }
</style>