const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    cognitoSub: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
