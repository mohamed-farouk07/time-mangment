<script setup lang="ts">
import Header from './components/Header.vue';
import ModalForm from './components/ModalForm.vue';
import TaskBoard from './components/TaskBoard.vue';
import { ref, onMounted, watch } from 'vue';

const tasks = ref({
  todo: [],
  progress: [],
  done: []
});

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  }
});

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}, { deep: true });

const addTask = (newTask) => {
  tasks.value[newTask.status].push(newTask);
};
</script>

<template>
  <Header />
  <ModalForm @add-task="addTask" />
  <TaskBoard :tasks="tasks" />
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
}
</style>
