import express  from "express"
import  dotenv  from "dotenv"
import connectDB from "./config/db.js"

import mongoose from 'mongoose'
import bodyParser from "body-parser"
import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';
import cors from 'cors'

//cookies and filemiddleware

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


dotenv.config();
const app = express()
app.use(express.json());
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(cors())


// mongoose.connect("mongodb+srv://bharathkoli:dugcwebsite@cluster0.gw2l6ru.mongodb.net/DUGC");


import cookieParser from "cookie-parser"


app.use(cookieParser())



// morgan middlewares
import morgan from "morgan"
app.use(morgan("tiny"))

// regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// import all routes here
import userRoutes from "./routes/userRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"


// router middleware
app.use("/api/user",userRoutes);
app.use("/api/course", courseRoutes);


//////////////////////////////////////Module 2 //////////////////////////////////////

// mongoose.connect("mongodb+srv://bharathkoli:dugcwebsite@cluster0.gw2l6ru.mongodb.net/DUGC");


var connection = mongoose.connection;

var a = 0;
var data1;
var data2;
var collection_whole;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async function () {

    const collection = connection.db.collection("posts");
    const collection2 = connection.db.collection("files");
    collection_whole = collection;
    collection.find({}).toArray(function (err, data) {
        // console.log(data);
        // data1 = data;
        // data2 = data;
        // it will prnint your collection data
    });

    collection2.find({}).toArray(function (err, documents) {

        // console.log(documents);
    });

});

const fileSchema = new mongoose.Schema({
    filepath: String,
    id: String
});


const postSchema = new mongoose.Schema({
    class_id: {
        type: String,
        required: true
    },

    class_avg: {
        type: Number,
        required: true,
    },
    S_count: {
        type: Number,
        required: true,
    },
    A_count: {
        type: Number,
        required: true,
    },
    B_count: {
        type: Number,
        required: true,
    },
    C_count: {
        type: Number,
        required: true,
    },
    D_count: {
        type: Number,
        required: true,
    },

});


const Post = mongoose.model('Post', postSchema);
const File = mongoose.model('File', fileSchema);


var pathh = path.resolve(__dirname, 'public');
app.use(express.static(pathh));
app.use(bodyParser.urlencoded({ urlencoded: false }));

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: Storage })

var data3;
var data4;


app.post("/api7", async (req, res) => {
    const collection = await connection.db?.collection("posts");
    var stringid = req.body
    const regex1 = new RegExp(stringid[0]['id1'], 'g')
    const regex2 = new RegExp(stringid[0]['id2'], 'g')
    console.log(stringid[0]['id1']);
    console.log(stringid[0]['id2']);
    const dat2 = await collection.find({ class_id: regex1 }).sort({ class_id: 1 }).toArray();

    // console.log(dat2)

    //     .sort({class_id: 1}).toArray(function (err, data) {
    //     console.log(data)
    //     return data
    //     // it will prnint your collection data
    // });

    const dat3 = await collection.find({ class_id: regex2 }).sort({ class_id: 1 }).toArray()
    //     // console.log(data)
    // return data     
    //     // it will prnint your collection data
    // });

    // console.log(dat2)

    console.log([...dat2, ...dat3])
    // console.log(data1)
    res.json([...dat2, ...dat3])


})

app.get("/uttar", (req, res) => {
    console.log("Hi")
})

app.post("/api4", async (req, res) => {


    if (a == 0) {
        const collection = await connection.db.collection("posts");
        var stringid = req.body
        console.log(stringid[0]['id1']);
        console.log(stringid[0]['id2']);
        collection.find({ class_id: '/' + stringid[0]['id2'] + '/' }).sort({ class_id: 1 }).toArray(function (err, data) {
            data2 = data;
            // it will prnint your collection data
        });

        collection.find({ class_id: '/' + stringid[0]['id1'] + '/' }).sort({ class_id: -1 }).toArray(function (err, data) {
            console.log(data2)
            Object.assign(data2[0], data)
            // it will prnint your collection data
        });

    }
    console.log(data2[0])
    res.json(data2[0])

})

// app.get("/api2", (req, res) => {
//     collection_whole.find({ class_id:"2022-4-Machine Learning-B"}).toArray(function (err, data) {
//         console.log(data);
//         data1 = data;
//         // it will prnint your collection data
//     });
// })

app.post("/api2", (req, res) => {
    var jsonData = req.body;

    const post = Post({
        class_id: jsonData[1]['__EMPTY_2'],
        class_avg: jsonData[0]['__EMPTY_2'],
        S_count: jsonData[2]['__EMPTY_2'],
        A_count: jsonData[3]['__EMPTY_2'],
        B_count: jsonData[4]['__EMPTY_2'],
        C_count: jsonData[5]['__EMPTY_2'],
        D_count: jsonData[6]['__EMPTY_2'],

    });


    post.save(function () { })
    console.log("Successful");

});


