var mongoose=require('mongoose'); 
//Database schema
const campgroundschema=mongoose.Schema ({
    name:{type:String},
    image:{type:String},
    price:{type:String},
    description:{type:String},
    author:{
       id:{type:mongoose.SchemaTypes.ObjectId,
        ref:"User"},
        username:{type:String}
       },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});
module.exports=mongoose.model("Cg",campgroundschema);
//==================================