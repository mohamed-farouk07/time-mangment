<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4" @dragover.prevent @drop="onDrop('todo')">
        <div class="card">
          <div class="card-header bg-secondary text-center text-white">
            To-Do
          </div>
          <div class="card-body">
            <ul>
              <li
                v-for="(task, index) in tasks.todo"
                :key="index"
                class="d-flex justify-content-between align-items-center my-3 task"
                draggable="true"
                @dragstart="onDragStart(task, 'todo')"
              >
                <div>
                  {{ index + 1 }}. <strong>{{ task.title }}</strong
                  >: {{ task.description }}
                </div>
                <div>
                  <button
                    @click="openEditModal('todo', index, task)"
                    class="btn btn-warning btn-sm me-2"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    @click="removeTask('todo', index)"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4" @dragover.prevent @drop="onDrop('progress')">
        <div class="card">
          <div class="card-header bg-warning text-center text-white">
            In Progress
          </div>
          <div class="card-body">
            <ul>
              <li
                v-for="(task, index) in tasks.progress"
                :key="index"
                class="d-flex justify-content-between align-items-center my-3 task"
                draggable="true"
                @dragstart="onDragStart(task, 'progress')"
              >
                <div>
                  {{ index + 1 }}. <strong>{{ task.title }}</strong
                  >: {{ task.description }}
                </div>
                <div>
                  <button
                    @click="openEditModal('progress', index, task)"
                    class="btn btn-warning btn-sm me-2"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    @click="removeTask('progress', index)"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4" @dragover.prevent @drop="onDrop('done')">
        <div class="card">
          <div class="card-header bg-success text-center text-white">Done</div>
          <div class="card-body">
            <ul>
              <li
                v-for="(task, index) in tasks.done"
                :key="index"
                class="d-flex justify-content-between align-items-center my-3 task"
                draggable="true"
                @dragstart="onDragStart(task, 'done')"
              >
                <div>
                  {{ index + 1 }}. <strong>{{ task.title }}</strong
                  >: {{ task.description }}
                </div>
                <div>
                  <button
                    @click="openEditModal('done', index, task)"
                    class="btn btn-warning btn-sm me-2"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    @click="removeTask('done', index)"
                    class="btn btn-danger btn-sm"
                  >
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
import { ref } from "vue";
import EditModal from "./EditModal.vue";

const props = defineProps({
  tasks: Object,
});

const editTask = ref(null);
const editCategory = ref("");
let draggedTask = null;

const removeTask = (category, index) => {
  props.tasks[category].splice(index, 1);
};

const openEditModal = (category, index, task) => {
  editCategory.value = category;
  editTask.value = { ...task, index };
};

const closeEditModal = () => {
  editTask.value = null;
  editCategory.value = "";
};

const updateTask = (updatedTask) => {
  const currentCategory = editCategory.value;
  const newCategory = updatedTask.status;
  const index = editTask.value.index;

  if (currentCategory !== newCategory) {
    props.tasks[currentCategory].splice(index, 1);
    props.tasks[newCategory].push(updatedTask);
  } else {
    props.tasks[currentCategory][index] = updatedTask;
  }

  closeEditModal();
};

const onDragStart = (task, category) => {
  draggedTask = { task, category };
};

const onDrop = (category) => {
  if (draggedTask) {
    const { task, category: sourceCategory } = draggedTask;
    props.tasks[sourceCategory] = props.tasks[sourceCategory].filter(
      (t) => t !== task
    );

    props.tasks[category].push(task);

    draggedTask = null;
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin-bottom: 20px;
  flex: 1;
  min-width: 300px; 
}

.card-header {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .col-md-4 {
    width: 100%;
    margin-bottom: 15px;
  }

  .card {
    margin-bottom: 10px;
  }

  .card-header {
    font-size: 1rem;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .col-md-4 {
    width: 50%;
  }

  .card {
    margin-bottom: 15px;
  }
}

@media (min-width: 992px) {
  .col-md-4 {
    width: 33.33%;
  }
}

.card-body ul {
  list-style: none;
  padding: 0;
}

.card-body ul li {
  margin-bottom: 10px;
}

button {
  margin-right: 5px;
}

button i {
  margin-right: 0;
}

.task {
  cursor: grab;
}

.task:active {
  cursor: grabbing;
}
</style>
