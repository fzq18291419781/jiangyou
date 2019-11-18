const mysql = require("mysql");
var  pool = mysql.createPool({
//     host:"w.rdc.sae.sina.com.cn",
//     user:"lyk2w4on5z",
//     password:"3ji3yyilj5zimwwllyhx4h4kxk4hziklll4i4z4m",
//     port:3306,
//     database:"app_jiangyou",
//     connectionLimit:15
	host:"127.0.0.1",
    user:"root",
    password:"",
    port:3306,
    database:"jxy",
    connectionLimit:15
});
module.exports = pool;