<template>
    <v-dialog :model-value="showModal" @update:model-value="emits('close')" persistent max-width="600px">
      <v-card>
        <v-card-title>
          Añadir Nuevo Proyecto
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="newProyect.nombre"
                label="Nombre"
                required
              ></v-text-field>
              <v-select
              v-model="selectedDepartamento"
                :items="departamentos"
                :item-props="itemProps"
                label="Departamento"
                :return-object="false" 
                required
              ></v-select>
              <v-select
                v-model="newProyect.ciudadId"
                :items="ciudades"
                :item-props="itemPropsCiudad"
                label="Ciudad"
                required
              ></v-select>
              <h3>Seleccionar Materiales:</h3>
              <!-- <v-checkbox-group v-model="selectedMaterials" row> -->
                <v-checkbox
                  v-for="material in materiales"
                    :key="material.id"
                    :label="material.description"
                    :value="material.id"
                    :model-value="selectedMaterials"
                    @change="handleCheckboxChange(material.id)"
                ></v-checkbox>
                <!-- </v-checkbox-group> -->
            </v-form>
        </v-card-text>
        <p>Materiales seleccionados: {{ selectedMaterials }}</p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="cancelar">Cancelar</v-btn>
          <v-btn color="green" type="submit" @click="guardarProyect">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps, computed } from 'vue'
  
  const props = defineProps({
      showModal: Boolean,
  })
  
  const emits = defineEmits(['close', 'save', 'materials'])
  
  const newProyect = ref({
    nombre: '',
    ciudadId: '',
  })

  const departamentos = ref([])
  const ciudades = ref([])
  const BACKEND_ENDPOINT = 'http://localhost:3000/'


  const selectedDepartamento = ref(null)

  const materiales = ref([])
  const selectedMaterials = ref([])

  function itemProps (departamento) {
    return {
      value: departamento.id,
      title: departamento.nombre,
    }
  }

  function itemPropsCiudad (ciudad) {
    return {
      value: ciudad.id,
      title: ciudad.nombre,
    }
  }

  function handleCheckboxChange(materialId) {
  const index = selectedMaterials.value.indexOf(materialId)
  if (index === -1) {
    selectedMaterials.value.push(materialId)
  } else {
    selectedMaterials.value.splice(index, 1)
  }
}

  async function fetchDepartamentos() {
  try {
    const response = await fetch(BACKEND_ENDPOINT+'proyectos/departamentos')
    const { data } = await response.json()
    if (data) {
      departamentos.value = data
    }
  } catch (error) {
    console.error('Error al cargar los departamentos:', error)
  }
  }

  async function fetchMateriales() {
    try {
        const response = await fetch(BACKEND_ENDPOINT + 'materiales')
        const { data } = await response.json()
        if (data) materiales.value = data

    } catch (error) {
        console.error('Error al cargar los materiales:', error)
    }
}


  function updateCiudades(departamentoId) {
    const departamento = departamentos.value.find(
    (dep) => dep.id === departamentoId
    )
    ciudades.value = departamento ? departamento.ciudad : []
    
  }
  
  function cancelar() {
    emits('close')
  }
  
  
  function guardarProyect() {
    if (newProyect.value.nombre) {
      emits('save', newProyect.value)
      emits('materials', selectedMaterials.value)
      cancelar() // Cerrar el modal
    } else {
      alert('Por favor llena todos los campos.')
    }
  }
  
  watch(() => props.showModal, (newVal) => {
    if (!newVal) {
        newProyect.value = { nombre: '', ciudadId: '' }
        selectedDepartamento.value = null
        ciudades.value = []
        selectedMaterials.value = []
    } else {
      fetchDepartamentos()
      fetchMateriales()
    }
  })

  watch(selectedDepartamento, (newVal) => {
    updateCiudades(newVal)
  })
  
  function submitForm() {
      guardarProyect()
  }
  </script>