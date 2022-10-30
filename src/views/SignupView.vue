<template>
  <div class="signup">
    <SignupComponent />
  </div>
</template>

<script>
import SignupComponent from "@/components/SignupComponent.vue";

export default {
  components: {
    SignupComponent,
  },
};
</script>

<style>
.signup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
