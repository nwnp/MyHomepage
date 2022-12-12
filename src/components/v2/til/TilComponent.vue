<template>
  <div class="til-container">
    <div class="til-wrap">
      <div v-if="userId !== paramId" class="wrap">
        <RouteComponent />
      </div>
      <div v-if="userId === paramId" class="register-component">
        <RegisterBtnComponent :registerInfo="registerInfo" />
      </div>
      <div v-if="getTilsByUserId.length === 0" class="til-card-wrap">
        현재 TIL이 존재하지 않습니다 😭
      </div>
      <div v-for="(til, id) in getTilsByUserId" :key="id" class="til-card-wrap">
        <div class="card-list" @click="clickedTil(id)">
          <div>📌 {{ til.title }}</div>
          <div class="card-content">{{ til.til_content }}</div>
        </div>
      </div>
    </div>
    <TilDetailComponent
      v-if="tilDetailModal"
      class="detail-modal"
      :tilInfo="tilInfo"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query";
import { getCookie } from "@/functions/getCookie";
import RouteComponent from "@/components/v2/common/RouteComponent.vue";
import TilDetailComponent from "@/components/v2/til/TilDetailComponent.vue";
import RegisterBtnComponent from "@/components/v2/common/RegisterBtnComponent.vue";

export default {
  components: { RouteComponent, TilDetailComponent, RegisterBtnComponent },
  data() {
    return {
      userId: getCookie("userId"),
      paramId: this.$route.params.id,
      getTilsByUserId: [],
      tilInfo: {
        tilId: "",
        title: "",
        content: "",
        userId: "",
      },
      registerInfo: {
        type: "til",
        userId: getCookie("userId"),
      },
      tilDetailModal: false,
    };
  },
  watch: {
    getTilsByUserId: function getTilsByUserId() {
      this.$apollo.queries.getTilsByUserId.refetch();
    },
  },
  apollo: {
    getTilsByUserId: {
      query: Query.getTilsByUserId,
      variables() {
        return {
          UserId: ~~this.paramId,
        };
      },
    },
  },
  methods: {
    clickedTil(id) {
      this.tilInfo = {
        tilId: this.getTilsByUserId[id].id,
        title: this.getTilsByUserId[id].title,
        content: this.getTilsByUserId[id].til_content,
        userId: this.$route.params.id,
      };
      this.tilDetailModal = !this.tilDetailModal;
    },
    closeModal() {
      this.tilDetailModal = !this.tilDetailModal;
    },
  },
};
</script>

<style scoped>
.til-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
}

.til-wrap {
  padding: 10px;
  margin-bottom: 65px;
}

.register-component {
  width: 100%;
}

.til-card-wrap {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
}

.card-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
}

.card-content {
  text-overflow: ellipsis;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  padding-left: 10px;
  border-left: 2px solid #e5e5e5;
  height: 30px;
  color: #b7b7b7;
  margin: 8px 0px 0px 10px;
  display: flex;
  align-items: center;
}

.detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
