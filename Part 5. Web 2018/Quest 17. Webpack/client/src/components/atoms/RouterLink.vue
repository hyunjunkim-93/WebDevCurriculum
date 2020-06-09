<template>
    <router-link
        class="a-router-link"
        :class="`a-router-link--${linkModifier}`"
        :to="to"
    >
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        linkModifier: {
            type: String,
            default: 'default',
        },
        to: {
            type: String || Object,
            default() {
                return '/';
            },
        },
    },
}
</script>

<style lang="scss" scoped>
.a-router-link {

    &--default {

    }
}
</style>
