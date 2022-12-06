import express from "express"
const router = express.Router()

// import controllers
import { createUser, findUser, getApprove, reject } from "../controllers/userController.js"
import User from "../models/User.js"

router.route("/").post(createUser)
router.route("/").get(findUser)
router.route("/appr/").get(getApprove)

// router.route("/semDisplay").get(semDisplay)


router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err))
})
router.route('/update/:id').post((req, res) => {
    User.findByIdAndUpdate(req.params.id)
        .then(user => {
            const sub = req.body.cou
            for (var course of user.courses) {
                if (course.course == sub) { course.approval = true }
            }
            user.save()
                .then(() => res.json('student updated'))
                .catch(err => res.status(400).json('Error:' + err))
        })
        .catch(err => res.status(400).json('Error:' + err))
})
router.route('/reject/:id').post((req, res) => {
    User.findByIdAndUpdate(req.params.id)
        .then(user => {
            const sub = req.body.cou
            for (var course of user.courses) {
                if (course.course == sub) { course.Reject = true }
            }
            user.save()
                .then(() => res.json('student updated'))
                .catch(err => res.status(400).json('Error:' + err))
        })
        .catch(err => res.status(400).json('Error:' + err))
})
export default router;