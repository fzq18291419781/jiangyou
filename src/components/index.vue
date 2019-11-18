<template>
    <div class="index">
        <!-- 头部搜索内容和背景图片  -->
        <div class="head" >
            <div class="headSousuo" :class="{headSousuoW:navBC}">
                <div class="search-sousuo">
                    <div class="search-city" :class="{'search-cityC':navBC}" @click="goHistory('/position')">
                        <span>
                        <van-icon class="search-location" name="location" />
                        </span>
                        <span>{{this.$store.state.place}}</span>
                    </div>
                    <div class="search-input" :class="{'search-inputC':navBC}" @click="goHistory('/free')">
                        <div class="search-text" :class="{search_textB:navBC}">
                            <van-icon name="search" />
                        </div>
                        <div class="search-mu" :class="{search_muB:navBC}">
                            目的地/关键字
                        </div>
                    </div>
                </div>
            <div class="mine" :class="{mineC:navBC}"  @click="login">
                    <div>
                        <van-icon class="mine_icon" name="user-circle-o"/>    
                    </div>
                    <div class="mine_txt">{{isLogin?'我 的':'未登录'}}</div>
            </div>
            </div>
        </div>
        <!-- 点击我的弹出框 -->
        <div v-show="show1" @click="login">
            <div class="mine-tag-show">
                <div class="mine-tag-box" @click.stop>
                    <div v-if="isLogin" class="msgShow">
                        <img class="uavatar" :src="utilUrl + userDetails.avatar" alt="">
                        <div class="uname">昵称：{{userDetails.jx_name}}</div>
                    </div>
                    <div v-else class="rnav_gologin">
                        <div class="login-right">
                            <p class="welcome-text">欢迎来到极暇游</p>
                        </div>
                        <router-link to="/login">
                        <div class="go-login">
                                <span>登录/注册</span>
                            </div> 
                        </router-link>
                    </div>
                    <div class="list-order" @click="goHistory('/History')">
                        <p class="txt1">
                            <van-icon name="orders-o" size="25px" color="#666"/>
                            <span>我的订单</span>
                            <van-icon name="arrow" size="18px" color="#999"/>
                        </p>
                    </div>
                    <div class="list-like" @click="goHistory('/collection')">
                        <p class="txt2">
                            <van-icon name="like-o" size="25px" color="#666"/>
                            <span>我的收藏</span> 
                            <van-icon name="arrow" size="18px" color="#999"/>
                        </p>
                    </div>
                    <div class="list-history" @click="goHistory('/History')">
                        <p class="txt3">
                            <van-icon name="clock-o" size="25px" color="#666"/>
                            <span>我的历史</span>
                            <van-icon name="arrow" size="18px" color="#999"/>
                        </p>
                    </div>
                    <div v-show="isLogin" class="exit_login">
                        <button class="exit_btn" @click="exitLogin">退出登录</button>
                    </div>      
                </div>
                <div></div>
            </div>
        </div>
        <!-- 轮播图 -->
        <van-swipe  :autoplay="3000" indicator-color="white">
            <van-swipe-item  v-for="(img,i) of images" :key="i">
                <img :src="img" class="swipe-img" alt="">
            </van-swipe-item>
        </van-swipe>
        <!-- 周边 境内 .... -->
        <div class="icon-father" >
            <div class="first touch">
                <ul class="first-style"  @click="touchCity">
                    <li class="floor-one" v-for="(nav,f) of indexNav" :key="f" >
                        <div :data-index="f"></div>
                        <p>{{nav.navname}}</p>
                    </li>
                </ul>
                <div class="first-touch" v-show="firsetOne">
                    <div v-show="cindex!=-1" v-for="(city,j) of citys" :key="j"  class="touch-city">
                        <p v-if="j<7">{{city}}</p>
                        <p v-else>更多...</p>
                    </div>
                </div>
            </div>
            <div class="touch">
                <ul class="first-style"  @click="touchCity2">
                    <li class="floor-two" v-for="(nav2,d) of indexNav2" :key="d" >
                        <div :data-index="d"></div>
                        <p>{{nav2.navname}}</p>
                    </li>
                </ul>
                <div class="first-touch" v-show="firsetTwo">
                    <div v-show="zindex!=-1" v-for="(city2,e) of citys2" :key="e"  class="touch-city">
                        <p v-if="e<7">{{city2}}</p>
                        <p v-else>更多...</p>
                    </div>
                </div>
            </div>
            <!-- 查看目的地大全 -->
            <div class="see-all" >
                <router-link to="/free" class="see-gofree">
                    <p>查看目的地大全<span class="iconfont icon-lunbo2"></span></p>
                </router-link>
            </div>
        </div>
        <!-- 跟团新体验 -->
        <div id="gentuan">
            <div class="text">
                跟团新体验
            </div>
            <div class="local_f">
                <div class="local">
                    <img class="local_img" src="../assets/ddctwzgy.jpg" alt="">
                </div>
                <div class="local">
                    <img class="local_img" src="../assets/bzzygty.jpg" alt="">
                </div>
            </div>
        </div>
        <!-- 出行手册模块 -->
        <div class="travel">
            <div class="travel-manual">
                <span>出行手册</span>
                <a href="javascript:;">
                    <span>更多目的地></span>
                </a>
            </div>
            <div class="time-place">
                <div class="time">
                    <van-tabs v-model="activeName" color="#0086f6">
                        <van-tab title="2-3天" name="a">
                            <div class="item-place">
                                <ul>
                                    <li>
                                        <div class="item-place1">
                                            <div class="item-img1"></div>
                                            <div class="item-text">
                                                <p class="bigtext">稻城</p>
                                                <span>五色海</span>
                                                <p class="smalltext">游玩2-3天</p>
                                            </div> 
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div class="item-place1">
                                            <a href="javascript:;">
                                               <div class="item-img2"></div>
                                                <div class="item-text">
                                                    <p class="bigtext">峨眉山</p>
                                                    <span>金顶</span>
                                                <p class="smalltext">游玩2-3天</p>
                                            </div> 
                                            </a>
                                            
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-place1">
                                            <a href="javascript:;">
                                                <div class="item-img3"></div>
                                            <div class="item-text">
                                                <p class="bigtext">九寨沟</p>
                                                <span>五彩池</span>
                                                <p class="smalltext">游玩1-2天</p>
                                            </div> 
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                                <div class="button">
                                    <ul>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">阿坝</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">毕棚沟</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">四姑娘山</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">色达</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">青城山</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">都江堰</a></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="3-5天" name="b">
                            <div class="item-place">
                                <ul>
                                    <li>
                                        <div class="item-place1">
                                            <div class="item-img4"></div>
                                            <div class="item-text">
                                                <p class="bigtext">北京</p>
                                                <span>故宫</span>
                                                <p class="smalltext">游玩4-5天</p>
                                            </div> 
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div class="item-place1">
                                            <div class="item-img5"></div>
                                            <div class="item-text">
                                                <p class="bigtext">厦门</p>
                                                <span>厦门</span>
                                                <p class="smalltext">游玩3-5天</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-place1">
                                           <div class="item-img6"></div>
                                            <div class="item-text">
                                                <p class="bigtext">桂林</p>
                                                <span>漓江</span>
                                                <p class="smalltext">游玩3-5天</p>
                                            </div> 
                                        </div>
                                    </li>
                                </ul>
                                 <div class="button">
                                    <ul>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">上海</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">三亚</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">杭州</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">宜昌</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">丽江</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">青海</a></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="6-8天" name="c">
                            <div class="item-place">
                                <ul>
                                    <li>
                                        <div class="item-place1">
                                            <div class="item-img7"></div>
                                            <div class="item-text">
                                                <p class="bigtext">云南</p>
                                                <span>昆明</span>
                                                <p class="smalltext">游玩6-7天</p>
                                            </div> 
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div class="item-place1">
                                            <div class="item-img8"></div>
                                            <div class="item-text">
                                                <p class="bigtext">甘肃</p>
                                                <span>兰州</span>
                                                <p class="smalltext">游玩7-8天</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-place1">
                                           <div class="item-img9"></div>
                                            <div class="item-text">
                                                <p class="bigtext">泰国</p>
                                                <span>曼谷</span>
                                                <p class="smalltext">游玩6-7天</p>
                                            </div> 
                                        </div>
                                    </li>
                                </ul>
                                 <div class="button">
                                    <ul>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">日本</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">芽庄沟</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">迪拜</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">张家界</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">普吉岛</a></span>
                                        </li>
                                        <li>
                                            <span class="button-text"><a href="javascript:;">巴厘岛</a></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
                <div class="place">

                </div>
            </div>
        </div> 
        <!-- 特价跟团游 -->
        <div class="sale">
            <div class="sale-manual">
                <span>特价跟团游</span>
                <span class="moreone">
                    <router-link to="/Product/1002">
                        <span>更多></span>
                    </router-link>
                </span>
            </div>
            <div class="placename">
                <ul class="placename_list" :style="TransMove" ref="PlaceList" @touchstart="placeTouchStart" @touchmove="placeTouchmove" @touchend="placeTouchend">
                    <li class="placename_item" v-for="(text,i) of txt" :key="i">
                        <div class="place_item_detail">
                            <div class="item_img" :style="`background-image:url(${text.src});`"></div>
                            <p class="item_title">{{text.title}}</p>
                            <div class="item_parice_txt"><span>￥</span><span class="item_price">{{text.price}}</span>起</div>
                        </div>
                    </li>
                    <li class="place_GoItems">
                        查看更多
                    </li>
                </ul>
            </div>
        </div>
        <!-- 楼层间距 -->
        <div class="all-careful">
            <item></item>
        </div>
        <!-- 底部导航栏 -->
        <div class="index-bottom"></div>
        <van-tabbar v-model="active" active-color="#0086f6" inactive-color="#000" style="z-index:200;">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="aim"  to="/free">目的地</van-tabbar-item>
            <van-tabbar-item icon="like-o" to="/collection">收藏</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/self">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import item from './item'
