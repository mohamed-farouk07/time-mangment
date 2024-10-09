<template>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-header bg-primary text-center text-white">To-Do</div>
            <div class="card-body">
              <ul>
                <li v-for="(task, index) in tasks.todo" :key="index">
                  <strong>{{ task.title }}</strong>: {{ task.description }}
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
                <li v-for="(task, index) in tasks.progress" :key="index">
                  <strong>{{ task.title }}</strong>: {{ task.description }}
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
                <li v-for="(task, index) in tasks.done" :key="index">
                  <strong>{{ task.title }}</strong>: {{ task.description }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    tasks: Object
  });
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 20px;
  }
  </style>
  