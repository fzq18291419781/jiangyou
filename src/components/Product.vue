<template>
    <div>
        <div class="head">
            <!-- 头部搜索内容-->
            <div class="head-sousuo">
                <div class="search-sousuo">
                    <div class="search-return" @click="ProductGo">
                        <van-icon name="arrow-left"  size="25px" class="search-arrow"/>
                    </div>
                    <div class="search-city" @click="maps">
                        <span>
                            <van-icon class="search-location" name="location" />
                        </span>
                        <span>{{this.$store.state.place}}</span>
                    </div>
                    <div class="search-input">
                        <div class="search-text">
                            <van-icon name="search" />
                        </div>
                        <div class="search-mu">
                            目的地/关键字
                        </div>
                    </div>
                </div>
            </div>
            <!-- 头部筛选 -->
            <div class="triplist_content">
                <div class="triplist">
                    <!-- 跟团游 -->
                    <p class="triplist_group" @click="Group">
                        <span :class="{triplist_day:group==true}">跟团游</span>
                    </p>
                    <!-- 一日游 -->
                    <p class="triplist_oneday" @click="OneDay" >
                        <span :class="{triplist_day:group==false}">一日游</span>
                    </p>
                </div>
                <div class="triplist_native">
                    <!-- 推荐排序 -->
                    <div>
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="value1" :options="option1" title="推荐排序"/>
                        </van-dropdown-menu>
                    </div>
                    <!-- 线路玩法 -->
                    <div class="triplist_play" >
                        <div @click="Line" :class="{fontColor:c==true}">
                            线路玩法
                            <span  class="iconfont" :class="{ca:!c,cb:c}"></span>
                        </div>
                    </div>
                    <!-- 天数/日期 -->
                    <div class="triplist_play">
                        <div @click="Days" :class="{fontColor:d==true}">天数
                        <span class="iconfont" :class="{ca:!d,cb:d}"></span>
                        </div>
                    </div>
                    <!-- 筛选 -->
                    <div class="triplist_select" @click="choose">
                        <span>筛选
                            <span class="iconfont icon-shaixuanxuanzhong icon_shaixuan"></span>
                        </span>
                    </div>
                </div>
                <!-- 线路点击下拉 -->
                <div class="triplist_down" v-show="line">
                    <!-- 线路下拉 -->
                    <div class="triplist_play_line">
                        <!-- 游玩线路/热门景点 -->
                        <div class="triplist_play_height">
                            <div class="triplist_play_line_special">
                                <p class="triplist_play_line_title">游玩线路</p>
                                <div class="triplist_play_flex_box">
                                    <div class="triplist_play_line_item_box" v-for="(item,index) of lines" :key="index">
                                        <div class="triplist_play_line_item">
                                            <div class="triplist_play_line_choose">
                                                <p class="triplist_clamp">{{place[index]}}</p>
                                                <span class="triplist_time_gray">{{scale[index]}}选择</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="triplist_play_line_special">
                                <p class="triplist_play_line_title">热门景点</p>
                                <div class="triplist_play_flex_box">
                                    <div class="triplist_play_line_item_box" v-for="(item,index) of lines" :key="index">
                                        <div class="triplist_play_line_item">
                                            <div class="triplist_play_line_choose">
                                                <p class="triplist_clamp">{{place1[index]}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 清空/线路查询 -->
                        <div class="triplist_btn_box">
                            <span class="triplist_btn_clear">清空</span>
                            <span class="triplist_btn_see">查看174条路线</span>
                        </div>
                    </div>
                </div>
                <!-- 天数点击下拉 -->
                <div class="triplist_down" v-show="days">
                    <!-- 线路下拉 -->
                    <div class="triplist_play_line">
                        <!-- 游玩线路/热门景点 -->
                        <div class="triplist_play_height">
                            <div class="triplist_play_line_special">
                                <p class="triplist_play_line_title">行程天数</p>
                                <div class="triplist_play_flex_box">
                                    <div class="triplist_play_line_item_box" v-for="(item,index) of lines" :key="index">
                                        <div class="triplist_play_line_item">
                                            <div class="triplist_play_line_choose">
                                                <p class="triplist_clamp">{{goDays[index]}}</p>
                                                <span class="triplist_time_gray">{{scale[index]}}选择</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 清空/线路查询 -->
                        <div class="triplist_btn_box">
                            <span class="triplist_btn_clear">清空</span>
                            <span class="triplist_btn_see">查看174条路线</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 筛选点击右侧出 -->
            <div class="triplist_down1" v-show="select" @click="select=false">
                <div class="triplist_list_sx" @click.stop>
                    <div class="triplist_list_sx_item">
                        <p class="triplist_sx_content">精选推荐</p>
                        <div class="triplist_sx_line">
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">优选</p>
                            </div>
                        </div>
                    </div>
                        <div class="triplist_list_sx_item">
                        <p class="triplist_sx_content">推荐出发城市</p>
                        <div class="triplist_sx_line">
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">西安</p>
                            </div>
                        </div>
                    </div>
                        <div class="triplist_list_sx_item">
                        <p class="triplist_sx_content">产品类型</p>
                        <div class="triplist_sx_line">
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">跟团游</p>
                            </div>
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">一日游</p>
                            </div>
                        </div>
                    </div>
                    <div class="triplist_list_sx_item">
                        <p class="triplist_sx_content">特色项目</p>
                        <div class="triplist_sx_line">
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">寺院祈福</p>
                            </div>
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">历史博物馆</p>
                            </div>
                                <div class="triplist_line_item">
                                <p class="triplist_clamp2">看大熊猫</p>
                            </div>
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">古镇古村</p>
                            </div>
                        </div>
                    </div>
                        <div class="triplist_list_sx_item">
                        <p class="triplist_sx_content">途径地</p>
                        <div class="triplist_sx_line">
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">西安</p>
                            </div>
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">华山</p>
                            </div>
                                <div class="triplist_line_item">
                                <p class="triplist_clamp2">宜川</p>
                            </div>
                            <div class="triplist_line_item">
                                <p class="triplist_clamp2">黄陵</p>
                            </div>
                                <div class="triplist_line_item">
                                <p class="triplist_clamp2">延安</p>
                            </div>
                                <div class="triplist_line_item">
                                <p class="triplist_clamp2">扶风</p>
                            </div>
                        </div>
                    </div>
                    <!-- 清空/线路查询 -->
                    <div class="triplist_btn_box">
                        <span class="triplist_btn_clear">清空</span>
                        <span class="triplist_btn_see">查看174条路线</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="triplist_product" v-show="group">
            <div class="triplist_tour_list" v-for="(item,i) of cityDesc" :key="i" :data-id="item.Jid" @click="productDetail($event)">
                    <!-- 背景图片 -->
                    <div class="triplist_tour_img" :data-id="item.Jid" :style="`background-image:url(${utilUrl}/img/${item.prevImg});`">
                        <!-- 哪里出发 -->
                        <div class="triplist_tour_box">
                            <p class="triplist_tour_type" :data-id="item.Jid">西安出发</p>
                        </div>
                        <!-- 跟团游 -->
                        <span class="triplist_tour_start" :data-id="item.Jid">跟团游</span>
                    </div>
                    <div class="triplist_tour_content" :data-id="item.Jid">
                        <!-- 主标题 -->
                        <h3 :data-id="item.Jid">{{item.title}}{{item.subtitle}}</h3>
                        <!-- 副标题 -->
                        <p class="triplist_subtitle" :data-id="item.Jid">{{item.subtitle}}</p>
                        <!-- 广告 -->
                            <div class="triplist_ad" :data-id="item.Jid">
                            <span class="triplist_tag" :data-id="item.Jid">广告</span>
                            <span class="triplist_jewel" :data-id="item.Jid">4钻</span>
                            <span class="triplist_jian" :data-id="item.Jid">惠</span>
                        </div>
                        <!-- 宣传语 -->
                            <div class="triplist_supplier_date" :data-id="item.Jid">
                            <span class="triplist_supplier" :data-id="item.Jid">魅力古都</span>
                            <span class="triplist_date" :data-id="item.Jid">10/17等可订</span>
                        </div> 
                        <!-- 评分 -->
                        <div class="triplist_tour_info" :data-id="item.Jid">
                            <span class="triplist_tour_point" :data-id="item.Jid"><strong :data-id="item.Jid">{{item.grade}}</strong>分</span>
                            <span class="triplist_tour_num" :data-id="item.Jid">已售426人</span>
                        </div>
                        <!-- 价格 -->
                        <div class="triplist_tour_fbd" :data-id="item.Jid">
                            <span class="triplist_tour_price" :data-id="item.Jid">
                                <dfn :data-id="item.Jid">¥</dfn>
                                <strong :data-id="item.Jid">{{item.price}}</strong>
                                起
                            </span>
                        </div>
                    </div>
            </div>
        </div>
        <!-- 一日游列表 -->
        <div class="triplist_product" v-show="Oneday">
            <div class="triplist_tour_list" v-for="(item,i) of cityDesc" :key="i" :data-id="item.Jid" @click="productDetail($event)">
                    <!-- 背景图片 -->
                    <div class="triplist_tour_img" :data-id="item.Jid" :style="`background-image:url(${utilUrl}/img/${item.prevImg});`">
                        <!-- 哪里出发 -->
                        <div class="triplist_tour_box">
                            <p class="triplist_tour_type" :data-id="item.Jid">西安出发</p>
                        </div>
                        <!-- 跟团游 -->
                        <span class="triplist_tour_start" :data-id="item.Jid">一日游</span>
                    </div>
                    <div class="triplist_tour_content" :data-id="item.Jid">
                        <!-- 主标题 -->
                        <h3 :data-id="item.Jid">{{item.title}}{{item.subtitle}}</h3>
                        <!-- 副标题 -->
                        <p class="triplist_subtitle" :data-id="item.Jid">{{item.subtitle}}</p>
                        <!-- 广告 -->
                            <div class="triplist_ad" :data-id="item.Jid">
                            <span class="triplist_tag" :data-id="item.Jid">广告</span>
                            <span class="triplist_jewel" :data-id="item.Jid">4钻</span>
                            <span class="triplist_jian" :data-id="item.Jid">惠</span>
                        </div>
                        <!-- 宣传语 -->
                            <div class="triplist_supplier_date" :data-id="item.Jid">
                            <span class="triplist_supplier" :data-id="item.Jid">魅力古都</span>
                            <span class="triplist_date" :data-id="item.Jid">10/17等可订</span>
                        </div> 
                        <!-- 评分 -->
                        <div class="triplist_tour_info" :data-id="item.Jid">
                            <span class="triplist_tour_point" :data-id="item.Jid"><strong :data-id="item.Jid">{{item.grade}}</strong>分</span>
                            <span class="triplist_tour_num" :data-id="item.Jid">已售426人</span>
                        </div>
                        <!-- 价格 -->
                        <div class="triplist_tour_fbd" :data-id="item.Jid">
                            <span class="triplist_tour_price" :data-id="item.Jid">
                                <dfn :data-id="item.Jid">¥</dfn>
                                <strong :data-id="item.Jid">{{item.price}}</strong>
                                起
                            </span>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
    return {
        value1: 0,
        option1: [
            { text: '推荐排序', value: 0 },
            { text: '近期销量 高→低', value: 1 },
            { text: '评分 高→低 ', value: 2 },
            { text: '价格 高→低 ', value: 3 },
            { text: '价格 高→低 ', value: 4 }
        ],
        list:[1,2,3,4,5,6],
        lines:[1,2,3,4,5,6],
        place:["西安+壶口瀑布+延安","西安+华山","兵马俑+华清池","西安全景","乾陵+法门寺","陕西+河南"],
        place1:["兵马俑","西安城墙","大唐不夜城","陕西历史博物馆","大雁塔","大唐芙蓉园"],
        goDays:["2日","3日","4日","5日","6日","7日"],
        scale:["34%","20%","25%","40%","32%","10%"],
        line:false,
        days:false,
        select:false,
        c:false,
        d:false,
        group:true,
        Oneday:false,
        cityDesc:[]
    }
  },
    methods: {
        ProductGo(){
            history.go(-1);
        },
        Line(){
            this.line=!this.line;
            this.c = !this.c;
        },
        Days(){
            this.days=!this.days;
            this.d = !this.d;
        },
        choose(){
            this.select=!this.select;  
        },
        Group(){
            this.group=true;
            this.Oneday = false;  
        },
        OneDay(){
            this.Oneday=true; 
            this.group = false;
        },
        // 点击跳转详情页
        productDetail(e){
            var Jid = e.target.dataset.id;
            this.$router.push(`/Product_detail/${Jid}`)
        },
        maps(){
            this.$router.push("/position");
        },
        // axios请求
        productList(){
            this.$axios.get(
                `v1/getindex/citySelect?CityId=${this.$route.params.id}`
            ).then(res=>{
                this.cityDesc = res.data.data;
            })
        }
    },
    created() {
        this.productList();
    },
    mounted() {
    },
}
</script>
<style scoped>      
/*  头部搜索内容 以及返回（<）到  */
.head{
    position: relative;
}
.head>.head-sousuo{
    /*头部搜索框 */
    position: fixed;
    z-index: 10;
    width: 100%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    padding: 10px 0;
    background: #fff;
}
.search-sousuo{
    width: 90%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left:10px;
}
.search-city{
    width: 38%;
    border: 0;
    font-size: 14px;
    line-height: 32px;
    color: dodgerblue;
    border-radius: 20px 0 0 20px;
    background-color: #EEF1F6;
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
    margin-left:12px;
    border-radius: 0 20px 20px 0;
}
.search-input{
    position: relative;
    width: 82%;  
    height: 33px;
    border-left: solid 1px #DDDDDD;
    font-size: 14px;
    background-color: #EEF1F6;
    border-radius: 0 20px 20px 0;
}
.search-input>div:first-child{
    width: 40px;height: 33px;
    position:absolute;
    left:0px;
    top:0px;
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
    font-size:16px;
}
/* 搜索图片的位置 */
.search-text>.van-icon{
    position: relative;
    top: 7px;
    left: 10px;
}
/* 返回箭头 */
.search-return{
    margin-right: 15px;
    text-align:center;
}
.search-return .search-arrow{
    line-height: 33px;
}
/* 头部筛选 */
.triplist_content{
    position: fixed;
    top:53px;
    width: 100%;
    z-index: 10;
}
/* 跟团游/一日游 */
.triplist{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #ececec;
    z-index: 99;
    height: 44px;
    background: #fff;
}
.triplist .triplist_group,.triplist .triplist_oneday{
    width: 50%;
    text-align: center;
    line-height: 43px;
    /* color:#0086F6; */
    font-size: 16px;
}
/* .triplist .triplist_group span{
    display: block;
    width: 33.33%;
    line-height: 41px;
    border-bottom: 2px solid #0086f6;
    margin: 0 auto;
} */
.triplist .triplist_oneday{
    color: #000;
}
/* 推荐排序 */
.triplist_native{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: #fff;
}
.triplist_native>div{
    width: 25%;
    font-size: 14.5px;
    text-align: center;
    line-height: 50px;
    position: relative;
}
.triplist_native .triplist_select{
    line-height: 50px;
}
/* 字体图标样式 */
.iconfont{
    display:inline-block;
    font-size: 18px;
    margin-left: -2px;
}
.icon_shaixuan{
    font-size: 10px;
}
.triplist_play{
    position: relative;
}
.triplist_play .iconfont::before{
    position: absolute;
    top:0px;;
}
/* 商品列表 */
.triplist_product{
    position: relative;
    width: 100%;
    top:148px;
    border-top: 1px solid #F7F7F7;
}
.triplist_tour_list{
    width: 100%;
    height: 153px;
    border-bottom: 1px solid #F7F7F7;
    padding: 10px 0 10px 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
}
.triplist_tour_img {
    width: 120px;
    position: relative;
    margin-right: 10px;
    overflow: hidden;
    border-radius: 4px;
    background:no-repeat;
    background-size: cover;
    background-position: center center;
}
/* div */
.triplist_tour_box{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    text-align: center;
    font-size: 10px;
    color: #fff;
}
/* div下的p 西安出发 */
.triplist_tour_type{
    background: rgba(68,68,68,0.7);
    padding: 3px 0;
    text-align: center;
}
/* span 跟团游 */
.triplist_tour_start{
    color: #fff;
    font-size: 10px;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.6);
    padding: 3px 4px 2px 4px;
    z-index: 1;
    line-height: 1;
    border-radius: 0 0 6px 0;
}
/* 右侧标题 */
.triplist_tour_content{
    position: relative;
    padding: 0 10px 12px 0;
    /* border: 1px solid #000; */
    width:1%;
    -webkit-box-flex:1;
        -ms-flex:1;
            flex:1;
    min-height: 78px;
}
/* 主标题 */
.triplist_tour_content h3{
    overflow: hidden;
    display: -webkit-box;/*多行溢出隐藏 */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-bottom: 7px;
    position: relative;
    font-size: 16px;
    line-height: 20px;
    max-height: 40px;
    color: #333;
}
/* 副标题 */
.triplist_subtitle{
    font-size: 13px;
    color: #333;
    line-height: 15px;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    margin-bottom: 8px;
}
/* 广告 */
.triplist_ad{
    max-height: 14px;
    margin-bottom: 10px;
    overflow: hidden;
}
.triplist_ad span{
    position: relative;
    float: left;
    font-size: 10px;
    height: 14px;
    line-height: 15px;
    white-space: nowrap;
    margin-right: 2px;
    margin-bottom: 2px;
}
/* 广告 */
.triplist_tag{
    padding: 0 3px;
    color: #bbb;
}
/* 钻 */
.triplist_jewel{
    position: relative;
    float: left;
    font-size: 10px;
    margin-right: 3px;
    color: #f70;
    background-image: url(../assets/jewel.png);
    background-repeat: no-repeat;
    background-size: auto 14px;
    width: 34px;
    height: 14px;
    text-indent: 15px;
    line-height: 15px;
}
/* 优惠 */
.triplist_jian{
    color: #f60;
}
.triplist_supplier_date{
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: #666;
    margin-bottom: 6px;
    line-height: 12px;
}
.triplist_supplier_date span{
    position: relative;
    font-size: 12px;
}
.triplist_supplier{
    margin-right: 8px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    max-width: 73px;
    vertical-align: bottom;
}
.triplist_tour_info{
    position: absolute;
    min-height: 14px;
    bottom: 0;
    left: 0;
    color: #666;
    height: 14px;
    margin-bottom: 2px;
}
.triplist_tour_info span{
    white-space: nowrap;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    overflow: hidden;
    display: inline;
    font-size: 12px;
    padding-right: 5px;
    color: #666;
}
/* 评分 */
.triplist_tour_info .triplist_tour_point{
    color: #0086f6;
}
.triplist_tour_fbd{
    position: absolute;
    right: 5px;
    width: auto;
    margin: 0 8px 0 0;
    bottom: -2px;
    line-height: 1;
    margin-bottom: 2px;
}
.triplist_tour_price{
    display: block;
    color: #666;
    font-size: 12px;
}
.triplist_tour_price dfn{
    vertical-align: 0;
    color: #f60;
}
.triplist_tour_price strong{
    font-size: 18px;
    margin: 0 2px;
    font-weight: 400;
    color: #f60;
    font-family: PingFangSC-Medium;
}
/* 点击下拉 */
.triplist_down{
    width: 100%;
    height: 35rem;
    /* height: 667px; */
    background: rgba(0,0,0,.6);
    position: fixed;
    z-index: 5;
}
.triplist_down1{
    width: 100%;
    height: 45rem;
    background: rgba(0,0,0,.6);
    position: fixed;
    z-index: 99;
    -webkit-transition: 0.3s linear;
    -o-transition: 0.3s linear;
    transition: 0.3s linear;
}
/* 游玩线路 */
.triplist_play_line{
    width:100%;
    background: #fff;
    position: fixed;
    top:22%;
    /* z-index: 99; */
    bottom: 100px;
    border-top: 1px solid rgba(236,236,236,0.5);
}
.triplist_play_height{
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0 0 70px 0;
    margin-top: -1px;
}
.triplist_play_line_special{
    padding: 0 10px 7px 10px;
    border-bottom:1px solid #ececec;
}
.triplist_play_line_title{
    font-size: 13px;
    color: #888;
    position: relative;
    padding: 10px 5px 5px 5px;
}
.triplist_play_flex_box{
    padding-top: 5px;
}
.triplist_play_flex_box::after{
    content: '';
    display: block;
    clear: both;
}
.triplist_play_line_item_box{
    width: 33.3%;
    float: left;
    padding: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}
