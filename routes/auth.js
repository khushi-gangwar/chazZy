const express=require("express");
const router=express.Router();
const mongoose =require("mongoose");
const USER=mongoose.model("USER");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const {Jwt_secret}=require("../keys");

// router.get('/',(req,res)=>{
//     res.send("hello")
// })

//signup route
router.post("/signup",(req,res)=>{
    const{userName,names,email,password}=req.body;
    if(!names || !email ||!userName ||!password){
        res.status(422).json({error:" please add all fields"})
    }
    USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User Already exist with that email or username"})
        }
        bcrypt.hash(password,10).then((hashedPassword)=>{
            const user=new USER({
                names,
                email,
                userName,
                password:hashedPassword
            })
            user.save()
            .then(user=>{res.json({message:"Registered successfully"})})
            .catch(err=>{console.log(err)})
        })
        })
    
  
})

//signin route
router.post("/",(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please add email and password"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email"})
        }
        bcrypt.compare(password, savedUser.password).then((match)=>{
            if(match){
                const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
                const { _id, names, email, userName } = savedUser
                res.json({ token, user: { _id, names, email, userName } })
                // console.log({ token, user: { _id, names, email, userName } })

            }
            else{
                return res.status(422).json({error:"Invalid password"})
            }
        })
        .catch(err=>console.log(err))
    })

})
module.exports=router;