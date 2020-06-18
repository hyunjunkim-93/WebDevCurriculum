<template>
    <button
        class="a-button"
        :class="`a-button--${btnModifier}`"
        @click.prevent="$emit('click-event')"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        btnModifier: {
            type: String,
            default: 'default',
        },
    },
}
</script>

<style lang="scss" scoped>
.new-notepad-btns {
    width: 90px;
    height: 45px;
    border-radius: 0;
    font-size: 16px;
    font-weight: 600;
    background-color: #ffffff;

    &:hover {
        background-color: rgba(243, 243, 243, 0.5);
    }
}

.login-form-btns {
    height: 60px;
    font-size: 18px;
    border-radius: 4px;
    color: #ffffff;
}

.a-button {
    border: none;
    margin: 10px 0;

    &:hover {
        cursor: pointer;
    }

    &--default {

    }

    &--signin {
        @extend .login-form-btns;
        background-color: #624FCC;
    }

    &--signup {
        @extend .login-form-btns;
        background-color: #2EA861;
    }

    &--close {
        @extend .new-notepad-btns;
        color: rgb(39, 39, 39);
    }

    &--add {
        @extend .new-notepad-btns;
        color: #624FCC;
    }

    &--delete {
        @extend .new-notepad-btns;
        border-radius: 25px;
        width: 35px;
        height: 35px;
    }

    &--logout {
        @extend .new-notepad-btns;
        color: red;
    }
}
</style>
