
const express = require('express');
const app = express(); //建立一個Express伺服器
const path = require('path');

const mysql = require('mysql');



const currentPath = path.basename(__dirname)
app.use(express.static(path.join(__dirname.split(currentPath)[0], 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname.split(currentPath)[0], 'build', 'index.html'));
  });
app.get('/app', async (req, res) =>{
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ss880062',
    database: 'app',
    port:'3306'
  });
  connection.connect();
  connection.query('Select * from apptable', (err, results) => {
    if(err) {throw err;
    } 
    res.send(results);

  });
  
  connection.end();
  
  
});
//app.use(express.urlencoded());
app.use(express.json());
app.post('/app/insert/layer', async (req, res) =>{ 
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ss880062',
    database: 'app',
    port:'3306'
  });
  //INSERT INTO apptable(id,name,photo,remark,address,blog,layertype,coordinate,zoom,layer)
  connection.connect();
  //data.id,data.name,data.photo,data.remark,data.address,data.layertype,JSON.stringify(data.layer),JSON.stringify(data.coordinate),1]
  let data = req.body
  //console.log(data.uniID)
  let stmt = `INSERT INTO apptable(id,layerid,name,layertype,layer,coordinate)
            VALUES(?,?,?,?,?,?)`;
  let dataValue = [data.uniID,data.id,data.name,data.layertype,JSON.stringify(data.layer),JSON.stringify(data.coordinate)];
  connection.query(stmt, dataValue, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    // get inserted id
    //console.log( results);
  });

  
  connection.end();
  
  
});

app.post('/app/insert/layer/submit', async (req, res) =>{ 
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ss880062',
    database: 'app',
    port:'3306'
  });
  connection.connect();
  
  //data.id,data.name,data.photo,data.remark,data.address,data.layertype,JSON.stringify(data.layer),JSON.stringify(data.coordinate),1]
  let data = req.body
  console.log(data.uniID)
  let stmt = `UPDATE apptable
              SET  photo = ? , remark = ? , name = ? , blog = ? , address = ?
              
              WHERE id = ?  `;
  let dataValue = [data.photo, data.remark, data.name, data.blog, data.address, data.uniID ];
  connection.query(stmt, dataValue, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    // get inserted id
    //console.log( results);
  });

  
  connection.end();
  
  
});
app.listen(3000, function () {
    console.log('Example app is running on port 3000!');
    console.log(currentPath , __dirname.split(currentPath))}
  );
