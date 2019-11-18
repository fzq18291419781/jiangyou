const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser")
const UserRouter = require("./router/user.js");
const IndexRouter = require("./router/index.js");
//创建服务器端口4000
var app = express();
app.listen(5050);
//配置跨域
// app.use(cors({
//      origin:["http://176.233.29.97:3001","http://176.233.29.89:3001","http://127.0.0.1:3001","http://localhost:3001"],    //允许跨域列表
//      credentials:true    //每次请求需要验证
// }));
//配置session模块
app.use(session({
     secret:"128位字符",  //安全字符串
     resave:true,   //每次用户发送请求更新数据
     saveUninitialized:true   //保存初始化数据
}));
//托管静态文件
app.use(express.static(
     "public"
));
//使用body-parser中间件，将post请求的数据解析为对象
app.use( bodyParser.urlencoded({
     extended:false //使用querystring模块(速度快)，不使用qs模块
}) );
//挂载UserRouter
app.use('/v1/getuser',UserRouter);
app.use('/v1/getindex',IndexRouter);