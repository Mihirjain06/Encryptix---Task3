import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [4, "Name must contain atleast 4 characters!"],
    maxLength: [20, "Name cannot exceed 20 characters!"],
  },

  email: {
    type: String,
    required: [true, "Please provide your email!"],
    validate: [validator.isEmail, "Please enter valid an email!"],
  },

  phone: {
    type: Number,
    required: [true, "Please provide your phone number!"],
  },

  password: {
    type: String,
    required: [true, "Please provide your password!"],
    minLength: [8, "Password must contain atleast 8 characters!"],
    maxLength: [25, "Password cannot exceed 25 characters!"],
    select: false,
  },

  role: {
    type: String,
    required: [true, "Please mention your job role!"],
    enum: ["Job Seeker", "Employer"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Genereted jwt for authorization
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
