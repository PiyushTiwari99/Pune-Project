const express = require("express")
const router = express.Router()

const userController = require("../controller/userController")


const middleware = require("../middleware/auth")



// user
router.post("/register", userController.register)

router.post("/login", userController.loginUser)
router.get("/getProfile/:id", middleware.authentication, userController.getProfile)

router.delete("/getProfile/:id", userController.getProfileDelete)
module.exports = router;