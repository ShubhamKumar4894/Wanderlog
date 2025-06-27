import HttpError from "../models/Http-error.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    const err = new HttpError("Fetching users failed", 500);
    return next(err);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("signing up failed try again!", 500);
    return next(err);
  }
  if (existingUser) {
    const err = new HttpError("User already exists!", 422);
    return next(err);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new HttpError("Could not create user, please try again", 500);
    return next(err);
  }
  const createdUser = new User({
    name,
    email,
    image: req.file ? req.file.path : null,
    password: hashedPassword,
    places: [],
  });
  try {
    await createdUser.save();
  } catch (error) {
    // console.error(" signup error:", error);
    const err = new HttpError("signing up failed please try again", 500);
    return next(err);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    const err = new HttpError("Signing up failed, please try again", 500);
    return next(err);
  }
  res
    .status(201)
    .json({ userId: createdUser._id, email: createdUser.email, token: token });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("signing in failed try again!", 500);
    return next(err);
  }
  if (!existingUser) {
    const err = new HttpError("Invalid credentials!", 401);
    return next(err);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    const err = new HttpError(
      "Could not log you in, please check your credentials",
      500
    );
    return next(err);
  }
  if (!isValidPassword) {
    const err = new HttpError("Invalid credentials!", 401);
    return next(err);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    const err = new HttpError("Signing up failed, please try again", 500);
    return next(err);
  }
  
  res.json({
    userId: existingUser._id,
    email: existingUser.email,
    token: token,
  });
};
export { getUsers, signup, login };
