

const express = require('express');
const app = express(); //建立一個Express伺服器
const path = require('path');

const mysql = require('mysql');


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    
  });
app.get('/test', function(req, res) {
  res.json('test')
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ss880062',
    database: 'app',
    port:'3306',
    useConnectionPooling: true,
  });
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
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

app.listen(3000, function () {
    console.log('Example app is running on port 3000!');
    console.log(__dirname);
    console.log(path.basename(__dirname))}
  );
