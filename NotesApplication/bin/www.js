var app = require('../app');
var http = require('http');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));
