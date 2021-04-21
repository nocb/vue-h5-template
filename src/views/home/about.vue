<!-- home -->
<template>
  <div class="about-container">
    <div class="warpper">
      <h2 class="demo-home__desc">微信主扫方式</h2>
    </div>
    <div>
      <van-field v-model="order.mchNo" label="医院编号:" placeholder="医院编号  9999" />
      <van-field v-model="order.productName" label="商品名称:" placeholder="" />
      <van-field v-model="order.mchOrderNo" label="医院订单号:" placeholder="医院订单编号  " />
      <van-field v-model="order.orderAmount" label="金额:" placeholder="  " />
      <van-field v-model="order.channelType" label="支付渠道:" placeholder="  " />
      <van-button plain hairline type="primary" @click="createOrder">下单</van-button>
      <van-button plain hairline type="primary" @click="creatQrCode('sdfasdf')">二维码</van-button>
    </div>  

</br>


    <div class="qrcode" ref="qrCodeUrl">
    </div>
    </br>
    </br>
    </br>



  </div>
</template>

<script>
// 请求接口
import { getAction, postAction } from '@/api/manage.js'
import Vue from 'vue'
import { Field, Button, Toast } from 'vant'
import { Image as VanImage } from 'vant';
import QRCode from 'qrcodejs2';

Vue.use(VanImage);

Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)

import { getUserInfo } from '@/api/user.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      QrCodeUrl:'',
      queryUrl: '/api/api/order/queryOrder?trxno=1365655032015376386',
      orderUrl: '/api/api/order/createOrder',
      order: {
        mchNo: '9999',
        productName: '商品名称',
        mchOrderNo: 'shop123456',
        orderAmount: '0.01',
        channelType: 'WEIXIN',
        authCode: '',
        sign: '',
        notifyUrl:'http://116.62.146.53:8041/api/order/notifyPay'
        // notifyUrl: 'http://192.168.199.134:8001/api/pay/notity/payOrder'
      },
      dataList: {},
      wechat: `${this.$cdn}/wx/640.gif`
    }
  },
  computed: {
  },
  mounted() {
        var temp=this.getRandomCode(8);
    this.order.mchOrderNo=temp;
  },
  methods: {
    // 请求数据案例
    // Action 通过 store.dispatch 方法触发

  createOrder() {
      postAction(this.orderUrl, this.order).then(res => {
        console.log(res)
        this.dataList = res.data
        if (res.code == 0) {

            Toast('下单成功 ')
            this.creatQrCode(res.data.codeUrl)
          
        } else {
          Toast(res.message)
        }
      })
    },
    creatQrCode(QrCodeUrl) {
        //清除之前的二维码
        this.$refs.qrCodeUrl.innerHTML = ''
        new QRCode(this.$refs.qrCodeUrl, {
        text: QrCodeUrl, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
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
<style lang="scss">


  .qrcode
  {
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
