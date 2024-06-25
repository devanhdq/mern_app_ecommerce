import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    address: [{type: mongoose.Schema.Types.ObjectId, ref: 'address'}],
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'product'}],
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);
export default User;