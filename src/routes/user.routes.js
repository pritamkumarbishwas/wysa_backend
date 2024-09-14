import { Router } from "express";
import {
    registerUser,
    updateFewWeeks,
    updateNoOfWeeks,
    updateSleepTime,
    updateSleepOut,
    updateHours,
    getSleepEfficiency
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/weekSleeping").patch(verifyJWT, updateFewWeeks)
router.route("/noOfWeeks").patch(verifyJWT, updateNoOfWeeks)
router.route("/sleepTime").patch(verifyJWT, updateSleepTime)
router.route("/sleepOut").patch(verifyJWT, updateSleepOut)
router.route("/hours").patch(verifyJWT, updateHours)
router.route("/sleepEfficiency").get(verifyJWT, getSleepEfficiency)

export default router