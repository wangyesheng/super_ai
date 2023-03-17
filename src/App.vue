<style lang="scss">
@import "uview-ui/index.scss";

.u-drawer {
  .u-mode-center-box {
    width: 80vw !important;
    margin: 0 auto;
    border-radius: 20rpx;
    padding: 40rpx;
    box-sizing: border-box;

    .btn-mobile-inner {
      display: flex;
      align-items: center;

      img {
        width: 48rpx;
        height: 48rpx;
      }
      div {
        margin-left: 20rpx;
      }
    }

    .title {
      font-size: 32rpx;
      margin-bottom: 30rpx;
      color: #666;
      font-weight: 500;
      text-align: center;
    }
    .tips {
      color: #6b6b6b;
      font-size: 30rpx;
      font-weight: 500;
      margin-bottom: 50rpx;
      text-align: center;
    }
  }
}
</style>

<script>
export default {
  name: "App",

  onLaunch() {
    uni.hideTabBar();
  },
};
</script>
