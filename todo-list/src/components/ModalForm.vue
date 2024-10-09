<template>
  <div class="d-flex justify-content-end my-3">
    <button
      type="button"
      class="btn btn-secondary"
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

const emit = defineEmits(["add-task"]);

const submitForm = () => {
  emit("add-task", {
    title: title.value,
    description: description.value,
    status: status.value,
  });

  title.value = "";
  description.value = "";
  status.value = "todo";

  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.hide();

  location.reload();
};
</script>

<style scoped>
.d-flex {
  margin: 20px;
}
</style>
