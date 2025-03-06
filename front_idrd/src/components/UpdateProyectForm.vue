<template>
    <!-- <v-dialog :model-value="showModalUpdate" @update:model-value="emits('close')" persistent max-width="600px"> -->
        <v-dialog 
  :model-value="showModal" 
  @update:model-value="emits('close')" 
  persistent 
  max-width="600px"
>
        <v-card>
        <v-card-title>
          Actualizar Proyecto
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="localProyect.nombre"
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
                v-model="localProyect.ciudadId"
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
          <v-btn color="green" type="submit" @click="actualizarProyect">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from 'vue'

  const selectedDepartamento = ref(null)

  const departamentos = ref([])
  const ciudades = ref([])
  const BACKEND_ENDPOINT = 'http://localhost:3000/'

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
  
  const props = defineProps({
      showModal: Boolean,
      proyect: {
       type: Object,
       required: true,
       default: () => ({ id: '', nombre: '', ciudad: { id: '', departamento: { id: '' } } })
       }
  })
  
  const emits = defineEmits(['close', 'update'])

  const localProyect = ref({
  id: '',
  nombre: '',
  ciudadId: '',
})

const newProyect = ref({
    nombre: '',
    ciudadId: '',
  })
  
  function cancelar() {
    emits('close')
  }
  
  
  function actualizarProyect() {
    if (localProyect.value.nombre && localProyect.value.ciudadId) {
      emits('update', localProyect.value)
      cancelar() // Cerrar el modal
    } else {
      alert('Por favor llena todos los campos.')
    }
  }
  
  watch(() => props.proyect, (newProyect) => {
    console.log("NewProuect", newProyect);
    if (newProyect) {
      console.log("NewProuect", newProyect);
      localProyect.value.id = newProyect.id
      localProyect.value.nombre = newProyect.nombre
      localProyect.value.ciudadId = newProyect.ciudad.id
      selectedDepartamento.value = newProyect.ciudad.departamento.id
    }
  })

  watch(() => props.showModal, (newVal) => {
    if (newVal) {
      fetchDepartamentos()
    } else {
      cancelar()
    }
  })

  watch(departamentos, (newDepartamentos) => {
    if (newDepartamentos.length > 0 && selectedDepartamento.value) {
        updateCiudades(selectedDepartamento.value)
    }
})

watch(selectedDepartamento, (newVal) => {
    console.log('Watch detecta cambio en departamento:', newVal)
    updateCiudades(newVal)
  })

  async function fetchDepartamentos() {
  try {
      const response = await fetch(BACKEND_ENDPOINT + 'proyectos/departamentos')
      const { data } = await response.json()
      if (data) {
        departamentos.value = data
        console.log("Departamentos cargados:", departamentos.value)
      }
    } catch (error) {
      console.error('Error al cargar los departamentos:', error)
    }
  }

  function updateCiudades(departamentoId) {
    console.log(departamentoId);
    console.log(departamentos.value);
    
    const departamento = departamentos.value.find(
    (dep) => dep.id === departamentoId
    )
    console.log("Departamento encontrado: ", departamento);
    ciudades.value = departamento ? departamento.ciudad : []
    console.log("ciudades: ",ciudades.value);
    
  }

  
  function submitForm() {
      console.log('Formulario enviado')
      actualizarProyect()
  }
  </script>