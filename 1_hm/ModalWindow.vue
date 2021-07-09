<template>
    <div class="modal" v-if="isModalOpen">
        <p>Мы используем куки, примите во внимание!</p>
        <button @click="closeModal">Закрыть</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isModalOpen: true
        }
    },
    methods: {
        closeModal() {
            this.isModalOpen = false;
        }
    }
}
</script>
