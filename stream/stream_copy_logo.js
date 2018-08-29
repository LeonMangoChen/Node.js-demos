var fs = require('fs');
var source = fs.readFileSync('../test/avatar.jpg');

fs.writeFileSync('steam_copy_logo.png', source);