<template>
    <div
      class="modal fade show"
      tabindex="-1"
      style="display: block;"
      aria-labelledby="editModalLabel"
      aria-hidden="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Task</h5>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title"
                  id="title"
                  v-model="title"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  v-model="description"
                  placeholder="Enter Description"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="statusSelect" class="form-label">Status</label>
                <select
                  class="form-select"
                  id="statusSelect"
                  v-model="status"
                  required
                >
                  <option value="todo">To-Do</option>
                  <option value="progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
  
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    task: Object,
    category: String
  });
  
  const emit = defineEmits(['update-task', 'close']);
  
  const title = ref(props.task.title);
  const description = ref(props.task.description);
  const status = ref(props.task.status);
  
  watch(() => props.task, (newTask) => {
    title.value = newTask.title;
    description.value = newTask.description;
    status.value = newTask.status;
  });
  
  const submitForm = () => {
    const updatedTask = {
      title: title.value,
      description: description.value,
      status: status.value,
    };
  
    emit('update-task', updatedTask);
    
    location.reload();
  
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
  }
  </style>
  