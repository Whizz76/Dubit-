const mongoose=require('mongoose');
var ad=new mongoose.Schema({
    subject:{
        type:String
        
    },
    questions:{
        type:String
    },
    answers:[
        {type:String}
    ]
});
module.exports=mongoose.model("qnas",ad);