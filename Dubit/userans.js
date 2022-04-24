const mongoose=require("mongoose");
const usans= new mongoose.Schema(
    {
        name:{
            type:String,
            
        },
        answers:[{
                type:String
            }]
        
    });
    module.exports=mongoose.model("usans",usans);
