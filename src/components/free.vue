<template>
    <div class="free">
      <div class="new">
        <form>
          <van-search v-model="value" placeholder="目的地、主题或关键字" show-action @search="onSearch" @cancel="onCancel"/>
        </form>
        <!-- <div></div> -->
      </div>
      <div class="new_dest">
        <div class="left">
          <ul class="current" @click="navCountry">
            <li  v-for="(nav,i) of lists" :key="i" :class="{active:i==index}" :data-index="i">{{nav.gname}}</li> 
          </ul>
        </div>
        <div class="right">
          <div v-show="index==0">
            <div class="right_root">
              <h4 class="right_dext">猜你喜欢</h4>
            </div>
            <div class="dext_box_top">
                <div class="lamp_f" v-for="(city,i) in YouLikes" :key="i">
                  <span class="lamp">{{city}}</span>
                </div>
            </div>
          </div>
          <div class="right_bottom">
            <h4 class="right_dext">当季推荐</h4>
          </div>
          <div class="right_pic" @click="goProduct">
            <div class="dext_pic" v-for="(city,i) of citys.citys" :key="i">
              <div class="dext_img">
                <img v-lazy=" utilUrl + city.cimg" :data-cityid="city.CityId"/>
                <p class="dext_span">{{city.cname}}</p>
              </div>
            </div>
          </div>
          <div  v-show="index == i+1" v-for="(citys,i) of classCity" :key="i">
            <div class="right_root">
              <h4 class="right_dext">{{citys.name}}</h4>
            </div>
            <div class="dext_box_bottom" :class="{dext_box_z:zhankai}">
                <div class="lamp_f"  v-for="(city,i) of citys.classCitys" :key="i">
                  <span class="lamp">{{city}}</span>
                </div>
            </div>
            <div class="dext_bottom" @click="DextZ">{{zhankai?"收起 ∧":'展开 ∨'}}</div>
          </div> 
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      index:-1,
      lists:[],
      citys:[],
      YouLikes:['杭州','苏州','南京','乌镇','黄山','西安'],
      classCity:[
        {
          name:"境内经典目的地",
          classCitys:['西安','华山','宝鸡','壶口瀑布','兵马俑','汉中','昆明池','咸阳','丽江','大理','昆明','西双版纳','香格里拉','腾冲','洱海','玉龙雪山','普者黑','九寨沟','稻城','稻城亚丁','峨眉山','色达','四姑娘山','毕棚沟','弥勒','丽江古城','石林','抚仙湖','瑞丽','建水','梅里雪山','曲靖','芒市'],
        },
        {
          name:"港澳台经典目的地",
          classCitys:['金门','台南','台东','宜兰','南投','新北','嘉义县','香港','彰化','屏东','澳门','玉龙雪山','普者黑','稻城亚丁','色达','四姑娘山','毕棚沟','弥勒','石林','抚仙湖','瑞丽','建水','梅里雪山','曲靖','芒市'],
        },
        {
          name:"日本经典目的地",
          classCitys:['冲绳','九州','鹿儿岛','奈良','神户','东京','福冈','伊豆','镰仓市','高松','金泽','小樽','仙台','横滨','涵管','熊本县','那霸','长野县','色达','毕棚沟','弥勒'],
        },
        {
          name:"东南亚经典目的地",
          classCitys:['清迈','曼谷','马来西亚','苏梅岛','柬埔寨','沙巴','菲律宾','尼泊尔','印度','缅甸','岘港','美娜多','薄荷岛','老挝','吉隆坡','兰卡威','宿务','芭提雅','色达','四姑娘山','毕棚沟','弥勒','丽江古城','石林','抚仙湖','瑞丽','建水','梅里雪山','曲靖'],
        },
        {
          name:"欧洲经典目的地",
          classCitys:['德国','芬兰','巴黎','圣托里尼','捷克','贝加尔湖','伦敦','奥地利','挪威','海参崴','布拉格','莫斯科','格鲁吉亚','荷兰','巴塞罗那','克罗地亚','罗马','丹麦','色达'],
        },
        {
          name:"美洲经典目的地",
          classCitys:['古巴','多伦多','拉斯维加斯','旧金山','阿根廷','巴西','西雅图','奥兰多','牙买加','海参崴','布拉格','莫斯科','格鲁吉亚','荷兰','巴塞罗那','克罗地亚','罗马','丹麦','色达','梅里雪山'],
        },
        {
          name:"澳中东非经典目的地",
          classCitys:['悉尼','墨尔本','黄金海岸','皇后镇','珀斯','凯恩斯','奥克兰','布里斯班','大堡礁','南岛','蓝山','惠灵顿','阿联酋','南非','约旦','肯尼亚','突尼斯','卡塔尔','阿布扎比','纳米比亚','多哈','开普敦'],
        },
        {
          name:"免签经典目的地",
          classCitys:['厄瓜多尔','牙买加','圣马力诺','汤加','珀斯','凯恩斯','奥克兰','布里斯班','大堡礁','南岛','蓝山','惠灵顿','阿联酋','南非','约旦','肯尼亚','突尼斯'],
        },
        {
          name:"落地签经典目的地",
          classCitys:['乌干达','科特迪亚','圣马力诺','汤加','蓝山','惠灵顿','阿联酋','南非','珀斯','凯恩斯','奥克兰','布里斯班','大堡礁','南岛','约旦','肯尼亚','突尼斯'],
        }
      ],
      zhankai:false,
      value:"",
      searchHeight:{
        height:"0px",
      },
      getListUser:false
    }
  },
  methods: {
    // 目的地搜索关键字
    onSearch(){
      // console.log(this.value);
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
    onCancel() {
      this.$router.push("/index");
    },
    navCountry(e){
      this.zhankai = false;
      if(e.target.nodeName==="LI"){
        var i = parseInt(e.target.dataset.index);
        if(this.index != i){
            this.index = i;
        }
      }
    },
    ForData(res){
        var dates1=res.data.data[0];
        var dates2=res.data.data[1];
        var lists=[];
        var M = [];
        var L = [];
        var R = [];
        for(var data1 of dates1){
          var obj= {
            Did:data1.Did,
            gname:data1.gname,
            citys:[]
          };
          for(var data2 of dates2){
            if(data2.Did == obj.Did){
              obj.citys.push(data2);
            }
          }
          lists.push(obj);
        }
        for(var i=0;i<dates2.length;i++){
          if(i<12){
            var a = Math.floor(Math.random()*12);
            R.push(dates2[a]);
          }
          if(dates2[i].MVisa === 1){
            M.push(dates2[i]);
          }else if(dates2[i].MVisa === 2){
            L.push(dates2[i]);
          }
        };
        var RCity = {
          gname:"热门",
          citys:R
        }
        var MCity = {
          gname:"免签",
          citys:M
        }
        var LCity = {
          gname:"落地签",
          citys:L
        };
        lists.unshift(RCity);
        lists.push(MCity,LCity);
        this.lists = lists;
        this.index = 0;
    },
    ListUser(){
      if(!this.getListUser){
        this.$axios.get(
        "/v1/getindex/free"
        ).then(res=>{
          this.ForData(res);
          this.getListUser = true;
        });
      }
    },
    DextZ(){
      this.zhankai = !this.zhankai;
    },
    // 点击跳转
    goProduct(e){
      if(e.target.nodeName=="IMG"){
        var goCityId = e.target.dataset.cityid;
        this.$router.push(`/Product/${goCityId}`);
      }
    }
  },
  created(){
    this.ListUser();
  },
  watch:{
    index(){
      this.citys = this.lists[this.index];
    },
  }
};
</script>
<style scope>
.free{
    height: 100%;
  }
  .new{
    width: 100%;
    position: fixed;
    z-index: 10;
  }
  .new_dest {
    height: 100%;width: 100%;
  }
  .left{
    position: fixed;
    top:3rem;left:0;
    z-index: 10;
    width: 25%;
  }
  .current {
    width: 100%;
  }
  .current > li {
    background-color: #f5f5f5;
    height:3.5rem;
    font-size: .8rem;
    line-height:3.5rem;
    text-align: center;
    color: #666;
  }
  .current>.active{
    background: #fff;
  }
  .right {
    width:75%;
    float: right;
    padding:0 .5rem;
    margin-top:3rem;
    background: #fff;
  }
  .right_dext {
    border-left: 0.2rem solid #448aff;
    font-size: .8rem;
    color: #000;
    text-align: left;
    font-weight: 700;
    margin-top:1.6rem;
    padding-left:.3rem;
  }
  .dext_box_top,.dext_box_bottom{
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
  }
  .dext_box_bottom{
    height:10rem;
    overflow: hidden;
  }
  .dext_box_z{
    overflow: visible;
    height: auto;
  }
  .lamp_f{
    width: 33.33%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    padding:0 .3rem;
    margin:.2rem 0;
  }
  .lamp_f>.lamp{
    display:inline-block;
    width: 100%;
    background-color: #f9f9f9;
    border-radius: 3.125rem;
    text-align:center;
    font-size:.8rem;
    margin:.3rem .2rem;
  }
  .dext_bottom{
    width: 100%;
    height:2rem;
    text-align: center;
    font-size:.8rem;
    color:#0086f6;
    margin-top:1rem;
  }
  .dext_pic {
    margin-top:.4rem;
    width: 50%; 
  }
  .dext_img {
    width: 94%;
    margin: auto;
    border-radius:.4rem;
    overflow: hidden;
    position: relative;
  }
  .dext_img img {
    display: block;
    width: 100%;
  }
  .dext_span {
    display: block;
    width: 100%;
    position: absolute;
    background-color: rgba(000, 0, 0, 0.5);
    color: #f5f5f5;
    font-size:.8rem;
    text-align: center;
    bottom:0;
    left:0
  }
  .right_root{
    width: 100%;
  }
  .dext_box{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .right_pic {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
  }
  .label-collapse-btn{
    height: 0.62rem; width: 100%;  
  }
  .text{
    font-size: 0.875rem;
    line-height: 1.19rem;
  }
</style>