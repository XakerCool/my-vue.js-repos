<template>
    <header class="header">
      <button class="add-button" @click="addTask">Добавить задачу</button>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
    methods: {
      addTask() {
        this.$router.push({ name: "AddPage" })
      }
    }
}
</script>


<style lang="scss">
.header {
  text-align: right;
  padding: 0.5rem 0.3rem;
}
.add-button {
  background-color: #fff;
  padding: 0.4rem;
  border: 1px solid black;
  border-radius: 20px;
}
</style>