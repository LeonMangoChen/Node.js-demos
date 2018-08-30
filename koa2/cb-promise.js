const fs = require('fs');

// 1.原始回调
// fs.readFile('./package.json', (err, data) => {
// 	if (err) return console.log(err);

// 	data = JSON.parse(data);
// 	console.log(data.name);
// })

//2.Promise回调
// function readFileAsync(path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, (err, data) => {
//             if (err) reject(err);
//             else resolve(data);
//         })
//     })
// }

// readFileAsync('./package.json')
//     .then(data => {
//         data = JSON.parse(data);

//         console.log(data.name);
//     })
//     .catch(err => {
//         console.log(err);
//     })

//3.使用Promisefy来完成从回调向Peomise迁移的工作
const util = require('util');

util.promisify(fs.readFile)('./package.json')
    .then(JSON.parse)
    .then(data => {
        console.log(data.name)
    })
    .catch(err => {
        console.log(err);
    })