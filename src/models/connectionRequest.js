const mongoose = require('mongoose');

const connectionReuestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected", ],
            message: `{VALUE} is incorrect status type.`
        },
        required: true
    }
},
{
    timestamps: true
});

connectionReuestSchema.index({ fromUserId: 1, toUserId: 1 })

connectionReuestSchema.pre("save", function () {
    const connectionRequest = this;
    const { fromUserId, toUserId } = connectionRequest;
    if( fromUserId.equals(toUserId) ) {
        throw new Error("Cannot send connection request to yourself.")
    }
})

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionReuestSchema);

module.exports = ConnectionRequestModel;