export default {
    components:{item},
    data(){
        // 点击我的先是隐藏
        return {
        show1:false,
            active:0,
            activeName: 'a',
            headscroll:0,
            indexNav:[
                { 
                    navname:"周边",
                    citys:["西安","华山","延安","汉中","宝鸡","洛阳","渭南","更多..."],
                },
                { 
                    navname:"境内",
                    citys:["西安","成都","三亚","重庆","华山","北京","延安","更多..."],
                },
                { 
                    navname:"中国港澳台",
                    citys:["台湾","香港","澳门","台北","垦丁","日月潭","高雄","更多..."],
                },
                { 
                    navname:"日本",
                    citys:["日本","东京","北海道","大阪","京都","富士山","名古屋","更多..."],
                },
            ],
             indexNav2:[
                { 
                    navname:"东南亚",
                    citys2:["泰国","华山","延安","汉中","宝鸡","洛阳","渭南","更多..."],
                },
                { 
                    navname:"欧洲",
                    citys2:["俄罗斯","成都","三亚","重庆","华山","北京","延安","更多..."],
                },
                { 
                    navname:"美洲",
                    citys2:["塞班岛","香港","澳门","台北","垦丁","日月潭","高雄","更多..."],
                },
                { 
                    navname:"澳中东非",
                    citys2:["迪拜","东京","北海道","大阪","京都","富士山","名古屋","更多..."],
                },
            ],
            txt:[
                {
                    title:"华东5市+乌镇5日4晚跟团游(4钻)",
                    src:require("../assets/sale-img1.jpg"),
                    price:1445,
                },
                {
                    title:"昆明+大理+丽江+玉龙雪山(4钻)",
                    src:require("../assets/sale-img2.jpg"),
                    price:2081,
                },
                {
                    title:"北京5日4晚跟团游(4钻)",
                    src:require("../assets/sale-img03.jpg"),
                    price:1801,
                },
                {
                    title:"广西桂林+阳朔+漓江5日4晚(5钻)",
                    src:require("../assets/sale-img04.jpg"),
                    price:666,
                },
                {
                    title:"普吉岛6日5晚半自助游(4钻)",
                    src:require("../assets/sale-img05.jpg"),
                    price:788,
                },
                {
                    title:"长沙+张家界+天门山3日2晚(4钻)",
                    src:require("../assets/sale-img06.jpg"),
                    price:1110,
                },
                {
                    title:"贵州黄果树+荔波3日3晚跟团游(4钻)",
                    src:require("../assets/sale-img07.jpg"),
                    price:999,
                },
                {
                    title:"昆明+大理+丽江+玉龙雪山6日5晚跟团游(4钻)",
                    src:require("../assets/sale-img08.jpg"),
                    price:699,
                },
                {
                    title:"张家界+大峡谷+天门山4日3晚跟团游(5钻)",
                    src:require("../assets/sale-img09.jpg"),
                    price:1325,
                },
                {
                    title:"泰国普吉岛6日半自助游(5钻)",
                    src:require("../assets/sale-img10.jpg"),
                    price:1666,
                },
                {
                    title:"云南昆明+大理+丽江6日5晚跟团游(4钻)",
                    src:require("../assets/sale-img11.jpg"),
                    price:1099,
                },
                {
                    title:"北京5日4晚跟团游(4钻)",
                    src:require("../assets/sale-img12.jpg"),
                    price:1799,
                }
            ],
             images:[require("../assets/carsoual1.jpg"),require("../assets/carsoual2.png"),require("../assets/carsoual3.jpg")],
            citys:[],
            citys2:[],
            cindex:-1,
            zindex:-1,
            firsetOne:false,
            firsetTwo:false,
            navBC:false,
            isLogin:false,
            userDetails:{},
            startX:0,//手指按下位置
            moveX:0,//手指移动距离
            TouchStart:false,//判断手指是否按下
            TransMove:"",//保存元素偏移style
            offsetx:0,//保存偏移量
            startTime:0,//手指按下时间
            offsetxAll:0,
            timer:null,
         }
    },
    methods:{
        goHistory(str){
            this.$router.push(str);
        },
        login(){
            this.show1=!this.show1;           
        },
        touchCity(e){
            this.firsetOne = true;
            this.firsetTwo = false;
            if(e.target.nodeName==="DIV"){
                var i = parseInt(e.target.dataset.index);
                if(this.cindex!=i){
                    this.cindex = i;
                    this.citys = this.indexNav[i].citys;
                }else{
                    this.cindex = -1;
                }
            }
        },
        touchCity2(e){
            this.firsetOne = false;
            this.firsetTwo = true;
            if(e.target.nodeName==="DIV"){
                var i = parseInt(e.target.dataset.index);
                if(this.zindex!=i){
                    this.zindex = i;
                    this.citys2 = this.indexNav2[i].citys2;
                }else{
                    this.zindex = -1;
                }
            }
        },
        placeTouchStart(e){
             e.preventDefault();
            //获取手指按下的位置
            if(e.touches.length == 1){
                this.startX = e.touches[0].clientX;
                this.TouchStart = true;
                this.startTime = +new Date();//手指按下事件
            }
        },
        placeTouchmove(e){
            e.preventDefault();
            if(e.touches.length == 1 && this.TouchStart){
                this.moveX = e.touches[0].clientX;
                this.offsetx = this.moveX - this.startX;
                var PlaceW = this.$refs.PlaceList.scrollWidth;
            var Winw = window.innerWidth;
                var MaxOffset = -(PlaceW - Winw);
                var offset = this.offsetxAll + this.offsetx;
                this.TransMove = `transform:translateX(${offset}px);` 
                if(this.offsetxAll + this.offsetx>150){
                    this.placeTouchend(e);
                } 
                if(this.offsetxAll + this.offsetx < MaxOffset - 200){
                    this.placeTouchend(e);
                } 
            }
        },
        placeTouchend(e){
            e.preventDefault();
            this.TouchStart = false;
            this.offsetxAll += this.offsetx;
            this.offsetx = 0;
            var endPoint = e.changedTouches[0].clientX;
            var PlaceW = this.$refs.PlaceList.scrollWidth;
            var Winw = window.innerWidth;
            var MaxOffset = -(PlaceW - Winw);
            var endTime = +new Date();
            var timer = endTime - this.startTime;
            var x = endPoint - this.startX;
            if(this.offsetxAll>0){
                this.TransMove = `transform:translateX(0px);transition:transform .3s ease-out;`;
                this.offsetxAll = 0;
                return;
            }
            if(this.offsetxAll < MaxOffset){
                this.TransMove = `transform:translateX(${MaxOffset}px);transition:transform .3s ease-out;`;
                this.offsetxAll = MaxOffset;
                return;
            }
            if(Math.abs(x)>60){
                if(x>0){
                    if(timer < 120){
                        this.TransMove = "transform:translateX(0px);transition:transform .8s ease-out;"
                        this.offsetxAll = 0;
                    }
                }else{
                     if(timer < 120){
                        this.TransMove = `transform:translateX(${MaxOffset}px);transition:transform .8s ease-out;`
                        this.offsetxAll = MaxOffset;
                    }
                }
            }
        },
        scroll(){
            var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
            if(scrollTop<33){
                this.navBC = false;
            }else if(scrollTop>33){
                this.navBC = true;
            }   
        },
        exitLogin(){
            this.$axios.get("v1/getuser/ExitLogin").then(res=>{
                if(res.data.code == 200){
                    this.isLogin = false;
                    this.$toast.success('退出登录');
                }
                 this.show1= false; 
            })
        },
        place(){
            this.$router.push("/free");
        },
        getuDetails(){
            if(!this.isLogin){ //如果用户未获得用户信息
                this.$axios.get("v1/getuser/uDetails").then(res=>{
                    if(res.data.code === 400){
                        this.isLogin = false;
                        return;
                    }else if(res.data.code === 200){
                        this.isLogin = true;
                        this.userDetails = res.data.data;
                    }
                })
            }
        }
    },
    // 可发送ajax请求 又可DOM操作
    mounted() {
        window.addEventListener("scroll",this.scroll);
        this.getuDetails();
    },
    destroyed() {
        window.removeEventListener('scroll', this.scroll);
    },
}
</script>
<style scoped>
/*  头部搜索内容和背景图片 以及返回（<）到首页index.html  */
.index{
    background-color: #fff;
}
.head{
    position:fixed;
    background: transparent; 
    z-index: 100;
    width: 100%;
    top:0;
    left:0;
} 
.headSousuo{
    /*头部搜索框 相对定位 */
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    padding:1rem 0 .8rem 0;
}
.headSousuoW{
    background-color: #fff;
}
.search-sousuo{
    width: 80%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left:20px;
}
.search-city{
    width: 38%;
    border: 0;
    font-size: 14px;
    line-height: 32px;
    color: dodgerblue;
    border-radius: 20px 0 0 20px;
    background-color: #fff;
    text-align: center;
    position: relative;
}

