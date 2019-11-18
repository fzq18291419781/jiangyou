<template>
     <div class="collect" v-cloak>
          <div class="coll_top"> 
               <div @click="Getback" class="coll_call" v-show="!redact">
                    <van-icon  name="arrow-left" />
               </div>
               <div class="coll_title">我的收藏</div>
               <div v-show="noneRedack" class="coll_redact" @click="redact = !redact">编辑</div>
          </div>
          <div class="coll_sub" :class="{coll_sub_none:redact}" @click="navTarget">
               <div v-for="(sub,i) of subs" :key="i" class="sub_item" >
                    <p class="sub_txt" :class="{sub_item_target:i==navIndex}" :data-index="i">
                         <span class="iconfont" :class="sub.icon">
                         </span>
                         {{sub.name}}
                    </p>
               </div>
          </div>
          <div class="coll_main" @click="Gosame">
               <div v-show="navIndex==0" class="coll_body">
                    <div v-if="!noneColl"  class="no_login">
                         <div class="no_login_img">
                              <div :style="`background-image:url(${utilUrl}img/icon_no_collected.png)`"></div>
                              <p class="on_hint">{{isLogin}}</p>
                              <button class="go_login" @click="GoWhere(indexWhere)">{{GoWheretxt}}</button>
                         </div>
                    </div>
                    <div v-else class="body_list">
                         <div class="list_item" v-for="(item,i) of dates" :key="i">
                              <van-checkbox @change="SelectAll" class="item_check" :class="{item_check_none:redact}" v-model="Checkitem[i]" shape="square">
                              </van-checkbox>
                              <div class="list_detail" @click="GoWhere('/Product_detail/'+item.Jid)">
                                   <div class="item_cont" :style="`background-image:url('${utilUrl}img/${item.detail.prevImg}');`">
                                   </div>
                                   <div class="item_txt">
                                        <p class="item_title">{{item.detail.title}}{{item.detail.subtitle}}</p>
                                        <div class="item_grade">{{item.detail.grade}}分</div>
                                        <div class="item_desc">
                                             <div class="item_price"><span class="price_left">￥</span>
                                                  <span class="price_num">{{item.detail.price}}</span>
                                                  起
                                                  <span class="price_old">￥{{item.detail.price + 250}}起</span>
                                             </div>
                                             <div class="item_next" :data-cid="item.detail.CityId">找相似</div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div class="coll_over">
                         没有更多收藏了
                    </div>
               </div>
          </div>
          <div class="coll_bottom" :class="{coll_bottom_none:redact}">
               <van-checkbox class="coll_checkeAll"  v-model="CheckAll" shape="square" @click="CheckedStatu">全选</van-checkbox>
               <div class="coll_btn">
                    <button class="btn_del" @click="delColl">删除</button>
               </div>
          </div>
     </div>
