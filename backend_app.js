var express = require('express');
var app = express();
var routes = require('./routes/backend_routes');
var bodyParser = require('body-parser');
var port = 4000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, listening);
function listening() {
  console.log('now on localhost:' + port);
}