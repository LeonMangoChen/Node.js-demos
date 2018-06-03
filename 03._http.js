//require表示引包
var http = require("http");
//创建服务器，参数是一个回调函数，表示如果有请求，要做什么
var server = http.createServer(function(req,res){
    //req表示请求，request；res表示响应，response
    //设置HTTP头部，状态码是200，文件类型是html，字符集是utf-8
    res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
    res.write("<h1>我是主标题</h1>")
    res.end();
})

//运行服务请，监听3000端口（端口号可以任意改）
server.listen(3000,"127.0.0.1");