<template>
    <div class="o-notepad-layout">
        <NoteCard
            v-for="(note, index) in notepads"
            :key="index"
            :note="note"
        />
    </div>
</template>

<script>
import NoteCard from '@/components/molecules/NoteCard.vue';
import { ALL_NOTEPADS } from '@/gql/notepad.js';

export default {
    components: {
        NoteCard,
    },

    data() {
        return {
            notepads: [],
        };
    },

    apollo: {
        notepads: ALL_NOTEPADS,
    },
}
</script>

<style lang="scss" scoped>
.o-notepad-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2em 2em;
    grid-auto-rows: minmax(150px, auto);   
}

@media screen and (max-width: 1160px) {
    .o-notepad-layout {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (max-width: 800px) {
    .o-notepad-layout {
        grid-template-columns: 1fr;
    }
}
</style>
