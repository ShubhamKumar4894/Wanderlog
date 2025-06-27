import mongoose from "mongoose";
import fs from "fs";
import HttpError from "../models/Http-error.js";
import getCoordsForAddress from "../utils/location.js";
import { Place } from "../models/place.model.js";
import { User } from "../models/user.model.js";

const getUsersPlaces = async (req, res, next) => {
  const userId = req.params.uid;
  let place;
  try {
    place = await Place.find({ creator: userId });
  } catch (error) {
    const err = new HttpError("place not found", 500);
    return next(err);
  }
  if (!place || place.length === 0) {
    return next(new HttpError("The user has no places", 500));
  }
  res.json({ message: "fetched place successfully", place });
};
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("place not found", 500);
    return next(err);
  }
  if (!place) {
    throw new HttpError("Could not find a place for the provided Id", 404);
  }
  res.json({ place });
};

const createPlace = async (req, res,next) => {
  const { title, description, image, address } = req.body;
  const coordinates = getCoordsForAddress(address);

  if (title.trim().length === 0 || description.trim().length === 0) {
    throw new HttpError(
      "Either the title field is empty or the description field is empty",
      404
    );
  }

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (error) {
    const err = new HttpError("Creating Place Failed", 500);
    return next(err);
  }
  if (!user) {
    const err = new HttpError("Could not find user for provided id", 404);
    return next(err);
  }
  const newPlace = new Place({
    title,
    description,
    image:req.file.path,
    address,
    location: coordinates,
    creator:req.userData.userId,
  });
  console.log(user);
  try {
    const sess= await mongoose.startSession();
    sess.startTransaction();
    await newPlace.save({session:sess});
    user.places.push(newPlace._id);
    await user.save({session:sess});
    await sess.commitTransaction();
    
  } catch (error) {
      console.error(" createPlace transaction error:", error);
      const err= new HttpError('Creating Place failed! try again later',500);
      return next(err);
  }
  res.status(201).json({place:newPlace});
};
const updatePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  const { title, description } = req.body;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("place not found", 500);
    return next(err);
  }
  if(place.creator.toString() !== req.userData.userId) {
    return next(new HttpError("You are not allowed to edit this place", 401));
  } 
  const updatedPlace = await Place.findByIdAndUpdate(
    placeId,
    {
      $set: {
        title: title,
        description: description,
      },
    },
    { new: true }
  );
  if (!updatedPlace) {
    return next(new HttpError("Place was not updated", 400));
  }
  res.status(200).json({ updatedPlace });
};
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (error) {
    return next(new HttpError("Deleting place failed, please try again.", 500));
  }
  if (!place) {
    return next(new HttpError("Place to be deleted not found", 404));
  }
  if (place.creator.id !== req.userData.userId) {
    return next(new HttpError("You are not allowed to delete this place", 401));
  }
  const imagePath = place.image;
  try {
    const sess= await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({session:sess});
    await sess.commitTransaction();
  } catch (error) {
    console.log(error)
    const err= new HttpError("Something went wrong, could not delete the place",500);
    return next(err);
  }
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({message:"Deleted Place successfully!!"})

};

export { getUsersPlaces, getPlaceById, createPlace, updatePlace, deletePlace };
