<template>
  <header class="header-container">
    <div class="header-top">
      <a href="/main">MY-HOMEPAGE</a>
      <button @click="clickedMenu">
        <i class="fa-solid fa-bars fa-xl"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    clickedMenu() {
      console.log("position absolute으로 메뉴바 나오게 만들기");
      console.log("다른 컴포넌트 실행시키기");
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
</style>
