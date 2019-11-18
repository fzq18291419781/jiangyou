<template>
  <div class="Item">
      <div class="navTitle" @click="navSelect">
        <div class="item_title" v-for="(ListTitle,i) of Lists" :key="i">
          <span class="title_txt" :class="{active:navIndex === i}" :data-index="i">
            {{ListTitle.name}}
          </span>
        </div>
      </div>
    <!-- 旅游卡片列表 -->
    <div v-show="navIndex === j" v-for="(ItemDetail,j) of Lists" :key="j" class="trip_card" @click="goProduct">
      <div class="trip_lable" v-for="(city,i) of ItemDetail.items" :key="i" @click="goProduct" >
        <div class="lable_pro">
          <div class="lable_pro_top" :style="`background-image:url(${utilUrl}img/${city.prevImg});`">
            <!-- <img :src="'"  class="lable_img" /> -->
            <div class="lable_tag">
              <span>跟团游</span>
            </div>
          </div>
          <div class="lable_pro_bottom">
            <p class="trip_name">{{city.title}}{{city.subtitle}}</p>
            <div class="lable_pref">
              <span v-if="city.tag">{{city.tag}}</span>
            </div>
            <div class="lable_price">
              <div class="lable_peice_left">
                <p>
                  <span>￥</span>
                  <span>{{city.price}}</span>起
                </p>
              </div>
              <div class="lable_price_right2">
                <p>{{city.grade}}分</p>
              </div>
            </div>
          </div>
          <div class="trip_main" :data-id="city.Jid"></div>
        </div>
      </div>
    </div>
    <div v-show="averDetail" class="nav_bottom">
      <label class="card_buttom">查看目的地大全></label>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Lists:[
        {
          name:"精选",
          Did:10,
          items:[]
        },
        {
          name:"亚洲",
          Did:30,
          items:[]
        },
        {
          name:"欧洲",
          Did:50,
          items:[]
        },
        {
          name:"澳非",
          Did:70,
          items:[]
        },
      ],
      citys:[],
      navIndex: 0,
      averDetail:false
    };
  },
  methods: {
    goProduct(e){
      if(e.target.className == "trip_main"){
        var id = e.target.dataset.id;
        this.$router.push(`/Product_detail/${id}`);
      }
    },
    navSelect(e) {
      if (e.target.nodeName === "SPAN") {
        this.navIndex = parseInt(e.target.dataset.index);
      }
    },
    getItem(){
      this.$axios.get("v1/getindex/index").then(res=>{
          var resArr = res.data.data;
          var Obj = {};
          var Lists = this.Lists;
          for(var i=0;i<resArr.length;i++){
            var resObj = resArr[i];
            for(var item of Lists){
              if(item.Did === resObj.Did){
                item.items.push(resObj);
              }
            }
          }
          this.Lists = Lists;
          this.averDetail = true;
      })
    }
  },
  created() {
       this.getItem();
  }
};
</script>
<style scoped>
.Item{
  position: relative;
}
.navTitle{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
}
.item_title{
  width: 25%;
  height: 2rem;
  line-height: 2rem;
  padding:0 5%;
}
.title_txt{
  display: inline-block;
  height: 100%;
  width: 100%;
}
.title_txt.active{
  border-bottom:2px solid #0aa1ed;
}
.trip_card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  margin-top:.6rem;
  padding:0 .8rem;
  border-top:1px solid #ddd;
}
.trip_lable{
  position: relative;
  width: 49%;
}
.lable_pro {
  height: 13.5rem;
  margin: .5rem .2rem;
  border-radius: .4rem;
  overflow: hidden;
  -webkit-box-shadow: 0 2px 2px 0 #ddd;
          box-shadow: 0 2px 2px 0 #ddd;
  background: #ffffff;
  position: relative;
}
.lable_pro_top,.lable_pro_bottom{
  height:50%;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
}
.lable_pro_bottom{
  margin:0 .3rem;
  position: relative;
}
.trip_name {
  display: -webkit-box;
  font-weight: 500;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding-top:.5rem;
}
.trip_main{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100% ;
}
.lable_tag {
  padding: .1rem;
  position: absolute;
  top: -0.09rem;
  left: -0.01rem;
  font-size: 0.01rem;
  border-radius: 0 0 0.3rem 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
}
.lable_price {
  position: absolute;
  width: 100%;
  bottom:.7rem;
  z-index: 10;
  left:0rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding:0 .3rem;
  line-height: 1;
}
.bable_tag > span {
  display: block;
  font-size: 0.3rem;
}
.lable_peice_left>p>span:last-child{
  color: #ff6913;
  font-weight: 600;
  font-size: 1.2rem;
  padding-right:.3rem;
}
.lable_peice_left>p>span:first-child{
  color:#ff6913;
}
.lable_peice_left>p{
  color:#999;
}
.lable_price_right1,
.lable_price_right2 {
  color: #999;
  font-size: .8rem;
  line-height: 1.2rem;
}
.lable_price_right2>p{
  height: 100%;
}
.lable_pref {
  margin:.5rem .2rem;
}
.lable_pref span {
  font-size: .8rem;
  color: #0aa1ed;
  border: 1px solid #0aa1ed;
  padding:0 .2rem;
  opacity: .6;
  border-radius: .2rem;
}
.nav_bottom {
  color: #0aa1ed;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  letter-spacing: 1px;
}
</style>
