## Promise
* ES6的Promise语言标准、Promise/A+规范
* 如何使用
* 在什么场景下使用

##### promise对象三种状态
>1. 未完成（pending）
>2. 已完成（fulfilled）
>3. 失败（rejected）

##### Promise A与A+不用点
>* A+规范通过术语thenable来区分promise对象
>* A+定义onFultilled/onRegected必须是作为函数来调用，而且调用过程必须是异步的
>* A+严格定义了then方法链式调用时onFulfillde/onRehected的调用顺序

##### Promise then方法
>* then方法返回时必须是一个Promise对象。接收两个参数, 第一个是操作成功时的回调函数，第二个是操作失败时的回调函数，这两个参数都可以省略。成功的回调函数第一个参数是上一个Promise值，失败的回调函数第一个参数期望的是一个失败的原因。
>* Promise会保证then方法回调的顺序，也就是第一个Promise完成的时候后面链式的调用的then方法，参数里的回调函数会依次去调用，但同时这些回调函数不是在执行then方法的时候立即执行，而是必须等待前面的Promise完成之后采取执行。
>* Promise最大的特点在于回调函数可以写成规范的链式的写法，程序流程可以很清楚，他的一整套接口可以实现许多强大的功能，比如为多个异步操作部署一个回调函数，为多个回调函数中抛出的错误统一指定处理的方法等。至于使用场景只要是异步编程的地方都可以使用Promise。
>
		promiseObj.then(onFulfilled, onRehected);
		onFulfilled = function(value) {
		return promiseObj2;
		}
		onRejected = function(err) {}

##### Promise库
>* bluebird：除了兼容Promise规范以外，还扩展了取消Promise对象的运行，取得Promise的运行进度，以及错误处理的扩展检测等。此外在性能优化上下了很大功夫。
>* Q：和bluebird一样除了都能够在浏览器运行以外，都有很丰富的Api文档
>* then.js
>* es6-promise
>* async
>* native-promise-only