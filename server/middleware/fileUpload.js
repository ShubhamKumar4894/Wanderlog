import e from "express";
import multer from "multer";

const MIME_TYPES = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
    "image/gif": "gif",
}
const fileUpload=multer({
    limits:500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/images");
        },
        filename: (req, file, cb) => {
            const ext= MIME_TYPES[file.mimetype];

            cb(null, Date.now() + "-" + file.originalname+ "." + ext);
        }
    }), 
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPES[file.mimetype];
        let error = isValid ? null : new Error("Invalid mime type");
        cb(error, isValid);
    }
});
export default fileUpload;