<template>
    <div class="text-center my-3">
      <button class="btn btn-danger" @click="handleDeleteTask">Delete Task</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Selected category and task index to remove
  const category = ref('todo'); // default category, can be 'progress' or 'done'
  const index = ref(0); // default task index
  
  // Emit function to send data to the parent
  const emit = defineEmits(['delete-task']);
  
  // Function to emit the delete event
  const handleDeleteTask = () => {
    emit('delete-task', category.value, index.value);
  };
  </script>
  
  <style scoped>
  .text-center {
    margin-top: 20px;
  }
  </style>
  