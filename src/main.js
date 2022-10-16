import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueCarousel from "vue-carousel";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

library.add(faHatWizard);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueCarousel);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
