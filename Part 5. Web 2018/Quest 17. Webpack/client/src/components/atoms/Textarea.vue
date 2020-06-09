<template>
    <textarea
        class="a-textarea"
        :class="`a-textarea--${textareaModifier}`"
        :placeholder="textareaPlaceholder"
        @input="$emit('input-value', $event.target.value)"
        :value="textareaValue"
    />
</template>

<script>
export default {
    props: {
        textareaModifier: {
            type: String,
            default: 'default',
        },
        textareaPlaceholder: {
            type: String,
            default: '',
        },
        textareaValue: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="scss" scoped>
.a-textarea {
    width: 100%;
    border: none;
    height: 35px;
    font-size: 14px;
    padding: 0;
    resize: vertical;

    &--default {

    }

    &--new-note {
        font-weight: 600;
        border-radius: 0;
        margin-top: 10px;

        &::placeholder {
            color: rgb(170, 168, 168);
        }

        &:focus {
            outline: none;
        }
    }
}
</style>
