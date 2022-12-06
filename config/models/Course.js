// Import Dependencies
import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { strict } from "assert";

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        maxleght:20
    },
    code:{
        type:String,
        maxleght:13,
        unique:true,
    },
    sem:{
        type:Number
    },
    credit:{
        type :Number
    }
}
)


const Course = mongoose.model("Course",courseSchema);
export default Course;