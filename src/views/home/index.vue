<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <h1 class="demo-home__title">
        <img src="https://www.sunniejs.cn/static/weapp/logo.png" /><span> 商家支付界面</span>
      </h1>
      <h2 class="demo-home__desc">微信被扫方式</h2>
    </div>
    <!-- <van-cell icon="success" v-for="item in list" :key="item" :title="item" /> -->

    <div>
      <van-field v-model="order.mchNo" label="医院编号:" placeholder="医院编号  9999" />
      <van-field v-model="order.productName" label="商品名称:" placeholder="" />
      <van-field v-model="order.mchOrderNo" label="医院订单号:" placeholder="医院订单编号  " />
      <van-field v-model="order.orderAmount" label="金额:" placeholder="  " />
      <van-field v-model="order.channelType" label="支付渠道:" placeholder="  " />
      <van-field v-model="order.authCode" label="授权码:" placeholder="请扫码" @keyup.enter.native="scanOrder()" />

      <van-button plain hairline type="primary" @click="doDispatch">下单</van-button>
    </div>
  </div>
</template>

<script>
import { getAction, postAction } from '@/api/manage.js'
import Vue from 'vue'
import { Field, Button, Toast } from 'vant'

Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)

export default {
  data() {
    return {
      queryUrl: '/api/api/order/queryShopOrder',
      orderUrl: '/api/api/order/micropay',
      order: {
        mchNo: '9999',
        productName: '商品名称',
        mchOrderNo: 'shop123473',
        orderAmount: '0.01',
        channelType: 'WEIXIN',
        authCode: '',
        sign: '',
        notifyUrl:''
        // notifyUrl: 'http://aier-service-system/api/pay/notity/payOrder'

      },
      dataList: {},

      list: ['Vue-cli4', '配置多环境变量']
    }
  },

  computed: {},

  mounted() {
    var temp=this.getRandomCode(8);
    this.order.mchOrderNo=temp;
  },

  methods: {
    doDispatch() {
      getAction(this.queryUrl, this.param).then(res => {
        console.log(res)
        this.hkList = res.data
      })
    },

    scanOrder() {
      postAction(this.orderUrl, this.order).then(res => {
        console.log(res)
        this.dataList = res.data
        if (res.code == 0) {
          if (res.data.orderStatus == 'SUCCESS') {
            Toast('下单成功,支付成功')
          } else {
            Toast('下单成功: ' + res.data.failReason)

            //轮询调用接口
            this.timer = setInterval(this.queryOrder, 3000) // 1s 调用一次
          }
        } else {
          Toast(res.message)
        }
      })
    },

    queryOrder() {
      let param = {
        mchOrderNo: this.order.mchOrderNo,
        mchNo: this.order.mchNo
      }
      getAction(this.queryUrl, param).then(res => {
        console.log(res)
        if (res.code == 0) {
          if (res.data.orderStatus == 'SUCCESS') {
            Toast('支付成功')
            //停止轮询
            clearInterval(this.timer) //清除轮询
          } else if (res.data.orderStatus == 'FAILED') {
            Toast('支付失败,请重新下单')
            //停止轮询
            clearInterval(this.timer) //清除轮询
          }
        } else {
          Toast(res.message)
        }
      })
    },

    getRandomCode(length) {
      if (length > 0) {
        var data = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z'
        ]
        var nums = ''
        for (var i = 0; i < length; i++) {
          var r = parseInt(Math.random() * 61)
          nums += data[r]
        }
        return nums
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
}
</style>
