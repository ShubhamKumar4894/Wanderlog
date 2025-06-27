import HttpError from "../models/Http-error.js";
import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    if(req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new HttpError("Authentication failed", 401);
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        const err = new HttpError("Authentication failed", 401);
        return next(err);
    }
}
export default checkAuth;