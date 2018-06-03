var http = require("http");
var url = require("url");
// http://127.0.0.1:3000/abcd/efgh/1.html?id=123&sex=man&age=18
var server = http.createServer(function(req,res){
    // url.parse()可以将一个完整的URL地址，分为很多部分；
    // host、port、pathnane、path、query
    var pathname = url.parse(req.url).pathname;
    // url.parse()如果第二个参数是true，那么就可以将所有的查询变为对象
    // 就可以直接点出来得到这个参数
    var query = url.parse(req.url,true).query;
    var age = query.age;
    console.log("pathname:" + pathname);
    console.log(query);
    console.log("age:" + age);
    res.end();
}).listen(3000,"127.0.0.1");