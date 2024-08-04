<script>
import CardsComponent from "../components/CardsComponent.vue";
import FormComponent from "../components/FormComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import PaginationComponent from "../components/PaginationComponent.vue";

import { mapActions, mapState } from "vuex";

export default {
    computed: {
        ...mapState({
            comments: (state) => state.comments,
            pages: (state) => state.pages,
        }),

        prepareComments() {
            const max = this.pages * 3;
            const min = max - 3;

            return this.comments.slice(min, max);
        },
    },

    mounted() {
        this.getComments();
    },

    methods: {
        ...mapActions({
            getComments: "getComments",
        }),
    },

    components: {
        CardsComponent,
        FormComponent,
        HeaderComponent,
        PaginationComponent,
    },
};
</script>

<template>
    <main>
        <section class="container">
            <HeaderComponent />

            <CardsComponent
                v-for="el in prepareComments"
                :key="el.id"
                :data="el"
            />

            <PaginationComponent />

            <FormComponent />
        </section>
    </main>
</template>

<style>
@import "../../css/reset.css";

:root {
    --color-v1: 255, 255, 255;
    --color-v2: 35, 35, 36;
    --color-theme: 2, 174, 255;
    --theme-radius: 10px;
}

main {
    display: grid;
    height: 100vh;
    place-items: center;
}

.container {
    background-color: rgb(var(--color-v2));
    display: grid;
    gap: 40px;
    max-width: 1200px;
    padding: clamp(20px, 4vw, 40px);
    width: 100%;
}

body {
    background-color: rgb(22, 22, 23);
    color: rgb(var(--color-v1));
    font: 300 16px / 1.64 system-ui, sans-serif;
}

h3 {
    font-size: 24px;
}

svg {
    cursor: pointer;
}

svg:hover {
    color: rgb(var(--color-theme));
}
</style>
