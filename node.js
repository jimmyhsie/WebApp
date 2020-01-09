const express = require('express');
const app = express(); //建立一個Express伺服器
const path = require('path');
const mysql = require('mysql');
const con = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'ss880062',
database: 'app'
});
con.connect(function (err) {
if (err) {
console.error('error connecting: ' + err.stack);
return;
}
console.log("Connected!");
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.listen(3000, function () {
    console.log('Example app is running on port 3000!');}
  );
