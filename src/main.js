import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApollo from "vue-apollo";
import VueCarousel from "vue-carousel";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { apolloClient } from "./apollo/apollo.js";
import VueCookies from "vue-cookies";

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

library.add(faHatWizard);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueCarousel);
Vue.use(VueApollo);
Vue.use(VueCookies);

Vue.$cookies.config("1d");

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
