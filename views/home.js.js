const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");
var bodyParser=require("body-parser");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

const express = require('express'); 
const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(bodyParser.json())
var urlencodedParser = bodyParser.urlencoded({ extended: true })  
app.use(express.static('public'));

app.get('/', function (req, res) {  //get is inbuilt function containing 2 arguments
res.send('Hello World!')  
});
app.get("/login",function(req,res){
    res.render("login.ejs")  // if we type "localhost:3000/login" in google we get Hii! msg
})
app.get("/signup",function(req,res){
    res.render("signup.ejs")
})
app.get("/signupsubmit",function(req,res){
   // res.sendFile(__dirname+"/signupsubmit.html")
    //console.log(req.query.email);
    const first_name = req.query.first_name;
    console.log(first_name);
    const user_name = req.query.user_name;
    const email = req.query.email;
    const password = req.query.password;
    db.collection("test").add({
        name: first_name,
        user_name: user_name,
        email:email,
        password:password
    })
    .then(()=>{
        res.render("login.ejs")
    });
});

app.get("/loginsubmit",function(req,res){
     const user_name = req.query.user_name;
     const password = req.query.password;
     db.collection("test").where("user_name","==",user_name)
     .where("password","==",password)
     .get()
     .then((docs)=>{
        if(docs.size >0){
            
            res.render("home.ejs")
        }
        else{
            res.render("again.ejs");
        }
     });
 });
    

    
app.listen(port, function () {  
    console.log('Example app listening on port 3000!')  //if if type localhost:3000 in google Hello world will be printed
    })
