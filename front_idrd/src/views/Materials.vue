<template>
    <v-container class="container-materials">
      <h2>Materiales</h2>
        <v-row class="gap-5">
            <v-col
              v-for="material in materials"
              :key="material.id"
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
                    {{material.description}}
                  </v-card-title>
                  <v-card-subtitle>
                    Cop: $ {{ material.precio }}
                  </v-card-subtitle>
              </v-card-item>
              <v-card-text>
                La unidad de este material es: {{ material.unidad }}
              </v-card-text>
              <v-card-actions class="mx-auto">
                <v-btn :loading="loadingView[material.id] || false" color="primary" @click="verDetalle(material.id)" icon>
                    <v-icon>mdi-file-eye-outline</v-icon>
                </v-btn>
                <v-btn :loading="loadingUpdate[material.id] || false" color="warning" @click="editarMaterial(material.id)" icon>
                    <v-icon>mdi-tag-edit-outline</v-icon>
                </v-btn>
                <v-btn :loading="loadingDelete[material.id] || false" color="error" @click="eliminarMaterial(material.id)" icon>
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

const materials = ref([])
const loadingDelete = ref({})
const loadingUpdate = ref({})
const loadingView = ref({})

async function fetchMaterials() {
    try {
        const response = await fetch('http://localhost:3000/materiales')
        if(!response.ok) throw new Error('Error al obtener los materiales')
        const { data } = await response.json()
        materials.value = Array.isArray(data) ? data : []
        console.log("Los materiales son", materials);
    } catch (error) {
        console.error(error.message)
    }
}
onMounted(fetchMaterials)

async function eliminarMaterial(id) {
    loadingDelete.value = { ...loadingDelete.value, [id]: true }
  // Simula una operación asíncrona
  setTimeout(() => {
    console.log('Material eliminado con ID:', id)
    loadingDelete.value = { ...loadingDelete.value, [id]: false }
  }, 1000)
}

async function verDetalle(id) {
    loadingView.value = { ...loadingView.value, [id]: true }
  // Simula una operación asíncrona
  setTimeout(() => {
    console.log('Material eliminado con ID:', id)
    loadingView.value = { ...loadingView.value, [id]: false }
  }, 1000)
}

async function editarMaterial(id) {
    loadingUpdate.value = { ...loadingUpdate.value, [id]: true }
  // Simula una operación asíncrona
  setTimeout(() => {
    console.log('Material eliminado con ID:', id)
    loadingUpdate.value = { ...loadingUpdate.value, [id]: false }
  }, 1000)
}
</script>

<style scoped>
 .container-materials{
    width: 90%;
 }
</style>