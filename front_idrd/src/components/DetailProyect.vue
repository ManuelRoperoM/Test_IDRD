<template>
    <v-dialog :model-value="showModal" @update:model-value="emits('close')" persistent width="90%">
      <v-card class="mx-auto">
        <v-card-title class="mx-auto">
          Nombre: {{localProyect.nombre}}
        </v-card-title>
        <v-card-subtitle>
            <v-icon>mdi-map-marker</v-icon>
            {{ localProyect.ciudad.nombre }} , {{ localProyect.ciudad.departamento.nombre }}
        </v-card-subtitle>
        <v-card-text>
        <div v-if="localProyect.materiales.length > 0">
            <h3>Lista de Materiales: </h3>    
            <v-table bordered>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Unidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(material, index) in localProyect.materiales" :key="index">
                  <td>{{ material.description }}</td>
                  <td>{{ material.unidad }}</td>
                  <td>{{ material.precio }}</td>
                </tr>
              </tbody>
            </v-table>
        </div>
        <div v-else>
            <h3>El proyecto {{ localProyect.nombre }} no tiene asignado materiales</h3>  
        </div>
        </v-card-text>
        <v-card-actions>
            <v-btn color="red" @click="cancelar">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps, computed } from 'vue'
  
  const localProyect = ref({
    id: '',
    nombre: '',
    ciudad: {},
    materiales: {}
  })

  const props = defineProps({
      showModal: Boolean,
      proyect: {
       type: Object,
       required: true,
       default: () => ({ id: '', nombre: '', ciudad: { id: '', departamento: { id: '' } } })
       }
  })
  
  const emits = defineEmits(['close'])

  watch(() => props.proyect, (newProyect) => {
    console.log("NewProyect", newProyect);
    if (newProyect) {
      console.log("NewProuect", newProyect);
      localProyect.value.id = newProyect.id
      localProyect.value.nombre = newProyect.nombre
      localProyect.value.ciudad = newProyect.ciudad
      localProyect.value.materiales = newProyect.materiales 
    }
  })
  
  function cancelar() {
    emits('close')
  }
  </script>