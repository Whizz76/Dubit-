const mongoose=require('mongoose');
const account= new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});
const doubt=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true

    },
    branch:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    doubt:[
        {
            question:String,
            answer:String
        }
    ],
    answered:[
        {
            questionans:String,
            answergiven:String
        }
    ]
});
var d=mongoose.model('doubt',doubt);
var a=mongoose.model('account',account);
module.exports={d,a};