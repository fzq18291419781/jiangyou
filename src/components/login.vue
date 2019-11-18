<template>
  <div class="login">
    <div class="login-top">
      <div class="login-call" @click="goHistory">
        <van-icon name="arrow-left" />
      </div>
      <router-link to="/register" class="login-reg" >注册</router-link>
    </div>
    <div class="login-body">
      <div class="login-title">账号登录</div>
      <div class="login-input" >
        <div class="login-uname">
          <input type="text" :class="{ focus:userInput || isUser,caution:userCaution}" v-model="userName" @blur="userReg" @focus="userInput=true" placeholder="手机号/用户名/邮箱" maxlength="16">
          <label @click="userName=''" v-show="userName.length>0" class="login-delUname iconfont icon-cuohao">
          </label>
        </div>
        <label class="login-pwd">
          <input :type="pwdtype" :class="{focus:pwdInput || isPwd,caution:pwdCaution}" v-model="uPwd" @blur="pwdReg" @focus="pwdInput=true" placeholder="密码" maxlength="20">
          <label @click="uPwd=''" v-show="uPwd.length>0" class="login-delPwd iconfont icon-cuohao"></label>
          <label @click="exaPwd" v-show="uPwd.length>0" class="login-exa iconfont" :class="{'icon-yanjing1':!exaye,'icon-yanjing':exaye}">
          </label>
        </label>
        <div class="login-btn">
          <label class="login-fpwd">
            <a href="">忘记密码？</a>
          </label>
          <button @click="btnDis"  v-on:keyup.enter="btnDis()">登录</button>
          <div class="login-else">
            <label>
              <a href="javascript:;">手机短信快捷登录</a>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="login-bottom">
      <p class="login-zc">登录即代表您同意我们的<a href="javascript:;">服务协议</a>和<a href="javascript:;">隐私政策</a></p>
    </div>
    <div v-show="login_verify" class="login-con" @touchmove="Logtouchmove" @touchend="Logtouchend">
      <div class="login-slide">
        <div  class="login-ser">
          <div class="login-ser-close">
            <label class="ser-close">
              <van-icon @click="login_verify=false" name="cross" />
            </label>
          </div>
          <p class="ser-title">滑块校检</p>
          <div class="ser-item" ref="isOtopic">
              <div class="ser-item-text">
                <span ref="serText" class="iconfont" :class="{'icon-duihaofansvg-':isSuccess}">{{isSuccess?'通过！':'请按下滑块，拖动到最右'}}</span>
              </div>
              <div class="ser-lumd" ref="Lumd"  @touchstart="Logtouchstart" :style="slidE">
                <div class="iconfont"  :class="{'icon-double-arrow-left':!isSuccess,'icon-dianpu ser-lumd-T':isSuccess}" ref="serImg"></div>
              </div>
              <div class="ser-clause" :style="ClauseW">
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      exaye:false,
      pwdtype:"password",
      userInput:false,//控制userInput样式
      userCaution:false,//提示用户名格式
      pwdInput:false,//控制pwdInput样式
      pwdCaution:false,//提示用户名格式
      userName:"",//获取uname
      uPwd:"",//获取密码
      login_verify:false,//控制打开遮盖层
      isSuccess:false,//判断滑块验证是否通过
      isUser:false,//判断用户名格式是否验证通过
      isPwd:false,//判断密码格式是否验证通过
      startX:0, //手指按下位置
      moveX:0, //手指移动距离
      offsetX:0, //滑块偏移量
      slidE:"", //滑块样式
      ClauseW:"",//背景宽度
      Loggo:{},//获取用户名和密码
      LogURL:"",//动态请求接口
      Logres:false, //返回状态
      startTouch:false //判断手指是否按下
    }
  },
  methods:{
    //返回
    goHistory(){
      // this.$router.push("/index");
      history.go(-1)
    },
   //验证用户名格式
    userReg(){
      var _than = this;
      _than.userInput = false;
      if(!_than.userName){
        _than.userCaution = true;
        return;
      }else if(/^1[3456789]\d{9}$/.test(_than.userName)){//如果userName通过正则赋值给响应并判定用户名输入成功
        _than.Loggo.phone = this.userName;
        _than.LogURL = "v1/getuser/login/phone";
        _than.userCaution = false;
        _than.isUser = true;
        return;
      }else if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(_than.userName)){
        _than.Loggo.email = _than.userName;
        _than.LogURL = "v1/getuser/login/email";
        _than.userCaution = false;
        _than.isUser = true;
        return;
      }else if(/^[a-zA-Z\w]{6,16}$/.test(_than.userName)){
        _than.Loggo.uname = this.userName;
        _than.LogURL = "v1/getuser/login/uname";
        _than.userCaution = false;
        _than.isUser = true;
        return;
      }else{
        _than.userCaution = true;
        _than.isUser = true;
      }
    },
    pwdReg(){
      var _than = this;
      _than.pwdInput = false;//验证密码格式
      if(!_than.uPwd){
        _than.pwdCaution = true;
        return;
      }else if(/^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/.test(_than.uPwd)){
        //至少包含数字跟字母，可以有字符
        _than.Loggo.upwd = _than.$md5(_than.uPwd);
        _than.pwdCaution = false;
        _than.isPwd = true;
        return;
      }else{
        _than.pwdCaution = true;
        _than.isPwd = true;
      }
    },
    btnDis(){
      var _than = this;
      if(!_than.userName){
        _than.$dialog.alert({
          title: '提示',
          message: '用户名不能为空'
        }).then(()=>{
          _than.userCaution = true;
        })
      }else if(!_than.uPwd){
        _than.$dialog.alert({
          title: '提示',
          message: '密码不能为空'
        }).then(()=>{
          _than.pwdCaution = true;
        })
      }else if(_than.isUser && _than.isPwd){
        _than.login_verify = true;
      }
    },
    //查看密码
    exaPwd(){
      var _than = this;
      if(_than.pwdtype == "password"){
        _than.pwdtype = "text";
      }else{
        _than.pwdtype = "password";
      }
      _than.exaye = !_than.exaye;
    },
    /**滑块验证**/
    Logtouchstart(e){
      e.preventDefault();
      //获取手指按下的位置
      if(e.touches.length == 1){
        this.startX = e.touches[0].clientX;
        this.startTouch = true;
      }
    },
    Logtouchmove(e){
      e.preventDefault();
      var _than = this;
      //isSuccess为false表示为成功才能再次执行
      if(e.touches.length == 1 && !_than.isSuccess && _than.startTouch){
        //获取手指距离浏览器最左侧的偏移量
        _than.moveX = e.touches[0].clientX;
        //获取手指相对于手指按下的偏移量
        _than.offsetX = _than.moveX - _than.startX;
        if(_than.offsetX<=0){
          //如果offsetX小于零滑块让滑块保持不动
          _than.slidE = "left:1px";
        }else if(_than.offsetX>=0){
          var isOtopicW = _than.$refs.isOtopic.offsetWidth;
          var LumdW = _than.$refs.Lumd.offsetWidth;
          var offset = isOtopicW - LumdW - 1;
          //否则滑块跟随offsetX移动
          _than.slidE = `left:${_than.offsetX}px;`;
          _than.ClauseW = `width:${_than.offsetX}px`;
          if(_than.offsetX >= offset){
            //如果offsetX到达目标值表示成功锁定offsetX的值并且判定验证通过
            _than.offsetX=offset;
            _than.slidE = `left:${_than.offsetX}px;`;
            _than.ClauseW = `width:${_than.offsetX}px`;
            _than.isSuccess = true;
            _than.GoLogin();
          }
        }
      }
    },
    Logtouchend(){
      this.startTouch = false;
      //手指抬起时判读是否验证通过
      if(!this.isSuccess){
        //未通过滑块和背景回到原始为位置
        this.slidE = "left:1px; transition:left .2s linear;";
        this.ClauseW = "width:0px;transition:width .2s linear;";
      }
    },
    //ajax请求
    GoLogin(){
      var _than = this;
      if(_than.isSuccess && _than.isUser && _than.isPwd){
        _than.$axios.post(
          _than.LogURL,
          _than.$qs.stringify(_than.Loggo)
        ).then(res=>{
          if(res.data.code == 200){
            history.back(-1);
            // this.$router.go(-1);
          }else if(res.data.code == 300){
            _than.$dialog.alert({
              title:"提示",
              message:res.data.msg
            }).then(()=>{
              _than.login_verify=false;
              _than.isSuccess = false;
            })
          }
        })
      }
    },
  },
  watch:{
    //判定只要登录成功一次就回归初始值
    isSuccess(){
      if(!this.isSuccess){
          this.slidE = "";
          this.ClauseW = "";
      }
    }
  },

}
</script>
<style scoped>
.login{
  height: 100vh;
  position: relative;
  text-align: center;
  background-color: #fff;
  overflow: hidden;
}
.login a{
  color:#099fde;
  font-size: 1rem;
}
.login-top{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding:1rem .8rem;
  line-height: 2.5rem;
}
.login .login-reg{
  font-size:1.1rem;
}
.login-call>i{
  width: 2.5rem;height: 2.5rem;
  font-size:2rem;
  line-height: 2.5rem;
}
.login-body{
  width: 23rem;
  margin:0 auto;
}
.login-title{
  font-size:1.5rem;
  margin-top:.8rem;
}
.login-input{
  margin-top:2.8rem;
  padding:0 1.8rem;
}
.login-uname,.login-pwd{
  display: block;
  margin:.5rem 0;
  position: relative;
}
.login-input input{
  width: 100%;
  height: 2.5rem;
  border-radius: .2rem;
  border:1px solid #d2d2d2;
  text-indent: 1rem;
}
.login-input .focus{
  border:1px solid #099fde;
}
.login-input .caution{
  border:1px solid #f73627;
}
.login-delUname,.login-delPwd,.login-exa{
  position: absolute;
  width: 2.5rem;
  height: 100%;
  line-height: 2.5rem;
  top:0;
  right:0;
  color:#ddd;
  border-left:1px solid #ddd;
}
.login-delPwd{
  right: 2.5rem;
}
.login-exa{
  font-size:1.4rem;
  line-height: 2.6rem;
}
.login-btn{
  margin-top: 2rem;
  text-align: right;
}
.login-fpwd{
  display:inline-block;
  text-align: right;
  padding:.3rem;
}
.login-else{
  margin-top:1.5rem;
  text-align: center;
}
.login-else a{
  color:#555;
  border-bottom:1px solid #555;
}
.login-btn>button{
  width: 100%;height:2.6rem;
  background-color: #0086F6;
  border:none;
  border-radius: .2rem;
  color:#fff;
}
.login-bottom{
  width: 100%;
  height: 80px;
  margin-top:12rem;
}
.login-zc,.login-zc>a{
   font-size:.8rem;
}
.login-zc{
  color:#999;
  text-align: center;
}
.login-con{
  height: 100vh;
  width: 100vw;
  position: absolute;
  top:0;
  left:0;
  background-color: rgba(0,0,0,.4);
}
.login-slide{
  position: absolute;
  top:30%;
  left:0;
  width: 100%;
  height:12rem;
  padding:0 1.2rem;
  z-index: 200;
}
.login-ser{
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;
  padding:0 .8rem;
}
.login-ser-close{
  text-align: right;
}
.ser-close{
  display: inline-block;
  font-size:1.6rem;
  padding-top:.5rem;
  color:#888;
}
.ser-title{
  text-align: center;
  font-size:1.1rem;
  letter-spacing:1px;
}
.ser-item{
  width: 100%; height: 3rem;
  margin-top:.6rem;  
  background-color: #ccc;
  border-radius: .3rem;
  position: relative;
  overflow: hidden;
}
.ser-item-text{
  height: 100%;
  width: 100%;
  line-height:3rem;
  font-size: .9rem;
  color:#222;
  position:absolute;
  top:0;
  left:0;
  z-index: 10;
}
.ser-lumd,.ser-clause{
  position: absolute;
}
.ser-lumd{
  height: 2.85rem;width: 2.85rem;
  background-color: #fff;
  border-radius: .2rem;
  top:1px;
  left:1px;
  font-size:1.2rem;
  color:#555;
  line-height: 2.8rem;
  z-index: 300;
}
@-webkit-keyframes serLumd{
  0%{
    -webkit-transform: rotate(0);
            transform: rotate(0); 
  }
  100%{
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); 
  }
}
@keyframes serLumd{
  0%{
    -webkit-transform: rotate(0);
            transform: rotate(0); 
  }
  100%{
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); 
  }
}
.ser-lumd-T{
  -webkit-transform-origin:50% 50%;
      -ms-transform-origin:50% 50%;
          transform-origin:50% 50%;
  -webkit-animation: serLumd 1s linear infinite;
          animation: serLumd 1s linear infinite;
}
.ser-clause{
  background-color: #7ac23c;
  height: 100%;
  top:0;
  left:0;
  z-index: 0;
}
</style>
