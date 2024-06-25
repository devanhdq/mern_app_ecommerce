import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}

export const authenticateToken = async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        console.log(token);
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded?.id);
                next();
            }
        } catch (e) {
            return res.sendError(400, null, e.message);
        }
    } else {
        return res.sendError(500, null, "Token not found");
    }
}