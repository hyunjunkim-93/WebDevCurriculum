<template>
  <div class="v-signin">
      <SignInForm class="v-login-sign-in" />
  </div>
</template>

<script>
import  SignInForm from '@/components/organisms/SignInForm.vue';

export default {
    components: {
        SignInForm,
    },
}
</script>

<style lang="scss" scoped>
.v-signin {
    box-sizing: border-box;
    width: 100%;
    padding: 100px 30px 60px 30px;
    display: flex;
    justify-content: center;
}
</style>
