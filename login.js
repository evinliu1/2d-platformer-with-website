const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'glitchdb'
});

// Connecting to database
connection.connect(function(err) {
    if(err){
        console.log("Error in the connection")
        console.log(err)
    }
    else{
        console.log(`Database Connected`)
        connection.query(`SHOW DATABASES`,
            function (err, result) {
                if(err)
                    console.log(`Error executing the query - ${err}`)
                else
                    console.log("Result: ",result)
            })
    }
})

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'));
app.set('port', 80)
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'static')));

app.get('/login.html', function(request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/node_modules/views/login.html'));
});

app.get('/create_account.html', function(request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/node_modules/views/create_account.html'));
});

app.get('/', function(request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/node_modules/views/Dashboard.html'));
});

app.post('/auth', function(request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    console.log(username, password);
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM glitchdb.users WHERE UserName = ? AND UserPass = ?', [username, password], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('/')
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.listen(80)
