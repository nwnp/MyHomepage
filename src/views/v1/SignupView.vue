<template>
  <div class="signup">
    <SignupComponent />
  </div>
</template>

<script>
import SignupComponent from "@/components/v1/SignupComponent.vue";

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
  height: 100%;
}
</style>
