<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            index: 1,
            max: 3,
            min: 0,
            sliceParam: 2,
            screenState: false,
        };
    },

    mounted() {
        window.innerWidth < 480
            ? (this.screenState = true)
            : (this.screenState = false);

        window.addEventListener("resize", () => {
            window.innerWidth < 480
                ? (this.screenState = true)
                : (this.screenState = false);
        });
    },

    watch: {
        screenState() {
            !this.screenState ? (this.sliceParam = 2) : (this.sliceParam = 1);
        },
    },

    computed: {
        ...mapState({
            comments: (state) => state.comments,
        }),
        pagesArray() {
            return Array.from(
                { length: Math.ceil(this.comments.length / 3) },
                (_, i) => i + 1
            );
        },

        middleArray() {
            if (this.pagesArray.length < 7) {
                return this.pagesArray.slice(
                    this.sliceParam,
                    this.pagesArray.length
                );
            } else {
                return this.pagesArray.slice(
                    this.sliceParam,
                    this.pagesArray.length - this.sliceParam
                );
            }
        },
    },

    methods: {
        prepare(el) {
            this.index = el;

            this.$store.commit("getPages", el);

            if (this.index > this.middleArray.length) {
                this.max = this.middleArray.length;
                this.min = this.middleArray.length - 3;
            } else if (this.index <= 2) {
                this.max = 3;
                this.min = 0;
            }
        },

        middleList(el) {
            if (!this.screenState) {
                this.max = el;
                el >= 5 ? (this.min = el - 5) : (this.min = 0);
            } else {
                this.max = el;
                el >= 3 ? (this.min = el - 3) : (this.min = 0);
            }
        },
    },
};
</script>

<template>
    <article class="pagination">
        <ul class="pagination__list">
            <li
                v-for="el of pagesArray.slice(0, sliceParam)"
                :key="el"
                :class="['pagination__button', { active: index === el }]"
                v-on:click="prepare(el)"
            >
                {{ el }}
            </li>
        </ul>

        <p v-if="pagesArray.length >= 5" class="pagination__separator">...</p>

        <ul class="pagination__list">
            <li
                v-for="el of middleArray.slice(min, max)"
                :key="el"
                :class="['pagination__button', { active: index === el }]"
                v-on:click="prepare(el), middleList(el)"
            >
                {{ el }}
            </li>
        </ul>

        <p
            v-if="index <= pagesArray.length - 3 && pagesArray.length >= 7"
            class="pagination__separator"
        >
            ...
        </p>

        <ul v-if="pagesArray.length >= 7" class="pagination__list">
            <li
                v-for="el of pagesArray.slice(-sliceParam)"
                :key="el"
                :class="['pagination__button', { active: index === el }]"
                v-on:click="prepare(el)"
            >
                {{ el }}
            </li>
        </ul>
    </article>
</template>

<style>
.pagination {
    align-items: flex-end;
    display: flex;
    justify-content: center;
}

.pagination__button {
    color: rgb(var(--color-v1));
    cursor: pointer;
    line-height: initial;
    padding: 5px 12px;
}

.pagination__list {
    display: flex;
    place-items: center;
}

.pagination__separator {
    padding: 0 22px;
}

.pagination__button.active {
    border-radius: calc(var(--theme-radius) - 6px);
    box-shadow: inset 0 0 0 1px;
    color: rgb(var(--color-theme));
}

@media only screen and (max-width: 720px) {
    .pagination__separator {
        padding: 0;
    }
}
</style>