.triplist_play_line_item{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    width: 100%;
    height: 44px;
    border: 1px solid #f7f7f7;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px;
    font-size: 13px;
    float: left;
    background: #f7f7f7;
    color: #000;
    position: relative;
}
.triplist_play_line_choose{
    text-align: center;
    line-height: 1.1;
}
.triplist_clamp{
    -webkit-line-clamp:2;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.triplist_time_gray{
    font-size: 12px;
    color: #999;
    display: block;
}
/* 清空/查看按钮 */
.triplist_btn_box{
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 8px 6px;
    background: #fff;
    -webkit-box-shadow: 0 -2px 4px 0 rgba(0,0,0,.04);
            box-shadow: 0 -2px 4px 0 rgba(0,0,0,.04);
}
.triplist_btn_clear{
    width: 50%;
    color: #999;
    background: #eee;
    border: 1px solid #eee;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}
.triplist_btn_see{
     width: 50%;
    text-align: center;
    line-height: 40px;
    background: #0086f6;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    border: 1px solid #0086f6;
}
.ca::before{
  content: "\e658";
}
.cb::before{
   content: "\e779"; 
   color: #0086F6;
}
.fontColor{
    color: #0086F6;
}
/* 筛选点击下拉 */
.triplist_list_sx{
    position: fixed;
    background: #fff;
    height: 100%;
    width: 88%;
    right: 0;
    top: 0;
    /* z-index: 999; */
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding-bottom: 70px;
}
.triplist_list_sx_item{
    border-bottom: 1px solid #ececec;
    padding: 10px 0;
}
.triplist_sx_content{
    font-size: 13px;
    color: #888;
    padding: 0 15px;
    position: relative;
}
.triplist_sx_line{
    padding: 0 11px;
    max-height: 104px;
    overflow: hidden;
    margin-top: 5px;
}
.triplist_line_item{
    width: 30%;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    height: 44px;
    border: 1px solid #f7f7f7;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px;
    font-size: 13px;
    float: left;
    background: #f7f7f7;
    color: #000;
    position: relative;
    text-align: center;
    margin-right: 5px;
    margin-top: 5px;
}
/* 一日游显示蓝色 */
.triplist_day{
    display: block;
    width: 33.33%;
    line-height: 41px;
    border-bottom: 2px solid #0086f6;
    margin: 0 auto;
    color: #0086F6;
}
/* 返回顶部 */
/* .toTop{
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 40px;
    right: 0;
    border: 1px solid #676767;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    font-size: 30px;
    padding-top: 5px;
    color: #676767;
    display: none;
} */
</style>
