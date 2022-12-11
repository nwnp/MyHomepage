<template>
  <div>
    <div>관리자한테 피드백하기</div>
    <div>
      {{ user }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$route.params.id,
    };
  },
};
</script>

<style lang="scss" scoped></style>
