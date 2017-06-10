
/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const path = require('path');

/* DEPENDENCIES CONFIGURATION
----------------------------------------- */
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

/* MIDDLEWARE FOR THE VIEW ENGINE
----------------------------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* ROUTES
----------------------------------------- */
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('index');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

/* START THE NPM SERVER
----------------------------------------- */
http.listen(port, function() {
    console.log(`Server started`);
});
