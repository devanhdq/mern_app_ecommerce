import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}

export const authenticateToken = (req, res, next) => {
    let token;
    console.log(req.headers.authorization);
    // if (req.header.authorization.startsWith("Bearer")) {
    //     token = req.header.split(" ")[1];
    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         console.log(decoded);
    //         // req.user = decoded;
    //         // next();
    //     } catch (e) {
    //         throw new Error("Invalid token");
    //     }
    // } else {
    //     throw new Error("There is no token in the header");
    // }
}