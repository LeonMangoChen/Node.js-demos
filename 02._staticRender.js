//require表示引包
var http = require("http");//创建服务器，参数是一个回调函数，表示如果有请求，要做什么
var fs = require("fs");
var server = http.createServer(function(req,res){
    switch(req.url){
        case  "/yuan":
           fs.readFile("./test/test2.html",function(err,data){
            // console.log(data);
            //req表示请求，request；res表示响应，response
            //设置HTTP头部，状态码是200，文件类型是html，字符集是utf-8
            res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
            res.end(data);
            }); 
            break;
        case "/fang":
            fs.readFile("./test/test.html",function(err,data){
            // console.log(err);
            //req表示请求，request；res表示响应，response
            //设置HTTP头部，状态码是200，文件类型是html，字符集是utf-8
            res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
            res.end(data);
            }); 
            break;
        case "/avatar.jpg":
            fs.readFile("./test/avatar.jpg",function(err,data){
            // console.log(err);
            //req表示请求，request；res表示响应，response
            //设置HTTP头部，状态码是200，文件类型是html，字符集是utf-8
            res.writeHead(200,{"Content-type":"image/jpg"});
            res.end(data);
            }); 
            break;
        case "/a.css":
            fs.readFile("./test/b.css",function(err,data){
            // console.log(err);
            //req表示请求，request；res表示响应，response
            //设置HTTP头部，状态码是200，文件类型是html，字符集是utf-8
            res.writeHead(200,{"Content-type":"text/css;charset=UTF-8"});
            res.end(data);
            }); 
            break;
        default:
            res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
            res.end("页面不存在！");
            break;
    }
});

//运行服务请，监听3000端口（端口号可以任意改）
server.listen(3000,"127.0.0.1");