const express = require('express')

const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

const reqRouter = express.Router();

reqRouter.post('/send/:status/:toUserId', userAuth, async (req, res) => { // base_uri/interested/grdt454354tfgfs5w3
    try{
        const fromUserId = req.user._id;
        const { status, toUserId } = req.params;

        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({ error: "Invalid status type " + status + "." })
        }

        const existingConnectionrequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if(existingConnectionrequest) {
            return res.status(400).json({ error: 'Connection already exists.' })
        }

        const isToUserIdExist = await User.findById(toUserId)
        if(!isToUserIdExist) {
            return res.status(404).json({ error: 'User not Found' })
        }

        const savedConnectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const connectedData = await savedConnectionRequest.save();

        return res.status(200).json({data : connectedData, message: "Request sent to " + isToUserIdExist.firstName})
        }
    catch (err) {
        return res.status(500).json( { error: err.message || "Something went wrong" })
    }
})

reqRouter.post('/review/:status/:requestId', userAuth, async (req, res) => { // /review/accepted/rghty6u54etrdhgry54r
    try {
        const { requestId, status } = req.params;
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)) {
            return res.status(404).json({ error: "Request status is not allowed" })
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: req.user._id,
            status: "interested"
        })
        if(!connectionRequest) {
            return res.status(404).json({ error: "Connection request not found." })
        }
        connectionRequest.status = status;
        const curReq = await connectionRequest.save();
        return res.status(200).json({ data: curReq, message: `Connection ${status} successfully.` })
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Something went wrong' })
    }
})


module.exports = reqRouter 