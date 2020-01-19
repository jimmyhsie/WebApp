

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
app.listen(3000, function () {
    console.log('Example app is running on port 3000!');
    console.log(__dirname);
    console.log(path.basename(__dirname))}
  );
