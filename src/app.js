const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const { connectDB } = require('./config/db');
const User = require("./models/user");
const { signUpSchema } = require('./validationSchema/auth');
const { userAuth } = require("./middlewares/auth")

app.use(express.json())
app.use(cookieParser())

app.post("/signup", async (req, res) => {
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

app.get("/feed", userAuth, async (req, res) => {
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

app.delete("/delete-user", async(req, res) => {
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

app.patch("/update-user", async (req, res) => {
    try {
        // const data = req.body;
        const { success, data, error } = updateSchema.safeParse(req.body)
        if(!success) {
            return res.status(422).json({ error: error.format() });
        }

        const updateUser = await User.findByIdAndUpdate({
            _id: data.id
        }, data, { returnDocument: "after", runValidators: true });
        return res.status(201).json({data: updateUser, message: "User updated successfully"})
    }
    catch(err) {
        return res.status(500).json({error: 'Failed to update user' });
    }
})

app.post("/signin", async(req, res) => {
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

app.get("/profile", userAuth, async(req, res) => {
    return res.status(200).json({ data: req.user, message: "User profile fetched successfully" });
})

// Connect to the database
connectDB().then(() => {
    console.log('Database connection established in app.js');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port ${process.env.PORT || 5000}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database in app.js:', err);
})

