<template>
  <div class="herer">
    <div class="comment">
      <div class="headerTop">
        <div class="header">
          <span @click="goProduct_detail">
            <van-icon name="arrow-left" size="20px" color="#000" />
          </span>
          <h3>点 评</h3>
        </div>
        <div class="com-box">
          <div class="com-box1">
            <van-dropdown-menu active-color="#448aff">
              <van-dropdown-item v-model="value1" title="出游类型" :options="option1" />
              <van-dropdown-item v-model="value2" title="最新点评" :options="option2" />
            </van-dropdown-menu>
          </div>
          <div class="com-box-txt">
            <div class="comm-box-t1" :class="{'comm-box-t1-H':zhankai}">
              <span class="com-box-span">全部</span>
              <span class="com-box-span">好评(1200+)</span>
              <span class="com-box-span">差评(11)</span>
              <span class="com-box-span">导游服务好(811)</span>
              <span class="com-box-span">有图(855)</span>
              <span class="com-box-span">追评(63)</span>
              <span class="com-box-span">行程棒(550)</span>
              <span class="com-box-span">无强制消费(1200)</span>
              <span class="com-box-span">风景美(211)</span>
              <span class="com-box-span">酒店赞(91)</span>
              <span class="com-box-span">旅游地值得(85)</span>
              <span class="com-box-span">导游讲解详细(63)</span>
              <span class="com-box-span">团餐赞(55)</span>
            </div>
            <div class="com-box-more" @click="click" ref="dext">∨</div>
          </div>
        </div>
      </div>
      <div class="com-detail">
        <ul class="com-list">
          <li class="item_i">
            <div class="item">
              <div class="user_img"  >
                <img src="../assets/touxiang.jpg" />
              </div>
              <div class="itme_top">
                <span>樊***yyy</span>
                <img src="../assets/madal.png" alt class="user_lv" />
                <span>家庭亲子</span>
                <div class="user_score">
                  <img src="../assets/biaoqing.png" alt class="user_face" />
                  <span>5.0分</span>
                </div>
              </div>
            </div>
            <div class="item_bottom">
              <span>2019-08出发</span>
              <span>双飞5日</span>
            </div>
            <div class="user_star">
              <div>
                <span>形成安排</span>
                <span class="user_star3">很满意</span>
              </div>
              <div>
                <span>描述相符</span>
                <span class="user_star3">很满意</span>
              </div>
              <div>
                <span>导游讲解</span>
                <span class="user_star3">很满意</span>
              </div>
            </div>
            <div class="user_div_text">
              <span
                class="user_text"
              >此次桂林之行，也算是真正体会到了桂林山水之美，乘游船一路欣赏漓江山峰之美。正如我们干练热心的曾狗肉所言，“三分像，七分想象”，也算是让我们充分发挥了想象力，果真是越看越像。乘竹筏在十里画廊里的游览一直是开心兴奋的，随手一拍都觉得景色好美。龙脊梯田的壮观让人能感受到大山中生活的宁静与心安，也不禁感慨大山人民的辛苦与智慧。靖江王府里的文化体验也是很有趣。一路下来，不仅收获了美景，也感受到了文化魅力。当然，这一切都离不开曾狗肉给我们制定的合理路线，酒店选的都很棒，让我们获得了充足的休息。曾狗肉的耐心细致与专业谅解也给此次旅行锦上添花。</span>
            </div>
            <div class="user_text1">
              <span>2019-10-23发表</span>
            </div>
            <div class="user_work">
              <button class="user_zan">
                <img src="../assets/zan.png" alt class="comment_zan" />
                <span @click="add">有用{{count}}</span>
              </button>
            </div>
          </li>

           <li class="item_i">
            <div class="item">
              <div  class="user_img">
                <img src="../assets/touxiang.jpg" alt />
              </div>
              <div class="itme_top">
                <span>m16***564</span>
                <img src="../assets/madal.png" alt class="user_lv" />
                <span>单独旅游</span>
                <div class="user_score">
                  <img src="../assets/biaoqing.png" alt class="user_face" />
                  <span>5.0分</span>
                </div>
              </div>
            </div>
            <div class="item_bottom">
              <span>2019-10出发</span>
              <span>情侣夫妻</span>
            </div>
            <div class="user_star">
              <div>
                <span>形成安排</span>
                <span class="user_star3">很满意</span>
              </div>
              <div>
                <span>描述相符</span>
                <span class="user_star3">很满意</span>
              </div>
              <div>
                <span>导游讲解</span>
                <span class="user_star3">很满意</span>
              </div>
            </div>
            <div class="user_div_text">
              <span
                class="user_text"
              >金秋十月正是来九寨黄龙最美的时候，游览的时间很充足。唯一不足的是山里有些团餐比较难吃，建议提前自备些食物。购物时间安排的较长。</span>
            </div>
            <div class="user_text1">
              <span>2019-10-23发表</span>
            </div>
            <div class="user_work">
              <button class="user_zan">
                <img :src="`${utilUrl}img/user/moren.jpg`" alt class="comment_zan" />
                <span @click="add">有用{{count}}</span>
              </button>
            </div>
          </li>
           <li class="item_i">
            <div class="item">
              <div class="user_img">
                <img src="../assets/touxiang.jpg"  />
              </div>
              <div class="itme_top">
                <span>2654****asd</span>
                <img src="../assets/madal.png"  class="user_lv" />
                <span>朋友出游</span>
                <div class="user_score">
                  <img src="../assets/biaoqing.png" class="user_face" />
                  <span>5.0分</span>
                </div>
              </div>
            </div>
            <div class="item_bottom">
              <span>2019-08出发</span>
              <span>双飞+保姆车</span>
            </div>
            <div class="user_star">
              <div>
                <span>形成安排</span>
                <span class="user_star3">很满意</span>
              </div>
              <div>
                <span>描述相符</span>
                <span class="user_star3">很满意</span>
              </div>
              <div>
                <span>导游讲解</span>
                <span class="user_star3">很满意</span>
              </div>
            </div>
            <div class="user_div_text">
              <span
                class="user_text"
              >整体感觉非常好，线路本身就是比较累的，但是行程安排很合理，保姆大巴车非常舒服必备必备，九寨沟附近的住宿比不上市区但是能看出是当地比较好的了，风景太美太美了，没想到都江堰也很不错，九寨黄龙就不用多说了，导游阿杜姐，是我见过最能讲的导游，一路上不光只介绍当地风景，习俗，政治，历史，还讲了一些自己的地震经历，人生经历，给我的旅行大添光彩，服务也到位，真是太优秀了！购物是有的，价格算合理，本来团费就便宜可以理解，团餐就是正常水平吧。衣服带羽绒服！黄龙很冷，高反因人而异，大部分都没事儿！鞋子带舒服的！还有默默付出的司机王师傅真是不容易，山路弯曲，旅程也长，感谢你们的付出，和妈妈玩的很开心！</span>
            </div>
            <div class="user_text1">
              <span>2019-10-23发表</span>
            </div>
            <div class="user_work">
              <button class="user_zan">
                <img src="../assets/zan.png" alt class="comment_zan" />
                <span @click="add">有用{{count}}</span>
              </button>
            </div>
          </li>     
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count:11,
      counted:false,
      message:"",
      zhankai: true,
      activeNames: ["0"],
      value1: 0,
      value2: "a",
      value3: "5",
      option1: [
        { text: "全部", value: 0 },
        { text: "单独出行", value: 1 },
        { text: "朋友出游", value: 2 },
        { text: "家庭亲子", value: 3 },
        { text: "情侣夫妻", value: 4 }
      ],
      option2: [
        { text: "最新点评", value: "a" },
        { text: "推荐排序", value: "b" }
      ]
    };
  },
  methods: {
    goProduct_detail(){
      history.go(-1);
    },
    click() {
      this.zhankai = !this.zhankai;
      if (this.zhankai) {
        this.$refs.dext.innerHTML = "∨";
      } else {
        this.$refs.dext.innerHTML = "∧";
      }
    },
    add(){
      if(!this.counted){
      this.count+=1;
      this.counted=!this.counted
      }
    },
   
  },
  created(){
     var Jid = this.$route.params.Jid;
      console.log(Jid)
      this.$axios.get(`v1/getindex/Comment`,{params:{Jid:Jid}}).then(res=>{
        console.log(res);
      })
  }
};
</script>
<style scoped>
.comment {
  background-color: #f5f5f5;
  position: relative;
}
.headerTop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
}
.header {
  color: #333;
  line-height: 2rem;
  padding: 0.8rem 0;
}
.header > span {
  position: absolute;
  line-height: 1.6rem;
  left: 0.5rem;
}
.header > span > i::before {
  font-size: 2rem;
  line-height: 2rem;
}
.header > h3 {
  font-size: 1.6rem;
  text-align: center;
}
.com-box-txt > div > span {
  background: #e9f3fe;
  line-height: 1.85rem;
  border-radius: 3.1rem;
  padding: 0 0.5rem;
  margin: 0.25rem;
  font-size: 0.75rem;
  height: 1.7rem;
}
.comm-box-t1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  overflow: hidden;
  padding-top: 0.5rem;
  padding-left: 0.62rem;
  
}
.btn{
  /* background-color: #fff; */
  border-color:#fff;
  opacity: 0.9;
  color:#222;
}
.comm-box-t1-H {
  height: 5.15rem;
}
.com-box-more {
  text-align: center;
  -webkit-box-shadow: 0 0.62rem 0.62rem 0 rgba(0, 0, 0, 0.1);
          box-shadow: 0 0.62rem 0.62rem 0 rgba(0, 0, 0, 0.1);
}
.com-list{
  margin-top: 14rem;
}
.item_i {
  background-color: #fff;
  padding:0 .6rem;
}
.item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding:.5rem 0;
}
.user_img {
  border-radius: 50%;
  width: 5.5rem;
  height: 4rem;
  border-radius: 50% 50%;
  overflow: hidden;
  margin: 0 .4rem;
}
.item_i+.item_i{
  border-top:1px solid #ddd;
}
.user_img>img{
  width: 100%;
  height: 100%;
}
.user_lv {
  width: 1rem;
  height: 1rem;
}

