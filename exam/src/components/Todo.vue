<template>
    <div class="todo" :class="{ finished : todo.isFinished, overdue: isOutDate, late_finished: todo.isFinished && isOutDate }">
        <div class="todo__header">
            <span @click="open">Открыть</span>
        </div>
        <h3 class="todo__title">{{ todo.title }}</h3>
        <p class="todo__description">{{ todo.description }}</p>
        <p class="todo__deadline">Дата дедлайна: <span>{{ todo.deadline | formatDate }}</span></p>
        <p class="todo__deadline_finished" v-show="isOutDate">Вы просрочили дедлайн!</p>
    </div>
</template>

<script>
export default {
    name: "Todo",
    data: () => ({
        isOutDate: false,
    }),
    props: {
        todo: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    created() {
        if (new Date(this.todo.deadline).setHours(23, 59, 59) < Date.now()) {
            this.isOutDate = true;
        }
    },
    filters: {
        formatDate(value) {
            return new Intl.DateTimeFormat('ru-RU', {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            }).format(new Date(value));
        }
    },
    methods: {
        open() {
            // this.$router.push(`/todo/${this.todo.created_at}`);
            this.$router.push({
                name: "TodoDetailsPage",
                params: { id: this.todo.created_at }
            });
        }
    }
}
</script>

<style lang="scss">
.todo {
    width: 400px;
    margin: 1rem auto;
    padding: 0.7em 0.5rem;
    border: 1px solid black;
    border-radius: 8px;
    & h3,
    & p {
        margin: 0 0 1rem 0;
    }

    &__header {
        text-align: right;

        & span {
            font-style: italic;
            font-weight: 600;
            cursor: pointer;
        }
    }
    &__deadline_finished {
        color: red;
    }
}
.finished {
    color: green;
    border: 2px solid green;
}
.overdue {
    color: red;
    border: 2px solid red;
}
.late_finished {
    color: orange;
    border: 2px solid orange;
}
</style>