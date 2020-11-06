var mongoose=require('mongoose');
var passportlocalmongoose=require('passport-local-mongoose');
var userSchema=mongoose.Schema({
    username:{type:String},
    password:{type:String}
});
userSchema.plugin(passportlocalmongoose); 
module.exports=mongoose.model("User",userSchema);