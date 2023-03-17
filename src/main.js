import Vue from "vue";
import uView from "uview-ui";
import App from "./App";
import httpInterceptor from "@/utils/http.interceptor.js";

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});

Vue.use(uView);
Vue.use(httpInterceptor, app);

app.$mount();

Vue.prototype.toast = function (message) {
  uni.showToast({
    icon: "none",
    title: message,
    duration: 3000,
  });
};
