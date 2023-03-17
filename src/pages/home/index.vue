<style lang="scss">
page {
  background: #f8f8f8;

  .app-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;

    .app-content {
      width: 100%;
      height: calc(100% - 200rpx);
      background: #f8f8f8;

      .scroll-view {
        height: 100%;
        .scroll-inner {
          padding-bottom: 40rpx;

          .chat-layer {
            padding: 20rpx;

            &_user {
              text-align: right;
              color: white;
              margin-top: 30rpx;
              margin-bottom: 20rpx;

              &_content {
                max-width: 90%;
                word-break: break-all;
                background-color: #7285ff;
                border-radius: 25rpx;
                display: inline-block;
                padding: 20rpx;
                font-size: 26rpx;
                text-align: left;
              }
            }

            &_gpt {
              border-radius: 10rpx;
              width: 80rpx;
              height: 80rpx;
              img {
                width: 100%;
                height: 100%;
                border-radius: 10rpx;
              }
            }

            .chat-layer_gpt_content {
              max-width: 90%;
              word-break: break-all;
              background: #fff;
              color: #000;
              border-radius: 25rpx;
              display: inline-block;
              padding: 0 35rpx;
              margin-top: 20rpx;
              font-size: 26rpx;

              rich-text {
                .hl-pre {
                  background: #f5f5f5;
                }

                .hl-code {
                  color: #000 !important;
                }
              }

              .loading {
                display: flex;
                padding-top: 25rpx;
                padding-bottom: 25rpx;

                & > view {
                  background: #fff;
                  width: 20rpx;
                  height: 20rpx;
                  border-color: black;
                  border-radius: 50%;

                  &:nth-child(1) {
                    animation: jump 1.3s -0.32s linear infinite;
                  }

                  &:nth-child(2) {
                    animation: jump 1.3s -0.16s linear infinite;
                  }

                  &:nth-child(3) {
                    animation: jump 1.3s linear infinite;
                  }
                }
              }

              @keyframes jump {
                0%,
                80%,
                100% {
                  transform: scale(0);
                  background-color: #f9f9f9;
                }

                40% {
                  transform: scale(1);
                  background-color: #a2a2a2;
                }
              }
            }
          }
        }
      }

      .home-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 100rpx;

        img {
          width: 100rpx;
          height: 100rpx;
          margin-bottom: 50rpx;
        }

        .example {
          text-align: center;

          &-title {
            font-size: 32rpx;
            font-weight: 550;
            margin-bottom: 40rpx;
          }

          &-layer {
            padding: 15rpx 30rpx;
            margin-bottom: 20rpx;
            background-color: #7285ff;
            color: #fff;
            border-radius: 15rpx;
          }
        }
      }
    }

    .app-footer {
      width: 100%;
      height: 200rpx;
      background-color: #fff;
      position: relative;
      box-shadow: 0 -10rpx 20rpx #eee;

      &-inner {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20rpx;
        box-sizing: border-box;

        .question-input {
          background: #f8f8f8;
          width: 80%;
          height: 80rpx;
          border-radius: 10rpx;
          padding: 10rpx;
          color: #000;
          font-size: 26rpx;
          font-weight: 550;
          margin-right: 20rpx;
        }

        .btn-send {
          width: 20%;
          height: 100%;
          border: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20rpx 0;
          &::after {
            border: none;
          }

          img {
            height: 50rpx;
            width: 50rpx;
          }
        }
      }
    }
  }

  .authLoading {
    display: flex;

    view {
      background: #fff;
      width: 16rpx;
      height: 16rpx;
      border-color: black;
      border-radius: 50%;
    }

    view:nth-child(1) {
      animation: jumpForAuthLoading 1.3s -0.96s linear infinite;
    }

    view:nth-child(2) {
      animation: jumpForAuthLoading 1.3s -0.8s linear infinite;
    }

    view:nth-child(3) {
      animation: jumpForAuthLoading 1.3s -0.64s linear infinite;
    }

    view:nth-child(4) {
      animation: jumpForAuthLoading 1.3s -0.48s linear infinite;
    }

    view:nth-child(5) {
      animation: jumpForAuthLoading 1.3s -0.32s linear infinite;
    }
  }

  @keyframes jumpForAuthLoading {
    0%,
    80%,
    100% {
      transform: scale(0);
    }

    40% {
      transform: scale(1);
    }
  }
}
</style>

