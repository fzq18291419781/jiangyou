# jxyou-1906
# app.js 服务器文件,文件目录下node app.js,端口5050,
## package.json 存放所需模块信息
## jxy.sql数据库脚本
## puclic/托管静态资源;
### public 存放Icon,公共CSS,HTML页面；
### public index.html网站页面,static打包后的Vue-cil
### public/img 存放图片
## pool.js 连接池文件;
### 配置连接数据库
## router/index.js页面模块接口；挂载在V1/getindex下
### index.js/free接口，get请求，请求参数无；目的地页面所需接口，返回城市地区数据
### index.js/index接口，get请求，请求参数无；首页所需信息接口，返回景区相关数据
### index.js/citySelect接口，get请求，请求参数CityId；返回对应城市信息
### index.js/searchKey接口，get请求，请求参数str；通过模糊匹配返回对应数据
### index.js/details接口，get请求，请求参数Jid必须，返回相关景区详细信息，并返回用户是否收藏
### index.js/CityLists接口,get请求，请求参数无，返回城市列表数据
## router/user.js用户模块接口；挂载在v1/getuser下
### user.js/login/uname,email,phone 用户登录接口,post请求
### user.js/reg/exist接口，验证用户是否已存在
### user.js/reg/reguser接口,注册用户
### user.js/coll接口，返回用户收藏数据
### user.js/uDetails接口,返回用户个人信息
### user.js/createColl接口，添加用户收藏
### user.js/delColl接口，删除用后收藏接口
### user.js/ExitLogin接口，退出登录接口
