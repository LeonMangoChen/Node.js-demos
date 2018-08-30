//迭代器函数
// function makeIterator (arr) {
// 	let nextIndex = 0;

// 	//返回一个迭代器对象
// 	return {
// 		next: () => {
// 			// next() 方法返回的结果对象
// 			if (nextIndex < arr.length) {
// 				return { value: arr[nextIndex++], done: false}
// 			} else {
// 				return { done: true }
// 			}
// 		}
// 	}
// }

// const it = makeIterator(['eat', 'sleep', 'play']);

// console.log("First", it.next().value);
// console.log("Second", it.next().value);
// console.log("Third", it.next().value);
// console.log("Fourth", it.next().done);


//生成器函数
//生成器更方便使用迭代器而出现的，特点就是通过生成器函数简化掉迭代器组件的过程或者叫创建过程
//从语法上来看 多了个*和yield关键字，通过yield关键字还可以做到类似于断点执行，一步一步来调结果
function *makeIterator (arr) {
	for (let i = 0; i < arr.length; i++) {
		yield arr[i];
	}
}

const gen = makeIterator(['eat', 'sleep', 'play']);

console.log("First", gen.next().value);
console.log("Second", gen.next().value);
console.log("Third", gen.next().value);
console.log("Fourth", gen.next().done);