</template>
<script>
export default {
     data(){
          return {
               redact:false,//点击编辑事件
               navIndex:0,//点击导航栏的第几项
               subs:[
                    {
                         name:"跟团游",
                         icon:"icon-shaixuanxuanzhong",
                    },
                    {
                         name:"降价",
                         icon:"",
                    },
                    {
                         name:"失效",
                         icon:"",
                    },
                    {
                         name:"券",
                         icon:""     
                    },
               ],
               dates:[],//最近收藏数据
               Checkitem:[],//存放收藏选中状态
               CheckAll:false,//全选状态
               noLogin:true,//是否等录false表示未登录
               noneColl:false,//表示没有收藏false表示没有
          }
     },
     computed:{
          noneRedack(){
               return this.noneColl && this.noLogin;
          },
          isLogin(){
               return this.noLogin?'您还没有收藏快去首页看看吧！':'您还没有登录！';
          },
          GoWheretxt(){
               return this.noLogin?"去首页":'前往登录';
          },
          indexWhere(){
               return this.noLogin?"/index":"/login";
          }
     },
     methods:{
          GoWhere(str){
               this.$router.push(str);
          },
          Getback(){
               this.$router.go(-1);
          },
          navTarget(e){
               if(e.target.nodeName == "P"){
                    this.navIndex = e.target.dataset.index;
               }
          },
          Gosame(e){
               if(e.target.className === "item_next"){
                    var Cid = e.target.dataset.cid;
                    this.$router.push(`/Product/${Cid}`)
               }  
          },
          getColl(){
               var _than = this;
               _than.$axios.get("v1/getuser/getColl")
               .then(res=>{
                    var code = res.data.code;
                    if(code === 400){ //表示没有登录
                         _than.noLogin = false;
                    }else if(code === 402){ //表示登录没有收藏
                         _than.noLogin = true;
                         _than.noneColl = false;
                    }if(code === 200){ //表示已登录且有收藏
                         _than.noneColl = true;
                         _than.noLogin = true;
                         var data = res.data.data;
                         for(var i of data){
                              _than.Checkitem.push(false);
                         }
                         _than.dates = data;
                    }
               })
          },
          CheckedStatu(){ //全选改变复选
               var _than = this; 
               _than.CheckAll = !_than.CheckAll;
               for(var i=0;i<_than.Checkitem.length;i++){
                    _than.Checkitem[i] = _than.CheckAll;
               }
          },
          SelectAll(){ //复选改变全选
               var _than = this; 
               var flag = true;
               for(var i=0;i<_than.Checkitem.length;i++){
                    if(!_than.Checkitem[i]){
                         flag = false;
                    }
               }
               _than.CheckAll = flag?true:false;
          },
          delColl(){
               var _than = this;
               if(_than.CheckAll){
                     _than.$dialog.confirm({
                         title: '提示',
                         message: '确定删除?',
                    }).then(()=>{
                         _than.$axios.get("v1/getuser/delColl/All").then(res=>{
                              if(res.data.code === 200){
                                    history.go(0);
                              }
                         })
                         _than.CheckAll = false;
                         return;
                    })
               }else{
                    var weekCheck = [];
                    var haveCheck = false; //是否有选中
                    var tw = _than.Checkitem;
                    for(var i=0;i<tw.length;i++){
                         if(tw[i]){
                              haveCheck = true;
                              weekCheck.push(i);
                         }
                    }
                    if(!haveCheck){
                         _than.$toast.fail('请选择要删除的收藏');
                         return;
                    }else{
                         _than.$dialog.confirm({
                         title: '提示',
                         message: '确定删除?',
                         }).then(()=>{
                              var Jids = "";
                              for(var w of weekCheck){
                                   Jids+=_than.dates[w].Jid + ',';
                              };
                              Jids = Jids.slice(0,-1);
                              _than.$axios.get("v1/getuser/delColl/haveColl",{ params:{ Jids:Jids } })
                              .then(res=>{
                                   console.log(res.data)
                                   if(res.data.code === 200){
                                        history.go(0);
                                   }
                              })
                         })
                    }
               }
          }
     },
     watch:{
          //监听用户是否放弃编辑
          redact(){
               var _than = this;
               if(!_than.redact){
                    _than.CheckAll = true;
                    _than.CheckedStatu();
               }
          },
     },
     mounted() {
               this.getColl();
     } 
}
</script>
<style scoped>
[v-cloak]{
     display: none;
}
.collect{
     height:100vh;
     position: relative;
     background-color: #f5f5f5;
     overflow: hidden;
}
.collect a{
     color:#0086fe;
}
.coll_top{
     height:3.3rem;
     line-height: 3.3rem;
     background-color: #fff;
     position: relative;
}
.coll_call{
     position: absolute;
     top:0;
     left:0;
     z-index: 10;
     margin-left:1rem;
}
.coll_call>i{
     font-size: 1.6rem;
     line-height: 3.3rem;
}
.coll_title{
     width: 100%;
     position: absolute;
     top:0;left:0;
     z-index: 0;
     font-size:1.3rem;
     text-align: center;
}
.coll_redact{
     position: absolute;
     top:0;
     right:0;
     z-index: 10;
     margin-right:1rem;
}
.coll_sub{
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     height: 2.5rem;
     -webkit-transition: height .2s linear;
     -o-transition: height .2s linear;
     transition: height .2s linear;
     overflow: hidden;
}
.coll_sub_none{
     height: 0rem;
}
.sub_item{
     width: 25%;height: 2.5rem;
     text-align: center;
     line-height: 2.5rem;
     -webkit-transition: height .5s linear;
     -o-transition: height .5s linear;
     transition: height .5s linear;
     background-color: #fff;
     padding: 0 .3rem;
}
.sub_item_target{
     border-bottom: 3px solid #0086fe;
}
.sub_txt{
     height: 100%;
     padding: 0 .3rem;
}
.coll_main{
     position: relative;
}
.coll_body{
     width: 100%;
}
.body_list{
     background-color: #fff;
     overflow: hidden;
}
.list_item{
     overflow: hidden;
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     padding:.5rem;
     border-top:1px solid #ddd;
}
.list_item+.list_item{
     border-bottom:1px solid #ddd;
}
.list_detail{
     width: 100%;
     height: 7rem;
}
.item_check{
     width: 0;
     -webkit-transition: width .2s linear;
     -o-transition: width .2s linear;
     transition: width .2s linear;
}
.item_check_none{
     width: 9%;
}
.item_cont{
     width: 30%;
     height: 100%;
     overflow: hidden;
     float: left;
     border-radius: .2rem;
     background:no-repeat;
     background-size: cover;
     background-position: center center;
}
.item_txt{
     width: 70%;
     height: 100%;
     float:right;
     padding-left: .6rem;
     text-align: left;
     position: relative;
}
.item_title{
     display: -webkit-box;
     font-weight: 500;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 2;
     overflow: hidden;
     text-align: left;
}
.item_grade{
     margin-top:.6rem;
     font-size: .9rem;
     color:#999;
}
.item_desc{
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     width: 100%;
     position: absolute;
     bottom:.4rem;
     left:.5rem;
     padding-right:1rem;
     -webkit-box-pack: justify;
         -ms-flex-pack: justify;
             justify-content: space-between;
}
.item_price{
     color:#666;
     font-size: .8rem;
}
.price_num{
     font-size: 1.2rem;
     color:#ff7d13;
     font-weight: 600;
}
.price_left{
     color:#ff7d13;
}
.price_old{
     color:#bbb;
     text-decoration: line-through;
     font-weight: 500;
}
.item_next{
     color:#0086fe;
     border:1px solid #0086fe;
     border-radius: .2rem;
     font-size: .9rem;
     padding:.1rem; 
}
.no_login{
     width: 100%;
     position: absolute;
     background-color: #f5f5f5;
     height:25rem;
     z-index: 100;
     left:0;top:0;
     text-align: center;
}
.no_login_img{
     margin-top:5rem;
}
.no_login_img>div:first-child{
     height: 13rem;
     background: no-repeat;
     background-position: center center;
}
.on_hint{
     font-weight: 600;
}
.go_login{
     border:0;
     width: 65%;
     height: 3rem;
     border-radius: .5rem;
     margin-top:1rem; 
     background-color:#86cff8;
     color:#fff;
}
.coll_bottom{
     position: absolute;
     bottom:-5rem;left:0;
     overflow: hidden;
     width: 100%;
     -webkit-transition: all .2s linear;
     -o-transition: all .2s linear;
     transition: all .2s linear;
     height: 0;
}
.coll_bottom_none{
     bottom:0;
     height: 5rem;
}
.coll_checkeAll{
     height:2rem;
     padding:.2rem 1rem;
     background-color: #fff;
}
.coll_btn{
     height: 3rem;
}
.btn_del{
     width: 100%;
     background-color: #3e4e5c;
     height: 100%;
     border:0;
     color:#ccc;
}
.coll_over{
     text-align: center;
     margin-top:1rem; 
     color:#7d7e80;
}
</style>
<style>
     .van-checkbox__icon .van-icon{
          border-color:#ccc;
     }
     .van-checkbox__icon--checked .van-icon{
          border-color:#1989fa;
     }
</style> 