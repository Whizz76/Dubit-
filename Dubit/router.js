const express=require('express');
const app=express();
let r;
const {MongoClient}=require('mongodb');
const port=process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));
/*MongoClient.connect(y,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((client)=>{
    console.log("Db connected");
    let db=client.db("hello");
    let c=db.collection("hi");
    app.get('/',(req,res)=>{
        c.find().then((res)=>{
            res.render('index.ejs',{title:res});
        }).catch(err=>console.error(err))
        
    })
})*/
const data=[
    {
        name:"hi",
        age:"34"
    },
    {
        name:"hi",
        age:"34"
    },
    {
        name:"hi",
        age:"34"
    }
];
app.get('/',(req,res)=>{
    res.render('index.ejs',{title:data}).then((res)=>{
        console.log("done!");
    }).catch((err)=>console.error(err))
});
app.get('/create.ejs',(req,res)=>{
    res.render("create.ejs");
})
app.get('/login.ejs',(req,res)=>{
    res.render('login.ejs');
})
app.listen(port,()=>{
    console.log(`Server is listening to ${port}`);
});