app.post('/fileUpload', upload.single('file'), (req, res) => {
    var x = 'uploads/' + req.file.originalname;

    var temp = new File({
        filepath: x,
        id: req.body.title
    })
    temp.save((err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("File Uploaded Successfully")
        }
    })
})

var path3
app.post('/download', async (req, res) => {
    var stringid = req.body;
    const collection2 = connection.db.collection("files");
    console.log(stringid[0]['id']);
    await collection2.find({ id: stringid[0]['id'] }).toArray(function (err, data3) {
        console.log(data3);
        path3 = data3[0]['filepath'];
        var x = __dirname + '/' + path3;
        const filename_2 = "sample.xls"
        res.download(x, filename_2);
        console.log(x);
    });
})



//////////////////////////////////////Module 2 //////////////////////////////////////




//////////////////////////////////////Module 5 //////////////////////////////////////


const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:String
})

const User=mongoose.model("userCredentials",userSchema);

// const fs = require('fs');
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser());
import CSVToJSON from "csvtojson"

// var storage = multer.diskStorage(
//     {
//         destination: './Store1',
//         filename: function (req, file, cb ) {
//             cb( null, file.originalname);
//         }
//     }
// );
var storage = multer.diskStorage(
    {
        destination: './build',
        filename: function (req, file, cb ) {
            console.log("file");
            cb( null, file.originalname);
        }
    }
);

// const upload = multer({ dest: "uploads/" });
const upload1  = multer({ storage: storage })
app.use(express.static(__dirname + "../build"));
let file1;
let coursename;
app.post("/xyz/uploadfile", upload1.single("profile"), (req, res, next) => {
    coursename=req.body.course;
    console.log(coursename);
    file1=req.file.originalname;
    if(!req.file.originalname)
    {
        return res.status(401).json({
        success:false,
        message:"No file choosen"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Successfully uploaded the file"
    })
    console.log("file successfully uploaded !!");
});

app.post("/login",async (req,res)=>{
    let c=req.body.urole;
    console.log(req.body);
    let result=await User.findOne({
        email:req.body.uemail,
        password:req.body.upass
    })
    if(!result){
        res.status(401).json({
            success:false,
            message:"Invalid Username or password"
        });
    }else{
        res.status(200).json({
            success:true,
            message:"Success",
            data:result
            });
    }
});
// app.listen(8080, ()=>{
//     console.log("Server started on port 8080");
// })

const darshanSchema = {
    SL:String,
    Name: String,
    Usn: {type: String},
    Division: String,
    Attendance: String,
    Cie: String,
    Course: {
        type:String,
        unique:true
    },
    Rollno:{
        type:String
    }
};
const file = mongoose.model("darshan", darshanSchema);

let array = [];

const courseCoordinatorUrl = `/courseCoordinator`;
console.log(courseCoordinatorUrl);
app.post(courseCoordinatorUrl, (req, res) => {
    // console.log(coursename);
    // console.log(file1);
    let arr =[]
    CSVToJSON().fromFile(`./build/${file1}`)
        .then(async users => {
            let data = users;
            for (let index = 0; index < data.length; index++) {
                if(data[index].Attendance < 75 || data[index].CIE < 40 ){
                    arr.push(new file({
                        SL: data[index].Sl,
                        Name: data[index].Name,
                        Usn: data[index].USN,
                        Division: data[index].Division,
                        Attendance: data[index].Attendance,
                        Cie: data[index].CIE,
                        Course: coursename,
                        Rollno:data[index].Rollno
                    })  
                    )
                }
            }
            file.insertMany(arr, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successss");
                }
            })
            res.send(data);
            fileName=""
        }).catch(err => {
            console.log(err);
        });

})
const result = [];
app.get("/details",(req,res) =>{
const result1=file.find({});
if(!result1)
{
    return res.status(401).json({
    success:false,
    message:"No Students Exist"
    });
}
else{
    return res.status(200).json({
        message:"Success",
        data:result1,
        success:true
    })
}
});

app.post("/dugcCoordinator", (req, res) => {
    file.find({}, function(err, foundItems){
        const groupByCategory = foundItems.reduce((group, foundItem) => {
            const { Name } = foundItem;
            group[Name] = group[Name] ?? [];
            group[Name].push(foundItem);
            return group;
        }, {})
        let array = Object.values(groupByCategory)
        res.send(array)
    });
})


export default app;



