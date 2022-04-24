const mongoose=require("mongoose");
const usact= new mongoose.Schema(
    {
        name:{
            type:String,
            
        },
        questions:[{
            type:String
        }],
        answers:[
            {
                type:String
            }
        ]
    });
    module.exports=mongoose.model("usacts",usact);

