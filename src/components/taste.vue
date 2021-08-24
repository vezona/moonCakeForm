<template>
  <div class="formcard">
    <div class="title mb-3"> **選擇口味** </div>
    <div class="form-check mx-3 mb-5" v-for="i in tastes" :key="i.index">
        <input class="form-check-input" type="checkbox" :value="i.title" :id="i.title">
        <label class="form-check-label fw-bold productTitle" :for="i.title">
            {{i.title}}
        </label>
        <!-- 子列表 -->
        <div class="d-sm-flex">
            <!-- 左側圖片 -->
          <div class="img-wrap col-12 col-sm-4 pt-sm-5 pt-3">
            <img :src="i.img" alt="">
          </div>
        <!-- 選單 -->
          <div class="col-12 col-sm-8 px-sm-5">
            <div class="sublist mt-3 ms-4" v-for="n in i.number" :key="n.index">
              <input class="form-check-input" type="checkbox" :value="i.title" :id="n">
              <label class="form-check-label" :for="n">
                    {{n}}
              </label>

                <!-- 選擇數量 -->
              <select class="form-select mt-3" aria-label="Default select example">
                <option selected>選擇數量</option>
                <option value="1" v-for="i in 10" :key="i">{{i}} 盒</option>
              </select>
            </div>
          </div>

        </div>

    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        tastes:[
          {title: '綠豆沙蛋黃酥系列（蛋奶素）', img: require('../assets/img/greenBeanEgg.png'), number: ['6入禮盒 $360', '10入禮盒 $600', '12入禮盒 $720']},
          {title: '烏豆沙蛋黃酥系列（蛋奶素）', img: require('../assets/img/redBeanEgg.png'), number: ['6入禮盒 $360', '10入禮盒 $600', '12入禮盒 $720']},
          {title: '素綠豆沙蛋黃酥系列（奶素）', img: require('../assets/img/VegGreenBean.png'), number: ['6入禮盒 $360', '10入禮盒 $600', '12入禮盒 $720']},
          {title: '素烏豆沙蛋黃酥系列 （奶素）', img: require('../assets/img/VegRedBean.png.png'), number: ['6入禮盒 $360', '10入禮盒 $600', '12入禮盒 $720']},
          {title: '綜合系列', img:'', number: ['6入禮盒 $360', '10入禮盒 $600', '12入禮盒 $720']}],

        mix:['綠豆沙 (蛋奶素)','綠豆沙 (奶素)', '烏豆沙(蛋奶素)', '烏豆沙(奶素)']

      }
    },
    mounted() {
        console.log(this.list) //
    },
    methods: {

    }
    
}
</script>

<style lang="scss" scoped>

.title{
    color: #6b4e3b;
    font-weight: bold;
    font-size: 18px;
}

.formcard {
    margin: 20px;
    background-color: #fff;
    border: 1px solid #7f685e;
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 24px;
    padding-top: 22px;
    position: relative;
}

.productTitle {
  color: #6b4e3b
}

.img-wrap{
  img {
      width: 100%;
  }
}



</style>