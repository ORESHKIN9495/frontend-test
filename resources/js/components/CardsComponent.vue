<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },

    methods: {
        setComment(data) {
            this.$store.commit("setComment", data);
        },

        removeComment() {
            this.$store.dispatch("removeComment", this.data.id);
        },
    },
};
</script>

<template>
    <article class="card">
        <picture class="card__image"></picture>

        <hgroup class="card__title">
            <h3>{{ data.name }}</h3>

            <time>{{ data.date.split("-").reverse().join(".") }}</time>
        </hgroup>

        <p class="card__description">{{ data.text }}</p>

        <footer class="card__footer">
            <svg width="20" height="20" v-on:click="setComment(data)">
                <use xlink:href="../images/sprites.svg#pencil" />
            </svg>

            <svg width="20" height="20" v-on:click="removeComment()">
                <use xlink:href="../images/sprites.svg#trash" />
            </svg>
        </footer>
    </article>
</template>

<style>
.card {
    background-color: rgba(var(--color-v1), 0.02);
    border-radius: var(--theme-radius);
    display: grid;
    gap: 20px;
    grid-template: auto / auto 1fr;
    padding: 20px;
    place-items: center baseline;
}

.card__image {
    border: 1px solid rgb(var(--color-theme));
    border-radius: 50%;
    height: 90px;
    width: 90px;
}

.card__title time {
    font-size: 14px;
    opacity: 0.6;
}

.card__description {
    grid-column: 1 / -1;
}

.card__footer {
    display: flex;
    gap: 10px;
    grid-column: 1 / -1;
    margin: 0 0 0 auto;
}

@media only screen and (max-width: 480px) {
    .card {
        grid-template: auto / auto;
    }
}
</style>
