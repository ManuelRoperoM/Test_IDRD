<template>
    <v-container class="container-materials">
      <h2>Gestión de Materiales</h2>
      <div class="addMaterials">
        <v-btn color="success" @click="showModal = true" size="x-large" variant="outlined">
          <v-icon>mdi-link-plus</v-icon> Add Material
        </v-btn>
      </div>
      <AddMaterialForm
      :showModal="showModal"
      @close="showModal = false"
      @save="handleSaveMaterial"
     />
     <UpdateMaterialForm 
     :showModal="showUpdateModal"
     :material="materialToEdit"
     @close="closeUpdateModal(materialToEdit)"
     @update="handleUpdateMaterial"
     />
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
                <v-btn :loading="loadingUpdate[material.id] || false" color="warning" @click="editarMaterial(material)" icon>
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
import AddMaterialForm from '@/components/AddMaterialForm.vue'
import UpdateMaterialForm from '@/components/UpdateMaterialForm.vue'
const materials = ref([])
const loadingDelete = ref({})
const loadingUpdate = ref({})
const loadingView = ref({})

const showModal = ref(false)
const showUpdateModal = ref(false)
const materialToEdit = ref(null)

const BACKEND_ENDPOINT = 'http://localhost:3000/'

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

async function editarMaterial(material) {
    materialToEdit.value = material
    loadingUpdate.value = { ...loadingUpdate.value, [material.id]: true }
    showUpdateModal.value = true
    console.log(material,showUpdateModal.value );
    
}

async function verDetalle(id) {
    loadingView.value = { ...loadingView.value, [id]: true }
  // Simula una operación asíncrona
  setTimeout(() => {
    console.log('Material eliminado con ID:', id)
    loadingView.value = { ...loadingView.value, [id]: false }
  }, 1000)
}

async function eliminarMaterial(id) {
    loadingDelete.value = { ...loadingDelete.value, [id]: true }
  // Simula una operación asíncrona
  setTimeout(() => {
    console.log('Material eliminado con ID:', id)
    loadingDelete.value = { ...loadingDelete.value, [id]: false }
  }, 1000)
}

async function handleSaveMaterial(material) {
  try {
    const response = await fetch(BACKEND_ENDPOINT+'materiales/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(material)
  })
  if (!response.ok) throw new Error('Error al guardar el material')
  const savedMaterial = await response.json()
    await fetchMaterials()
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

async function handleUpdateMaterial(material) {
    try {
        console.log(material);

        const response = await fetch(BACKEND_ENDPOINT+`materiales/${material.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(material)
        })
        
        if (!response.ok) throw new Error('Error al guardar el material')
        const updateMaterial = await response.json()
        await fetchMaterials()
    } catch (error) {
        console.error(error.message)
    } finally {
        showUpdateModal.value = false
        loadingUpdate.value = { ...loadingUpdate.value, [material.id]: false }
    }
}
</script>

<style scoped>
 .container-materials{
    width: 90%;
 }
 .container-materials h2{
    font-size: 3rem;
    margin-bottom: 15px;
 }
 .container-materials .addMaterials{
    margin-bottom: 35px!important;
 }
</style>