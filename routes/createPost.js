const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requireLogin = require("../midddleware/requireLogin");
const { route } = require("./auth");

const POST=mongoose.model("POST");

//to get all posts
router.get("/allposts",requireLogin,(req, res)=>{
    POST.find()
    .populate("postedBy","_id names")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
})

//to post post
router.post("/create", requireLogin,(req,res)=>{
    const{body,pic}=req.body;
    if(!body||!pic){
        return res.status(422).json({error:"Please add all the fields"})
    }
    console.log(req.user)

    const post=new POST({

        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then((result)=>{
        return res.json({post:result})
    }).catch(err=>console.log(err))
})

//to get my posts
router.get("/myposts",requireLogin,(req,res)=>{
POST.find({postedBy:req.user._id})
.then(myposts=>{
    res.json(myposts)
})
})

//like photos
router.put("/like",requireLogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id names")
    .then((result)=>{
        res.json(result)
    }).catch((err)=>{
        return res.status(422).json({error:err})
    
    });
});

//unlike photos
router.put("/unlike",requireLogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id names")

    .then((result)=>{
        res.json(result)
    }).catch((err)=>{
        return res.status(422).json({error:err})
    
    });
});

module.exports=router;