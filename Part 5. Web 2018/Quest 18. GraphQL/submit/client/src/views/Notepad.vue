<template>
    <div class="v-notepad">
        <Button
            class="v-notepad-logout"
            :btn-modifier="btns.logoutBtnClass"
            @click-event="logout"
        >
            {{ btns.logoutBtnText }}
        </Button>
        <NewNoteForm class="v-notepad-new-note-form" />
        <NoteCardLayout class="v-notepad-note-card-layout" />
    </div>
</template>

<script>
import NewNoteForm from '@/components/organisms/NewNoteForm.vue';
import NoteCardLayout from '@/components/organisms/NoteCardLayout.vue';
import Button from '@/components/atoms/Button.vue';
import { AUTH, LOGOUT } from '@/gql/user.js';

export default {
    components: {
        NewNoteForm,
        NoteCardLayout,
        Button,
    },

    data() {
        return {
            btns: {
                logoutBtnClass: 'logout',
                logoutBtnText: 'LOGOUT',
            },
        };
    },

    mounted() {
        this.checkAuth();
    },

    methods: {
        checkAuth() {
            this.$apollo.query({
                query: AUTH
            }).then(({ data }) => {
                const { auth } = data;
                if (!auth) {
                    alert('로그인 부탁드립니다');
                    this.$router.push('/signin');
                }
            })
        },
        logout() {
            this.$apollo.query({
                query: LOGOUT
            }).then(({ data }) => {
                const { logout } = data;
                if (logout) {
                    alert('로그아웃 됐습니다');
                    this.$router.push('/signin');
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.v-notepad {
    padding: 60px 20px 0 20px;
}

.v-notepad-logout {
    display: block;
    margin-left: auto;
}

.v-notepad-new-note-form {
    margin: 0 auto;
}

.v-notepad-note-card-layout {
    margin: 50px 0;
}
</style>
