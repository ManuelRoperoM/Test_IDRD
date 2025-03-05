<template>
  <v-dialog :model-value="showModal" @update:model-value="emits('close')" persistent max-width="600px">
    <v-card>
      <v-card-title>
        Añadir Nuevo Material
      </v-card-title>
      <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="newMaterial.description"
              label="Descripción"
              required
            ></v-text-field>
            <v-text-field
              v-model="newMaterial.precio"
              label="Precio"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="newMaterial.unidad"
              label="Unidad"
              required
            ></v-text-field>
          </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="cancelar">Cancelar</v-btn>
        <v-btn color="green" type="submit" @click="guardarMaterial">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
    showModal: Boolean,
})

const emits = defineEmits(['close', 'save'])

const newMaterial = ref({
  description: '',
  precio: '',
  unidad: ''
})

function cancelar() {
  emits('close')
}


function guardarMaterial() {
  if (newMaterial.value.description && newMaterial.value.precio && newMaterial.value.unidad) {
    emits('save', newMaterial.value)
    cancelar() // Cerrar el modal
  } else {
    alert('Por favor llena todos los campos.')
  }
}

watch(() => props.showModal, (newVal) => {
  if (!newVal) {
    newMaterial.value = { description: '', precio: '', unidad: '' }
  }
})

function submitForm() {
    console.log('Formulario enviado')
    guardarMaterial()
}
</script>