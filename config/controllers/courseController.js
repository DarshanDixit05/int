import Course from "../models/Course.js"
import bigPromise from "../middlewares/bigPromise.js"


export const createCourse = bigPromise(async(req,res,next)=>{

    const {name,code ,sem, credit}=req.body;
    if((!name) || (!code) || (!sem) || (!credit)){
        return res.status(400).json({
            success:false,
            message:"All fields are required!"
        })
    }

        const course = await Course.create({
            name,
            code,
            sem,
            credit
        })
    
        if(!course){
            return res.status(500).json({
                message: "error creating user"
            })
        }
        return res.status(201).json({
            success:true,
            message:"Course Created Successfully !",
            data:course
        })


})


export const findCourse = bigPromise(async(req,res,next)=>{

    const {sem }= req.query
    
    const course = await Course.find({sem : sem}).catch(err => {
        console.log(`error getting courses`)
        return null
    })
    
    if(!course){
        return res.status(500).json({
            message: "error getting course"
        })
    }
    return res.status(201).json({
        success:true,
        message:"course get Successfully !",
        data:course
    })
})






