import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {generateToken} from "../middlewares/jsonwebtoken.middleware.js";

export const register = async (req, res) => {
    const {firstName, lastName, email, password, phoneNumber} = req.body;
    try {
        const findUserWithEmail = await User.findOne({email});
        if (!findUserWithEmail) {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({firstName, lastName, email, password: hashPassword, phoneNumber});
            await newUser.save();
            const userObject = newUser.toObject();
            delete userObject.password;
            return res.sendSuccess(201, userObject, "User created successfully");
        } else {
            return res.sendError(400, null, "User with this email already exists");
        }
    } catch (error) {
        return res.sendError(500, error.message, "Error creating user");
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        //check if user exists
        const findUser = await User.findOne({email});
        if (findUser) {
            //check if password is correct
            const comparePassword = await bcrypt.compare(password, findUser.password);
            if (comparePassword) {
                //generate token
                const userObject = findUser.toObject();
                delete userObject.password;
                const jwtToken = generateToken(userObject._id);
                return res.sendSuccess(200, {...userObject, token: jwtToken}, "User logged in successfully");
            } else {
                return res.sendError(400, null, "Invalid email or password");
            }
        } else {
            return res.sendError(400, null, "Invalid email or password");
        }

    } catch (error) {
        return res.status(500).sendError(500, null, error.message);
    }
};

export const getAllUsers = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const totalElements = await User.countDocuments();
        const users = await User.find().select('-password').skip(skip).limit(limit);

        return res.sendSuccess(200, {
            content: users,
            totalElements,
            pageNumber: page,
            pageSize: limit
        }, "Users retrieved successfully");
    } catch (error) {
        return res.sendError(500, null, error.message);
    }
};

export const getUserById = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const user = await User.findById({_id: id}).select('-password');
        if (user) {
            return res.sendSuccess(200, user, "User retrieved successfully");
        } else {
            return res.sendError(404, null, "User not found");
        }
    } catch (error) {
        return res.sendError(500, null, error.message);
    }
};

export const getUserByEmail = async (req, res) => {
    const {email} = req.params;
    try {
        const user = await User.findOne({email});
        if (user) {
            return res.sendSuccess(200, user, "User retrieved successfully");
        } else {
            return res.sendError(404, null, "User not found");
        }
    } catch (e) {
        return res.sendError(500, null, e.message);
    }
};

export const updateUserById = async (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, email, phoneNumber, isAdmin} = req.body;
    try {
        const user = await User.findById({_id: id});
        if (user) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phoneNumber = phoneNumber;
            user.isAdmin = isAdmin || "user";
            await user.save();
            return res.sendSuccess(200, user, "User updated successfully");
        } else {
            return res.sendError(404, null, "User not found");
        }
    } catch (error) {
        return res.sendError(500, null, error.message);
    }
};

// delete user by id
export const deleteUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById({_id: id});
        if (user) {
            await user.deleteOne({_id: id});
            return res.sendSuccess(200, null, "User deleted successfully");
        } else {
            return res.sendError(404, null, "User not found");
        }
    } catch (error) {
        return res.sendError(500, null, error.message);
    }
}