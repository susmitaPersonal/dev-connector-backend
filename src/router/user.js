const express = require('express');
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');

const USER_SAFE_ATTRIBUTES = ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"]
const User = require('../models/user');

userRouter.get('/connections', userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [{
                toUserId: loggedinUser._id,
                status: "interested"
            }, 
            {
                fromUserId: loggedinUser._id,
                status: "interested"
            }
        ]
        }).populated("fromUserId", USER_SAFE_ATTRIBUTES)
        .populated("toUserId", USER_SAFE_ATTRIBUTES)

        const data = connectionRequest.map(row => {
             if(row.fromUserId._id.toString() === loggedinUser._id.toString()) {
                return rowUserId;
             }
            return row.fromUserId
        })

        return res.status(200).json({ data: connectionRequest, message: "Pending requests fetched successfully." })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

userRouter.get('/requests/recieved', userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedinUser._id,
            status: "interested"
        }).populated("fromUserId", USER_SAFE_ATTRIBUTES)
        return res.status(200).json({ data: connectionRequest, message: "Pending requests fetched successfully." })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})


userRouter.get("/feed", userAuth, async (req, res) => {
    try{
        const loggedinUser = re.user;

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10;

        const skip = ( page - 1 ) * limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {
                    fromUserId: req.user._id
                },
                {
                    toUserId: req.user._id
                }
            ]
        }).select('formUserid toUserId')
        .skip(skip)
        .limit(limit)

        const hiddenUsersFromFeed = connectionRequest.reduce((acc, el) => {
            acc.add(req.fromUserId.toString());
            acc.add(req.touserId.toString());
            return acc;
        }, new Set())

        const users = await User.find({
            $and: [
                { _id: { $nin: [...hiddenUsersFromFeed] }},
                { _id: { $ne: loggedinUser._id }
            }]
        }).select(USER_SAFE_ATTRIBUTES)
        res.status(200).json({ data: users, message: "User feed fetched successfully." })
    } catch(err) {
        console.log('Error fetching feed in app.js:', err);
        res.status(500).json({ error: 'Failed to fetch feed' });
    }
})

module.exports = userRouter;