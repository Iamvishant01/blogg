import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'EMail already exists!'],
        required: [true, 'EMail is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [
            /^[A-Za-z][A-Za-z0-9_]{4,29}$/,
            "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
        ],
    },
    image: {
        type: String,
    }
})

const User = models.User || model("User", userSchema);
export default User;