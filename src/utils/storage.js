export const getAppToken = () => {
  return uni.getStorageSync("APP_TOKEN");
};

export const setAppToken = (token) => {
  return uni.setStorageSync("APP_TOKEN", token);
};

export const getHistoryChatRecords = () => {
  return uni.getStorageSync("HISTORY_CHAT_RECORD") || [];
};

export const setHistoryChatRecords = (data) => {
  return uni.setStorageSync("HISTORY_CHAT_RECORD", data);
};

export const setHadShared = (data) => {
  return uni.setStorageSync("HAD_SHARED", data);
};

export const getHadShared = (data) => {
  return uni.getStorageSync("HAD_SHARED");
};

export const getAIRequestModel = () => {
  return uni.getStorageSync("AI_REQUEST_MODEL") || [];
};

export const setAIRequestModel = (data) => {
  return uni.setStorageSync("AI_REQUEST_MODEL", data);
};
