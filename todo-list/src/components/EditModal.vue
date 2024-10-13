<template>
  <div
    class="modal fade show"
    tabindex="-1"
    style="display: block"
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
              <span v-if="errors.title" class="text-danger">{{ errors.title }}</span>
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
              <span v-if="errors.description" class="text-danger">{{ errors.description }}</span>
            </div>
            <div class="mb-3">
              <label for="statusSelect" class="form-label">Status</label>
              <select
                class="form-select"
                id="statusSelect"
                v-model="status"
              >
                <option value="todo">To-Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  task: {
    title: string;
    description: string;
    status: string;
  } | null;
  category: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update-task", updatedTask: { title: string; description: string; status: string }): void;
}>();

const title = ref("");
const description = ref("");
const status = ref("");

const errors = ref({
  title: "",
  description: "",
});

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      title.value = newTask.title;
      description.value = newTask.description;
      status.value = newTask.status;
    }
  },
  { immediate: true }
);

const submitForm = () => {
  errors.value.title = title.value ? "" : "Title is required";
  errors.value.description = description.value ? "" : "Description is required";

  if (!errors.value.title && !errors.value.description) {
    emit("update-task", { title: title.value, description: description.value, status: status.value });
  }
};
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 20px;
}

.form-label {
  margin-bottom: 5px;
}

.text-danger {
  font-size: 0.9rem;
}
</style>
