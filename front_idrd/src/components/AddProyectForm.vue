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
            </v-form>
        </v-card-text>
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
  
  const emits = defineEmits(['close', 'save'])
  
  const newProyect = ref({
    nombre: '',
    ciudadId: '',
  })

  const departamentos = ref([])
  const ciudades = ref([])
  const BACKEND_ENDPOINT = 'http://localhost:3000/'


  const selectedDepartamento = ref(null)

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

  async function fetchDepartamentos() {
  try {
    const response = await fetch(BACKEND_ENDPOINT+'proyectos/departamentos')
    const { data } = await response.json()
    console.log(data);
    if (data) {
      departamentos.value = data
      console.log('Departamentos:', departamentos.value)
    }
  } catch (error) {
    console.error('Error al cargar los departamentos:', error)
  }
  }

  function updateCiudades(departamentoId) {
    console.log(departamentoId);
    const departamento = departamentos.value.find(
    (dep) => dep.id === departamentoId
    )
    ciudades.value = departamento ? departamento.ciudad : []
    console.log(ciudades.value);
    
  }
  
  function cancelar() {
    emits('close')
  }
  
  
  function guardarProyect() {
    if (newProyect.value.nombre) {
      emits('save', newProyect.value)
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
    } else {
      fetchDepartamentos()
    }
  })

  watch(selectedDepartamento, (newVal) => {
    console.log('Watch detecta cambio en departamento:', newVal)
    updateCiudades(newVal)
  })
  
  function submitForm() {
      console.log('Formulario enviado')
      guardarProyect()
  }
  </script>