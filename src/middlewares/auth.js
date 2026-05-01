const jwt = require('jsonwebtoken');
const User  = require("../models/user");

const userAuth = async (req, res) => {
    try {
        const cookies = req.cookies();
        if(!cookies.token) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const isVerified = await jwt.verify(cookies.token, "ASHWAGANDHA");
        if(!isVerified) {
            return res.status(401).json({error: "Not verified"})
        }
        const user = await User.findById(isVerified._id)
        if(!user) {
            return res.status(404).json({ error: "User not found." })
        }
        req.user = user;
        next();
    } catch(err) { 
        return res.status(500).json({ error: "Athorization failed"})
    }
}

module.exports = {
    userAuth
}