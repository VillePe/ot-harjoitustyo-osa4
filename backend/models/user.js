const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: String,
    passwordHash: {
        type: String,
        unique: true,
        required: true,
        minlength: 6
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        }
    ]
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;