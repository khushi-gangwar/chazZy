const mongoose=require ("mongoose");
const {ObjectId}=mongoose.Schema.Types

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    names:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    followers: [{
type:ObjectId,
REF:"User"
    }],
    following: [{
        type:ObjectId,
        REF:"User"
            }],
})
mongoose.model("USER",userSchema)