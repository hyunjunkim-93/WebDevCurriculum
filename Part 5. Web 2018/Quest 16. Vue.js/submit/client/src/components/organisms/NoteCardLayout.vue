<template>
    <div class="o-notepad-layout">
        <NoteCard
            v-for="(note, index) in notes"
            :key="index"
            :note="note"
        />
    </div>
</template>

<script>
import NoteCard from '@/components/molecules/NoteCard.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('notepad');

export default {
    components: {
        NoteCard,
    },

    computed: {
        ...mapState([ 'notes' ]),
    },

    created() {
        this.fetchGetNotesApi().then(({ ok, msg, path }) => {
            if (path) {
                alert(msg);
                this.$router.push(path);
                return;
            }
            if (!ok) {
                alert(msg);
                return;
            }
        });
    },

    methods: {
        ...mapActions([ 'fetchGetNotesApi' ]),
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
