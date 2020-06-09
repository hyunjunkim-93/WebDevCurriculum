<template>
    <span class="a-span">
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: {
        spanModifier: {
            type: String,
            default: 'default',
        },
    },
}
</script>

<style lang="scss" scoped>
.a-span {

    &--default {}
}
</style>
