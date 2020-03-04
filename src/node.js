
const express = require('express');
const app = express(); //建立一個Express伺服器
const path = require('path');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ss880062',
    database: 'app',
    port:'3306',
    useConnectionPooling: true,
  });



const passport = require('passport')
// 引入驗證機制： passport-local
const LocalStrategy = require('passport-local').Strategy

// 透過 passport.user() 建立驗證機制
passport.use(new LocalStrategy(
  {
      passReqToCallback: true 
  },
  // 當請 passport 要驗證時，呼叫此 callback 函式，並帶入驗證資訊驗證
  function(req,username, password, done) {
    // Mongoose 以帳號資訊向 MongoDB 查找這位使用者
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(err, user) {
      // 如果伺服器端回傳錯誤訊息，提供 passport 錯誤訊息
      if (err) { console.log(err); return done(err) }
      // 如果沒有在資料庫裡找到該位使用者，不提供 passport 任何使用者資訊
      if (!user) { return done(null, false) }
      // 如果從資料庫找到了該名使用者，但密碼錯誤時，不提供 passport 任何使用者資訊
      if (!user[0].password) { return done(null, false) }
      // 如果帳號及密碼皆正確，提供 passport 使用者資訊
      return done(null, user)
    })
  }
))

  // 載入 body-parser 和 express-session
const bodyParser = require('body-parser')
const session = require('express-session')

const currentPath = path.basename(__dirname)
app.use(express.static(path.join(__dirname.split(currentPath)[0], 'build')));
console.log(path.join(__dirname.split(currentPath)[0], 'build'))
app.set('views', __dirname.split(currentPath)[0] + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

// 初始化 Passport
app.use(passport.initialize())
// 如果要使用 login session 時需設定
app.use(passport.session())

passport.serializeUser(function(user, done) {
    // 只將用戶 id 序列化存到 session 中
    //console.log(user[0].id,2,3)
    done(null, user[0].id)
  })

passport.deserializeUser(function(id, done) {
  // 透過使用者 id 到 MongoDB 資料庫尋找用戶完整資訊
  connection.query("select * from accounts where id = "+id,function(err,users){	
    done(err, users[0]);
  })
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname.split(currentPath)[0], 'build', 'index.html'));
  });

app.get('/login',
function(req, res){
  console.log('login')
  res.render('login');
});

app.post('/login', 
passport.authenticate('local', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});
app.get('/app', async (req, res) =>{
  
  //connection.connect();
  connection.query('Select * from apptable', (err, results) => {
    if(err) {throw err;
    } 
    res.send(results);

  });
  
  //connection.end();
  
  
});
//app.use(express.urlencoded());
app.use(express.json());
app.post('/app/insert/layer', async (req, res) =>{ 
  
  if(req.isAuthenticated()){
    let data = req.body
    //console.log(data.uniID)
    console.log(req.user.username)
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
  }
  console.log('guest')
  //INSERT INTO apptable(id,name,photo,remark,address,blog,layertype,coordinate,zoom,layer)
  //connection.connect();
  //data.id,data.name,data.photo,data.remark,data.address,data.layertype,JSON.stringify(data.layer),JSON.stringify(data.coordinate),1]
  

  
  //connection.end();
  
  
});

app.get('/app/user/auth',async (req, res) =>{ 
  let userauth =[false,'geust']
  if(req.isAuthenticated()){
    
    console.log(req.user.username)
    userauth = [true,req.user.username]
    res.send(userauth);
  }else{res.send(userauth);}
  
});

app.post('/app/insert/layer/submit', async (req, res) =>{ 
  
  //connection.connect();
  if(req.isAuthenticated()){
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


    //connection.end();
  }
   
});




app.post('/userRegist',
  async function(req, res){
    const {id,username, password,passwordConfirm, email} = req.body
    let errors = [];
    
    if(!username || !password || !passwordConfirm || !email){
        errors.push({ msg: 'Please fill in all fields' });
    }
    if(password !== passwordConfirm){
        errors.push({ msg: 'Passwords do not match' });
    }
    if (errors.length > 0) {
        res.render('userRegist', {
            errors,
            username,
            email,
            password,
            passwordConfirm
        });
    }else{

        let stmt = `INSERT INTO accounts(username,password,email)
        VALUES(?,?,?)`;
        let dataValue = [username,password,email];
        connection.query(stmt, dataValue, (err, results, fields) => {
          if (err) {
            return console.error(err.message);
          }
      
        res.redirect('/login');
        
        // get inserted id
        //console.log( results);
        });
    }
  } 
)

app.get('/userRegist',
  function(req, res){
    
    res.render('userRegist')
    // get inserted id
    //console.log( results);
    
  }
  
)

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/userinf', function(req, res){
  
  res.redirect('/');
});

app.listen(3000, function () {
    console.log('Example app is running on port 3000!');
    console.log(currentPath , __dirname.split(currentPath))}
  );
