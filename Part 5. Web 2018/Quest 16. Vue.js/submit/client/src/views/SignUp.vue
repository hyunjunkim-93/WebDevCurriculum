<template>
  <div class="v-signup">
      <SignUpForm />
  </div>
</template>

<script>
import  SignUpForm from '@/components/organisms/SignUpForm.vue';

export default {
    components: {
        SignUpForm,
    },
}
</script>

<style lang="scss" scoped>
.v-signup {
    box-sizing: border-box;
    width: 100%;
    padding: 100px 30px 60px 30px;
    display: flex;
    justify-content: center;
}
</style>