.search-city>span{
    vertical-align: middle;
}
.search-city>span:first-child{
    position:absolute;
    left:16px;
    top:3px;
}
.search-city>span:last-child{
    margin-left:15px;
    border-radius: 0 20px 20px 0;
}
.search-input{
    position: relative;
    width: 60%;  
    height: 33px;
    border-left: solid 1px #eaeaea;
    font-size: 14px;
    background-color: #fff;
    border-radius: 0 20px 20px 0;
}
.search-cityC,.search-inputC{
    background-color: #ebedf0;
}
.search-inputC{
    border-left:1px solid #c4ceea;
}
.search-input>div:first-child{
    width: 40px;height: 33px;
    position:absolute;
    left:0;
    top:0;
    font-size:1.3rem;
    color:#999;
}
.search-mu{
    margin-left:35px;
    line-height: 34px;
    color:#999;
}
/* 位置坐标图 样式 */
.search-location{
    font-size:1rem;
}
/* 搜索图片的位置 */
.search-text>.van-icon{
    position: relative;
    top: 7px;
    left: 10px;
}
.search-input>div.search_textB,.search_muB{
    color:#323233;
}
/* 我的 样式 */
.mine{
    background: transparent;
    text-align: center;
    position: absolute;
    right:.75rem;
    top:.8rem;
    color:#fff;
}
.mineC{
    color:#323233;
}
.mine_icon{
    font-size: 1.4rem;
    vertical-align: bottom;
}
.mine_txt{
    font-size:.9rem;
}
/* 点击我的 显示隐藏登录注册 样式 */
.mine-tag-show{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1100;
    top:0;
    left:0;
    background-color: rgba(0, 0,0, .7);
    overflow: hidden;
}
.mine-tag-box{
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    background-color: #fff;
    width: 55%;
    z-index: 1101;
}
.exit_login{
    height: 2.5rem;
    text-align: center;
    margin-top:3rem;
}
.exit_btn{
    height: 100%;width: 50%;
    color:#448aff;
    border:1px solid #448aff;
    border-radius: .3rem;
    background-color: #fff;
}
.rnav_gologin{
    margin:2rem 0;
}
.login-right{
    padding:15px;
    text-align: center;
    display: block;
    color: #000;
}
.welcome-text{
    font-size: 1rem;
    color: #666;
    line-height: 1.2;
}
.go-login{
    position: relative;
    margin: 5px auto 0;
    width: 150px;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    text-align: center;
    color: #448aff;
    border: #448aff 1px solid;
    border-radius: 38px;
}
.list-like,.list-order,.list-history{
    width: 100%;
    position: relative;
    text-align: center;
    margin: .8rem 0;
}
.txt1,.txt2,.txt3{
    font-size:1.1rem;
    color: #333;
}
.txt1>span,.txt2>span,.txt3>span{
    line-height: 1.8rem;
    margin:0 .5rem;
    vertical-align: top;
}
/* 轮播图样式 */
.swipe-img{
    width: 100%;
}
/* 周边、、、、、样式位置 */
.first-style{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.first-style>li{
    width: 25%;    
}
.first-style>div{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
}
.first-style>img{
    display: inline-block;
    text-align: center;
    padding-left: 10px;
}
.floor-one,.floor-two{
    display: block;
    text-align: center;
    position: relative;
}
.floor-one>div,.floor-two>div{
    display: inline-block;
    width: 4rem;
    height: 4rem;
    background:url('../assets/nav_sprites.png') no-repeat;
}
.floor-one:first-child>div{
    background-position: -3px 0;
}
.floor-one:nth-child(2)>div{
    background-position: -77px 0;
}
.floor-one:nth-child(3)>div{
    background-position: -149px 0;
}
.floor-one:last-child>div{
    background-position: -222px 0;
}
.floor-two:first-child>div{
    background-position: -296px 0;
}
.floor-two:nth-child(2)>div{
    background-position: -369px 0;
}
.floor-two:nth-child(3)>div{
    background-position: -442px  0;
}
.floor-two:last-child>div{
    background-position: -516px  0;
}
.first-style>li>p{
   font-size: 13px;
   font-weight: 500;
   color: #222;
   text-align: center;
}
/* 隐藏 显示的详细周边 */
.first-touch{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    background-color: #F7F7F7;
}
.touch-city{
    width: 25%;height: 2.8rem;
    text-align: center;
    line-height: 1.5rem;
    padding:.4rem ;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}
.touch-city>p{
    height: 100%; 
    background-color: #fff; 
    border-radius: 1rem;
    font-size:.9rem; 
    line-height: 2rem;
}
/* 查看目的地大全 */
.see-all{
    margin: 1.2rem 0 1rem 0;
}
.see-gofree{
    display: block;
    text-align: center;
    color:#088af6;
    font-weight: 500;
    letter-spacing:2px;
}
/* 跟团新体验 */
#gentuan .text{
    font-size: 1.3rem;
    font-weight: 700;
    padding:.8rem 1rem;
}
/* 当地参团 */
.local{
    width: 100%;
}
.local_img{
    width: 100%;
}
/* 出行手册模块 */
/* 底下标题 */
.travel-manual{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    color: #000;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    padding:0 1rem;
}
.travel-manual>span{
    font-size:1.3rem;
    font-weight: 700;
}
.travel-manual>a{
    color:#999;
}
/* 稻城item样式 */
.item-place{
    width: 100%;
}
.item-place>ul{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -ms-flex-pack: distribute;
        justify-content: space-around;
    margin-top:.6rem;
}
 .item-place>ul>li{
    width: 30%;
}
.item-place1{
    position: relative;
    overflow: hidden;
}
.item-img1{
    background-image: url("http://www.glpstc.applinzi.com/img/place-img1.jpg");
}
.item-img2{
    background-image: url("http://www.glpstc.applinzi.com/img/place-img2.jpg");
}
.item-img3{
    background-image: url("http://www.glpstc.applinzi.com/img/place-img3.jpg");
}
.item-img4{
   background-image: url("http://www.glpstc.applinzi.com/img/place-img4.jpg");  
}
.item-img5{
   background-image: url("http://www.glpstc.applinzi.com/img/place-img5.jpg");  
}
.item-img6{
   background-image: url("http://www.glpstc.applinzi.com/img/place-img6.jpg");  
}
.item-img7{
   background-image: url("http://www.glpstc.applinzi.com/img/place-img7.jpg");  
}
.item-img8{
   background-image: url("http://www.glpstc.applinzi.com/img/place-img8.jpg");  
}
.item-img9{
   background-image: url("http://www.glpstc.applinzi.com/img/place-img9.jpg");  
}
.item-img1,.item-img2,.item-img3,.item-img4,.item-img5,.item-img6,.item-img7,.item-img8,.item-img9{
    width: 100%;
    height: 10rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center center;
    border-radius: 0.5rem;
}
.item-text{
    position: absolute;
    top: 80px;
    left: 10px;
}
.bigtext{
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 5px;
}
.item-text>span{
    border: 1px solid #fff;
    background: #fff;
    border-radius: .2rem;
    font-size: 14px;
    color: #333;
    padding: 1px 2px;
    margin-bottom: 5px;
}
.smalltext{
    /* padding-top: 6px; */
    color: #fff;
    font-size: 12px;
    padding-top: 6px;
}
/* 底部地点按钮 */
.button>ul{ 
    display: -webkit-box; 
    display: -ms-flexbox; 
    display: flex;
    width: 100%;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -ms-flex-pack: distribute;
        justify-content: space-around;
}
.button>ul>li{
    width: 28%;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    background: #F7F7F7;
    border: #ddd 1px solid;
    border-radius: 0.4rem;
    margin-top:.6rem;
}
.button-text>a{
    color: #222;
    font-size: 14px;
}
/* 特价跟团游 */
.sale{
    margin-top:1rem;
    background-color: #fff;
}
.sale-manual{
    padding:0 1rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
}
.sale-manual>span:first-child{
    color: #000;
    font-size:1.3rem;
    font-weight: 700;
}
.moreone{
    text-align: right;
}
.moreone>a{
    color: #999;
    display: inline-block;
    height: 20px;
}
.moreone>a>span.jiantou{
    display: inline-block;
    vertical-align: middle;
}
.placename{
    width: 100%;
    margin-top:.5rem;
    overflow: hidden;
}
.placename_list{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
    padding-left:.6rem;
}
.placename_item{
    height: 100%;
}
.place_item_detail{
    width: 7rem;
    height: 100%;
    margin:.5rem .2rem;
}
.item_img{
    width: 100%;
    height: 7rem;
    background-size: cover;
    background-position: center center;
    border-radius: .4rem;
}
.item_title{
    display: -webkit-box;
    font-weight: 500;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: .95rem;
}
.item_price{
    color:#ff6913;
    font-weight: 600;
    font-size: 1.1rem;
}
.item_parice_txt>span:first-child{
    color:#ff6913;
}
.item_parice_txt{
    font-size:.9rem;
    color:#abaeb4;
}
.place_GoItems{
    width: 2rem;
    padding:0 .5rem;
    font-size:1rem;
    height: 100%;
    margin: auto;
    font-size: .9rem;
    color:#abaeb4;
}
.txt{
    height: 3rem;
    width: 7rem;
    position: absolute;
    top: 102px;
    font-size: 14px;
    color: #000;
}
.price{
    height: 1.5rem;
    width: 7rem;
    position: absolute;
    top: 145px;
}
.price>span>strong{
    color: #ff6913;
}
.price>span>dfn{
    color: #ff6913;
    font-size: 10px;
}
.price>span>em{
    font-size: 10px;
    color: #999;
}
.all-careful{
    width: 100%;
    position: relative;
    margin-top:1rem;
}
.msgShow{
    width: 100%;
    text-align: center;
    margin-top:2rem;
}
.uavatar{
    width: 30%;
    height: auto;
    border-radius: 50%;
}
.uname{
    font-size: 14px;
    color: #323233;
    font-weight: 600;
}
.index-bottom{
    height: 3rem;
}
</style>