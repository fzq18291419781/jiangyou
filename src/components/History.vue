<template>
  <div class="history">
    <div class="return" @click="historyGo"><img src="../assets/go-1.png"></div>
    <div class="expect">
      <img src="../assets/lookforward.png">
      <span>服务暂未上线，敬请期待！！！</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    historyGo(){
      history.go(-1);
    }
  },
  
}
</script>
<style scoped>
.history{
  width: 100%;
  position: relative;
}
.return{
  padding-top: 10px;
  padding-left: 10px;
}
.expect{
  width: 100%;
  position: absolute;
  top: 200px;
  text-align: center;
}
.expect>span{
  display: block;
  color: #BBBBBB;
}
</style>
