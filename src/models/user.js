const mongoose = require("mongoose");
const v = require("validator")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        index: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        index: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        uppercase: true,
        trim: true,
        validate(value) {
            if(!v.isEmail(value)) {
                throw new Error("Invalid email Id")
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 15,
        validate(value) {
            if(!v.isMobilePhone(value)) {
                throw new Error("Invalid phone number format")
            
            }  
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!v.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                throw new Error("Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol")
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: 13,
        max: 100
    },
    gender: {
        type: String,
        required: false,
        validate(value) {
            if(!["Male", "Female", "Others"].includes(value)) {
                throw new Error("Gender must be either Male, Female, or Others")
            }
        }
    },
    about: {
        type: String,
        default: "This is the default about section. Please update it to tell us more about yourself!"
    },
    skills: {
        type: [String]
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
        validate(value) { 
            if(!v.isURL(value)) {
                throw new Error("Please provide proper URL for photo");
            }
        }
    }

},
{
    timestamps: true
})

UserSchema.methods.getJwt = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, 'ASHWAGANDHA', { expiresIn: '7d' })
    return token;
}

UserSchema.methods.validatePassword = async function( userPassword ) {
    const user = this;
    const isPasswordvalid = await bcrypt.compare(userPassword, user.password);
    return isPasswordvalid;
}

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;