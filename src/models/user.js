const mongoose = require("mpngoose");

const UserSchema = new mongoose.schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})

const UserModel = mongoose.model("User", UserSchema);

modules.exports = UserModel;