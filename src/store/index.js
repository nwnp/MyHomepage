import Vue from "vue";
import Vuex from "vuex";
import User from "@/store/user";
import Post from "@/store/post";
import Til from "@/store/til";
import GuestBook from "@/store/guest-book";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Post,
    Til,
    GuestBook,
  },
});
