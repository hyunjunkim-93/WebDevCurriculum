<template>
    <input
        class="a-input"
        :class="`a-input--${inputModifier}`"
        :type="inputType"
        :placeholder="inputPlaceholder"
        @input="$emit('input-value', $event.target.value)"
    />
</template>

<script>
export default {
    props: {
        inputModifier: {
            type: String,
            default: 'default',
        },
        inputPlaceholder: {
            type: String,
            default: '',
        },
        inputType: {
            type: String,
            default: 'text',
        },
    },
}
</script>

<style lang="scss" scoped>
.a-input {
    border: none;
    background-color: #f7f7f7;
    border-radius: 4px;
    height: 50px;
    font-size: 16px;
    margin: 10px 0;

    &--default {

    }

    &--login {
        padding-left: 30px;
        border-top: 1px solid rgb(223, 223, 223);
        -webkit-box-shadow: 17px 8px 81px -23px rgba(56,56,56,1);
        -moz-box-shadow: 17px 8px 81px -23px rgba(56,56,56,1);
        box-shadow: 17px 8px 81px -23px rgba(56,56,56,1);
    }
}
</style>
