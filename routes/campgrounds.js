var express=require('express');
var router=express.Router();
var mware=require('../middleware');
Cg=require("../models/champground");

router.get("/",function(req,res){
    Cg.find({},function(err,allCg){
        if(err){
            console.log(err);
        }
        else{
            res.render("champgrounds/index",{allCg:allCg});
        }
    });
});
router.post("/",mware.isLoggedin,function(req,res){
    var name =req.body.name;
    var image =req.body.image;
    var price=req.body.price;
    var desp=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var NCg={name:name,image:image,description:desp,author:author,price:price}
    Cg.create(NCg,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            console.log(newlyCreated);
            res.redirect('/index');
        }
    });
});
router.get("/new",mware.isLoggedin,function(req,res){
    res.render('champgrounds/new'); 
});
router.get("/:id",function(req,res){
    Cg.findById(req.params.id).populate("comments").exec(function(err,foundcg){
        if(err){
            console.log(err);
        }
        else{
            res.render('champgrounds/show',{cg:foundcg});
        }
    });
});
//edit
router.get('/:id/edit',mware.ownership,function(req,res){
    Cg.findById(req.params.id,function(err,foundcg){
            res.render('champgrounds/edit',{cg:foundcg});
        });
});
router.put('/:id',mware.ownership,function(req,res){
    //find and update
    Cg.findByIdAndUpdate(req.params.id,req.body.cg,function(err,updatecg){
        if(err){
            res.redirect('/index');
        }else{
            req.flash("success","Champground is successfully updated");
            res.redirect('/index/'+req.params.id);
        }
    });
});
//Destory
router.delete('/:id',mware.ownership ,function(req,res){
    Cg.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect('/index');
        }
        else{
            req.flash("success","Your champground is sucessfullyt deleted, you can add a new one");
            res.redirect('/index');
        }
    })
});


module.exports=router;