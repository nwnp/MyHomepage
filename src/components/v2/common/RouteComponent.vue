<template>
  <div class="card-wrap">
    <div class="visit-card-wrap1">
      <button class="visit-btn" @click="routing('post')">게시글로 이동</button>
      <button class="visit-btn" @click="routing('main')">홈으로 이동</button>
    </div>
    <div class="visit-card-wrap2">
      <button class="visit-btn" @click="routing('til')">TIL로 이동</button>
      <button class="visit-btn" @click="routing('guest-book')">
        방명록으로 이동
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.id,
    };
  },
  methods: {
    exit() {
      this.sidebar = !this.sidebar;
    },
    routing(to) {
      this.exit();
      this.$router.push({ name: to, params: { id: this.userId } });
    },
  },
};
</script>

<style scoped>
.card-wrap {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.visit-card-wrap1 {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
}

.visit-card-wrap2 {
  display: flex;
  width: 100%;
  gap: 10px;
}

.visit-btn {
  border-radius: 8px;
  border: none;
  height: 40px;
  width: 50%;
  background-color: #60b6f0;
  color: white;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: white;
}
</style>
