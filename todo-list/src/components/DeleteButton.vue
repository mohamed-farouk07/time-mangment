<template>
  <div class="text-center my-3">
    <button class="btn btn-danger" @click="handleDeleteTask">Delete Task</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

type DeleteTaskEvent = {
  category: string;
  index: number;
};

const category = ref<string>('todo');
const index = ref<number>(0);

const emit = defineEmits<{
  (event: 'delete-task', category: string, index: number): void;
}>();

const handleDeleteTask = () => {
  emit('delete-task', category.value, index.value);
};
</script>

<style scoped>
.text-center {
  margin-top: 20px;
}
</style>
