<template>
  <div>
    <div class="self_all">
      <div class="self_top">
        <img src="../assets/self_bg.jpg" class="self_bgimg" alt />
        <div class="self_top_nev">
          <div class="user_arrow" @click="goIndex"></div>
          <div class="user_msg"></div>
        </div>
        <div class="user_name">
          <span>尊贵的会员</span>
        </div>
        <div class="self_user">
          <span>
            <img src="../assets/user_pic.jpg" alt class="user_img" />
          </span>
          <div class="self_user_oth">
            <div>
              <!-- <img src="../assets/zuanshi.png" alt /> -->
              <span>领会员福利</span>
            </div>
            <div>
              <!-- <img src="../assets/zuanshi.png" alt /> -->
              <span>我的社区</span>
            </div>
          </div>
        </div>
        <div class="self_list_div">
          <ul class="self_list">
            <li>
              <div>
                <div></div>
              </div>
              <p>全部订单</p>
            </li>
            <li>
              <div>
                <div></div>
              </div>
              <p>待付款</p>
            </li>
            <li>
              <div>
                <div></div>
              </div>
              <p>未出行</p>
            </li>
            <li>
              <div>
                <div></div>
              </div>
              <p>待评价</p>
            </li>
          </ul>
        </div>
        <div class="self_score">
          <ul>
            <li>
              <div></div>
              <p>优惠券</p>
              <span>0张</span>
            </li>
            <li>
              <div></div>
              <p>积分</p>
              <span>0分</span>
            </li>
            <li>
              <div></div>
              <p>拿去花</p>
              <span>立即开通</span>
            </li>
          </ul>
        </div>
        <div class="self_about">
          <ul>
            <li>
              <p>常用信息</p>
              <div>
                <p>旅客/地址/发票抬头</p>
                <div>&gt;</div>
              </div>
            </li>
            <li @click="goLike">
              <p>我的收藏</p>
              <div>
                <p>降价产品有提醒</p>
                <div>&gt;</div>
              </div>
            </li>
            <li>
              <p>浏览历史</p>
              <div>
                <p>近15天访问记录</p>
                <div>&gt;</div>
              </div>
            </li>
            <li>
              <p>我要合作</p>
              <div>
                <p>供应商/代理合作</p>
                <div>&gt;</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="self_buttom">
          <ul>
            <li>
              <div>
                <div></div>
              </div>
              <p>我的保险</p>
            </li>
            <li>
              <div>
                <div></div>
              </div>
              <p>我的特权</p>
            </li>
            <li>
              <div>
                <div></div>
              </div>
              <p>一生旅行</p>
            </li>
            <li>
              <div>
                <div></div>
              </div>
              <p>更多</p>
            </li>
          </ul>
        </div>
         <div class="self_end_img">
          <img src="../assets/selfend.png" alt />
        </div> 
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    goIndex(){
      this.$router.push("/index");
    },
    goLike(){
      this.$router.push('/collection');
    }
  }
};
</script>
<style scoped>
.self_top,
.self_user,
.self_top_nev,
.self_score,
.self_score > ul > li,
.self_about,
.self_about > ul > li,
.self_end_img,
.self_buttom {
  width: 100vw;
}
.self_user,
.self_top_nev,
.self_user_oth,
.self_list,
.self_score > ul,
.self_about > ul,
.self_about > ul > li > div,
.self_about > ul > li,
.self_buttom > ul {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.self_bgimg {
  width: 100%;
  height: 120px;
}
.self_user,
.self_top_nev,
.user_img,
.user_name,
.self_user_oth {
  position: absolute;
}
.self_user {
  top: 80px;
  height: 41px;
  background-color: #fff;
  border-radius: 15px 15px 0 0;
  border-bottom: 1px solid #ccc;
}
.user_msg {
  background-image: url("../assets/sprict.png");
  background-position: 40px -118px;
  width: 40px;
  height: 90%;
  background-size: 60px auto;
}
.user_arrow {
  background-image: url("../assets/sprict.png");
  background-position: 0px -24px;
  width: 25px;
  height: 90%;
  background-size: 60px auto;
}
.self_top_nev {
  height: 55px;
  top: 0;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: 10px;
}
.user_img {
  top: -85%;
  left: 10%;
  height: 70px;
  border-radius: 50%;
}
.user_name {
  color: #fff;
  top: 60px;
  left: 33%;
  font-size: 1rem;
}
.self_user_oth {
  height: 100%;
  left: 30%;
}
.self_user_oth > div > span {
  margin-top: 5px;
  margin-left: 5px;
  display: block;
  border-radius: 50px;
  padding: 0 10px 0 7px;
  font-size: 0.3rem;
  height: 23px;
  line-height: 24px;
}
.self_user_oth > div:first-child > span:nth-child(1) {
  background: rgba(17, 166, 255, 0.1);
  color: #5e8aa6;
}
.self_user_oth > div:last-child > span:nth-child(1) {
  background: rgba(247, 148, 100, 0.15);
  color: #967363;
}
.self_list > li {
  margin-top: 6px;
  width: 25vw;
  text-align: center;
  line-height: 40px;
  font-size: 0.8rem;
}
.self_list > li > div {
  width: 25vw;
  height: 30px;
}
.self_list > li > div > div {
  width: 50%;
  margin: 0 auto;
}
.self_list > li > div:nth-child(1) > div {
  background-size: 50px auto;
  width: 27px;
  height: 30px;
}
.self_list > li:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
  background-image: url(../assets/sprict.png);
  background-position: 27px 2px;
}
.self_list > li:nth-child(2) > div:nth-child(1) > div:nth-child(1) {
  background-image: url(../assets/sprict.png);
  background-position: 27px -29px;
}
.self_list > li:nth-child(3) > div:nth-child(1) > div:nth-child(1) {
  background-image: url(../assets/sprict.png);
  background-position: 27px -65px;
}
.self_list > li:nth-child(4) > div:nth-child(1) > div:nth-child(1) {
  background-image: url(../assets/sprict.png);
  background-position: 51px 107px;
}
/* .self_list_div {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
} */
.self_score > ul > li {
  text-align: center;
  font-size: 0.8rem;
   border-top: 1px solid #ccc; 
  border-bottom: 1px solid #ccc; 
  height: 70px;
}
.self_score > ul > li+li{
  border-left: 1px solid #ccc;
}

