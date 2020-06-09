<template>
    <div class="v-notepad">
        <NewNoteForm class="v-notepad-new-note-form" />
        <NoteCardLayout class="v-notepad-note-card-layout" />
    </div>
</template>

<script>
import NewNoteForm from '@/components/organisms/NewNoteForm.vue';
import NoteCardLayout from '@/components/organisms/NoteCardLayout.vue';

export default {
    components: {
        NewNoteForm,
        NoteCardLayout,
    },
}
</script>

<style lang="scss" scoped>
.v-notepad {
    padding: 60px 20px 0 20px;
}

.v-notepad-new-note-form {
    margin: 0 auto;
}

.v-notepad-note-card-layout {
    margin: 50px 0;
}
</style>