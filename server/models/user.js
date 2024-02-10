const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    gender:String,
    dob:String,
    mobile:Number
})

const UserModel=mongoose.model("userprofile",UserSchema)

module.exports=UserModel