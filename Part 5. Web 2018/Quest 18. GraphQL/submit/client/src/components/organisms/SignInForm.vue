<template>
    <div class="o-signin-form">
        <header>
            <Heading
                :heading-modifier="header.headingClass"
            >
                <h1>{{ header.title }}</h1>
            </Heading>
        </header>

        <div class="o-signin-input">
            <Input
                id="signin-input--id"
                :input-modifier="input.signInClass"
                :placeholder="input.placeHolderId"
                @input-value="setIdText"
            />
            <Input
                id="signin-input--password"
                :input-modifier="input.signInClass"
                :type="input.typePw"
                :placeholder="input.placeHolderPw"
                @input-value="setPwText"
            />
        </div>

        <footer class="o-signin-btns">
            <Button
                id="signin-btn--login"
                class="o-signin--signin-btn"
                :btn-modifier="btns.signInBtnClass"
                @click-event="signIn"
            >
                {{ btns.signInBtnText }}
            </Button>

            <div class="o-signin--signup-text">
                <Span>
                    {{ footer.signUpDescription }}
                </Span>
                <RouterLink :to="footer.signUpPath">
                    {{ footer.signUpLinkText }}
                </RouterLink>
            </div>
        </footer>
    </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue';
import Input from '@/components/atoms/Input.vue';
import Heading from '@/components/atoms/Heading.vue';
import RouterLink from '@/components/atoms/RouterLink.vue';
import Span from '@/components/atoms/Span.vue';
import { LOGIN } from '@/gql/user.js';

export default {
    components: {
        Button,
        Input,
        Heading,
        RouterLink,
        Span,
    },

    data() {
        return {
            header: {
                title: 'Sign In',
                headingClass: 'h1',
            },
            input: {
                placeHolderId: 'Your ID',
                placeHolderPw: 'Your Password',
                signInClass: 'login',
                typePw: 'password',
                idText: '',
                pwText: '',
            },
            btns: {
                signInBtnClass: 'signin',
                signInBtnText: 'Sign In',
            },
            footer: {
                signUpDescription: 'New to Notepad?',
                signUpLinkText: 'Sign Up Now',
                signUpPath: '/signup',
            },
        };
    },

    methods: {
        signIn() {
            const loginInfo = {
                id: this.input.idText,
                pw: this.input.pwText,
            };

            this.$apollo.query({
                query: LOGIN,
                variables: {
                    id: loginInfo.id,
                    password: loginInfo.pw,
                },
            }).then(res => {
                const isAuthorized = res.data.login;
                isAuthorized ? this.$router.push('/') : alert('올바르게 입력 부탁드립니다');
            });
        },
        setIdText(v) {
            this.input.idText = v;
        },
        setPwText(v) {
            this.input.pwText = v;
        },
    },
}
</script>

<style lang="scss" scoped>
.o-signin-form {
    display: flex;
    flex-direction: column;
    width: 480px;
    padding: 50px;
    background-color: #ffffff;
    -webkit-box-shadow: 2px 2px 6px 3px rgba(230,230,230,1);
    -moz-box-shadow: 2px 2px 6px 3px rgba(230,230,230,1);
    box-shadow: 2px 2px 6px 3px rgba(230,230,230,1);
}

.o-signin-input, .o-signin-btns {
    display: flex;
    flex-direction: column;
}

.o-signin--signin-btn {
    margin-top: 50px;
}

.o-signin--signup-text {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;

    & > * {
        margin-left: 10px;
    }
}
</style>
