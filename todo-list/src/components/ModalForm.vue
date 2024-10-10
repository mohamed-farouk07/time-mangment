<template>
  <div class="d-flex justify-content-end my-3">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add Task
    </button>
  </div>

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
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
                required
              >
                <option value="todo">To-Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <span v-if="errors.status" class="text-danger">{{ errors.status }}</span>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const description = ref("");
const status = ref("todo");

const errors = ref({
  title: "",
  description: "",
  status: ""
});

const emit = defineEmits(["add-task"]);

const validateForm = () => {
  errors.value.title = title.value.length >= 3 ? "" : "Title must be at least 3 characters.";
  errors.value.description = description.value.length >= 10 ? "" : "Description must be at least 10 characters.";
  errors.value.status = status.value ? "" : "Status is required.";

  return !errors.value.title && !errors.value.description && !errors.value.status;
};

const submitForm = () => {
  if (validateForm()) {
    emit("add-task", {
      title: title.value,
      description: description.value,
      status: status.value
    });

    title.value = "";
    description.value = "";
    status.value = "todo";

    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.hide();

    location.reload();
  }
};
</script>

<style scoped>
.d-flex {
  margin: 20px;
}
.text-danger {
  font-size: 0.9rem;
}
</style>
