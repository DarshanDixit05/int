// Import Dependencies
import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { strict } from "assert";


const userSchema=new mongoose.Schema({
    studentName:{
        type:String,
        maxleght:20
    },
    usn:{
        type:String,
        unique:true,
        maxleght:13
    },
    sem:{
        type:Number
    },
    courses:[{
        course:{type:String},
        credit:{type:Number},
        code:{type:String},
        ISA_marks:{type:Number},
        attendence:{type:Number},
        approval:{type:Boolean,
        default: false},
        Reject:{type:Boolean,default:false}
    }],
    totalCredit:{
        type:Number
    },
    academicSession: {
        type: Number
    },
    reason:{
        type:String
    }
}
)


const User = mongoose.model("User",userSchema);
export default User;