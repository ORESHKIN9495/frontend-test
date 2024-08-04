<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import { mapGetters } from "vuex";

export default {
    data() {
        return {
            form: {
                name: "",
                date: "",
                text: "",
            },
        };
    },

    watch: {
        updateComment() {
            this.form = {
                name: this.updateComment.name,
                date: this.updateComment.date,
                text: this.updateComment.text,
            };
        },
    },

    computed: {
        ...mapGetters({ updateComment: "updateComment" }),
    },

    methods: {
        prepare() {
            if (this.updateComment) {
                this.$store.dispatch("updateComment", {
                    form: this.form,
                    id: this.updateComment.id,
                });
            } else {
                this.$store.dispatch("addComment", this.form);
            }

            setTimeout(() => {
                this.form = {};
            }, 800);
        },
    },

    components: { DatePicker },
};
</script>

<template>
    <form class="form">
        <input
            class="form__input"
            type="text"
            placeholder="Введите ваше имя"
            v-model="form.name"
        />

        <label class="form__picker">
            <p>
                {{
                    this.form.date
                        ? this.form.date.split("-").reverse().join(".")
                        : new Date().toLocaleDateString()
                }}
            </p>

            <svg width="24" height="24">
                <use xlink:href="../images/sprites.svg#date" />
            </svg>

            <date-picker
                v-model="form.date"
                value-type="YYYY-MM-DD"
                format="YYYY-MM-DD"
            ></date-picker>
        </label>

        <svg class="form__button" width="24" height="24" v-on:click="prepare()">
            <use xlink:href="../images/sprites.svg#send" />
        </svg>

        <textarea
            class="form__description"
            rows="5"
            placeholder="Ваш комментарий..."
            v-model="form.text"
        />
    </form>
</template>

<style>
.form {
    display: grid;
    gap: 20px;
    grid-template: auto / repeat(2, 1fr);
    position: relative;
}

.form__input,
.form__picker,
.form__description {
    background-color: rgba(var(--color-v1), 0.02);
    border-radius: var(--theme-radius);
    color: rgb(var(--color-v1));
    font: inherit;
    padding: 20px 40px;
}

.form__description {
    grid-column: 1 / -1;
}

.form__button {
    inset: auto 40px 20px auto;
    position: absolute;
    transform: rotate(45deg);
}

.form__picker {
    cursor: pointer;
    display: grid;
    gap: 10px;
    grid-template: auto / 1fr auto;
    place-items: center baseline;
    position: relative;
}

.mx-datepicker {
    inset: 0;
    position: absolute;
    visibility: hidden;
    width: auto;
}

@media only screen and (max-width: 600px) {
    .form {
        grid-template: auto / 1fr;
    }
}
</style>
