const mongoose=require('mongoose');
const {MongoClient}=require('mongodb');
const express=require('express');
const app=express();
const url=require('url');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
//app.use('/public', express.static('public'));
const y=require('./path.js'); //accessing the mongo url
var {d,a}=require('./model.js'); // accessing the schema for username
var sub=require('./submodel.js'); // accessing the schema for college,subject,semester
var ds=require('./alldoubt.js'); // accessing the schema for questions related to a particular subject
const { all } = require('express/lib/application');
const { updateOne } = require('./submodel.js');
let port=process.env.PORT || 8000;
mongoose.connect(y,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(client=>{
  app.listen(port,()=>{
      console.log("Server and database connected");
  });
}).catch(err=>{
  console.error(err);
})
// home page

app.get('/',(req,res)=>{
  res.render("index.ejs");
})
// login page
app.get('/login.ejs',(req,res)=>{
  res.render("login.ejs");
})
// create-account page
app.get('/create.ejs',(req,res)=>{
  res.render("create.ejs");
})
var usn; //Username
// check username is present in the database
app.get('/login/:id',(req,res)=>{
  let id=req.params.id;
  a.find({name:{$regex:id,$options:"i"}}).then((r)=>{
    if((r.length==0)){
      res.render("error.ejs"); // go to error page if no account found
    }
    else{
      usn=id;
      res.render("main.ejs",{name:usn}); // go to college,semester,branch selection page if the username is found
    }
    
  }).catch(err=>console.error(err));
  
})
// if error in login go the create-account page
app.get('/create-account',(req,res)=>{
  res.render("create.ejs");
});
// check whether that particular username is present in the database
app.get('/check/:id',(req,res)=>{
  let id=req.params.id;
  a.findOne({name:{$regex:id,$options:'i'}}).then((result)=>{
    res.status(200).json(result);
  }).catch(err=>console.error(err));
})
// create account 
app.post('/add',(req,res)=>{
  a.create(req.body).then((result)=>{
    res.redirect("/login.ejs");
    //console.log(result);
  }).catch(err=>console.error(err));
});
// add subject option
app.post('/add/subject',(req,res)=>{
  sub.create(req.body).then(result=>res.json(result)).catch(err=>console.error(err));
})
// delete subject option
app.delete('/delete/subject/:id',(req,res)=>{
  let i=req.params.id;
  sub.findByIdAndDelete({_id:mongoose.Types.ObjectId(i)}).then(res=>res.send("Data deleted")).catch(err=>console.error(err));
});
var qy;
// choose subject from a list of subjects
app.get('/choose/subject',(req,res)=>{
  qy=url.parse(req.url,true).query;
  sub.find({college:qy.college,branch:qy.branch,semester:qy.semester}).then((result)=>{
    if(result.length!==0){
      
      res.render("subject.ejs",{name:usn,subs:result.map(r=>r.subjects)});

    }
    else{
      res.render("nfound.ejs");
    }
  }).catch(err=>console.error(err));


  

})
/*app.post('/subject',(req,res)=>{
  let result=subject.find({college:req.body.college,branch:req.body.branch,semester:req.body.semester});
  if(result){
    res.render("subject.ejs",{subjects:result.subject.map(r=>r.question),college:req.body.college,branch:req.body.branch,semester:req.body.semester});
    //{result}
  }
  else{
    res.render("no.ejs");
  }
})*/
// add doubt 
app.post('/doubt/add/ques',(req,res)=>{
  ds.create(req.body).then((result)=>res.json(result)).catch(err=>console.error(err));

})
var s;
// get all the questions being asked in a particular subject
app.get('/doubt/ques/:id',(req,res)=>{
  s=req.params.id;
  //console.log(s);
  ds.find({subject:s}).then((result)=>{
    if(result.length!==0){
      //console.log("usn = "+usn);
      res.render("doubt.ejs",{questions:result.map(r=>r.questions),answers:result.map(r=>r.answers),qid:result.map(r=>r._id),subj:s,Username:usn});
    }
  }).catch(err=>console.error(err));

});
// add own answer to a question in the doubts page
app.put("/put/answer/:id",(req,res)=>{
  const ansdb=require('./userd.js');
  const quesid=req.params.id;
  const query={_id:mongoose.Types.ObjectId(quesid)};
  const queryans={name:usn};
  if(req.body.answer){
    const updocument={
      $push:{
        answers:{
          $each:[req.body.answer],
          position:-1
        }
      }
   };
   
   ds.updateOne(query,updocument).then((result)=>{
     res.json(result);
     ansdb.find(queryans).then(result=>{
      // console.log("result");
      //console.log(result);
     if(result.length!=0){
       ansdb.updateOne(queryans,updocument).then((result)=>console.log("added")).catch(err=>console.error(err));
     }
     else{
       const reqbody={
         name:usn,
          answers:[req.body.answer]
       }
       //console.log("reqbody");
       //console.log(reqbody);
       ansdb.create(reqbody);
     }
   }).catch(err=>console.error(err));
   }).catch(err=>console.error(err));
   
   
   
 

  }
});

app.get('/go/answer/page',(req,res)=>{
  res.render("answer.ejs",{subjj:s});
})
app.get('/answer.ejs',(req,res)=>{
res.render("answer.ejs",{subjj:s});
})
app.put('/added/ans/del/:id',(req,res)=>{
  const quesid=req.params.id;
  const query={_id:mongoose.Types.ObjectId(quesid)};
  const delans={
    $pull:{
      answers:req.body.answer
    }
  };
  ds.updateOne(query,delans).then((result)=>res.send("Deleted")).catch(err=>console.error(err));

})
app.post("/ask/ques",(req,res)=>{
  const queryans={name:usn};
  const qb=require('./userd.js');
  if(req.body.questions){
    const updocument={
      $push:{
        questions:{
          $each:[req.body.questions],
          position:-1
        }
      }
    }
    ds.create(req.body).then((result)=>{
      res.json(result);
      qb.find(queryans).then(result=>{
        if(result.length!=0){
          qb.updateOne(queryans,updocument).then((result)=>console.log("added")).catch(err=>console.error(err));
        }
        else{
          const reqbody={
            name:usn,
            questions:[req.body.questions]
          }
          qb.create(reqbody);
        }
      })
    
    }).catch(err=>console.error(err));
    

   };


  
})
app.get("/activity.ejs",(req,res)=>{
  res.render("activity.ejs");
})
app.get(`/view/activity/:id`,(req,res)=>{
  const id=req.params.id;
  const ann=require('./userd.js');
  ann.find({name:id}).then((result)=>{
    if(result.length!=0){
      res.render("activity.ejs",{questions:result[0].questions,answers:result[0].answers,sen:""})


    }
    else{
      res.render("noactivity.ejs",{sen:"No such activity found"})
    }
    
  })
  
})
app.get("/noactivity.ejs",(req,res)=>{
  res.render("noactivity.ejs");
})
app.get('/doubt/ans/:id',(req,res)=>{
  let qi=req.params.id;
  ds.find({"dques._id":mongoose.Types.ObjectId(qi)}).then((result)=>{res.render("answer.ejs",{answers:result[0].dques.map(r=>r.answers)})}).catch(err=>console.error(err))
})
app.put('/add/answer',(req,res)=>{
    
})

/*c*/