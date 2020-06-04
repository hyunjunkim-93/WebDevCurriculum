<template>
    <div class="o-new-note-form">
        <div class="o-new-note-form-textarea">
            <Textarea
                v-show="isWriting"
                class="o-new-note-form--title"
                :textarea-modifier="textarea.newNoteClass"
                :textarea-placeholder="textarea.newNoteTitlePlaceholder"
                :textarea-value="textarea.titleText"
                @input-value="setTitleText"
            />
            <Textarea
                :textarea-modifier="textarea.newNoteClass"
                :textarea-placeholder="textarea.newNotePlaceholder"
                @click.native="setIsWritingTrue"
                :textarea-value="textarea.noteText"
                @input-value="setNoteText"
            />
        </div>
        <div
            v-show="isWriting"
            class="o-new-note--btns"
        >
            <Button
                :btn-modifier="btns.addClass"
                @click-event="addNewNote"
            >
                {{ btns.AddText }}
            </Button>
            <Button
                :btn-modifier="btns.closeClass"
                @click-event="closeNewNoteForm"
            >
                {{ btns.closeText }}
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

    data() {
        return {
            isWriting: false,
            textarea: {
                newNoteTitlePlaceholder: 'Title',
                newNotePlaceholder: 'Take a note...',
                newNoteClass: 'new-note',
                noteText: '',
                titleText: '',
            },
            btns: {
                closeClass: 'close',
                addClass: 'add',
                closeText: 'Close',
                AddText: 'Add',
            },
        };
    },

    methods: {
        ...mapActions([ 'fetchNewNoteApi' ]),
        setIsWritingTrue() {
            this.isWriting = true;
        },
        closeNewNoteForm() {
            this.isWriting = false;
        },
        setNoteText(v) {
            this.textarea.noteText = v;
        },
        setTitleText(v) {
            this.textarea.titleText = v;
        },
        addNewNote() {
            const obj = {
                text: this.textarea.noteText,
                title: this.textarea.titleText,
            };
            this.fetchNewNoteApi(obj).then(({ ok, msg, path }) => {
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
            this.initText();
            this.closeNewNoteForm();
        },
        initText() {
            this.textarea.noteText = '';
            this.textarea.titleText = '';
        },
    },
}
</script>

<style lang="scss" scoped>
.o-new-note-form {
    width: 640px;
    border-radius: 4px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 10px 20px;
    -webkit-box-shadow: 1px 1px 5px 3px rgba(214,207,214,1);
    -moz-box-shadow: 1px 1px 5px 3px rgba(214,207,214,1);
    box-shadow: 1px 1px 5px 3px rgba(214,207,214,1);
}
.o-new-note-form, .o-new-note-form-textarea {
    display: flex;
    flex-direction: column;
}

.o-new-note-form--title {
    font-size: 16px;
}

.o-new-note--btns {
    display: flex;
    justify-content: flex-end;
}

@media screen and (max-width: 800px) {
    .o-new-note-form {
        width: 320px;
    }
}
</style>
