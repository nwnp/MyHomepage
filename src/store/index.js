import Vue from "vue";
import Vuex from "vuex";
import User from "@/store/user";
import Post from "@/store/post";
import Til from "@/store/til";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Post,
    Til,
  },
});
