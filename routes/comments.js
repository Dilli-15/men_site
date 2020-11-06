var express=require('express');
var mware=require('../middleware');
var router=express.Router({mergeParams: true});
Cg=require("../models/champground");



router.get("/new",mware.isLoggedin,function(req,res){
    Cg.findById(req.params.id,function(err,cg){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{cg:cg});
        }
    });
});
router.post("/",mware.isLoggedin,function(req,res){
    Cg.findById(req.params.id,function(err,cg){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }
                else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    cg.comments.push(comment);
                    cg.save();
                    req.flash("success","successfully added your comment");
                    res.redirect('/index/'+ cg._id);
                }
            });
        }
    });
});
//comments edit
router.get("/:comment_id/edit",mware.commentownership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err){
             res.redirect("back");
        }
        else{
            res.render("comments/edit",{c:req.params.id,comment:foundcomment});   
            console.log(req.params.id);    
        }
    });
    
});

//comments update
router.put("/:comment_id",mware.commentownership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
        if(err){
            res.rediredt("back");
        }
        else{
            req.flash("success","Your comment is updated sucessfully");
            res.redirect("/index/"+req.params.id);
        }
    });
});
//comment delete
router.delete('/:comment_id',mware.commentownership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect('back');
        }
        else{
            req.flash("success","your comment is successfully deleted");
            res.redirect('/index/'+req.params.id);
        }
    })
});

module.exports=router;