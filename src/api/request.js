import Vue from "vue";
import { setAppToken } from "@/utils/storage";

const request = ({ url, method, data = {} }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Vue.prototype.$u[method.toLowerCase()](url, data);
      resolve(result);
    } catch (error) {
      let errerData = error;
      if (error.statusCode) {
        // http 网络请求报错
        errerData = error.data;
      } else {
        // 后台接口请求报错
      }
      let { code, message } = errerData;
      if (code === 1003 && message === "auth fail") {
        message = "凭证过期，请重新授权";
        setAppToken();
      }
      Vue.prototype.$u.toast(message);
      reject(message);
    }
  });
};

export default request;
