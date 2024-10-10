<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-primary text-center text-white">To-Do</div>
          <div class="card-body">
            <ul>
              <li
                v-for="(task, index) in tasks.todo"
                :key="index"
                class="d-flex justify-content-between align-items-center my-3"
              >
                <div>
                  {{ index + 1 }}. <strong>{{ task.title }}</strong>: {{ task.description }}
                </div>
                <div>
                  <button @click="openEditModal('todo', index, task)" class="btn btn-warning btn-sm me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button @click="removeTask('todo', index)" class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-warning text-center text-white">In Progress</div>
          <div class="card-body">
            <ul>
              <li
                v-for="(task, index) in tasks.progress"
                :key="index"
                class="d-flex justify-content-between align-items-center my-3"
              >
                <div>
                  {{ index + 1 }}. <strong>{{ task.title }}</strong>: {{ task.description }}
                </div>
                <div>
                  <button @click="openEditModal('progress', index, task)" class="btn btn-warning btn-sm me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button @click="removeTask('progress', index)" class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-success text-center text-white">Done</div>
          <div class="card-body">
            <ul>
              <li
                v-for="(task, index) in tasks.done"
                :key="index"
                class="d-flex justify-content-between align-items-center my-3"
              >
                <div>
                  {{ index + 1 }}. <strong>{{ task.title }}</strong>: {{ task.description }}
                </div>
                <div>
                  <button @click="openEditModal('done', index, task)" class="btn btn-warning btn-sm me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button @click="removeTask('done', index)" class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <EditModal
      v-if="editTask"
      :task="editTask"
      :category="editCategory"
      @close="closeEditModal"
      @update-task="updateTask"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EditModal from './EditModal.vue';

const props = defineProps({
  tasks: Object
});

const editTask = ref(null);
const editCategory = ref('');

const removeTask = (category, index) => {
  props.tasks[category].splice(index, 1);
};

const openEditModal = (category, index, task) => {
  editCategory.value = category;
  editTask.value = { ...task, index };
};

const closeEditModal = () => {
  editTask.value = null;
  editCategory.value = '';
};

const updateTask = (updatedTask) => {
  const category = editCategory.value;
  const index = editTask.value.index;

  props.tasks[category][index] = updatedTask;

  closeEditModal();
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
