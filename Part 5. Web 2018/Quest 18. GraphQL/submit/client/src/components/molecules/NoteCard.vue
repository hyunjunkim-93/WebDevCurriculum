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
                class="m-note-form--delete"
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
import { ALL_NOTEPADS, UPDATE_NOTEPAD, DELETE_NOTEPAD } from '@/gql/notepad.js';

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
                const id = this.note.id;
                const title = this.textarea.titleText;
                const text = this.textarea.noteText;

                this.$apollo.mutate({
                    mutation: UPDATE_NOTEPAD,
                    variables: {
                        id,
                        title,
                        text,
                    },
                    update: (store) => {
                        const data = store.readQuery({
                            query: ALL_NOTEPADS
                        });
                        const note = data.notepads.find(el => (el.id === id));
                        note.title = title;
                        note.text = text;
                        store.writeQuery({ query: ALL_NOTEPADS, data});
                    }
                })
            },
        },
    },

    created() {
        this.initText();
    },

    methods: {
        deleteNote() {
            const id = this.note.id;
            this.$apollo.mutate({
                mutation: DELETE_NOTEPAD,
                variables: {
                    id,
                },
                update: (store) => {
                    const data = store.readQuery({
                        query: ALL_NOTEPADS
                    });
                    const noteIdx = data.notepads.findIndex(el => (el.id === id));
                    data.notepads.splice(noteIdx, 1);
                    store.writeQuery({ query: ALL_NOTEPADS, data});
                }
            })
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
