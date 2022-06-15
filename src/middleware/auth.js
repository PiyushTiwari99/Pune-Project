const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");


const authentication = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(401).send({ status: false, message: "important header missing" })
        }
        let decodedToken = jwt.verify(token, 'project')
        if (!decodedToken) return res.status(401).send({ status: false, message: 'token is not valid' })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
    next()
}




module.exports.authentication = authentication
