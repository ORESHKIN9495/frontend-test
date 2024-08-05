<script>
import { mapState } from "vuex";
import { declensionComments } from "../composables/declension";

export default {
    data() {
        return {
            params: 0,
            direction: 0,
            selected: false,
        };
    },

    computed: {
        ...mapState({
            comments: (state) => state.comments,
        }),

        getDeclensionComments() {
            return declensionComments(this.comments.length);
        },
    },

    methods: {
        filteredComments() {
            if (this.params === 0 && this.direction === 0) {
                this.comments.sort((a, b) => b.id - a.id);
            }

            if (this.params === 0 && this.direction === 1) {
                this.comments.sort((a, b) => a.id - b.id);
            }

            if (this.params === 1 && this.direction === 0) {
                this.comments.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
            }

            if (this.params === 1 && this.direction === 1) {
                this.comments.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );
            }

            this.selected = false;
        },
    },
};
</script>

<template>
    <header class="header">
        <h2 class="header__counter">
            {{ getDeclensionComments[0] }}
            <span>{{ getDeclensionComments[1] }}</span>
        </h2>

        <nav class="header__nav">
            <p
                v-html="
                    params === 0 ? 'По идентификатору' : 'По дате публикации'
                "
            />

            <svg width="30" height="30" v-on:click="selected = !selected">
                <title>Фильтр по типу</title>
                <use xlink:href="../images/sprites.svg#filter" />
            </svg>

            <ul v-if="selected" class="header__list">
                <li v-on:click="(params = 0), filteredComments()">
                    По идентификатору
                </li>
                <li v-on:click="(params = 1), filteredComments()">
                    По дате публикации
                </li>
            </ul>

            <svg
                v-if="direction === 1"
                class="header__direction"
                width="30"
                height="30"
                v-on:click="(direction = 0), filteredComments()"
            >
                <title>По возрастанию</title>
                <use xlink:href="../images/sprites.svg#sort-up" />
            </svg>

            <svg
                v-if="direction === 0"
                class="header__direction"
                width="30"
                height="28"
                v-on:click="(direction = 1), filteredComments()"
            >
                <title>По убыванию</title>
                <use xlink:href="../images/sprites.svg#sort-down" />
            </svg>
        </nav>
    </header>
</template>

<style>
.header {
    display: grid;
    grid-template: auto / 1fr auto;
    gap: 20px;
    place-items: center baseline;
    position: relative;
}

.header__counter span {
    opacity: 0.6;
    margin: 0 0 0 5px;
}

.header__nav {
    align-items: flex-start;
    display: flex;
    gap: 20px;
}

.header__list {
    backdrop-filter: blur(5px);
    background-color: rgba(var(--color-v1), 0.05);
    border-radius: calc(var(--theme-radius) / 2);
    inset: 40px 0 auto auto;
    overflow: hidden;
    position: absolute;
}

.header__list li {
    cursor: pointer;
    padding: 10px 20px;
}

.header__list li:hover {
    background-color: rgb(var(--color-v1), 0.1);
}

@media only screen and (max-width: 480px) {
    .header {
        grid-template: auto / auto;
    }
}
</style>
