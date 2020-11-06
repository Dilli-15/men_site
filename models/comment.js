var mongoose=require('mongoose');
var commentSchema=mongoose.Schema({
    author:{
        id:{type:mongoose.Schema.Types.ObjectId,
        ref:"User"},
        username:{type:String}
    },
    text:{type:String}
});

module.exports=mongoose.model("Comment",commentSchema);