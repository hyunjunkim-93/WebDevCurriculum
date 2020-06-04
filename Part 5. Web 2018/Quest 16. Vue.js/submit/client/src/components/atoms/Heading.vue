<template>
    <div
        class="a-heading"
        :class="`a-heading--${headingModifier}`"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: '',
        },
        headingModifier: {
            type: String,
            default: 'default'
        },
    },
}
</script>
