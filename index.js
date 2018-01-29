var express = require('express');
var bodyparser=require('body-parser');
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
app.post('/addProduct',function(req,res){
	var name=req.body.Name;
	var price=req.body.Price;
	var quantity=req.body.Quantity;
	var cost=req.body.Cost;
	let body={product_name:name,product_price:price,product_quantity:quantity,product_cost:cost};
    let sql='INSERT INTO temp_table SET ?';
	let query=db.query(sql,body,(err,result)=>{
		if(err)throw err;
		res.send('Product Added');
	});
});
app.post('/createProduct',function(req,res){
	var name=req.body.Name;
	var cost=req.body.Cost;
	var category=req.body.Category;
	var diet=req.body.Diet;
	let body={product_name:name,product_cost:cost,product_category:category,product_diet:diet};
	let sql='INSERT INTO products SET ?';
    let query=db.query(sql,body,(err,result)=>{
		if(err)throw err;
		res.send('Product Created');
	});
	});
app.post('/createBill',function(req,res){
	var Name=req.body.Name;
	var Details=req.body.Details;
	var Cost=req.body.Cost;
	var Date=req.body.Date;
	let body={Customer_name:Name,order_details:Details,order_cost:Cost,order_date:Date};
	let sql='INSERT INTO bill_data SET ?';
let query=db.query(sql,body,(err,result)=>{
	if(err)throw err;
	res.send('bill created');
	
});
});
app.get('/getOrders',function(req,res){
	 let sql='SELECT * FROM orders';
	 let query=db.query(sql,function(err,rows,fields){
		 if(!err)
		 {
			 var response=[];
			 if(rows.length!=0)
			 {
				 for(var i=0;i<rows.length;i++)
				 {
				 var id=rows[i].order_id;
				 var order=rows[i].order_summary;
				 var cost=rows[i].order_cost;
				 var date=rows[i].order_date;
				 var contact=rows[i].user_contact;
				 var name=rows[i].user_name;
				 var address=rows[i].order_address;
				 var status=rows[i].order_status;
				 response.push({id,order,cost,date,contact,name,address,status});
				 }
			 }
			 else
			 {
				 response.push("no data found");
			 }
			 	res.json({response});
		 }
		 else
		 {
			 res.status(404).send('error occured');
		 }
	 });
	
});
app.get('/getProducts',function(req,res){
	let sql='SELECT * FROM products';
	let query=db.query(sql,function(err,rows,fields){
		if(!err)
		{
			var response=[];
			if(rows.length!=0)
			{
				for(var i=0;i<rows.length;i++)
				{
					var name=rows[i].product_name;
					var cost=rows[i].product_cost;
					var category=rows[i].product_category;
                    var diet=rows[i].product_diet;
					response.push({name,cost,category,diet});
				}
			}
			else
			{
				response.push({'response':'no data found'});
				
			}
			res.json({response});
		}
		else
		{
			res.status(404).send('error occured');
		}
	});
});
app.post('/register',function(req,res){
	  var user_id=req.body.id;
	  var password=req.body.Password;
	  var contact=req.body.Contact;
	  var email=req.body.Email;
	  let body={log_id:user_id,log_password:password,contact_no:contact,user_email:email};
	  let sql='INSERT INTO pos_user SET ?';
	  let query=db.query(sql,body,(err,result)=>{
		  if(err)throw err;
		  res.send('User Registered');
	  });
});
app.post('/login',function(req,res){
	var user_id=req.body.Id;
	var password=req.body.Password;
	let body={log_id:user_id,log_password:password};
	let sql ='SELECT * FROM pos_user WHERE log_id =? AND log_password=?';
	let query=db.query(sql,[user_id,password],function(err,rows,fields){
		if(!err)
		{
			var response=[];
			if(rows.length!=0)
			{
				response.push('login successful');
			}
			else
			{
				response.push('login unsucessful');
			}
		}
		else
		{
			response.push('error');
		}
		res.json({response});
	});
	
});
app.listen(port,function(){
      console.log('app started on port 8080');
  });