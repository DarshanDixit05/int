// Import Model
import User from "../models/User.js"

// Making Promise
import bigPromise from "../middlewares/bigPromise.js"

export const createUser = bigPromise(async(req,res,next)=>{

    const {studentName,usn , sem, courses, totalCredit, academicSession,reason}=req.body;
    if((!studentName) || (!usn) || (!sem) || (!courses) || (!totalCredit) || (!academicSession) || (!reason)){
        return res.status(400).json({
            success:false,
            message:"All fields are required!"
        })
    }

        const user = await User.create({
            studentName,
            usn ,
            sem,
            courses,
            totalCredit,
            academicSession,
            reason
        })
    
        if(!user){
            return res.status(500).json({
                message: "error creating user"
            })
        }
        return res.status(201).json({
            success:true,
            message:"Student Created Successfully !",
            data:user
        })


})


export const findUser = bigPromise(async(req,res,next)=>{

    const user = await User.find().catch(err => {
        console.log(`error getting courses`)
        return null
    })

    if(!user){
        return res.status(500).json({
            message: "error getting user"
        })
    }
    return res.status(201).json({
        success:true,
        message:"user get Successfully !",
        data:user
    })
})


export const getApprove = bigPromise(async(req, res, next)=>{
    const year = req.query.year;
    const sem1=req.query.sem;
    
    const app = await  User.find({"$and":[{"academicSession": year}, {"sem":sem1},{"courses.approval": true}]}).catch(err=>{
        console.log(`error getting user`)
        return null
    })
    if(!app){
        return res.status(500).json({
            message: 'error getting user'
        })
    }
    return res.status(201).json({
        success:true,
        message:"course get Successfully",
        data: app
    })
})


export const reject = bigPromise(async(req,res,next) => {
    const {studentId}= req.query
    const {courseId} = req.body.id

    User.updateOne({$pull: {$and: [{"_id" : studentId},{"courses._id": courseId}]}})
    .then(()=> res.json('Deleted'))
    .catch(err=>
        // console.log("error in pull")
        res.status(500).json('Error:' + err)
    )
})