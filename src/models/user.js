const mongoose = require("mongoose");
const { minLength, maxLength, uppercase } = require("zod");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        uppercase: true,
        trim: true
    },
     phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 15
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 13,
        max: 100
    },
    gender: {
        type: String,
        required: true,
        validate(value){
            if(!["Male", "female", "Others"].includes(value)) {
                throw new Error("Gender must be either Male, Female, or Others")
            }
        }
    },
    about: {
        type: string,
        default: "This is the default about section. Please update it to tell us more about yourself!"
    },
    skills: {
        type: [string]
    },
    photo_url: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"
    }

},
{
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;