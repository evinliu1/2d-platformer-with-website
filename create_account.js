const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

const app = express();

connection.connect();
global.db = connection;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUnitialized: true,
}));
app.get('/sign', function(request, response) {
    // Render account template
    response.sendFile(path.join(__dirname + '/create_account'));
});
    // Record inputs into sql table
app.post('/sign', urlencodedParser, function(request, response){
    let username = request.body.username;
    let email = request.body.email;
    let password = request.body.password;

    connection.query('INSERT INTO mydb', VALUES (username, email, password));

    response.send("New account created!")

});

app.listen(3000);
