const express = require('express');
//导入连接池
const pool = require('../pool.js');
//创建路由器
const router = express.Router();
/**用户登录接口**/
router.post("/login/uname",(req,res)=>{
     var uname  = req.body.uname;
     var upwd = req.body.upwd;
    if(!uname){
          res.send({code:401,msg:"用户名不能为空!"});
          return;
     };
     if(!upwd){
          res.send({code:402,msg:"密码不能为空！"});
          return;
     };
     var sql = "SELECT u_id FROM jxy_user WHERE uname=? AND upwd=?"
     pool.query(sql,[uname,upwd],(err,result)=>{
          if(err) throw err;
          if(result.length > 0){
               req.session.u_id = result[0].u_id;
               res.send({code:200,msg:"登录成功",data:result[0]});
          }else{
               res.send({code:300,msg:"用户名或密码错误"});
          }
     });
});
router.post("/login/email",(req,res)=>{
     var email  = req.body.email;
     var upwd = req.body.upwd;
    if(!email){
          res.send({code:401,msg:"用户名不能为空!"});
          return;
     };
     if(!upwd){
          res.send({code:402,msg:"密码不能为空!"});
          return;
     };
     var sql = "SELECT u_id FROM jxy_user WHERE email=? AND upwd=?"
     pool.query(sql,[email,upwd],(err,result)=>{
          if(err) throw err;
          if(result.length > 0){
               req.session.u_id = result[0].u_id;
               res.send({code:200,msg:"登录成功",data:result[0]})
          }else{
               res.send({code:300,msg:"用户名或密码错误"});
          }
     });
});
router.post("/login/phone",(req,res)=>{
     var phone  = req.body.phone;
     var upwd = req.body.upwd;
    if(!phone){
          res.send({code:401,msg:"用户名不能为空!"});
          return;
     };
     if(!upwd){
          res.send({code:402,msg:"密码不能为空！"});
          return;
     };
     var sql = "SELECT u_id FROM jxy_user WHERE phone=? AND upwd=?"
     pool.query(sql,[phone,upwd],(err,result)=>{
          if(err) throw err;
          if(result.length > 0){
               req.session.u_id = result[0].u_id;
               res.send({code:200,msg:"登录成功",data:result[0]});
          }else{
               res.send({code:300,msg:"用户名或密码错误"});
          }
     });
});
/**验证用户存在接口*/
router.get("/reg/exist",(req,res)=>{
     var uname = req.query.uname;
     if(!uname){
          res.send({code:401,msg:"用户名不能为空"});
          return;
     };
     var sql = "SELECT u_id FROM jxy_user WHERE uname=?"
     pool.query(sql,[uname],(err,reslut)=>{
          if(err) throw err;
          if(reslut.length>0){
               res.send({code:400,msg:"用户名已存在"})
          }else{
               res.send({code:200,msg:"用户名可用"})
          }
     })
});
/**用户注册 */
router.post("/reg/reguser",(req,res)=>{
     var uname = req.body.uname;
     var upwd = req.body.upwd;
     var setTime = req.body.setTime;
     if(!uname){
          res.send({code:401,msg:"用户名不能为空"});
          return;
     };
     if(!upwd){
          res.send({code:402,msg:"密码不能为空"});
          return;
     };
     var sql = "INSERT INTO jxy_user VALUES (null,?,null,null,?,'img/user/moren.jpg',?,null,null,null,5,?)";
     pool.query(sql,[uname,upwd,uname,setTime],(err,result)=>{
          if(result.affectedRows>0){
               res.send({code:200,msg:"注册成功"});
          }else{
               res.send({code:400,msg:"出错了请重试....."});
          }
     })
});
/** 用户收藏列表**/
router.get("/getColl",(req,res)=>{
     var u_id = req.session.u_id;
     if(!u_id){
          res.send({code:400,msg:"请登录"});
          return;
     };
     function getJid(){
          return new Promise((resolve,reject)=>{
               var sql = "SELECT * FROM jxy_coll WHERE u_id=?"
               pool.query(sql,[u_id],(err,result)=>{
                    //if(err) throw err;
                    if(result.length>0){
                         resolve(result);
                    }else{
                         reject();
                    }
               })
          })
     };
     getJid()
     .then(resolve=>{
          var str="";
          for(var i=0;i<resolve.length;i++){
               str+=resolve[i].Jid+",";
          }
          str = str.slice(0,-1);
          var sql = "SELECT CityId,prevImg,price,grade,title,subtitle FROM jxy_jingqu WHERE FIND_IN_SET (Jid,?)";
          pool.query(sql,[str],(err,reslut)=>{
               //if(err) throw err;
               if(reslut.length>0){
                    for(var j=0;j<reslut.length;j++){ //将收藏时间添加到返回对象中
                         resolve[j].detail = reslut[j]
                    }
                    res.send({code:200,msg:"获取成功",data:resolve})
               }else{
                    reject();
               }
          })
     }).catch(()=>{
          res.send({code:402,msg:"你还没有收藏！"})
     })
});
//个人信息
router.get("/uDetails",(req,res)=>{
     var u_id = req.session.u_id;
     if(!u_id){
          res.send({code:400,msg:"请登录"});
          return;
     }
     var sql = "SELECT jx_name,avatar FROM jxy_user WHERE u_id=?";
     pool.query(sql,[u_id],(err,reslut)=>{
          if(err) throw  err;
          if(reslut.length>0){
               res.send({code:200,msg:"成功",data:reslut[0]});
          }else{
               res.send({code:401,msg:"系统繁忙"})
          }
     })
})
router.get("/createColl",(req,res)=>{
     var u_id = req.session.u_id;
     if(!u_id){
          res.send({code:400,msg:"请登录"});
          return;
     };
     var Jid = req.query.Jid;
     var setTime = req.query.setTime;
     if(!Jid){
          res.send({code:401,msg:"请选择收藏的商品"});
          return;
     };
     if(!setTime){
          setTime = new Date().toLocaleDateString();
     }
     var sql = "INSERT INTO jxy_coll VALUES (null,?,?,?)";
     pool.query(sql,[u_id,Jid,setTime],(err,reslut)=>{
          if(err) throw err;
          if(reslut.affectedRows>0){
               res.send({code:200,msg:"收藏成功"})
          }else{
               res.send({code:402,msg:"系统繁忙，稍后再试！"})
          }
     })
})
router.get("/delColl",(req,res)=>{
     var Jid = req.query.Jid;
     var u_id = req.session.u_id;
     var sql ="DELETE FROM jxy_coll WHERE Jid=? AND u_id=?"
     pool.query(sql,[Jid,u_id],(err,reslut)=>{
          if(err) throw err;
          if(reslut.affectedRows>0){
               res.send({code:200,msg:"取消成功"})
          }else{
               res.send({code:400,msg:"系统繁忙请重试！"})
          }
     })
})
router.get("/delColl/All",(req,res)=>{
     var u_id = req.session.u_id;
     var sql ="DELETE FROM jxy_coll WHERE u_id=?"
     pool.query(sql,[u_id],(err,reslut)=>{
          if(reslut.affectedRows>0){
               res.send({code:200,msg:"取消成功"})
          }else{
               res.send({code:400,msg:"系统繁忙请重试！"})
          }
     })
})
router.get("/delColl/haveColl",(req,res)=>{
     var Jids = req.query.Jids;
     var u_id = req.session.u_id;
     var sql ="DELETE FROM jxy_coll WHERE u_id=? AND FIND_IN_SET (Jid,?)";
     pool.query(sql,[u_id,Jids],(err,reslut)=>{
          if(reslut.affectedRows>0){
               res.send({code:200,msg:"取消成功"})
          }else{
               res.send({code:400,msg:"系统繁忙请重试！"})
          }
     })
})
router.get("/ExitLogin",(req,res)=>{
     req.session.destroy();
     res.send({code:200,msg:"退出成功"});
})
//导出路由器
module.exports = router;