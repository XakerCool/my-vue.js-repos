<template>
  <div class="home">
    <AppHeader/>
    <h2 class="title">Список моих задач</h2>
    <div v-if="todoList.length" class="todos">
      <Todo v-for="todo in todoList" :key="todo.created_at" :todo="todo"/>
    </div>
    <div v-else class="empty">Список задач пуст</div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import Todo from '@/components/Todo.vue';
export default {
  name: "Home",
  components: {
    AppHeader,
    Todo,
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    }
  }
}
</script>
