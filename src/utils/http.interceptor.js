import { getAppToken } from "./storage";

const install = (Vue, vm) => {
  Vue.prototype.$u.http.setConfig({
    baseUrl: "",
    showLoading: false,
  });

  Vue.prototype.$u.http.interceptor.request = (config) => {
    const token = getAppToken();
    token && (config.header.Authentication = token);
    return config; // 如果 return 一个 false 值，则会取消本次请求
  };

  Vue.prototype.$u.http.interceptor.response = ({ code, data }) => {
    if (code === 0) {
      return data;
    } else {
      return false;
    }
  };
};

export default {
  install,
};