<template>
  <div class="app-wrap" :style="{ bottom: keyboardHeight }">
    <div class="app-content">
      <div class="home-page" v-if="isHomePage">
        <img src="/static/images/logo.png" alt="" />
        <div class="example">
          <div class="example-title">示例</div>
          <div class="example-layer" @click="onWriteQuestion('你好')">
            "你好"
          </div>
          <div class="example-layer" @click="onWriteQuestion('我们来聊聊天吧')">
            "我们来聊聊天吧"
          </div>
          <div class="example-layer" @click="onWriteQuestion('讲个笑话吧')">
            "讲个笑话吧"
          </div>
          <div class="example-layer" @click="onWriteQuestion('你能做什么')">
            "你能做什么"
          </div>
        </div>
      </div>
      <scroll-view
        v-else
        class="scroll-view"
        scroll-y
        scroll-with-animation
        :scroll-into-view="scrollInto"
      >
        <div class="scroll-inner">
          <div
            class="chat-layer"
            v-for="(item, index) in chatRecords"
            :key="index"
          >
            <div class="chat-layer_user" v-if="item.chat[0].content.length > 0">
              <div class="chat-layer_user_content">
                {{ item.chat[0].content }}
              </div>
            </div>
            <div :id="'gptId' + index">
              <div class="chat-layer_gpt">
                <img src="/static/images/avatar.png" />
              </div>
              <div
                class="chat-layer_gpt_content"
                v-if="item.chat[1].content.length > 0"
              >
                <mp-html
                  :copy-link="true"
                  :markdown="true"
                  :lazy-load="true"
                  :selectable="true"
                  :tagStyle="tagStyle"
                  :content="item.chat[1].content"
                />
              </div>
              <div class="chat-layer_gpt_content" v-else>
                <div class="loading">
                  <div v-for="i in 3" :key="i" />
                </div>
              </div>
            </div>
          </div>
          <div :id="`polyfill_${chatRecords.length}`"></div>
        </div>
      </scroll-view>
    </div>
    <div class="app-footer">
      <div class="app-footer-inner">
        <textarea
          maxlength="-1"
          class="question-input"
          placeholder="小麦琪等你来问~"
          v-model="question"
          :adjust-position="false"
          @focus="onInputBindFocus"
          @blur="onInputBindBlur"
        />
        <button class="btn-send" @click="$u.debounce(onAskQuestion, 500)">
          <img src="/static/images/icon-send.png" alt="" />
        </button>
      </div>
    </div>
    <u-popup mode="center" v-model="authPopup.visible">
      <div class="title">提示：</div>
      <div class="tips">开启AI学习之旅，需要先授权登录哦~</div>
      <u-button shape="circle" type="primary" @click="onGenAuth">
        <div class="btn-mobile-inner">
          <img src="/static/images/icon-wechat.png" alt="" />
          <div v-if="!authPopup.isAuthing">立即授权</div>
          <div v-else class="authLoading">
            <div v-for="i in 3" :key="i"></div>
          </div>
        </div>
      </u-button>
    </u-popup>
    <u-popup mode="center" v-model="sharePopup.visible">
      <div class="title">提示：</div>
      <div class="tips">分享后继续使用！</div>
      <u-button
        shape="circle"
        type="primary"
        open-type="share"
        @click="onShareClick"
      >
        <div class="btn-mobile-inner">
          <img src="/static/images/icon-share.png" alt="" />
          <div>立即分享</div>
        </div>
      </u-button>
    </u-popup>
  </div>
</template>

<script>
import {
  getHistoryChatRecords,
  setHistoryChatRecords,
  getAppToken,
  setAppToken,
  setHadShared,
  getHadShared,
  getAIRequestModel,
  setAIRequestModel,
} from "@/utils/storage";
import { genTokenRes, getUserTodaySearchTimesRes, getAnswerRes } from "@/api";
import mpHtml from "@/components/mp-html";