.itme_top {
  height: 1.25rem;
  width: 37.5rem;
  font-size: 0.87rem;
}

.user_face {
  height: 1.25rem;
  width: 1.25rem;
}

.item_bottom {
  margin-top: 0.8rem;
  padding-bottom: 0.75rem;
  color: #888888;
  padding-left: 0.3rem;
  font-size: 0.8rem;
}

.user_score {
  margin-top: 0.5rem;
  height: 1.43rem;
}

.user_score > span {
  font-size: 0.875rem;
}

.user_star {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.user_star > div {
  width: 50%;
  height: 1.625rem;
  text-align: left;
  font-size: 0.875rem;
}

.user_star > div > span {
  display: block;
}

.user_text {
  font-size: 0.875rem;
}

.user_div_text {
  padding: 0.31rem;
}
.user_text1 {
  width: 100%;
  font-size: 0.8rem;
  text-align: right;
  margin-left: -0.9rem;
}
.user_star3 {
  float: left;
  color: #f00;
  margin-top: -1.25rem;
  margin-left: 5.25rem;
  font-size: 0.62rem;
  border: 0.06rem solid rgba(102, 102, 102, 0.3);
  border-radius: 0.31rem;
  padding: 0.06rem;
}
.user_work {
  height: 2.9rem;
  width: 100%;
}
.user_zan {
  float: right;
  margin-top:0.43rem;
  padding-left: 0.62rem;
  padding-right: 0.62rem;
  border: 0.06rem solid #ccc;
  border-radius: 3.125rem;
  font-size: 0.87rem;
  -webkit-transform: translate(-0.87rem);
      -ms-transform: translate(-0.87rem);
          transform: translate(-0.87rem);
  line-height: 1.25rem;
  color: #222;
  background-color: #fff;
}
.comment_zan {
  width: 1.125rem;
  height: 1.125rem;
  float: left;
  display: block;
  margin-left:-0.18rem; 
}
</style>

