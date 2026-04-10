const express = require('express')
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth")
const { updateSchema } = require('../validationSchema/auth');

const profileRouter = express.Router();

app.get("/profile", userAuth, async(req, res) => {
    return res.status(200).json({ data: req.user, message: "User profile fetched successfully" });
})


profileRouter.get("/feed", userAuth, async (req, res) => {
    try{
        console.log('Received request to /feed with body:', req.body);
        if(!req.body) {
            const allUsers = await User.find({_id: {$ne: req.user._id}})
            if( !allUsers.length ) {
                req.status(404).json({ error: "No users found" })
            }
            return res.status(200).json({data: allUsers, message: "Check out all the users in the database"})
        }

        const { emailId } = req.body;
        // console.log('Received emailId in request body:', emailId);
        if(!emailId) {
            return res.status(400).json({ error: 'Email ID is required' });

        }

        const userList = await User.find({ emailId })
        console.log('Fetched user according to email id:', userList)
        if(!userList || userList.length === 0) {
            return res.status(204).json({ message: 'User not found' });
        }
        return res.status(201).json({ data: userList, message: "feed got fetched succesfully"})

    } catch(err) {
        console.log('Error fetching feed in app.js:', err);
        res.status(500).json({ error: 'Failed to fetch feed' });
    }
})

profileRouter.delete("/delete", async(req, res) => {
    try {
        const { _id } = req.params;
        if(!_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const deleteUser = await User.findByIdAndDelete(_id);
        if(!deleteUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ data: deleteUser, message: 'User deleted successfully' });
    } catch(err) {
        console.log('Error deleting user in app.js:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
})

profileRouter.patch("/edit", userAuth, async (req, res) => {
    try {
        // const data = req.body;
        const { success, data, error } = updateSchema.safeParse(req.body)
        if(!success) {
            return res.status(422).json({ error: error.format() });
        }
        const loggedinData = req.user;
        Object.keys(data).forEach(key => loggedinData[key] = data[key])
        await loggedinData.save()
        // const updateUser = await User.findByIdAndUpdate({
        //     _id: data._id
        // }, data, { returnDocument: "after", runValidators: true });
        return res.status(201).json({data: loggedinData, message: "User updated successfully"})
    }
    catch(err) {
        return res.status(500).json({error: 'Failed to update user' });
    }
})

profileRouter.get('/', userAuth, async (req, res) => {
    const user = req.user;
    return req.status(200).json( { data: user, message: "Your profile fetched successfully." } )
})


module.exports = profileRouter