export default {
  data() {
    return {
      keyboardHeight: 0,
      question: "",
      scrollInto: "",
      chatRecords: [],
      aiRequestModel: [],
      answered: true,
      authPopup: {
        visible: false,
        isAuthing: false,
      },
      sharePopup: {
        visible: false,
      },
      tagStyle: {
        p: "font-size: 26rpx;padding-top: 8px;padding-bottom: 8px;margin: 0;line-height: 26px;color: #000",
        h1: "margin-top: 30px;margin-bottom: 15px;font-weight: bold;font-size: 34rpx;color: #000",
        h2: "margin-top: 30px;margin-bottom: 15px;font-weight: bold;font-size: 32rpx;color: #000",
        h3: "margin-top: 30px;margin-bottom: 15px;font-weight: bold;font-size: 30rpx;color: #000",
        h4: "margin-top: 30px;margin-bottom: 15px;font-weight: bold;font-size: 28rpx;color: #000",
        h5: "margin-top: 30px;margin-bottom: 15px;font-weight: bold;font-size: 26rpx;color: #000",
        h6: "margin-top: 30px;margin-bottom: 15px;font-weight: bold;font-size: 26rpx;color: #000",
        ol: "margin-top: 8px;margin-bottom: 8px;padding-left: 25px;color: black;color: #000",
        ul: "margin-top: 8px;margin-bottom: 8px;padding-left: 25px;color: black;color: #000",
        li: "margin-top: 5px;margin - bottom: 5px;line - height: 26 px;color: #000",
      },
    };
  },

  components: {
    mpHtml,
  },

  computed: {
    isHomePage() {
      return this.chatRecords.length === 0;
    },
  },

  methods: {
    onInputBindFocus(e) {
      this.keyboardHeight = e.detail.height + "px";
    },
    onInputBindBlur() {
      this.keyboardHeight = 0;
    },
    init() {
      this.chatRecords = getHistoryChatRecords() || [];
      this.aiRequestModel = getAIRequestModel() || [];
    },
    onGenAuth() {
      if (this.authPopup.isAuthing) return;
      this.authPopup.isAuthing = true;
      uni.login({
        provider: "weixin",
        success: async ({ code }) => {
          const data = await genTokenRes({ sessionKeyEncode: code });
          setAppToken(data);
          this.toast(`授权成功，快去体验吧~`);
          this.authPopup.isAuthing = false;
          this.authPopup.visible = false;
        },
        fail: (err) => {
          this.authPopup.isAuthing = false;
          reject(err);
        },
      });
    },
    async onAskQuestion() {
      if (!getAppToken()) {
        this.authPopup.visible = true;
        return;
      }
      if (this.answered) {
        this.question = this.question.replace(/\s+/g, "");
        if (!this.question) {
          this.toast(`问题不能为空哦~`);
          return;
        }
        const times = await getUserTodaySearchTimesRes();
        if (times !== 0 && Number.isInteger(times / 15)) {
          const hadShared = getHadShared();
          if (!hadShared) {
            setHadShared(0);
            this.sharePopup.visible = true;
            return;
          } else {
            this.setHadSharedCallback = () => {
              setHadShared(0);
            };
          }
        }
        this.answered = false;
        this.createRequsetModel();
        const lastIndex = this.chatRecords.length - 1;
        this.scrollInto = "gptId" + lastIndex;
        this.getAnswer(lastIndex);
        // 重置AI会话
        if (this.aiRequestModel.length >= 10) {
          setAIRequestModel([]);
          this.aiRequestModel = [];
        }
      } else {
        this.toast(`请等待小麦琪的回应~`);
      }
    },
    createRequsetModel() {
      // AI会话，请求入参
      this.aiRequestModel.push(
        {
          role: "user",
          content: this.question,
        },
        {
          role: "assistant",
          content: "",
        }
      );
      // 聊天记录
      this.chatRecords.push({
        chat: [
          {
            role: "user",
            content: this.question,
          },
          {
            role: "assistant",
            content: "",
          },
        ],
      });
      this.question = "";
    },
    async getAnswer(index) {
      const reqData = this.aiRequestModel.slice(0, -1);
      try {
        const result = await getAnswerRes({
          platform: "wechat",
          messages: reqData,
        });
        const answer = result["choices"][0]["message"]["content"];
        const chatLength = this.aiRequestModel.length;
        if (chatLength !== 0) {
          this.aiRequestModel[chatLength - 1].content = answer;
        }
        try {
          const success = await this.print(answer, index);
          if (success) {
            this.scrollInto = "polyfill_" + this.chatRecords.length;
          }
        } finally {
          if (this.setHadSharedCallback) {
            this.setHadSharedCallback();
            this.setHadSharedCallback = undefined;
          }
        }
      } catch (error) {
        this.chatRecords[index].chat[1].content = error;
      } finally {
        this.question = "";
        this.answered = true;
      }
    },
    print(answer, index) {
      return new Promise((resolve, reject) => {
        let i = 0;
        const intervalId = setInterval(() => {
          try {
            if (i <= answer.length) {
              this.chatRecords[index].chat[1].content =
                answer.slice(0, i++) + "_|";
            } else {
              this.chatRecords[index].chat[1].content = answer;
              // 写入完毕后更新缓存
              setHistoryChatRecords(this.chatRecords);
              setAIRequestModel(this.aiRequestModel);
              clearInterval(intervalId);
              resolve(true);
            }
            uni.vibrateShort();
          } catch (e) {
            clearInterval(intervalId);
            reject(false);
          }
        }, 10);
      });
    },
    onShareClick() {
      setHadShared(1);
      this.sharePopup.visible = false;
    },
    onWriteQuestion(value) {
      this.question = value;
    },
  },

  onLoad() {
    this.init();
  },

  mounted() {
    setTimeout(() => {
      this.scrollInto = `polyfill_${this.chatRecords.length}`;
    }, 1000);
  },

  onShareAppMessage() {
    return {
      title: "开启AI学习之旅，小麦琪等你哦～",
      path: "/pages/home/index",
    };
  },

  onShareTimeline() {
    return {
      title: "开启AI学习之旅，小麦琪等你哦～",
      path: "/pages/home/index",
    };
  },
};
</script>
