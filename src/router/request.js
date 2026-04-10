const express = require('express')

const { userAuth } = require("../middlewares/auth")

const reqRouter = express.Router();

reqRouter.post('/send-connection-request', userAuth, async (req, res) => {
    try{
        const user = req.user;
        return res.status(200).json({ message: "Request sent to " + user.firstName})
        }
    catch (err) {
        return req.status(500).json( { error: err.message || "Something went wrong" })
    }
})

module.exports = reqRouter