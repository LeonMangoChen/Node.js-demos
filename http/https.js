var https = require('https');
var fs = require('fs');

var option = {
	key: fs.readFileSync('ssh_key.pem'),
	cert: fs.readFileSync('ssh_cert.pem')
}

https
	.creatServer(option, function(req, res) {
		res.writeHead(200);
		res.end('Hello');
	})
	.listen(8090);