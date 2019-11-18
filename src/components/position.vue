<template>
  <div>
      <!-- 头部标题 -->
      <div class="choose">
        <!-- 返回箭头 -->
        <span class="choose_return" @click="goHistory">
          <van-icon name="arrow-left" size="24px"/>
        </span>
        <!-- 标题 -->
        <h1 class="choose_title">选择出发站</h1>
      </div>
      <!-- 搜索栏 -->
      <van-search background="#efeff4" v-model="value" placeholder="全拼/中文" show-action shape="round" @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <!-- 国内/国际 -->
      <div class="choose_place">
        <div class="choose_list" v-for="(citys,i) of cityslist" :key="i" :class="{active:cindex == i}" @click="choose_go(i)">
          {{citys.name}}
        </div>
      </div>
      <!-- 国内地点 -->
      <div v-show="Home==true">
        <div class="choose_current">
          <p>当前</p>
          <span>定位失败...</span>
        </div>
        <div class="destination" v-for="(home,h) of homeCitys" :key="h" @click="choose_search(home.CityId,home.cname)">{{home.cname}}</div>
      </div>
      <!-- 国际地点 -->
      <div v-show="International==true">
        <div class="choose_current">
          <p>当前</p>
          <span>定位失败...</span>
        </div>
        <div class="destination" v-for="(int,j) of intCitys" :key="j" @click="choose_search(int.CityId,int.cname)">{{int.cname}}</div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value:"",
      cindex:0,
      Home:true,
      International:false,
      homeCitys:[],
      intCitys:[],
      cityslist:[
       {
        name:"国内",
        Did:10,
        citys:[]
       },
       {
         name:"国际/港澳台",
         citys:[]
       }
      ]
      
    }
  },
  methods: {
    //返回前一页
    goHistory(){
      history.back(-1);
    },
    onSearch(){
      if(this.value.trim()==""){
         this.$dialog.alert({
            title:"提示",
            message:"请输入搜索关键字"
          })
      }else{
        this.$axios.get(
          "v1/getindex/searchKey",
          {
            params:{str:this.value.trim()}
          }).then(res=>{
            //  console.log(res.data);
            if(res.data.code==200){
              console.log(res.data.data[0].CityId);
               this.$router.push(`/Product/${res.data.data[0].CityId}`);
            }else if(res.data.code==400){
                this.$dialog.alert({
                  title:"提示",
                  message:"没有找到与之匹配的信息"
                })
            }
          })
      }
    },
    // axios请求
    choosePlace(){
      this.$axios.get(
        "v1/getindex/CityLists"
      ).then(res=>{
        var data = res.data.data;
        for(let item of data){
          if(item.Did==10){
            this.homeCitys.push(item);
          }else{
            this.intCitys.push(item);
          }
        }
        // console.log(this.homeCitys)
      })
    },
    // 国内外之间的切换
    choose_go(i){
      this.cindex=i;
      if(i==0){
        this.Home=true;
        this.International=false;
      }else if(i==1){
        this.Home=false;
        this.International=true;
      }
    },
    choose_search(CityId,cname){
      // console.log(cname);
      this.$store.commit("modify",cname);
      this.$router.push(`/Product/${CityId}`);
    }
  },
  created() {
    this.choosePlace();
  },
}
</script>
<style scoped>
.choose{
  width: 100%;
  height: 44px;
  background: #fff;
  position: relative;
}
.choose_return{
  display: inline-block;
  padding: 10px 0;
}
.choose_title{
  display: inline-block;
  position: absolute;
  left: 88px;
  right: 88px;
  font-size: 17px;
  text-align: center;
  font-weight: 500;
}
/* 国内外出发 */
.choose_place{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 44px;
  border-bottom: 1px solid #dbdbdb;
}
.choose_list{
  width: 50%;
  line-height: 44px;
  text-align: center;
}
.choose_list.active{
  border-bottom: 3px solid #19a0f0;
}
.home,.international{
  width: 50%;
  height: 43px;
  text-align: center;
  color: #333;
  line-height: 41px;
}
.home{
  border-bottom: 3px solid #19a0f0;
}
/* 城市 */
.destination{
  width: 100%;
  height:44px;
  background: #fff;
  line-height: 44px;
  border-bottom: 1px solid #dbdbdd;
  padding-left:10px; 
}
/* 当前位置 */
.choose_current{
  width: 100%;
  padding: 10px 5px;
  font-size: 13px;
}
.choose_current p{
  color: #999;
  margin-bottom: 10px;
}
.choose_current span{
  display: inline-block;
  width: 30%;
  height: 34px;
  border: 1px solid #19a0f0;
  color: #19a0f0;
  line-height: 34px;
  text-align: center;
  border-radius: 3px;
}
</style>
