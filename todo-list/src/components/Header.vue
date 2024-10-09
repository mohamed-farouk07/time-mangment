<template>
  <header class="header">
    <h2>Task Management</h2>
    <div class="icon-container">
      <i class="bi bi-bell"></i>
      <span class="dot"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.header {
  background-color: #fff;
  color: #3c495a;
  padding: 20px;
  margin: 0;
  border-bottom: 3px solid #3c495a;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
}

.bi-bell {
  font-size: 24px;
  color: #3c495a;
}

.dot {
  position: absolute;
  top: -15px;
  right: -10px;
  height: 18px;
  width: 18px;
  background-color: rgb(243, 121, 121);
  border-radius: 50%;
}
</style>
