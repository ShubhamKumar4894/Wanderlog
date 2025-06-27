import { Router } from "express";
import {
    createPlace,
  deletePlace,
  getPlaceById,
  getUsersPlaces,
  updatePlace,
} from "../controllers/places.controllers.js";
import fileUpload from "../middleware/fileUpload.js";
import checkAuth from "../middleware/check-auth.js";

const router = Router();

router.get("/:pid", getPlaceById);
router.get("/user/:uid", getUsersPlaces);
router.use(checkAuth); 
router.post("/",fileUpload.single('image'),createPlace);
router.patch("/update/:pid",updatePlace);
router.delete("/delete/:pid",deletePlace);

export default router;
