const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
const { uploadFile } = require('./awsController')
const shortid = require("shortid")



const register = async (req, res) => {

    try {

        let data = req.body
        let files = req.files


        const { username, password } = data
        if (!username) {
            return res.status(400).send({ status: false, message: "username is required" })
        }

        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }

        const profilePicture = await uploadFile(files[0])
        if (!profilePicture) {
            return res.status(400).send({ status: false, msg: "profileImage not uploaded in the files" });

        }

        const shortCode = shortid.generate().slice(0, 6);

        const userData = {
            username: username, password: password, profileImage: profilePicture, code: shortCode
        }


        const createdUser = await userModel.create(userData)

        res.status(201).send({ status: true, data: createdUser })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



const loginUser = async function (req, res) {

    try {

        const { username, password } = req.body
        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, message: "Please enter some data" })
        }

        if (!username) {
            return res.status(400).send({ status: false, message: "username is required" })
        }


        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }

        const user = await userModel.findOne({ username: username, password: password })
        if (!user) {
            return res.status(401).send({ status: false, message: "incorrect credentials" })
        }


        /******************************create token***********************************/

        const token = jwt.sign({

            userId: user._id,

        }, "project", { expiresIn: "1h" });

        return res.status(200).send({ status: true, message: "User login successfully", data: { userId: user._id, token } })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }
}



const getProfile = async function (req, res) {
    try {
        let id = req.params.id
        const userFound = await userModel.findOne({ _id: id })
        if (!userFound) {
            return res.status(401).send({ status: false, message: "incorrect credentials" })
        }
        return res.status(200).send({ status: true, data: userFound.profileImage })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }
}

const getProfileDelete = async function (req, res) {
    try {
        let id = req.params.id
        const userFound = await userModel.findOne({ _id: id })
        if (!userFound) {
            return res.status(401).send({ status: false, message: "incorrect credentials" })
        }

        delete userFound.profileImage
        return res.status(200).send({ status: false, message: "dleted", data: userFound })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }
}




module.exports = { loginUser, register, getProfile, getProfileDelete }