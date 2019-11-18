<template>
  <div>
    <van-notice-bar v-if="tem!=undefined" :text="tem.city+space+forecast.date+space+forecast.dayTemp+'°'+space+forecast.dayWeather+space+'风向:'+forecast.dayWindDir+space+forecast1.date+space+forecast1.nightTemp+'°~'+forecast1.dayTemp+'°'+space+forecast1.dayWeather+space+forecast2.date+space+forecast2.nightTemp+'°~'+forecast2.dayTemp+'°'+space+forecast2.dayWeather+space+forecast3.date+space+forecast3.nightTemp+'°~'+forecast3.dayTemp+'°'+space+forecast3.dayWeather" left-icon="volume-o" mode="closeable"/>
  </div>
</template>
<script>
export default {
  props:["cname"],
  data() {
    return {
      tem:null,
      map:{},
      forecast:[],
      forecast1:[],
      forecast2:[],
      forecast3:[],
      space:'  ',
      // place:this.$store.state.place
    }
  },
  watch: {
    cname(){
    this.map = new AMap.Map('container');
     this.map.plugin('AMap.Weather',()=>{
        //创建天气查询实例
        this.weater = new AMap.Weather();
        this.weater.getForecast(`${this.cname}`,(err, data)=>{
          this.tem = data;
          this.forecast= data.forecasts[0];
          this.forecast1= data.forecasts[1];
          this.forecast2= data.forecasts[2];
          this.forecast3= data.forecasts[3];
        });
      });
    }
  },
}
</script>
<style scoped>
</style>
