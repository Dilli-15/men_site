var express=require('express'),
    {render}=require('ejs'),
    bodyparser=require('body-parser'),
    mongoose= require('mongoose'),
    methodOverride=require('method-override'),
    passport=require('passport'),
    flash=require('connect-flash'),
    localstrategy=require('passport-local');

var croutes=require('./routes/comments'),
    cgroutes=require('./routes/campgrounds'),
    aroutes=require('./routes/Auth');

var app=express();
app.use(methodOverride('_method'));

//-------------------------------------------------
//Database connection
mongoose.connect('mongodb://localhost/YelpDatabase', {
    //change the dataname 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message)); 
//========================================
app.use(express.static(__dirname +"/public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(flash());
Cg=require("./models/champground");
Comment=require("./models/comment");
User=require('./models/user');
//passport configuration===================

app.use(require('express-session')({
    secret:"colt dog is not fine",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});
app.use('/index',cgroutes);
app.use('/index/:id/comments',croutes);
app.use(aroutes);

//=============================================

app.listen(5000,function(){
    console.log("Server is listening in the port number 5000");
});
