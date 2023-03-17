import request from "./request";

export function getAnswerRes(data) {
  return request({
    url: "/api/chatgpt/search/searchMessage",
    method: "post",
    data,
  });
}

export function genTokenRes(data) {
  return request({
    url: "/api/chatgpt/user/genWeChatToken",
    method: "post",
    data,
  });
}

export function getUserTodaySearchTimesRes() {
  return request({
    url: "/api/chatgpt/search/getUserTodaySearchTimes",
    method: "post",
    data: {
      platform: "wechat",
    },
  });
}

export function getShareLimitRes() {
  return request({
    url: "/api/chatgpt/search/upToStartShare",
    method: "post",
  });
}
