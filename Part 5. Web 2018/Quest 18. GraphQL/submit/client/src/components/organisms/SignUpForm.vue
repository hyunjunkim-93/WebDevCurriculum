<template>
    <div class="o-signup-form">
        <header class="o-signup-title">
            <Heading
                :heading-modifier="header.headingClass"
            >
                <h1>{{ header.title }}</h1>
            </Heading>
        </header>

        <div class="o-signup-input">
            <Input
                id="signup-input--id"
                :input-modifier="input.signupClass"
                :placeholder="input.placeHolderId"
                @input-value="setIdText"
            />
            <Input
                id="signup-input--password"
                :input-modifier="input.signupClass"
                :type="input.typePw"
                :placeholder="input.placeHolderPw"
                @input-value="setPwText"
            />
            <Input
                id="signup-input--nickname"
                :input-modifier="input.signupClass"
                :placeholder="input.placeHolderNickname"
                @input-value="setNicknameText"
            />
        </div>

        <footer class="o-signup-btns">
            <Button
                class="o-signup--signup-btn"
                :btn-modifier="btns.signUpBtnClass"
                @click-event="signUp"
            >
                {{ btns.signUpBtnText }}
            </Button>

            <div class="o-signup--signin-text">
                <Span>
                    {{ footer.signInDescription }}
                </Span>
                <RouterLink :to="footer.signInPath">
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
import { SIGN_UP } from '@/gql/user.js';

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
                title: 'Sign Up',
                headingClass: 'h1',
            },
            input: {
                placeHolderId: 'Your ID',
                placeHolderPw: 'Your Password',
                placeHolderNickname: 'Your Nickname',
                signupClass: 'login',
                typePw: 'password',
                idText: '',
                pwText: '',
                nicknameText: '',
            },
            btns: {
                signUpBtnClass: 'signup',
                signUpBtnText: 'Sign Up',
            },
            footer: {
                signInDescription: 'Back to login?',
                signUpLinkText: 'Sign In Now',
                signInPath: '/signin',
            },
        };
    },

    methods: {
        signUp() {
            const id = this.idText;
            const password = this.pwText;
            const nickname = this.nicknameText;

            this.$apollo.mutate({
                mutation: SIGN_UP,
                variables: {
                    id,
                    password,
                    nickname
                },
            }).then(res => {
                const isAuthorized = res.data.signUp;
                isAuthorized ? this.$router.push('/') : alert('올바르게 입력 부탁드립니다');
            });
        },
        setIdText(v) {
            this.idText = v;
        },
        setPwText(v) {
            this.pwText = v;
        },
        setNicknameText(v) {
            this.nicknameText = v;
        },
    },
}
</script>

<style lang="scss" scoped>
.o-signup-form {
    display: flex;
    flex-direction: column;
    width: 480px;
    padding: 50px;
    background-color: #ffffff;
    -webkit-box-shadow: 2px 2px 6px 3px rgba(230,230,230,1);
    -moz-box-shadow: 2px 2px 6px 3px rgba(230,230,230,1);
    box-shadow: 2px 2px 6px 3px rgba(230,230,230,1);
}

.o-signup-input, .o-signup-btns {
    display: flex;
    flex-direction: column;
}

.o-signup--signup-btn {
    margin-top: 50px;
}

.o-signup--signin-text {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;

    & > * {
        margin-left: 10px;
    }
}
</style>
