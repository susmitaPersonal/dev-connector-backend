const express = require('express')
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { signUpSchema } = require('../validationSchema/auth');
// const { userAuth } = require('../middlewares/auth')

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
    const {success, data, error} = signUpSchema.safeParse(req.body);
    if (!success) {
        return res.status(422).json({
            success: false,
            errors: error.format()
        })
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = new User({...data, password: passwordHash})
    try {
        await user.save()
        return res.status(200).send("User added successfully.")
    } catch (e) {
        return res.status(400).send("Error saving the user: " + e.message)
    }
})


authRouter.post("/signin", async(req, res) => {
    try{
        const { emailId, password } = req.body;
        // validation
        const user = await User.findOne({ emailId});
        if(!user) {
            return res.status(404).json({ error: 'Invalid credentials.' });
        }
        const isPasswordvalid = await user.validatePassword( password )
        if(!isPasswordvalid) {
            return res.status(404).json({ error: 'Invalid credentials.' });
        }
        const token = await user.getJwt();
        return res.status(200).cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: true }).json({ data: user, message: "User signed in successfully" });
    } catch (err) {
        return res.status(500).json({error: 'Failed to sign in user'})
    }
})

authRouter.post("/signout",  async (req, res) => {
    try{
        res.cookie('token', null, 
            { expires: new Date(Date.now()) })

        res.send("logout succesfully.")
    } catch (err) {
        return res.status(500).json({ error: err.message || "Something went wrong"})
    }
})

module.exports = authRouter;