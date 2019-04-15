const express= require("express");
const cors=require("cors");
const bodyParser=require("body-parser")
const app=express();
app.use(bodyParser.json())
app.use(cors());
var knex = require('knex');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '872664',
    database : 'smart-brain'
  }
});
db.select('*').from('users').then((data)=>
	console.log(data));
const database={
	users:[
	    {
	    	id:"1",
	    	email:"prashant@gmail.com",
	    	password:"prashant",
	    	name:"Prashant Kushwaha",
	    	entries:0,
	    	joined: new Date()
	    },
	    {
	    	id:"2",
	    	email:"praveen@gmail.com",
	    	password:"praveen",
	    	name:"Praveen Kushwaha",
	    	entries:0,
	    	joined: new Date()
	    }
	]
};
app.get("/",(req,res)=>
{
	res.send(database.users);
})

app.post("/signin",(req,res)=>
{
	let found=0;
	let i;
	for(i=0;i<database.users.length;i++)
	{ 
		if(req.body.email===database.users[i].email&&req.body.password===database.users[i].password)
		{
			found++;
			break;
		}
	}
	if(found>0)
		{
			const fakeUser = {
				id:database.users[i].id,
				email:database.users[i].email,
				name:database.users[i].name,
				entries:database.users[i].entries,
				joined:database.users[i].joined
			}
			res.send(JSON.stringify(fakeUser));
		}
	else
		res.send(JSON.stringify("fail"));
})


app.post("/register",(req,res)=>
{
	let found=0;
	let i;
	for(i=0;i<database.users.length;i++)
	{ 
		if(req.body.email===database.users[i].email&&req.body.password===database.users[i].password)
		{
			found++;
			break;
		}
	}
	if(found===0)
		{
			database.users.push({
				id:database.users.length+1,
				email:req.body.email,
				password:req.body.password,
				name:req.body.name,
				entries:0,
				joined: new Date()
			})
		res.send(JSON.stringify(database.users[database.users.length-1]));
	}
	else
	res.send(JSON.stringify("fail"))	
})
// ./signin --> POST
// ./register --> POST

app.listen(3001, ()=> console.log("app is running"));