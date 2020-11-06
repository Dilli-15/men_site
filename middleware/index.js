var middlewareobj={};
var Cg=require('../models/champground');
var Comment=require('../models/comment');
middlewareobj.ownership=function(req,res,next){
    if(req.isAuthenticated()){
    Cg.findById(req.params.id, function(err,foundcg){
        if(err){
            res.redirect('back');
        }else{
            if(foundcg.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error","you don't have permission to do that");
                res.redirect('back');
            }
        }
    });

}
else{
    req.flash("error","you need to be logged in to do that");
    res.redirect('/login');
}
}
middlewareobj.commentownership=function(req,res,next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err,foundcomment){
        if(err){
            req.flas("error","Campground not found");
            res.redirect('back');
        }else{
            if(foundcomment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error","you don't have permission to do that");
                res.redirect('back');
            }
        }
    });
}
else{
    req.flash("error","you need to be logged in to do that");
    res.redirect('/login');
}
}
middlewareobj.isLoggedin=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","please login first! to do that");
    res.redirect('/login');
}
module.exports=middlewareobj; 