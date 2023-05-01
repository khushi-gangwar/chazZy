const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const POST=mongoose.model("POST");
const USER=mongoose.model("USER");
const requireLogin = require("../midddleware/requireLogin");

//to get user profile
router.get("/user/:id",(req,res)=>{
    USER.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        POST.find({postedBy:req.params.id})
        .populate("postedBy","_id")
        .then((post)=>{
res.status(200).json({user,post})
        })
        .catch((err)=>{
            return res.status(404).json({error:"User not found"})
        })

    })
})
//to follow user
router.put("/follow",requireLogin,async (req,res)=>{
    try{
        const result= await USER.findByIdAndUpdate(
            req.body.followId,
            {
            $push:{followers:req.user._id},
    },
    {new:true},
    
    await USER.findByIdAndUpdate(
        req.user._id,
        {
        $push:{following:req.body.followId},
},
{new:true}
        )
   
        );
        res.status(200).json(result);
}catch(err){
    res.status(422).json({error:err});
}
})
//to unfollow user

router.put("/unfollow",requireLogin,async (req,res)=>{
    try{
        const result= await USER.findByIdAndUpdate(
            req.body.followId,
            {
            $pull:{followers:req.user._id},
    },
    {new:true}, 
      await USER.findByIdAndUpdate(
        req.user._id,
        {
        $pull:{following:req.body.followId},
},
{new:true}
    )
        );   
        res.status(200).json(result);
}catch(err){
    res.status(422).json({error:err});
}
})

// SEARCH ALL USER
router.get('/timeline/user', requireLogin, async (req, res) => {
    try {
        const currentUser = await USER.find(req.params._id)
        if (currentUser) {
            const showUser = await USER.find()
            res.json(showUser)
        }
        // } else {
        //     res.status(404).json("please login")
        // }
  
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
  
  })

module.exports=router;
