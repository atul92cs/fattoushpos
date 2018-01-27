var express = require('express');
var bodyparer=require('body-parser');
var mysql=require('mysql');

var db=mysql.createConnection( {host:'trial.cpaoqpenaokn.us-east-2.rds.amazonaws.com',
	  user:'admin',
	  password:'savita92',
database:'fattoush'});

db.connect((error)=>{
    if(error)throw error;
	
	console.log('Database connected');
});

var port=process.env.PORT||8080;

var app = express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.post('/',function(req,res){
	res.send('App works');
});

app.listen(port,function(){
      console.log('app started on port 8080');
  });