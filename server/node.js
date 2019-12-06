const express = require('express');
const app = express(); //建立一個Express伺服器
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.listen(3000, function () {
    console.log(__dirname,'Example app is running on port 3000!');}
  );