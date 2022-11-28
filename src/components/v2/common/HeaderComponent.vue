<template>
  <header class="header-container">
    <div class="header-top">
      <a href="/main">MY-HOMEPAGE</a>
      <button @click="clickedMenu">
        <i class="fa-solid fa-bars fa-xl"></i>
      </button>
    </div>
    <div v-if="sidebar" class="sidebar-wrap">
      <div class="sidebar">sidebar</div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false,
    };
  },
  methods: {
    clickedMenu() {
      this.sidebar = !this.sidebar;
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.3);
  height: 50px;
  background-color: white;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

a {
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
  color: black;
}

button {
  border: none;
  background-color: white;
}

i {
  cursor: pointer;
}

.sidebar-wrap {
  position: fixed;
  display: flex;
  right: 0;
  top: 0;
  left: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  flex-direction: row-reverse;
}

.sidebar {
  background-color: white;
  width: 55%;
}
</style>