.self_score > ul > li > p {
  margin-top: 20px;
}
.self_score > ul > li > span {
  display: block;
  color: #999;
  padding-top: 10px;
}
.self_about > ul {
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
}

.self_about > ul > li {
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 50px;
  border-bottom: 1px solid #ccc;
}
.self_about > ul > li > p {
  font-size: 1rem;
  margin-left: 10px;
}
.self_about > ul > li div > p {
  font-size: 0.85rem;
  color: #999;
  text-align: center;
  line-height: 50px;
}
.self_about > ul > li > div > div {
  width: 20px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.self_end_img {
  /* margin-top: 40px; */
  text-align: center;
}
.self_end_img img{
  width: 100%;
}
.self_buttom {
  height: 80px;
  text-align: center;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  font-size: 0.8rem;
}

.self_buttom > ul > li {
  width: 25vw;
}
.self_buttom > ul > li > div {
  height: 24px;
}
.self_buttom > ul > li > div > div {
  margin: 0 auto;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-size: 22px auto;
  margin-top: 16px;
}
.self_buttom ul > li:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
  background-image: url("../assets/sprict2.png");
  background-position: 1px 1px;
}
.self_buttom ul > li:nth-child(2) > div:nth-child(1) > div:nth-child(1) {
  background-image: url("../assets/sprict2.png");
  background-position: 1px -58px;
}
.self_buttom ul > li:nth-child(3) > div:nth-child(1) > div:nth-child(1) {
  background-image: url("../assets/sprict2.png");
  background-position: 1px -150px;
}
.self_buttom ul > li:nth-child(4) > div:nth-child(1) > div:nth-child(1) {
  background-image: url("../assets/sprict2.png");
  background-position: 1px 34px;
}
</style>