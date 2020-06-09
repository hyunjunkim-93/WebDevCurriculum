<template>
    <div class="m-note-form">
        <div class="m-note-form-textarea">
            <Textarea
                class="m-note-form--title"
                :textarea-modifier="textarea.noteClass"
                :textarea-placeholder="textarea.noteTitlePlaceholder"
                :textarea-value="note.title"
                @input-value="setTitleText"
            />
            <Textarea
                :textarea-modifier="textarea.noteClass"
                :textarea-value="note.text"
                @input-value="setNoteText"
            />
        </div>

        <div class="m-note-form--btns">
            <Button
                :btn-modifier="btns.deleteClass"
                @click-event="deleteNote"
            >
                🗑
            </Button>
        </div>
    </div>
</template>

<script>
import Textarea from '@/components/atoms/Textarea.vue';
import Button from '@/components/atoms/Button.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('notepad');

export default {
    components: {
        Button,
        Textarea,
    },

    props: {
        note: {
            type: Object,
            default() {
                return {
                    id: '',
                    userId: '',
                    title: '',
                    text: '',
                    createdAt: '',
                    updatedAt: '',
                };
            },
        }
    },

    data() {
        return {
            isWriting: false,
            textarea: {
                noteTitlePlaceholder: 'Untitled',
                noteClass: 'new-note',
                noteText: '',
                titleText: '',
            },
            btns: {
                deleteClass: 'delete',
            },
        };
    },

    watch: {
        textarea: {
            deep: true,
            handler() {
                const info = {
                    title: this.textarea.titleText,
                    text: this.textarea.noteText,
                    id: this.note.id,
                };
                this.fetchUpdateNoteApi(info);
            },
        },
    },

    created() {
        this.initText();
    },

    methods: {
        ...mapActions([ 'fetchDeleteNoteApi', 'fetchUpdateNoteApi' ]),
        deleteNote() {
            this.fetchDeleteNoteApi(this.note.id);
        },
        initText() {
            this.textarea.noteText = this.note.text;
            this.textarea.titleText = this.note.title;
        },
        setNoteText(v) {
            this.textarea.noteText = v;
        },
        setTitleText(v) {
            this.textarea.titleText = v;
        },
    },
}
</script>

<style lang="scss" scoped>
.m-note-form {
    min-width: 320px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px 20px;
    background-color: #ffffff;
    border: 1px solid rgb(192, 192, 192);

    &:hover {
        border: none;
        -webkit-box-shadow: 0px 0px 2px 2px rgba(204,204,204,1);
        -moz-box-shadow: 0px 0px 2px 2px rgba(204,204,204,1);
        box-shadow: 0px 0px 2px 2px rgba(204,204,204,1);
    }
}

.m-note-form--btns {
    display: flex;
    justify-content: flex-end;
}
</style>
