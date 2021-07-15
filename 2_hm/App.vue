<!-- Сохранять данные в localstorage или в indexedDB -->

<template>
  <div id="app">
    <h2> Мой список задач </h2>

    <div style="text-align: right; margin-bottom: 3rem"> 
      <button @click="showFormFunction" v-show="!showForm"> Добавить задачу </button>

      <form class="form" v-show="showForm" @submit.prevent="addTodo">
        <input v-model.trim="title" type="text" placeholder="Заголовок">
        <textarea v-model.trim="description" placeholder="Описание" style="width: 98%; height: 100px; resize: none"></textarea>

        <button type="submit">Добавить</button>
        <button @click.prevent="cancel">Отмена</button>
      </form>

    </div>

    <div v-show="tasks.length" class="tasks">
      <Todo v-for="(todo, idx) in tasks" :key=todo.id :todo="todo" :idx="idx" @del="deleteTodo"/>
    </div>

    <div v-show="!tasks.length" class="empty">У вас нет задач, добавьте хотя бы одну </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      tasks: [],
      showForm: false,
      title: "",
      description: "",
    }
  },
  created(){
    window.addEventListener('beforeunload', this.saveTodos)
    const tasks = localStorage.getItem('todos')
    if (tasks){
      this.tasks = JSON.parse(tasks)
    }
  },

  methods: {

    saveTodos(){
      localStorage.setItem('todos', JSON.stringify(this.tasks))
    },
    
    deleteTodo(idx){
      this.tasks.splice(idx, 1)
    },
    showFormFunction() {
      this.showForm = true;
    },
    addTodo() {
      if (!this.title.length || !this.description.length) {
        return alert("Нельзя оставлять поле пустым!");
      }

      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        isFinished: false
      }

      this.tasks.push(task);
      this.title = "";
      this.description = "";
      this.showForm = false;
    },
    cancel() {
      this.title = "";
      this.description = "";
      this.showForm = false;
    }
  },

  // components:{
  //   Todo: () => import('@/components/Todo.vue')
  // },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form{
  display:flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  text-align: center;
} 
</style>
