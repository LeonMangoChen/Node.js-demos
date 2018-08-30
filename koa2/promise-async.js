const fs = require('fs');
const util = require('util');
const readAsync = util.promisify(fs.readFile);

// 用同步的代码来完成异步的操作
async function init() {
	try {
		let data = await readAsync('./package.json');

		data = JSON.parse(data);

		console.log(data.name);
	} catch (err) {
		console.log(err);
	}
}

init();