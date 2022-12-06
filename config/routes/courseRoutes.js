import express from "express"
const router = express.Router()

// import controllers
import {createCourse, findCourse} from "../controllers/courseController.js"

router.route("/").post(createCourse)
router.route("/").get(findCourse)

export default router;
