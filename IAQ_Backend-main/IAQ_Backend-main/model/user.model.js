const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = {
    user: "user",
    admin: "admin"
}
const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: { type: String, reqired: true},
    role: {type: String, enum: Role, default: Role['user']},
    isDeleted: {type: Boolean, default: false}
});

module.exports = mongoose.model("user", userSchema);
