<!-- home -->
<template>
  <div class="about-container">
    <div class="warpper">
      <h2 class="demo-home__desc">微信退款</h2>
    </div>
    <div>
      <van-field v-model="order.mchNo" label="医院编号:" placeholder="医院编号  9999" />
      <van-field v-model="order.productName" label="商品名称:" placeholder="" />
       <van-field v-model="order.oldMchOrderNo" label="原订单号:" placeholder="原订单号  " />
        <van-field v-model="order.orderAmount" label="原订单金额:" placeholder="  " />
      <van-field v-model="order.refundMchOrderNo" label="退款订单号:" placeholder=" " />
        <van-field v-model="order.refundAmount" label="退款金额:" placeholder="  " />
      <van-field v-model="order.channelType" label="支付渠道:" placeholder="  " />
      <van-field v-model="order.refundReason" label="退款原因:" placeholder="  " />

      <van-button plain hairline type="primary" @click="refundOrder">发起退款</van-button>
    </div>  

</br>





  </div>
</template>

<script>
// 请求接口
import { getAction, postAction } from '@/api/manage.js'
import Vue from 'vue'
import { Field, Button, Toast } from 'vant'
import { Image as VanImage } from 'vant'
import QRCode from 'qrcodejs2'

Vue.use(VanImage)

Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)

import { getUserInfo } from '@/api/user.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      refundUrl: '/api/api/order/refund',
      order: {
        mchNo: '9999',
        productName: '商品名称',
        oldMchOrderNo: '',
        refundMchOrderNo: '',
        refundAmount: '0.01',
        refundReason: '',
        mchOrderNo: 'shop123456',
        orderAmount: '0.01',
        channelType: 'WEIXIN',
        sign: '',
        notifyUrl: 'http://192.168.199.134:8001/api/pay/notity/payOrder'
      },
      dataList: {},
      wechat: `${this.$cdn}/wx/640.gif`
    }
  },
  computed: {},
  mounted() {},
  methods: {
    // 请求数据案例
    // Action 通过 store.dispatch 方法触发

    refundOrder() {
      postAction(this.refundUrl, this.order).then(res => {
        console.log(res)
        if (res.code == 0) {
        } else {
          Toast(res.message)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.qrcode {
  display: inline-block;
  img {
    width: 132px;
    height: 132px;
    background-color: #fff;
    padding: 6px;
    box-sizing: border-box;
  }
}

.about-container {
  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    padding: 50px 12px 12px 12px;
    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      font-size: 14px;
      .demo-home__title {
        margin: 0 0 6px;
        font-size: 32px;
        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .item {
        font-size: 14px;
        line-height: 34px;
        a {
          text-decoration: underline;
        }
        .van-button {
          /* vant-ui 元素*/
          background: #ff5500;
        }
      }

      .logo {
        width: 120px;
        height: 120px;
        background: url($cdn + '/weapp/logo.png') center / contain no-repeat;
      }
      .wechat {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
