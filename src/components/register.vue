<template>
     <div class="reg">
          <div class="reg-top">
               <div class="reg-call" @click="goHistory">
                    <van-icon name="arrow-left" />
               </div>
          </div>
          <div class="reg-body">
               <div class="reg-title">账号注册</div>
               <div class="reg-deta">
                    <div class="reg-input" v-for="(input,i) of regInput" :key="i">
                         <div class="reg-hint">
                              <span class="reg-name">{{input.name}}</span>
                              <span class="reg-warn iconfont" :class="{'reg-warnC icon-cuohao':input.reg,'icon-duihaofansvg- reg-warnG':input.win}">{{input.win?"通过！":(input.reg?input.warn:"")}}</span>
                         </div>
                         <input @focus="input.focus = true;input.reg = false" 
                              @blur="input.blur" 
                              v-model="input.val" 
                              class="reg-username" 
                              :class="{regUsernameB:input.focus,regUsernameC:input.reg,regUsernameG:input.win}"  
                              :type="input.type" 
                              :placeholder="input.place">
                         <ul v-show="input.focus" class="user-hint" :class="{userHintB:input.focus}">
                              <li v-for="(int,h) of input.hint" :key="h">{{int}}</li>
                              <!-- <li>数字或下划线;</li> -->
                              <!-- <li>6到16位;</li> -->
                         </ul>
                    </div>
                    <div class="reg-policy">
                             <van-checkbox v-model="ischecked" shape="square">
                               <span>同意我们的<a href="javascript:;">服务协议</a>和<a href="javascript:;">隐私政策</a></span>
                             </van-checkbox>
                    </div>
                    <div class="reg-btn">
                         <button @click="GoReg" @keyup.enter="GoReg" class="reg-button">注册</button>
                    </div>
               </div>
          </div>
     </div>
