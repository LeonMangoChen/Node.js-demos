## HTTP - get/request
* 在http的api里get就是对request的封装，所以get能做的事request都能做。  
* http的get和request可以在后台发起一个http请求，从而可以获取远程的资源，甚至是更新同步远程的资源，本质上request返回的是一个client.request的实例，client.request的实例是一个可写的流，如果你使用post请求上传一个文件，那么这个文件就会被写入到client.request对象里。  
* http.request(options[,callback]) 接收两个参数，一个是option，一个是回调函数 callback,回调函数是可选参数，可加可不加，通过回调函数可以接收到远端服务器的响应数据，也就是response。第一个参数可以是一个字符串，也可以是一个对象，如果是字符串可以被url模块的parse方法解析为一个对象，第一个参数是对象的话就可以进行一系列的配置，来定制需要发送请求的的格式，以下为常用的参数。 
  
>
* host：后台请求的域名或ip地址；
* hostname：是host的别名；
* port：远端服务的端口，默认是80；
* localAddress：用于绑定连接本地的接口；
* socketPath；
* method：指定http请求方法的字符串，默认是get；
* path：请求的路径，默认是根路径“/”，如果是有查询的字符串，就需要在后面追加一些参数；
* headers：包含请求的头的对象；
* auth：用于计算认证头的基本认证，一般是user跟上一给password；
* agent：控制agent行为，也就是一个代理；
* keepAlive：保持资源池周围的套接字在未来能被继续用于其他请求，默认值是false。