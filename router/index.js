const express = require("express");
const pool = require("../pool.js");
const router = express.Router();
/**国家编号，城市接口**/
router.get("/free",(req,res)=>{
     /** 获取国家编号**/
     function Countrys(){
          var sql = `SELECT * FROM jxy_guojia`;
          return new Promise((resolve,reject)=>{
               pool.query(sql,(err,reslut)=>{
                    if(err) reject(err);
                    resolve(reslut);
               })
          })
     }
     function Cities(){
          var sql = "SELECT * FROM jxy_city";
          return new Promise((resolve,reject)=>{
               pool.query(sql,(err,reslut)=>{
                    if(err) reject(err);
                    resolve(reslut);
               })
          })
     }
     Promise.all([
          Countrys(),
          Cities()
     ]).then(arr=>{
          if(arr.length===2){
               res.send({code:200,msg:"获取成功",data:arr});
          }else{
               res.send({code:400,mag:"获取失败"});
          }
     }).catch(()=>{
          
     });
});
/** 主页接口**/
router.get("/index",(req,res)=>{
     var sql = "SELECT * FROM jxy_jingqu";
     pool.query(sql,(err,reslut)=>{
          if(err) throw err;
          if(reslut.length>0){
               res.send({code:200,msg:"获取成功",data:reslut})
          }
     })
});
/**查询城市 **/
router.get("/citySelect",(req,res)=>{
     var CityId = req.query.CityId;
     var sql = "SELECT * FROM jxy_jingqu WHERE CityId=?";
     pool.query(sql,[CityId],(err,reslut)=>{
          if(err) throw err;
          if(reslut.length>0){
               res.send({code:200,msg:"获取成功",data:reslut})
          }else(
               res.send({code:400,msg:"暂无数据",data:reslut})
          )
     })
});
/**搜索接口 */
router.get("/searchKey",(req,res)=>{
     var str = req.query.str;
     if(!str){
          res.send({code:401,msg:"找不到您要找的内容"})
     }
     var sql = "SELECT CityId FROM jxy_jingqu WHERE title LIKE ? LIMIT 1;"
     pool.query(sql,[`%${str}%`],(err,reslut)=>{
          if(err) throw err;
          if(reslut.length>0){
               res.send({code:200,msg:"查询成功",data:reslut});
          }else{
               res.send({code:400,msg:"找不到！"})
          }
     })
});
/**经典详细信息 */
router.get("/details",(req,res)=>{
     var u_id = req.session.u_id;
     var Jid = req.query.Jid;
     if(!Jid){
          res.send({code:404,msg:"找不到"});
          return;
     }
     function SelectDetails(){
          return new Promise((resolve,reject)=>{
               var sql = "SELECT * FROM jxy_jingqu LEFT JOIN jxy_cousor ON jxy_jingqu.Jid=jxy_cousor.Jid WHERE jxy_jingqu.Jid=? "
               pool.query(sql,[Jid],(err,reslut)=>{
                    if(err) throw err;
                    if(reslut.length>0){
                         resolve(reslut);
                    }else{
                         reject();
                    }
               })
          })
     }
     function SelectColl(){
          return new Promise((resolve,reject)=>{
               var sql = "SELECT c_id FROM jxy_coll WHERE Jid=? AND u_id=?";
               pool.query(sql,[Jid,u_id],(err,reslut)=>{
                    if(err) throw err;
                    if(reslut.length>0){
                         resolve(true);
                    }else{
                         resolve(false);
                    }
               })
          })
     }
     if(!u_id){
         SelectDetails()
         .then(resolve=>{
              var obj = {};
              obj.details = resolve[0];
              res.send({code:200,msg:"获取成功",data:obj});
         }).catch(()=>{
               res.send({code:401,msg:"获取失败",})
         })
     }else{
          Promise.all([
               SelectDetails(),
               SelectColl()
          ]).then(resolve=>{
               var obj = {};
               obj.details = resolve[0][0];
               obj.iscoll = resolve[1];
               res.send({code:200,msg:"获取成功",data:obj})
          }).catch(()=>{
               res.send({code:402,msg:"获取失败"})
          })
     }
});
/***城市列表 */
router.get("/CityLists",(req,res)=>{
     var sql = "SELECT Cid,Did,CityId,selcname,cname FROM jxy_city ORDER BY selcname";
     pool.query(sql,(err,reslut)=>{
          if(err) throw err;
          if(reslut.length>0){
               res.send({code:200,msg:"成功",data:reslut});
          }else{
               res.send({code:400,msg:"系统繁忙"});
          }
     })
});
/**评论接口**/
router.get("/Comment",(req,res)=>{
     var Jid = req.query.Jid;
     if(!Jid){
          res.send({code:401,msg:"未知错误"});
          return;
     }//"SELECT * FROM jxy_comment WHERE Jid=?";
     var sql = "SELECT jxy_comment.*,jxy_user.jx_name,jxy_user.avatar FROM jxy_comment LEFT JOIN jxy_user ON jxy_comment.u_id = jxy_user.u_id WHERE Jid=?"
     pool.query(sql,[Jid],(err,reslut)=>{
          if(reslut.length>0){
               res.send({code:200,msg:"获取成功",data:reslut})
          }else{
               res.send({code:400,msg:"未知错误"})
          }
     })
})
module.exports = router;