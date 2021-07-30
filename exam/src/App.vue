<template>
  <div id="app">
    <MainLayout>
      <router-view/> <!--В MainLayout имеется slot, в который помещается текущий router-view-->
    </MainLayout>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    MainLayout: () => import("@/layouts/MainLayout.vue"),
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    }
  },
  created() {
    const todos = localStorage.getItem("todos");
    if (todos) {
      this.$store.commit('SET_TODOS', JSON.parse(todos));
    }
    window.addEventListener("beforeunload", this.saveDatas);
  },
  methods: {
    saveDatas() {
      localStorage.setItem("todos", JSON.stringify(this.todoList));
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input, button {
  padding: 0.4rem;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 8px;
}
button {
  cursor: pointer;
}
</style>
