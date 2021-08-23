<template>
  <div class="formCard" :class="{'redborder':redborder && !pass}" :ref="here">
    <div class="title">{{title}} <span class="require">*</span></div>
    <div class="extraWarning mb-2" v-if="title === '寄送地址'">
      <div>為確保產品新鮮，目前僅提供低溫宅配服務，無店到店等其他相關服務</div>
      <small>如需宅配請填寫地址，運費另計，謝謝</small>
    </div>

    <!-- input -->
    <div class="input-wrap">
      <input type="text" :placeholder="`請填入${title}`" :class="{'redborder':redborder && inputValue === ''}"
       v-model.trim="inputValue">
    </div>

    <!-- 必填提示 -->
    <div class="require d-flex aic mt-3" v-if="redborder && !pass">
      <div class="icon">
        <img src="https://s1.hfcdn.com/fp/event/hf-news-form2021/img/exclamation-mark.svg" alt="icon">
      </div>
      <div>{{warning}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputCard',
  props: ['title', 'inputType', 'red'],
  data() {
    return {
      redborder: false,
      inputValue: '',
      warning: '這是必填問題',
      pass: false,
      here: ''
    };
  },
  watch: {
    red() {
      this.redborder = this.red;
    },
    inputValue() {
      this.sendValue();
    },
  },
  methods: {
    sendValue() {
      if (this.inputValue === '') {
        this.addBorder();
        this.warning = '這是必填問題';
      } else if (this.inputType !== 'phone' && this.inputType !== 'email') {
        this.delBorder();
        this.$emit('send-value', this.inputValue, this.inputType);
      } else if (this.inputType === 'phone') {
        this.checkPhone();
      } else if (this.inputType === 'email') {
        this.checkEmail();
      }
    },
    checkPhone() {
      const regEx = /(^\d{2}-?\d{8})$|(^\d{10})$/;
      if (regEx.test(this.inputValue)) {
        this.delBorder();
        this.$emit('send-value', this.inputValue, this.inputType);
      } else {
        this.$emit('send-value', null, this.inputType);
        this.addBorder();
        this.warning = '請輸入完整市話或手機號碼，僅接受 - 特殊字元';
      }
    },
    checkEmail() {
      // eslint-disable-next-line
      const regEx = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/;
      if (regEx.test(this.inputValue)) {
        this.delBorder();
        this.$emit('send-value', this.inputValue, this.inputType);
      } else {
        this.$emit('send-value', null, this.inputType);
        this.addBorder();
        this.warning = '請輸入完整E-mail';
      }
    },
    addBorder() {
      this.pass = false;
      this.redborder = true;
      this.here = 'move';
    },
    delBorder() {
      this.pass = true;
      this.redborder = false;
    },
    scroll() {
      // console.log(this.$refs)
      if (this.here === '') {
        console.log('空');
      } else {
        this.$refs.move.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 16px;
  color: #6b4e3b;
  font-weight: bold;
}

.extraWarning{
  line-height: 1.5;
  div {
    color: #6b4e3b
  }

  small{
    font-size: 14px;
    color: #989898;
  }
}



.input-wrap{
  min-height: 40px;

  input{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #7f685e;
  }

  textarea{
    width: 90%;
  }
  textarea:focus-visible{
    outline: 1px solid rgba(0, 0, 0, 0.12)
  }
  textarea.redborder{
    border: 2px solid $red !important;
  }
}

input.redborder{
  border-bottom: 2px solid $red !important;
}

.icon{
  width: 20px;
  margin-right: 12px;
}

@media (max-width:320px) {
  .input-wrap{
    input{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #7f685e;
  }
  }
}

</style>
