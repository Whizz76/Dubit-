const mongoose=require('mongoose');
var submodel=new mongoose.Schema({
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
    subjects:[{
        type:String
    }]
    
})
module.exports=mongoose.model('subjects',submodel);