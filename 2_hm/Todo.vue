<template>
    <div class="todo" :class="{'todo-finished': todo.isFinished}">

        <p class="todo__header"> Задача № {{idx+1}}</p>
        <hr/>

        <p class="todo__title"> {{todo.title}} </p>
        <p class="todo__description"> {{todo.description}} </p>
        <hr/>

        <button class="todo__done" @click="toggleTodo">{{ todo.isFinished ? 'Возобновить' : 'Завершить' }} задачу</button>
        <button class="todo__delete" @click="deleteTodo" >Удалить задачу</button>
        <p class="todo__time"> {{ todo.id | formatDate }} </p>

    </div>
</template>

<script>
    export default {
        name: 'Todo',

        props:{
            todo: {
                type: Object,
                required: true,
                default: () => ({title: 'Заголовок', description: 'Описание', isFinished: false})
            },

            idx: Number
        },

        methods: {
            toggleTodo(){   
                this.todo.isFinished = !this.todo.isFinished;
            },

            deleteTodo(){
                this.$emit('del', this.idx)
            }
        },

    }
</script>

<style>
    .todo{
        width: 400px;
        margin: 0 auto;
        border: 1px solid black;
        border-radius: 10px;
        margin-bottom: 2.5rem;
        padding: 1rem 0;
        /* display:flex; */
    }

    .todo__header{
        font-weight: 800;
        background-color:rgb(214, 214, 214)
    }

    .todo__title{
        font-weight: 700;
        font-size:20px;
    }

    .todo__description{
        opacity: 0.9;
    }

    .todo__done{
        margin-right:0.6rem;
    }

    .todo-finished{
        border: 1px solid rgb(143, 0, 0);
        text-decoration: line-through;
        background-color: whitesmoke;
        opacity: 0.9;
        color: rgb(48, 48, 48)
    }
</style>