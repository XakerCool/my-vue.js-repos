<template>
    <section class="add">
        <form class="add-form" @submit.prevent="addTodo">
            <h3>Добавить задачу</h3>
            <input v-model.trim="title" type="text" placeholder="Заголовок задачи" />
            <textarea v-model.trim="description" placeholder="Описание задачи"></textarea>
            <span>Выберите deadline</span>
            <input v-model="deadline" type="date"/>
            <button type="submit">Добавить</button>
            <button @click="toHomePage">Отмена</button>
        </form>
    </section>
</template>

<script>
export default {
    name: "AddTodoPage",
    data: () => ({
        title: "",
        description: "",
        deadline: ""
    }),
    methods: {
        addTodo() {
            if(!this.title || !this.description || !this.deadline) return;
            if(new Date(this.deadline).setHours(23, 59, 59) < Date.now()) {
                alert("Дедлайн не может быть раньше сегодняшнего дня!");
                return;
            }
            this.$store.commit('ADD_TODO', {
                title: this.title,
                description: this.description,
                created_at: Date.now(),
                isFinished: false,
                updated_at: null,
                finished_at: null,
                deadline: new Date(this.deadline).setHours(23, 59).valueOf(),
            });
            this.$router.push({name: "HomePage"});
        },
        toHomePage() {
            this.$router.push({name: "HomePage"});
        }
    }
}
</script>

<style lang="scss">
.add {
    padding-top: 6rem;
}

.add-form {
    margin: 0 auto;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & input,
    & textarea,
    & button {
        width: 80%;
        margin-bottom: 0.7rem;
    }
    & textarea {
        resize: none;
        height: 100px;
        padding: 0.4rem;
    }
}
</style>


