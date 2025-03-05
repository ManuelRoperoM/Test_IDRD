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
          Actualizar Material
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="localMaterial.description"
                label="Descripción"
                required
              ></v-text-field>
              <v-text-field
                v-model="localMaterial.precio"
                label="Precio"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="localMaterial.unidad"
                label="Unidad"
                required
              ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="cancelar">Cancelar</v-btn>
          <v-btn color="green" type="submit" @click="actualizarMaterial">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from 'vue'
  
  const props = defineProps({
      showModal: Boolean,
      material: {
       type: Object,
       required: true,
       default: () => ({ description: '', precio: '', unidad: '' })
       }
  })
  
  const emits = defineEmits(['close', 'update'])

  const localMaterial = ref({
  description: '',
  precio: '',
  unidad: ''
})
  
  function cancelar() {
    emits('close')
  }
  
  
  function actualizarMaterial() {
    if (localMaterial.value.description && localMaterial.value.precio && localMaterial.value.unidad) {
      emits('update', localMaterial.value)
      cancelar() // Cerrar el modal
    } else {
      alert('Por favor llena todos los campos.')
    }
  }
  
  watch(() => props.material, (newMaterial) => {
    if (newMaterial) {
        localMaterial.value = { ...newMaterial }
    }
  })
  
  function submitForm() {
      console.log('Formulario enviado')
      actualizarMaterial()
  }
  </script>