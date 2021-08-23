<template>
  <div class="newsform">
    <div class="container">
      <!-- 主圖 -->
      <div class="img-wrap" ref="moveToHere"></div>
      <!-- 表單開始 -->
      <div class="formCard position-relative">
        <div class="headBand position-absolute"></div>
          <h1>小美噗蛋黃酥預購表單</h1>
          <p>中秋節到囉～無論送禮還是自己吃，每日新鮮製作的小美噗蛋黃酥絕對是您最佳首選～</p>
          <p>小提醒：收到訂單後將於1~3天內，以E-mail或簡訊提供訂購明細、匯款金額、預計出貨日及匯款資訊</p>
          <div class="require mgt-12">*必填</div>
      </div>

      <div v-if="formStatus === 'sending'">
        <p class="msg">表單提交中，請稍候...</p>
        <img src="https://p1-news.hfcdn.com/p1-news/MjkxMTc5OW5ld3M,/7f4610282a514f6e_361x361.gif" alt="Loading">
      </div>

      <div v-if="formStatus === 'done'">
        <p class="msg">感謝您。</p>
      </div>

      <template v-if="formStatus === 'ready'">
        <form method="post">
          <inputcard  v-for="(value, key) in inputType" :key="value.key"
          :title="value" @send-value="getValue" :input-type="key"
          :red="redborder" :ref="setItemRef"></inputcard>

          <!-- 選擇口味 -->
          <taste></taste>

          <button class="submitBtn" type="button" @click="sendFrom">確定送出</button>
        </form>
      </template>

      <!-- <li class="a" v-for="i in lists" :key="i.index" :ref="setItemRef"> 
        <div>{{i}}</div>
      </li> -->
      <!-- <br>
      <button type="button" @click="scroll">Move</button> -->
    </div>
  </div>
</template>

<script>
import inputcard from '../components/inputCard.vue';
import taste from '../components/taste.vue'

export default {
  data() {
    return {
      inputType: {
        name: '姓名',
        phone: '手機號碼',
        email: 'E-mail',
        brand: '寄送地址',
      },
      redborder: false,
      inputValue: {},
      // ready, sending, done
      formStatus: 'ready',
      list: [],
      lists: ['a', 'b', 'c', 'd']
    };
  },
  components: { inputcard, taste },
  mounted() {
    console.log(this.list) //
  },
  methods: {
    getValue(val, val2) {
      this.inputValue[val2] = val;
    },
    sendFrom() {
      if(this.isLoading) {
        return;
      }
      const targetUrl = 'https://script.google.com/macros/s/AKfycbzoMvzlr8pauLKfQhX_VaPjeOdaOSOuMubdOA8g-42DPKz6107FnVSJ6hcwlUD2K5At/exec';

      if (Object.keys(this.inputValue).length < 4
          || Object.values(this.inputValue).includes(null)) {
        this.redborder = true;
      } else {
        this.formStatus = 'sending';
        fetch(targetUrl, {
          method: 'POST',
          body: encodeURI(JSON.stringify(this.inputValue)),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
        })
          .then((res) => res.text())
          .then((result) => {
            this.formStatus = 'done';

            // 出現 ok 代表資料已寫入
            if (result === 'OK') {
              const dataLayer = window.dataLayer;
              if (typeof dataLayer !== 'undefined') {
                dataLayer.push({ event: 'hf-news-2021-form-success' });
              }
              alert('感謝您，我們會盡快與您聯繫');
            }
          });
      }
    },
    scroll() {
      this.list.forEach((i) => {
        console.log(i);
        console.log(i.scroll);
        i.scroll();
      });
      // this.list[1].scroll()
    },
    setItemRef(el) {
      this.list.push(el);
    },
  },
};
</script>

<style lang="scss" scoped>
.msg {
  font-size: 1.7rem;
  margin: 2rem 0;
  text-align: center;
  
  & + img {
    display: block;
    margin: 1rem auto;
  }
}

.img-wrap{
    background: url('../assets/img/moonCake.png') center no-repeat;
    background-size: cover;
    border: 1px solid #dadce0;
    border-radius: 8px;
    width: 100%;
    height: 40vw;
    box-shadow: rgb(69 69 69 / 40%) 0px 0px 20px 0px;
}

.headBand{
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 10px;
    background-color:$brown;
    top: -1px;
    left: 0;
    width: calc(100% + 2px);
}

.redborder{
  border: 1px solid $red;
}

form button{
  background-color: $brown;
  color:white;
  border: none;
  border-radius: 5px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.submitBtn{
  margin: auto 20px;
}

@media (max-width:320px) {
  .img-wrap{
    background: url('../assets/img/moonCake.png') top no-repeat;
    background-size: cover;
    border: 1px solid #dadce0;
    border-radius: 0px;
    margin: 0 0;
    width: 100vw;
    height: 220px;
  }
}

@media (min-width:321px) and (max-width:680px) {
    .img-wrap{
    border-radius: 0px;
  }

}
</style>
