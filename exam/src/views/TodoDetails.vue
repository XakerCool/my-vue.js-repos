<template>
    <section class="todo-details" >
        <div class="details" v-show="!isUpdating">
            <div class="back">
                <button @click="goBack">Назад</button>
            </div>
            <h2>Детали задачи</h2>
            <h3 class="todo__title">{{ todo.title }}</h3>
            <p class="todo__description">{{ todo.description }}</p>
            <p class="todo__deadline">Дата дедлайна: <span>{{ todo.deadline | formatDate }}</span></p>
            <p class="todo__created">
                Дата создания: <span>{{ todo.created_at | formatDate }}</span>
            </p>
            <p class="todo__updated">
                Дата обновления: <span>{{ todo.updated_at | formatDate }}</span>
            </p>
            <p class="todo__finished">
                Дата выполнения: <span>{{ todo.finished_at | formatDate }}</span>
            </p>
            <div>
                <button @click="toggleIsDone" v-show="!todo.isFinished">Отметить как выполненную</button>
                <button @click="toggleIsDone" v-show="todo.isFinished">Отметить как не выполненную</button>
                <button @click="toggleUpdating">Редактировать</button>
                <button @click="deleteTodo">Удалить заметку</button>
            </div>
        </div>
        <div class="updating-form" v-show="isUpdating">
            <form @submit.prevent="editTodo">
                <h3>Редактировать задачу</h3>
                <input v-model.trim="todo.title" type="text" placeholder="Заголовок задачи" />
                <textarea v-model.trim="todo.description" placeholder="Описание задачи"></textarea>
                <span>Выберите deadline</span>
                <input v-model="todo.deadline" type="date"/>
                <button type="submit">Обновить</button>
                <button @click="toggleUpdating">Отмена</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: "TodoDetailsPage",
    data: () => ({
        todo: {},
        isUpdating: false,
    }),
    computed: {
        todoId() {
            return this.$route.params.id;
        },
        todoList() {
            return this.$store.state.todoList;
        }
    },
    methods: {
        goBack() {
            return this.$router.push({ name: "HomePage" });
        },
        formatDateMethod(time) {
            if (!time) return "-";

            return new Intl.DateTimeFormat('ru-RU', {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            }).format(new Date(time));
        },
        toggleIsDone() {
            if (!this.todo.isFinished) {
                this.todo.isFinished = true;
                this.todo.finished_at = Date.now();
                return;
            }
            this.todo.isFinished = false;
            this.todo.finished_at = null;
        },
        toggleUpdating() {
            !this.isUpdating
            ? this.isUpdating = true
            : this.isUpdating = false;
        },
        editTodo() {
            this.todo.updated_at = Date.now();
            this.isUpdating = false;
        },
        deleteTodo() {
            this.$store.commit('DELETE_TODO', this.todoId);
            localStorage.removeItem(this.todoId);
            return this.$router.push({ name: "HomePage" });
        }
    },
    created() {
        const todo = this.todoList.find(el => el.created_at === this.todoId);
        if (!todo) {
            return this.goBack();
        }
        this.todo = todo;
    },
    filters: {
        formatDate(value) {
            if (!value) return "-";
            return new Intl.DateTimeFormat('ru-RU', {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            }).format(new Date(value));
        }
    },
}
</script>

<style lang="scss">
.details {
    width: 400px;
    margin: 1rem auto;
    padding: 0.7em 0.5rem;
    border: 1px solid black;
    border-radius: 8px;
    & h3,
    & p {
        margin: 0 0 1rem 0;
    }
}

.updating-form {
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