</template>
<script>
export default {
     data(){
          return {
               regInput:[
                    { name:"用户名：",
                      type:'text',
                      val:'',
                      warn:"",
                      focus:false,
                      blur:this.ReguName,
                      reg:false,
                      win:false,
                      place:'请输入用户名',
                      hint:[
                         '英文字母开头',
                         '数字或下划线',
                         '6到16位'
                      ]
                    },
                    { name:"密码：",
                      type:'password',
                      val:'',
                      warn:"",
                      focus:false,
                      blur:this.ReguPwd,
                      reg:false,
                      win:false,
                      place:'请输入密码',
                      hint:[
                         '至少包含数字跟字母',
                         '可以有字符,不能有空字符',
                         '6到20位'
                      ]
                    },
                    { name:"再次密码：",
                      warn:"",
                      type:'password',
                      val:'',
                      focus:false,
                      blur:this.RegcuPwd,
                      reg:false,
                      win:false,
                      place:'再次输入密码',
                      hint:[
                           '再次输入密码',
                         '确保两次输入密码保持一致'
                      ]
                    }
               ],
               ischecked:false,
               isUser:false,
               isuPwd:false,
               iscuPwd:false,
               params:{
                    uname:"",
                    upwd:"",
                    setTime:""
               }
          }
     },
     methods: {
          //返回
          goHistory(){
               history.go(-1);
          },
          ReguName(){
               //input移除焦点判断格式
               var _than = this;
               _than.regInput[0].focus = false;
               if(!_than.regInput[0].val){
                    _than.regInput[0].reg = true;
                    _than.regInput[0].win = false;
                    _than.regInput[0].warn = "用户名不能为空"
                    return;
               }else if(!/^[a-zA-Z\w]{6,16}$/.test(_than.regInput[0].val)){
                    _than.regInput[0].reg = true;
                    _than.regInput[0].win = false;
                    _than.regInput[0].warn = "用户名格式不正确"
                    return;
               }else{
                    _than.$axios.get("v1/getuser/reg/exist",{params:{uname:_than.regInput[0].val}})
                    .then(res=>{
                         if(res.data.code!=200){
                              _than.regInput[0].reg = true;
                              _than.regInput[0].win = false;
                              _than.regInput[0].warn = res.data.msg
                              _than.isUser = false;
                         }else if(res.data.code === 200){
                              _than.regInput[0].win = true;
                              _than.params.uname = _than.regInput[0].val;
                              _than.isUser = true;
                         }
                    })
               }
          },
          ReguPwd(){
               var _than = this;
               _than.regInput[1].focus = false;
               if(!_than.regInput[1].val){
                    _than.regInput[1].reg = true;
                    _than.regInput[1].win = false;
                    _than.regInput[1].warn = "密码不能为空"
                    return;
               }else if(_than.regInput[1].val === _than.regInput[0].val){
                    _than.regInput[1].reg = true;
                    _than.regInput[1].win = false;
                    _than.regInput[1].warn = "用户名和密码不能相同"
                    return;
               }else if(!/^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/.test(_than.regInput[1].val)){
                    _than.regInput[1].reg = true;
                    _than.regInput[1].win = false;
                    _than.regInput[1].warn = "密码格式不正确"
                    return;
               }else{
                    _than.regInput[1].win = true;
                    _than.isuPwd = true;
               }
          },
          RegcuPwd(){
               var _than = this;
               _than.regInput[2].focus = false;
               if(!_than.regInput[2].val){
                    _than.regInput[2].reg = true;
                    _than.regInput[2].win = false;
                    _than.regInput[2].warn = "密码不能为空！"
                    return;
               }else if(_than.regInput[2].val != _than.regInput[1].val){
                    _than.regInput[2].reg = true;
                    _than.regInput[2].win = false;
                    _than.regInput[2].warn = "两次输入密码不一致！"
                    return;
               }else{
                    _than.regInput[2].win = true;
                    _than.params.upwd = _than.$md5(_than.regInput[2].val);
                    _than.iscuPwd = true;
               }
          },
          GoReg(){
               var _than = this;
               if(!_than.ischecked){
                    _than.$dialog.alert({
                         title:"提示",
                         message:"我们需要您同意服务协议"
                    })
               };
               if(_than.ischecked && _than.isUser && _than.isuPwd && _than.iscuPwd){
                    _than.params.setTime = new Date().toLocaleDateString();//获取创建时间
                    _than.$axios.post(
                         "v1/getuser/reg/reguser",
                          _than.$qs.stringify(_than.params)
                    ).then(res=>{
                         if(res.data.code==400){
                              _than.$dialog.alert({
                                   title:"提示",
                                   message:"注册失败请重试!"
                              })
                         }else if(res.data.code==200){
                              _than.$dialog.confirm({
                                   title:"提示",
                                   message:"注册成功，前往登录？"
                              }).then(()=>{
                                   _than.$router.back(-1);
                              }).catch(()=>{
                                   _than.ischecked = _than.isUser = _than.isuPwd = _than.iscuPwd =false;
                                   for(var reg of _than.regInput){
                                        reg.val = "";
                                        reg.focus=false;
                                        reg.reg=false;
                                        reg.win=false;
                                   }
                              })
                         }
                    })
               }
          }
     },
}
</script>
<style scoped>
.reg{
  height: 100vh;
  position: relative;
  background-color: #fff;
}
.reg a{
     color:#0086fe;
}
.reg-top{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding:1rem .8rem;
  line-height: 2.5rem;
  text-align: left;
}
.reg-call>i{
  width: 2.5rem;height: 2.5rem;
  font-size:2rem;
  line-height: 2.5rem;
  text-align: center;
}
.reg-title{
     text-align: center;
     font-size:1.6rem;
}
.reg-deta{
     width: 23rem;
     margin-top:2.5rem;
     margin:0 auto;
     padding:0 3.5rem;
}
.reg-input{
     margin-top:1.5rem;
}
.reg-hint{
     text-align: left;
}
.reg-username{
     width: 100%;
     height: 2.4rem;
     text-indent: 1rem;
     border:1px solid #aaa;
     border-radius:.3rem;
}
.regUsernameB{
     border-color: #0086fe;
     border-radius: .3rem .3rem 0 0;
}
.regUsernameC{
     border-color: #f73627;
}
.regUsernameG{
     border-color:#4caf50;
}
.reg-name{
     font-weight: 600;
}
.reg-warn{
     display: inline-block;
     width: 60%;
     font-size:.8rem;
     text-align: center;
}
.reg-warnC{
     color:#f73627;
}
.reg-warnG{
     color:#4caf50;
}
.user-hint{
     width: 100%;
     color:#fff;
     list-style-type: disc;
     text-align: left;
     padding:.4rem 1.5rem; 
     font-size:.9rem;
     border-radius:0 0 .3rem .3rem;
     -webkit-box-shadow: 0 3px 10px 3px #ccc;
             box-shadow: 0 3px 10px 3px #ccc;
}
.userHintB{
     background-image:-webkit-gradient(linear,left top, right top,from(#0086fe),to(#03a9f4));
     background-image:-o-linear-gradient(left,#0086fe,#03a9f4);
     background-image:linear-gradient(to right,#0086fe,#03a9f4);
}
.userHintC{
     background-color:#f73627;
}
.userHintG{
     background-color:#4caf50;
}
.reg-policy{
     text-align: left;
     margin:3rem 0 1rem 0;
     font-size:.9rem;
}
.reg-button{
     width: 100%;
     height: 2.5rem;
     border:0;
     border-radius: .3rem;
     color:#fff;
     background-image:-webkit-gradient(linear,left top, right top,from(#0086fe),to(#03a9f4)) ;
     background-image:-o-linear-gradient(left,#0086fe,#03a9f4) ;
     background-image:linear-gradient(to right,#0086fe,#03a9f4) ;
}
</style>