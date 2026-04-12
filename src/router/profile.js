const express = require('express')
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth")
const { updateSchema } = require('../validationSchema/auth');

const profileRouter = express.Router();

app.get("/profile", userAuth, async(req, res) => {
    return res.status(200).json({ data: req.user, message: "User profile fetched successfully" });
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